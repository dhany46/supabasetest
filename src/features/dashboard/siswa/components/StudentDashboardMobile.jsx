import { useNavigate } from 'react-router-dom';

export default function StudentDashboardMobile() {
    const navigate = useNavigate();
    const handleLogout = () => navigate('/login');

    return (
        <div className="min-h-screen bg-[#f8fafc] pb-24">
            <header className="flex items-center justify-between bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-orange-500" />
                    <span className="font-bold tracking-tight text-slate-800">SiswaLink</span>
                </div>
                <button
                    onClick={handleLogout}
                    className="h-9 px-4 rounded-lg bg-red-50 text-red-600 text-[11px] font-bold uppercase tracking-wider active:scale-95 transition-transform"
                >
                    Logout
                </button>
            </header>

            <main className="px-6 pt-8">
                <h1 className="text-2xl font-bold text-slate-900">Halo, Siswa 👋</h1>
                <p className="mt-1 text-sm text-slate-500">Ada 2 tugas menunggu!</p>

                <div className="mt-8 space-y-4">
                    <div className="rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 p-5 text-white shadow-lg shadow-orange-100">
                        <p className="text-[11px] font-bold uppercase tracking-wider opacity-70">Progres Minggu Ini</p>
                        <h3 className="mt-1 text-2xl font-bold">85%</h3>
                        <div className="mt-3 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                            <div className="h-full bg-white w-[85%]" />
                        </div>
                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-200">
                        <h4 className="font-bold text-slate-800">Tugas Matematika</h4>
                        <p className="text-xs text-slate-400 mt-1">Deadline: Besok, 23:59</p>
                        <button className="mt-4 w-full rounded-xl bg-orange-500 py-3 text-sm font-bold text-white shadow-lg shadow-orange-50 active:scale-95 transition-transform">
                            Kerjakan Sekarang
                        </button>
                    </div>
                </div>
            </main>

            <nav className="fixed bottom-0 left-0 right-0 flex items-center justify-around border-t border-slate-100 bg-white py-4 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                {['Home', 'Tugas', 'Nilai', 'Akun'].map((nav, i) => (
                    <button key={nav} className={`flex flex-col items-center gap-1 ${i === 0 ? 'text-orange-500' : 'text-slate-400'}`}>
                        <div className="h-5 w-5 rounded-md bg-current opacity-20" />
                        <span className="text-[10px] font-bold">{nav}</span>
                    </button>
                ))}
            </nav>
        </div>
    );
}
