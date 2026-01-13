import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../../services/supabase';

export default function AdminDashboardDesktop() {
    const [activeTab, setActiveTab] = useState('Overview');
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Form states
    const [formData, setFormData] = useState({ type: 'siswa', name: '', identifier: '' });
    const [msg, setMsg] = useState({ text: '', type: '' });

    const handleLogout = () => {
        navigate('/login');
    };

    const stats = [
        { label: 'Total Siswa', value: '1,240', change: '+12%', color: 'bg-blue-500' },
        { label: 'Total Guru', value: '86', change: '+3%', color: 'bg-purple-500' },
        { label: 'Kelas Aktif', value: '42', change: '0%', color: 'bg-emerald-500' },
        { label: 'Laporan Baru', value: '12', change: '+5', color: 'bg-orange-500' },
    ];

    useEffect(() => {
        if (activeTab === 'Manajemen User') {
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

            // 1. Cek apakah identifier sudah ada di database
            const { data: existing, error: checkError } = await supabase
                .from('profiles')
                .select('id')
                .eq(identifierField, formData.identifier)
                .maybeSingle();

            if (checkError) throw checkError;
            if (existing) {
                throw new Error(`${isSiswa ? 'NIS' : 'Email'} sudah terdaftar!`);
            }

            // 2. Jika belum ada, lakukan insert
            const payload = {
                full_name: formData.name,
                role: formData.type,
                [identifierField]: formData.identifier
            };

            const { error: insertError } = await supabase.from('profiles').insert([payload]);
            if (insertError) throw insertError;

            setMsg({ text: `Berhasil menambah ${formData.type}!`, type: 'success' });
            setFormData({ ...formData, name: '', identifier: '' });
            fetchProfiles();
        } catch (err) {
            setMsg({ text: err.message, type: 'error' });
        }
    };

    return (
        <div className="flex h-screen bg-[#f8fafc]">
            {/* Sidebar */}
            <aside className="w-64 border-r border-slate-200 bg-white p-6 flex flex-col">
                <div className="mb-10 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#2f6bff] to-[#2656d0] shadow-lg shadow-blue-200" />
                    <span className="text-xl font-bold tracking-tight text-slate-800">AdminPanel</span>
                </div>

                <nav className="space-y-1 flex-1">
                    {['Overview', 'Manajemen User', 'Akademik', 'Laporan', 'Pengaturan'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            className={`flex w-full items-center rounded-xl px-4 py-3 text-sm font-semibold transition-all ${activeTab === item
                                ? 'bg-blue-50 text-[#2f6bff]'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-50 text-center">
                    <button
                        onClick={handleLogout}
                        className="w-full rounded-xl bg-slate-100 py-3 text-sm font-bold text-slate-600 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-10">
                <header className="mb-10 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">{activeTab}</h1>
                        <p className="mt-1 text-slate-500">
                            {activeTab === 'Overview' ? 'Selamat datang kembali, Administrator 👋' : 'Kelola data pengguna sistem di sini.'}
                        </p>
                    </div>
                </header>

                {activeTab === 'Overview' ? (
                    <>
                        {/* Stats Grid */}
                        <div className="mb-10 grid grid-cols-4 gap-6">
                            {stats.map((stat) => (
                                <div key={stat.label} className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                                    <div className="mt-2 flex items-end justify-between">
                                        <h3 className="text-3xl font-bold text-slate-900">{stat.value}</h3>
                                        <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-emerald-500' : 'text-slate-400'}`}>
                                            {stat.change}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recent Activity Mock */}
                        <div className="rounded-3xl bg-white p-8 shadow-sm shadow-slate-200">
                            <h3 className="mb-6 text-xl font-bold text-slate-900">Aktivitas Terbaru</h3>
                            <div className="space-y-6">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-4 border-b border-slate-50 pb-6 last:border-0 last:pb-0">
                                        <div className="h-10 w-10 rounded-full bg-blue-50" />
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-slate-800">Pendaftaran siswa baru berhasil</p>
                                            <p className="text-xs text-slate-400">2 jam yang lalu • Oleh Admin System</p>
                                        </div>
                                        <button className="text-xs font-bold text-[#2f6bff] hover:underline">Detail</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                ) : activeTab === 'Manajemen User' ? (
                    <div className="grid grid-cols-3 gap-8">
                        {/* Form Create */}
                        <div className="col-span-1 space-y-6">
                            <div className="rounded-3xl bg-white p-6 shadow-sm shadow-slate-200">
                                <h3 className="mb-4 text-lg font-bold text-slate-900">Tambah User Baru</h3>
                                <form onSubmit={handleCreateUser} className="space-y-4">
                                    {msg.text && (
                                        <div className={`p-3 rounded-xl text-xs font-bold ${msg.type === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                            {msg.text}
                                        </div>
                                    )}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Tipe User</label>
                                        <div className="flex gap-2">
                                            {['siswa', 'guru'].map(t => (
                                                <button
                                                    key={t}
                                                    type="button"
                                                    onClick={() => setFormData({ ...formData, type: t })}
                                                    className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${formData.type === t ? 'bg-[#2f6bff] text-white shadow-lg shadow-blue-100' : 'bg-slate-50 text-slate-400'}`}
                                                >
                                                    {t}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">Nama Lengkap</label>
                                        <input
                                            required
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                            placeholder="Masukkan nama..."
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-slate-500 uppercase">
                                            {formData.type === 'siswa' ? 'NIS' : 'Email'}
                                        </label>
                                        <input
                                            required
                                            value={formData.identifier}
                                            onChange={e => setFormData({ ...formData, identifier: e.target.value })}
                                            className="w-full rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
                                            placeholder={formData.type === 'siswa' ? '12345...' : 'email@sekolah.com'}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white hover:bg-slate-800 transition-all active:scale-95"
                                    >
                                        Simpan User
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* User List */}
                        <div className="col-span-2">
                            <div className="rounded-3xl bg-white p-8 shadow-sm shadow-slate-200">
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="text-xl font-bold text-slate-900">Daftar Pengguna</h3>
                                    <button onClick={fetchProfiles} className="text-sm font-bold text-blue-600 hover:underline">Refresh</button>
                                </div>

                                {isLoading ? (
                                    <div className="py-10 text-center text-slate-400 font-medium italic">Memuat data...</div>
                                ) : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead>
                                                <tr className="border-b border-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                                                    <th className="pb-4">Nama</th>
                                                    <th className="pb-4">Role</th>
                                                    <th className="pb-4">Identifier</th>
                                                </tr>
                                            </thead>
                                            <tbody className="text-sm">
                                                {users.map((u) => (
                                                    <tr key={u.id} className="border-b border-slate-50 last:border-0">
                                                        <td className="py-4 font-semibold text-slate-800">{u.full_name}</td>
                                                        <td className="py-4">
                                                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${u.role === 'admin' ? 'bg-blue-50 text-blue-600' : u.role === 'guru' ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'}`}>
                                                                {u.role}
                                                            </span>
                                                        </td>
                                                        <td className="py-4 text-slate-500 font-mono text-xs">{u.nis || u.email || '-'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="py-20 text-center">
                        <div className="mx-auto w-20 h-20 bg-slate-50 rounded-full mb-4 flex items-center justify-center text-slate-200 italic">...</div>
                        <p className="text-slate-400 font-medium">Halaman ini sedang dalam pengembangan.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
