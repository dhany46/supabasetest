import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../services/supabase';

const inputBase =
    'w-full rounded-xl border border-[#ececf5] bg-white px-4 py-3 text-[15px] text-slate-800 placeholder:text-slate-400 shadow-sm focus:border-[#8fa7ff] focus:outline-none focus:ring-2 focus:ring-[#c5d1ff]';

export default function LoginFormMobile() {
    const [role, setRole] = useState('admin');
    const [identifier, setIdentifier] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        setIsLoading(true);
        setErrorMsg('');

        try {
            if (!identifier) {
                throw new Error(role === 'siswa' ? 'NIS wajib diisi' : 'Email wajib diisi');
            }

            const isSiswa = role === 'siswa';
            const column = isSiswa ? 'nis' : 'email';

            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('id, role')
                .eq(column, identifier)
                .eq('role', role)
                .single();

            if (profileError || !profile) {
                throw new Error(`${isSiswa ? 'NIS' : 'Email'} tidak ditemukan atau Anda bukan ${role}`);
            }

            navigate(`/dashboard/${role}`);
        } catch (err) {
            setErrorMsg(err.message || 'Login gagal.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-b from-[#f4e1cb] via-[#f6eadf] to-[#d8c7ff] px-5 py-10">
            <div className="pointer-events-none absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-white/50 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 translate-x-1/4 translate-y-1/4 rounded-full bg-[#b9a9ff]/40 blur-3xl" />

            <div className="relative mx-auto w-full max-w-[360px]">
                <div className="rounded-[26px] bg-white/90 p-6 shadow-[0_20px_50px_rgba(70,60,140,0.2)] backdrop-blur">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900">Login</h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Masuk ke akun Anda untuk melanjutkan
                        </p>
                    </div>

                    <div className="mt-6 space-y-4">
                        {errorMsg && (
                            <div className="rounded-lg bg-red-50 p-3 text-xs font-semibold text-red-600 text-center">
                                {errorMsg}
                            </div>
                        )}
                        <div className="space-y-1.5">
                            <label htmlFor="role-select-mobile" className="ml-1 text-sm font-semibold text-slate-700">
                                Role
                            </label>
                            <div className="relative">
                                <select
                                    id="role-select-mobile"
                                    className={`${inputBase} appearance-none cursor-pointer`}
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="guru">Guru</option>
                                    <option value="siswa">Siswa</option>
                                </select>
                                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label htmlFor="login-id-mobile" className="ml-1 text-sm font-semibold text-slate-700">
                                {role === 'siswa' ? 'NIS' : 'Email'}
                            </label>
                            <input
                                id="login-id-mobile"
                                className={inputBase}
                                type={role === 'siswa' ? 'text' : 'email'}
                                inputMode={role === 'siswa' ? 'numeric' : 'email'}
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                            />
                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={handleLogin}
                        disabled={isLoading}
                        className="mt-5 w-full rounded-xl bg-gradient-to-r from-[#2f6bff] via-[#2e64ef] to-[#2656d0] py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(40,86,208,0.35)] active:scale-[0.98] transition-all disabled:opacity-50"
                    >
                        {isLoading ? 'Memproses...' : 'Login'}
                    </button>

                    <p className="mt-4 text-center text-sm text-slate-500">
                        Belum punya akun?{' '}
                        <a className="font-semibold text-[#2f6bff]" href="#">
                            Daftar
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}
