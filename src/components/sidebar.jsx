/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home, Compass,
    Clock, ThumbsUp,
    PlaySquare, Film,
    BookOpen, User,
    UserCircle, Music,
    Radio, Aperture, Gamepad,
    Settings,
    Flag,
    HelpCircle,
    MessageCircleWarning,
    Bell,
    Brain
} from 'lucide-react';
import { useSidebarOpen } from '../stores/sidebar-open';
import { SidebarButton, YoutubeIcon } from './navbar';

function MenuItem({ Icon, text }) {
    return (
        <a href="#" className="flex items-center text-[14px] p-2 rounded-lg hover:bg-gray-800/40">
            <Icon className="h-5 w-5 me-4" />
            <span>{text}</span>
        </a>
    );
}

export function Sidebar() {
    const isSidebarOpen = useSidebarOpen(state => state.isOpen);

    if (isSidebarOpen) {
        return (
            <div className="text-white min-h-screen w-64 p-2 flex-col border-e border-gray-700 hidden md:flex">
                <SidebarSegment>
                    <MenuItem Icon={Home} text="الرئيسية" />
                    <MenuItem Icon={Compass} text="الاشتراكات" />
                </SidebarSegment>
                <hr className="my-2" />

                <SidebarSegment>
                    <MenuItem Icon={User} text="أنت" />
                    <MenuItem Icon={Clock} text="السّجل" />
                </SidebarSegment>
                <hr className="my-2" />
                <div className="text-sm px-8">
                    يمكنك تسجيل الدخول لإبداء إعجابك بالفيديوهات والتعليق عليها والاشتراك في القنوات.
                    <a href="/login" className="flex items-center p-2 hover:bg-blue-400/10 gap-2 text-blue-500 border border-gray-800 rounded-full w-fit mt-2">
                        <UserCircle />
                        تسجيل الدخول</a>
                </div>
                <hr className="my-2" />
                <SidebarSegment>
                    استكشاف
                    <MenuItem Icon={PlaySquare} text="المحتوى الرائج" />
                    <MenuItem Icon={Music} text="أناشيد" />
                    <MenuItem Icon={Radio} text="بث مباشر" />
                    <MenuItem Icon={Gamepad} text="ألعاب فيديو" />
                    <MenuItem Icon={Aperture} text="رياضة" />
                </SidebarSegment>
                <hr className="my-2" />
                <SidebarSegment>
                    <MenuItem Icon={Settings} text="الإعدادات" />
                    <MenuItem Icon={Flag} text="سجل الإبلاغ عن المحتوى" />
                    <MenuItem Icon={HelpCircle} text="مساعدة" />
                    <MenuItem Icon={MessageCircleWarning} text="إرسال ملاحظات" />
                </SidebarSegment>
            </div>
        )
    };

    return (
        <div className="text-white min-h-screen w-20 p-2 flex-col border-e border-gray-700 hidden md:flex">
            <MenuItemClosed Icon={Home} text="الرئيسية" />
            <MenuItemClosed Icon={Brain} text="القصيرة" />
            <MenuItemClosed Icon={Bell} text="الاشتراكات" />
            <MenuItemClosed Icon={User} text="مقاطعك" />
        </div>
    );
}

function MenuItemClosed({ Icon, text }) {
    return (
        <button className="flex flex-col items-center text-[14px] p-2 hover:bg-gray-800/40 rounded-lg">
            <Icon className="h-5 w-5 mb-1" />
            <span>{text}</span>
        </button>
    );
}

export function SidebarSegment({ children }) {
    return (
        <div className="px-4">
            {children}
        </div>
    );
}

export function FloatingSidebar() {
    const isOpen = useSidebarOpen(state => state.isOpen);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        setIsAnimating(true);
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed nice-scrollbar md:hidden top-0 right-0 w-64 h-full bg-[var(--youtube-bg)] z-50 overflow-y-auto"
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    onAnimationComplete={() => setIsAnimating(false)}
                >
                    <div className="text-white min-h-screen w-full p-2 flex-col border-e border-gray-700">
                        <div className="flex flex-row items-center gap-4 flex-shrink-0">
                            <SidebarButton />
                            <YoutubeIcon />
                        </div>
                        <SidebarSegment>
                            <MenuItem Icon={Home} text="الرئيسية" />
                            <MenuItem Icon={Compass} text="الاشتراكات" />
                        </SidebarSegment>
                        <hr className="my-2" />
                        <SidebarSegment>
                            <MenuItem Icon={User} text="أنت" />
                            <MenuItem Icon={Clock} text="السّجل" />
                        </SidebarSegment>
                        <hr className="my-2" />
                        <div className="text-sm px-8">
                            يمكنك تسجيل الدخول لإبداء إعجابك بالفيديوهات والتعليق عليها والاشتراك في القنوات.
                            <a href="/login" className="flex items-center p-2 hover:bg-blue-400/10 gap-2 text-blue-500 border border-gray-800 rounded-full w-fit mt-2">
                                <UserCircle />
                                تسجيل الدخول</a>
                        </div>
                        <hr className="my-2" />
                        <SidebarSegment>
                            استكشاف
                            <MenuItem Icon={PlaySquare} text="المحتوى الرائج" />
                            <MenuItem Icon={Music} text="أناشيد" />
                            <MenuItem Icon={Radio} text="بث مباشر" />
                            <MenuItem Icon={Gamepad} text="ألعاب فيديو" />
                            <MenuItem Icon={Aperture} text="رياضة" />
                        </SidebarSegment>
                        <hr className="my-2" />
                        <SidebarSegment>
                            <MenuItem Icon={Settings} text="الإعدادات" />
                            <MenuItem Icon={Flag} text="سجل الإبلاغ عن المحتوى" />
                            <MenuItem Icon={HelpCircle} text="مساعدة" />
                            <MenuItem Icon={MessageCircleWarning} text="إرسال ملاحظات" />
                        </SidebarSegment>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
