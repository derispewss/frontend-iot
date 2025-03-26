"use client";

import Logo from "@/components/image/Logo.png";
import { KoHo } from "next/font/google";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

const koho = KoHo({
    subsets: ["latin"],
    weight: ["400"],
});

const Sidebar = () => {
    const router = useRouter();
    return (
        <aside className="w-60 h-screen bg-muted-foreground text-white p-4 flex flex-col items-center text-center">
            <div className="flex flex-row items-center mt-7">
                <Image src={Logo} alt="Logo" className="w-8" />
                <h1 className={`${koho.className} text-2xl pl-2.5`}>EcoTrack</h1>
            </div>
            <nav className="flex flex-col space-y-4 mt-16 gap-3.5">
                <div className="flex items-center hover:cursor-pointer" onClick={() => router.push("/dashboard")!}>
                    <Icon icon="akar-icons:dashboard" className="w-7 h-7 mr-2"></Icon>
                    <span className="text-xl">Dashboard</span>
                </div>
                <div className="flex items-center hover:cursor-pointer" onClick={() => router.push("/schedule")!}>
                    <Icon icon="uil:schedule" className="w-7 h-7 mr-2"></Icon>
                    <span className="text-xl"> Schedule</span>
                </div>
            </nav>
        </aside>
    );
};

export default Sidebar;
