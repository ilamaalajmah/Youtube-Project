import React, { useState } from 'react';
import { Shell } from './components/shell';
import { login } from './api/auth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await login(username, password);
            if (user) {
                navigate('/');
            } else {
                setError('اسم المستخدم أو كلمة المرور غير صحيحة');
            }
        } catch (err) {
            setError('حدث خطأ أثناء تسجيل الدخول');
        }
    };

    return (
        <Shell showSidebar={false}>
            <div className="flex items-center justify-center font-[Roboto] flex-1">
                <div className="px-12 py-6 mt-4 text-right bg-white/5 shadow-lg rounded-lg flex flex-col" style={{ width: '500px' }}>
                    <h3 className="text-2xl font-bold text-center">تسجيل الدخول</h3>
                    <form onSubmit={handleSubmit} className="contents">
                        <div className="mt-4 flex flex-col">
                            <div>
                                <label className="block" htmlFor="username">اسم المستخدم</label>
                                <input
                                    type="text"
                                    placeholder="اسم المستخدم"
                                    id="username"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white/10"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mt-4">
                                <label className="block" htmlFor="password">كلمة المرور</label>
                                <input
                                    type="password"
                                    placeholder="كلمة المرور"
                                    id="password"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white/10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button className="px-6 w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" type="submit">تسجيل الدخول</button>
                            <div className="flex flex-row items-center">
                                <span className="flex-1 border-t border-gray-300"></span>
                                <span className="text-gray-300 px-4">أو</span>
                                <span className="flex-1 border-t border-gray-300"></span>
                            </div>
                            <a href="/register" className="w-full mx-auto text-blue-500 rounded-lg text-center">إنشاء حساب</a>
                        </div>
                    </form>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            </div>
        </Shell>
    );
}
