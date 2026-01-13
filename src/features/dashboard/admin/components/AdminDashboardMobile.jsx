import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../../services/supabase';

export default function AdminDashboardMobile() {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    // Form states
    const [formData, setFormData] = useState({ type: 'siswa', name: '', identifier: '' });
    const [msg, setMsg] = useState({ text: '', type: '' });

    const stats = [
        { label: 'Siswa', value: '1,240', color: 'bg-blue-500' },
        { label: 'Guru', value: '86', color: 'bg-purple-500' },
        { label: 'Laporan', value: '12', color: 'bg-orange-500' },
    ];

    useEffect(() => {
        if (activeTab === 'User') {
            fetchProfiles();
        }
    }, [activeTab]);

    const fetchProfiles = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
        if (!error) setUsers(data);
        setIsLoading(false);
    };

    const handleCreateUser = async (e) => {
        e.preventDefault();
        setMsg({ text: 'Memproses...', type: 'info' });

        try {
            const isSiswa = formData.type === 'siswa';
            const identifierField = isSiswa ? 'nis' : 'email';

            // 1. Cek apakah identifier sudah ada
            const { data: existing, error: checkError } = await supabase
                .from('profiles')
                .select('id')
                .eq(identifierField, formData.identifier)
                .maybeSingle();

            if (checkError) throw checkError;
            if (existing) {
                throw new Error(`${isSiswa ? 'NIS' : 'Email'} sudah ada!`);
            }

            // 2. Lakukan insert
            const payload = {
                full_name: formData.name,
                role: formData.type,
                [identifierField]: formData.identifier
            };

            const { error: insertError } = await supabase.from('profiles').insert([payload]);
            if (insertError) throw insertError;

            setMsg({ text: `Berhasil!`, type: 'success' });
            setFormData({ ...formData, name: '', identifier: '' });
            fetchProfiles();
            setTimeout(() => setMsg({ text: '', type: '' }), 3000);
        } catch (err) {
            setMsg({ text: err.message, type: 'error' });
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-24">
            {/* Mobile Header */}
            <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#2f6bff] to-[#2656d0]" />
                    <span className="font-bold tracking-tight text-slate-800">AdminPanel</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="h-9 px-4 rounded-lg bg-red-50 text-red-600 text-[11px] font-bold uppercase tracking-wider active:scale-95 transition-transform"
                >
                    Logout
                </button>
            </header>

            <main className="px-6 pt-8">
                {activeTab === 'Dashboard' ? (
                    <>
                        <h1 className="text-2xl font-bold text-slate-900">Halo, Admin 👋</h1>
                        <p className="mt-1 text-sm text-slate-500">Berikut ringkasan data hari ini.</p>

                        {/* Stats Grid Mobile */}
                        <div className="mt-8 grid grid-cols-2 gap-4">
                            {stats.map((stat) => (
                                <div key={stat.label} className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200">
                                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">{stat.label}</p>
                                    <h3 className="mt-1 text-xl font-bold text-slate-900">{stat.value}</h3>
                                </div>
                            ))}
                            <button
                                onClick={() => setActiveTab('User')}
                                className="rounded-2xl bg-gradient-to-br from-[#2f6bff] to-[#2656d0] p-5 shadow-lg shadow-blue-100 text-left"
                            >
                                <p className="text-[11px] font-bold uppercase tracking-wider text-white/70">Aksi</p>
                                <p className="mt-1 text-sm font-bold text-white leading-tight">Kelola Data</p>
                            </button>
                        </div>

                        {/* Recent Activity List */}
                        <div className="mt-10">
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-bold text-slate-900">Aktivitas Terbaru</h3>
                                <button className="text-xs font-bold text-[#2f6bff]">Lihat Semua</button>
                            </div>
                            <div className="space-y-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm shadow-slate-100">
                                        <div className="h-10 w-10 rounded-full bg-slate-50" />
                                        <div className="flex-1">
                                            <p className="text-[13px] font-semibold text-slate-800 line-clamp-1">Siswa baru terdaftar di database</p>
                                            <p className="text-[11px] text-slate-400">Tadi • Sistem</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 text-center">Manajemen User</h2>
                            <p className="text-sm text-slate-500 text-center mt-1">Tambah Guru atau Siswa baru.</p>
                        </div>

                        {/* Form Mobile */}
                        <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200 border border-slate-50">
                            <form onSubmit={handleCreateUser} className="space-y-5">
                                {msg.text && (
                                    <div className={`p-3 rounded-xl text-center text-xs font-bold ${msg.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                        {msg.text}
                                    </div>
                                )}
                                <div className="flex gap-2 p-1 bg-slate-50 rounded-xl">
                                    {['siswa', 'guru'].map(t => (
                                        <button
                                            key={t}
                                            type="button"
                                            onClick={() => setFormData({ ...formData, type: t })}
                                            className={`flex-1 py-2.5 rounded-lg text-sm font-bold capitalize transition-all ${formData.type === t ? 'bg-white text-[#2f6bff] shadow-sm' : 'text-slate-400'}`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Nama Lengkap</label>
                                    <input
                                        required
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-semibold"
                                        placeholder="Nama lengkap..."
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">
                                        {formData.type === 'siswa' ? 'NIS' : 'Email'}
                                    </label>
                                    <input
                                        required
                                        value={formData.identifier}
                                        onChange={e => setFormData({ ...formData, identifier: e.target.value })}
                                        className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3.5 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all font-semibold"
                                        placeholder={formData.type === 'siswa' ? 'Contoh: 12345' : 'email@sekolah.com'}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-slate-900 py-4 text-sm font-bold text-white hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-200"
                                >
                                    Simpan User
                                </button>
                            </form>
                        </div>

                        {/* User List Mobile */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-900">User Terbaru</h3>
                                <button onClick={fetchProfiles} className="text-xs font-bold text-[#2f6bff]">Refresh</button>
                            </div>
                            {isLoading ? (
                                <div className="py-10 text-center text-slate-400 text-sm italic">Memuat...</div>
                            ) : (
                                <div className="space-y-3">
                                    {users.slice(0, 10).map((u) => (
                                        <div key={u.id} className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-slate-50">
                                            <div className="flex items-center gap-3">
                                                <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold ${u.role === 'guru' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                                                    {u.full_name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">{u.full_name}</p>
                                                    <p className="text-[10px] text-slate-400 font-mono">{u.nis || u.email}</p>
                                                </div>
                                            </div>
                                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase ${u.role === 'guru' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                                                {u.role}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>

            {/* Bottom Nav */}
            <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-slate-100 bg-white py-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)] z-20">
                {[
                    { id: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                    { id: 'User', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
                    { id: 'Laporan', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
                    { id: 'Set', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
                ].map((nav) => (
                    <button
                        key={nav.id}
                        onClick={() => setActiveTab(nav.id)}
                        className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === nav.id ? 'text-[#2f6bff]' : 'text-slate-300'}`}
                    >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={nav.icon} />
                        </svg>
                        <span className="text-[10px] font-bold tracking-tight">{nav.id}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
