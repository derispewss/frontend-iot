"use client";

import Logo from "@/assets/image/Logo.png";
import { KoHo } from "next/font/google";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const koho = KoHo({
    subsets: ["latin"],
    weight: ["400"],
});

const Sidebar = () => {
    const router = useRouter();
    const [isMobile, setIsMobile] = useState<boolean>(false);

    const handleResize = () => {
        setIsMobile(window.innerWidth <= 1024);
    };

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    });

    return (
        <aside>
            {isMobile ? (
                <div className="fixed bottom-0 left-0 w-full h-16 bg-muted-foreground text-white z-50 shadow-md px-6">
                    <nav className="flex justify-between items-center h-full w-full px-10">
                        <div className="flex flex-col items-center hover:cursor-pointer" onClick={() => router.push("/dashboard")}>
                            <Icon icon="akar-icons:dashboard" className="w-8 h-8" />
                            <span className="text-sm">Dashboard</span>
                        </div>
                        <div className="flex flex-col items-center hover:cursor-pointer" onClick={() => router.push("/schedule")}>
                            <Icon icon="uil:schedule" className="w-8 h-8" />
                            <span className="text-sm">Schedule</span>
                        </div>
                    </nav>
                </div>
            ) : (
                <>
                    <div className="bg-muted-foreground w-60 h-screen text-white p-4 flex flex-col items-center text-center ">
                        <div className="flex flex-row items-center mt-7 ">
                            <Image src={Logo} alt="Logo" className="w-8 " />
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
                    </div>
                </>
            )}
        </aside>
    );
};

export default Sidebar;
