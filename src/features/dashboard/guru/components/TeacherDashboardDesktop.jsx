import { useState } from 'react';

export default function TeacherDashboardDesktop() {
    const [activeTab, setActiveTab] = useState('My Classes');

    const classes = [
        { name: 'Matematika - XII IPA 1', students: 32, time: '08:00 - 09:30', room: 'Ruang 102' },
        { name: 'Fisika - XI IPA 3', students: 28, time: '10:00 - 11:30', room: 'Lab Fisika' },
        { name: 'Matematika - X IPS 2', students: 35, time: '13:00 - 14:30', room: 'Ruang 204' },
    ];

    return (
        <div className="flex h-screen bg-[#f8fafc]">
            <aside className="w-64 border-r border-slate-200 bg-white p-6">
                <div className="mb-10 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-lg shadow-emerald-100" />
                    <span className="text-xl font-bold tracking-tight text-slate-800">GuruPortal</span>
                </div>

                <nav className="space-y-1">
                    {['Dashboard', 'Jadwal Mengajar', 'Input Nilai', 'Presensi', 'Siswa Saya'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setActiveTab(item)}
                            className={`flex w-full items-center rounded-xl px-4 py-3 text-sm font-semibold transition-all ${activeTab === item
                                    ? 'bg-emerald-50 text-emerald-600'
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
                        <h1 className="text-3xl font-bold text-slate-900">Halo, Pak/Bu Guru 👋</h1>
                        <p className="mt-1 text-slate-500">Semangat mengajarnya hari ini!</p>
                    </div>
                </header>

                <h3 className="mb-6 text-xl font-bold text-slate-900">Kelas Hari Ini</h3>
                <div className="grid grid-cols-3 gap-6">
                    {classes.map((cls) => (
                        <div key={cls.name} className="group cursor-pointer rounded-3xl bg-white p-6 shadow-sm shadow-slate-200 transition-all hover:shadow-md hover:scale-[1.01]">
                            <div className="mb-4 flex items-start justify-between">
                                <div className="rounded-2xl bg-emerald-50 p-3 text-emerald-600">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>
                                </div>
                                <span className="text-xs font-bold text-slate-400">{cls.time}</span>
                            </div>
                            <h4 className="text-lg font-bold text-slate-800">{cls.name}</h4>
                            <p className="mt-1 text-sm text-slate-500">{cls.students} Siswa • {cls.room}</p>
                            <button className="mt-6 w-full rounded-xl bg-slate-50 py-3 text-sm font-bold text-slate-600 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                Mulai Presensi
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
