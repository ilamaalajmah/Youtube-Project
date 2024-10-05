import { useSidebarOpen } from "../stores/sidebar-open";
import { Navbar, } from "./navbar";
import { Sidebar, FloatingSidebar } from "./sidebar";

export function Shell({ children, showSidebar = true }) {
    return (
        <div className="min-h-screen max-h-screen overflow-hidden flex flex-col bg-[var(--youtube-bg)] text-white font-[Roboto] relative" dir="rtl">
            <FloatingSidebar />
            <Navbar />
            <div className="flex flex-row overflow-hidden flex-1">
                {showSidebar && <Sidebar />}
                <div className="flex-1 flex flex-col overflow-y-auto nice-scrollbar">
                    {children}
                </div>
            </div>
        </div>
    );
}
