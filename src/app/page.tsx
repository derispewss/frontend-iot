"use client";

import Logo from "@/assets/image/Logo.png";
import Image from "next/image";
import { KoHo } from "next/font/google";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const koho = KoHo({
    subsets: ["latin"],
    weight: ["400"],
});

export default function Home() {
    const router = useRouter();
    const [showEnterance, setShowEnterance] = useState<boolean>(true);
    const [isFade, setIsFade] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const pages = useRef([
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
    ]);

    const handleNext = () => {
        if (currentPage < pages.current.length - 1) {
            setIsFade(false);
            setTimeout(() => {
                setCurrentPage(currentPage + 1);
                setIsFade(true);
            }, 100);
        } else {
            localStorage.setItem("visited", "true");
            router.push("/dashboard");
        }
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

    useEffect(() => {
        const hasVisited = localStorage.getItem("visited");
        if (hasVisited) {
            setCurrentPage(pages.current.length - 1);
            setShowEnterance(false);
            setIsFade(true);
        }
    }, [pages]);

    return (
        <>
            {showEnterance ? (
                <div
                    className={`absolute inset-0 z-10 flex items-center bg-background justify-center transition-opacity duration-1000 ease-in-out ${
                        isFade ? "opacity-0" : "opacity-100"
                    }`}
                >
                    <div className="flex flex-row justify-center items-center flex-wrap px-4">
                        <Image src={Logo} alt="Logo" className=" lg:w-auto lg:h-auto" />
                        <h1 className={`${koho.className} text-4xl sm:text-5xl md:text-6xl pl-2.5`}>EcoTrack</h1>
                    </div>
                </div>
            ) : (
                !showEnterance && (
                    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-background">
                        <div className="flex-grow flex flex-col items-center justify-center w-full">
                            <div className={`w-full max-w-4xl mx-auto transition-opacity duration-1000 ease-in-out ${isFade ? "opacity-100" : "opacity-0"}`}>
                                <div className="flex flex-row justify-center items-center flex-wrap px-4 text-center sm:text-left">
                                    <Image src={Logo} alt="Logo" className="lg:w-auto lg:h-auto" />
                                    <h1 className={`${koho.className} text-4xl sm:text-5xl md:text-6xl pl-2.5`}>EcoTrack</h1>
                                </div>
                                <div className="mt-6 text-center px-2 sm:px-6">
                                    <p className="font-bold text-lg sm:text-xl md:text-2xl pb-2.5">{pages.current[currentPage].title}</p>
                                    <p className="text-sidebar-ring font-light text-base sm:text-lg md:text-2xl">{pages.current[currentPage].description}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-auto mb-14 w-full relative flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
                            <div className="flex space-x-2">
                                {pages.current.map((_, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setIsFade(false);
                                            setTimeout(() => {
                                                setCurrentPage(index);
                                                setIsFade(true);
                                            }, 100);
                                        }}
                                        className={`w-12 h-4 rounded hover:cursor-pointer ${index === currentPage ? "bg-black" : "bg-zinc-200"}`}
                                    />
                                ))}
                            </div>
                            <Button className="bg-zinc-200 text-black hover:bg-white hover:cursor-pointer w-24 h-10 sm:absolute sm:right-4" onClick={handleNext}>
                                {currentPage === pages.current.length - 1 ? "Start" : "Next"}
                            </Button>
                        </div>
                    </div>
                )
            )}
        </>
    );
}
