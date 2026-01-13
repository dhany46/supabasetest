import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboardDesktop() {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/login');
    };

    return (
        <div className="flex h-screen bg-[#f8fafc]">
            <aside className="w-64 border-r border-slate-200 bg-white p-6 flex flex-col">
                <div className="mb-10 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-100" />
                    <span className="text-xl font-bold tracking-tight text-slate-800">SiswaLink</span>
                </div>

                <nav className="space-y-1 flex-1">
                    {['Dashboard', 'Tugas', 'Nilai Saya', 'Kehadiran', 'E-Library'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            className={`flex w-full items-center rounded-xl px-4 py-3 text-sm font-semibold transition-all ${activeTab === item
                                ? 'bg-orange-50 text-orange-600'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                                }`}
                        >
                            {item}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-slate-50">
                    <button
                        onClick={handleLogout}
                        className="w-full rounded-xl bg-slate-50 py-3 text-sm font-bold text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto p-10">
                <header className="mb-8 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Halo, Nama Siswa! 👋</h1>
                        <p className="mt-1 text-slate-500">Belajar yuk, 2 tugas nunggu kamu nih.</p>
                    </div>
                </header>

                <div className="grid grid-cols-2 gap-8">
                    <div className="rounded-3xl bg-white p-8 shadow-sm shadow-slate-200">
                        <h3 className="mb-6 text-xl font-bold text-slate-900">Progres Belajar</h3>
                        <div className="h-4 bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-orange-500 w-[75%]" />
                        </div>
                        <p className="mt-2 text-sm text-slate-500 font-semibold text-right">75% Selesai</p>
                    </div>

                    <div className="rounded-3xl bg-white p-8 shadow-sm shadow-slate-200">
                        <h3 className="mb-6 text-xl font-bold text-slate-900">Tugas Mendatang</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 bg-orange-50/50 p-4 rounded-2xl">
                                <div className="h-2 w-2 rounded-full bg-orange-500" />
                                <div className="flex-1 text-sm font-bold text-slate-800">Tugas Matematika - Dasar Logaritma</div>
                                <div className="text-xs font-bold text-orange-600">Besok</div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
