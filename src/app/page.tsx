"use client";

import Logo from "@/components/image/Logo.png";
import Image from "next/image";
import { KoHo } from "next/font/google";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const koho = KoHo({
    subsets: ["latin"],
    weight: ["400"],
});

export default function Home() {
    const router = useRouter();
    const [showEnterance, setShowEnterance] = useState(true);
    const [isFade, setIsFade] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);

    const pages = [
        {
            title: "Open trash can with sensor",
            description: "we can open the trash can if someone approaches the sensor",
        },
        {
            title: "Monitoring trash bin capacity",
            description: "capacity monitoring that we can do through this website",
        },
        {
            title: "Determining the schedule for garbage disposal",
            description: "creating a waste disposal schedule when the waste has reached the maximum limit ",
        },
        {
            title: "Please install telegram ",
            description: "Please install telegram for monitoring notification from your garbage",
        },
    ];

    const handleNext = () => {
        if (currentPage === pages.length - 1) {
            router.push("/"); //belum ditentuin mau kemana (belum ada routesnya)
        }
        setIsFade(false);
        setTimeout(() => {
            setCurrentPage((prev) => (prev + 1) % pages.length);
            setIsFade(true);
        }, 300);
    };

    useEffect(() => {
        const setTime = setTimeout(() => {
            setShowEnterance(false);
        }, 3000);

        const delay = setTimeout(() => {
            setIsFade(true);
        }, 2500);

        return () => {
            clearTimeout(setTime);
            clearTimeout(delay);
        };
    }, []);

    return (
        <>
            {showEnterance ? (
                <div
                    className={`absolute inset-0 z-10 flex items-center bg-background justify-center transition-opacity duration-1000 ease-in-out ${
                        isFade ? "opacity-0" : "opacity-100"
                    }`}
                >
                    <div className="flex flex-row justify-center items-center">
                        <Image src={Logo} alt="Logo" />
                        <h1 className={`${koho.className} text-6xl pl-2.5`}>EcoTrack</h1>
                    </div>
                </div>
            ) : (
                !showEnterance && (
                    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-background">
                        <div className="flex-grow flex flex-col items-center justify-center">
                            <div className={`container mx-auto transition-opacity duration-1000 ease-in-out ${isFade ? "opacity-100" : "opacity-0"}`}>
                                <div className="flex flex-row justify-center items-center">
                                    <Image src={Logo} alt="Logo" />
                                    <h1 className={`${koho.className} text-6xl pl-2.5`}>EcoTrack</h1>
                                </div>
                                <div className="mt-6 text-center">
                                    <p className="font-bold text-xl pb-2.5">{pages[currentPage].title}</p>
                                    <p className="text-sidebar-ring font-light text-2xl">{pages[currentPage].description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-auto mb-6 w-full relative flex justify-center items-center">
                            <div className="flex space-x-2">
                                {pages.map((_, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setIsFade(false);
                                            setTimeout(() => {
                                                setCurrentPage(index);
                                                setIsFade(true);
                                            }, 100);
                                        }}
                                        className={`w-20 h-4 rounded hover:cursor-pointer ${index === currentPage ? "bg-black" : "bg-zinc-200"}`}
                                    />
                                ))}
                            </div>
                            <Button className="absolute right-4 mr-4 bg-zinc-200 text-black hover:bg-white hover:cursor-pointer w-24 h-10" onClick={handleNext}>
                                {currentPage === pages.length - 1 ? "Start" : "Next"}
                            </Button>
                        </div>
                    </div>
                )
            )}
        </>
    );
}
