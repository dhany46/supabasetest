export default function TeacherDashboardMobile() {
    return (
        <div className="min-h-screen bg-[#f8fafc] pb-24">
            <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-emerald-600" />
                    <span className="font-bold tracking-tight text-slate-800">GuruPortal</span>
                </div>
                <div className="h-10 w-10 rounded-full bg-slate-200" />
            </header>

            <main className="px-6 pt-8">
                <h1 className="text-2xl font-bold text-slate-900">Halo, Guru 👋</h1>
                <p className="mt-1 text-sm text-slate-500">Jadwal Anda hari ini.</p>

                <div className="mt-8 space-y-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200">
                            <div className="flex justify-between items-start">
                                <span className="text-[10px] font-bold uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">Aktif</span>
                                <span className="text-[11px] font-bold text-slate-400 text-right">08:00 - 09:30</span>
                            </div>
                            <h3 className="mt-3 font-bold text-slate-800 text-lg">Matematika - XII IPA 1</h3>
                            <p className="text-sm text-slate-500 mt-1">32 Siswa • Ruang 102</p>
                            <button className="mt-4 w-full rounded-xl bg-emerald-600 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-100 italic active:scale-95 transition-transform">
                                Input Presensi
                            </button>
                        </div>
                    ))}
                </div>
            </main>

            <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-slate-100 bg-white py-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                {['Home', 'Jadwal', 'Nilai', 'Akun'].map((nav, i) => (
                    <button key={nav} className={`flex flex-col items-center gap-1 ${i === 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                        <div className="h-5 w-5 rounded-md bg-current opacity-20" />
                        <span className="text-[10px] font-bold">{nav}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
