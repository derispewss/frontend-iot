"use client";

import Sidebar from "@/components/ui/sidebar";
import Image, { StaticImageData } from "next/image";
import Evening from "@/components/image/bgEvening.webp";
import Morning from "@/components/image/bgMorning.webp";
import Afternoon from "@/components/image/bgAfternoon.webp";
import Night from "@/components/image/bgEvening.webp";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const Dashboard = () => {
    const [isGreeting, setIsGreeting] = useState<string>("");
    const [isImage, setIsImage] = useState<StaticImageData>(Morning);
    const [isStatus, setIsStatus] = useState<boolean>(false);
    const [isCapacity] = useState<number>(10); //masih set manual gatau mau di gimanain
    const [isColor, setIsColor] = useState<string>("");
    const [isDay, setIsDay] = useState<string>(""); // sementara masih di gabung dengan useEffectnye greeting

    const handleStatus = () => {
        setIsStatus((prev) => !prev);
    };

    const namesByDay: { [key: string]: string } = {
        Sunday: "Zovan Rizza",
        Monday: "Sapto Gusty",
        Tuesday: "Deris F",
        Wednesday: "Dana",
        Thursday: "Adam Raga",
        Friday: "Vicar Al",
        Saturday: "Oza",
    };
    const getSchedule = namesByDay[isDay]; // MAAF MASIH BERANTAKAN AK NGAMBIL JADWAL DARI HARI AJAH. BINGUNG SOALNYA HEHE

    const getHour = () => {
        const hour = new Date().getHours();
        const time = hour < 12;
        const minute = new Date().getMinutes();
        const amPm = time ? "AM" : "PM";

        const timeString = `${hour}.${minute} ${amPm}`;
        return timeString;
    };

    useEffect(() => {
        if (isCapacity >= 0 && isCapacity <= 49) {
            setIsColor("rgb(141,232,116)");
        } else if (isCapacity >= 50 && isCapacity <= 84) {
            setIsColor("rgb(248,183,99)");
        } else if (isCapacity <= 100) {
            setIsColor("rgb(248,99,99)");
        }
    }, [isCapacity]);

    useEffect(() => {
        const updateGreeting = () => {
            const now = new Date();
            const hour = now.getHours();
            const day = now.getDay();

            if (hour >= 5 && hour < 12) {
                setIsGreeting("Good Morning");
                setIsImage(Morning);
            } else if (hour >= 12 && hour < 16) {
                setIsGreeting("Good Afternoon");
                setIsImage(Afternoon);
            } else if (hour >= 16 && hour < 19) {
                setIsGreeting("Good Evening");
                setIsImage(Evening);
            } else {
                setIsGreeting("Good Night");
                setIsImage(Night);
            }

            if (day === 0) {
                setIsDay("Sunday");
            } else if (day === 1) {
                setIsDay("Monday");
            } else if (day === 2) {
                setIsDay("Tuesday");
            } else if (day === 3) {
                setIsDay("Wednesday");
            } else if (day === 4) {
                setIsDay("Thursday");
            } else if (day === 5) {
                setIsDay("Friday");
            } else if (day === 6) {
                setIsDay("Saturday");
            }
        };

        updateGreeting();
        const interval = setInterval(updateGreeting, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-row">
            <Sidebar />
            <div className="mt-8 flex flex-col items-center justify-center w-full h-full gap-4">
                <div className="relative ">
                    <div className="relative z-10">
                        <Image src={isImage} alt="Evening" className="w-255 h-54 object-cover rounded-md shadow-[6px_6px_8px_rgba(0,0,0,0.9)]" />
                        <h2 className="absolute top-1/2 right-7 text-white text-2xl">Hi, {isGreeting}. How are you?</h2>
                    </div>
                </div>
                <div className="justify-between flex gap-13 mt-3">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-medium">Device Status</h1>
                        <div className="w-120 h-[240px] bg-[rgb(243,243,243)] text-ring flex items-center justify-center rounded-md border-black border-[3px] shadow-[6px_6px_8px_rgba(0,0,0,0.9)]">
                            {isStatus ? (
                                <div
                                    className="text-green-400 opacity-75 flex flex-row text-center justify-center items-center gap-4 text-3xl hover:cursor-pointer"
                                    onClick={handleStatus}
                                >
                                    <Icon icon="material-symbols:wifi-rounded" width="56" height="55" />
                                    <span>Connect</span>
                                </div>
                            ) : (
                                <Icon icon="material-symbols:wifi-rounded" width="56" height="55" onClick={handleStatus} className="hover:cursor-pointer" />
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-medium">Capacity</h1>
                        <div className="w-120 h-[240px] bg-[rgb(243,243,243)] flex items-end rounded-md border-black border-[3px] shadow-[6px_6px_8px_rgba(0,0,0,0.9)] overflow-hidden">
                            <div className="w-full rounded-md flex items-end justify-end px-3" style={{ height: `${isCapacity}%`, backgroundColor: isColor }}>
                                <span className="text-4xl font-medium pb-10 pr-6">{isCapacity}%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-medium">Schedule</h1>
                    <div className="w-[1008px] h-36 bg-[rgb(243,243,243)] rounded-md border-[3px] border-black shadow-[6px_6px_8px_rgba(0,0,0,0.9)] overflow-hidden flex">
                        <div className="w-1/6 flex items-center justify-center border-r-2 border-gray-300">
                            <span className="text-xl font-semibold text-gray-700">{isDay}</span>
                        </div>
                        <div className="w-5/6 flex justify-between items-center px-6">
                            <div className="flex flex-col gap-3">
                                <span className="text-xl font-medium">throw garbage</span>
                                <span className="text-lg font-semibold text-[rgb(156,87,87)]">{getSchedule}</span>
                            </div>
                            <span className="text-xl font-semibold text-black">{getHour()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
