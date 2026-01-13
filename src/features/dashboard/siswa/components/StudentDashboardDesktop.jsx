import { useState } from 'react';

export default function StudentDashboardDesktop() {
    const [activeTab, setActiveTab] = useState('Overview');

    return (
        <div className="flex h-screen bg-[#f8fafc]">
            <aside className="w-64 border-r border-slate-200 bg-white p-6">
                <div className="mb-10 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 shadow-lg shadow-orange-100" />
                    <span className="text-xl font-bold tracking-tight text-slate-800">SiswaLink</span>
                </div>

                <nav className="space-y-1">
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
