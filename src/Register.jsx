import React, { useState } from 'react';
import { Shell } from './components/shell';
import { register } from './api/auth';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, password, avatar);
            navigate('/');
        } catch (err) {
            console.log(err.message);
            if (err.message === 'USERNAME_ALREADY_EXISTS') {
                setError('اسم المستخدم مستخدم من قبل');
            } else {
                setError('حدث خطأ أثناء التسجيل');
            }
        }
    };

    return (
        <Shell showSidebar={false}>
            <div className="flex items-center justify-center font-[Roboto] flex-1">
                <div className="px-12 py-6 mt-4 text-right bg-white/5 shadow-lg rounded-lg flex flex-col" style={{ width: '500px' }}>
                    <h3 className="text-2xl font-bold text-center">إنشاء حساب جديد</h3>
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
                            <div className="mt-4">
                                <label className="block" htmlFor="avatar">رابط الصورة الرمزية</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/avatar.jpg"
                                    id="avatar"
                                    className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 bg-white/10"
                                    value={avatar}
                                    onChange={(e) => setAvatar(e.target.value)}
                                    required
                                />
                            </div>
                            {avatar && (
                                <div className="mt-4 flex justify-center">
                                    <img src={avatar} alt="Avatar preview" className="w-20 h-20 rounded-full object-cover" />
                                </div>
                            )}
                            <button className="px-6 w-full py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900" type="submit">تسجيل</button>
                            <div className="flex flex-row items-center mt-4">
                                <span className="flex-1 border-t border-gray-300"></span>
                                <span className="text-gray-300 px-4">أو</span>
                                <span className="flex-1 border-t border-gray-300"></span>
                            </div>
                            <a href="/login" className="w-full mx-auto text-blue-500 rounded-lg text-center mt-4">تسجيل الدخول</a>
                        </div>
                    </form>
                    {error && <p className="text-red-500 mt-4">{error}</p>}
                </div>
            </div>
        </Shell>
    );
}
