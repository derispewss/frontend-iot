"use client";

import Sidebar from "@/components/ui/sidebar";
import Image, { StaticImageData } from "next/image";
import Evening from "@/assets/image/bgEvening.webp";
import Morning from "@/assets/image/bgMorning.webp";
import Afternoon from "@/assets/image/bgAfternoon.webp";
import Night from "@/assets/image/bgEvening.webp";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const Dashboard = () => {
    const [isGreeting, setIsGreeting] = useState<string>("");
    const [isImage, setIsImage] = useState<StaticImageData>(Morning);
    const [isStatus, setIsStatus] = useState<boolean>(true);
    const [isCapacity] = useState<number>(10); //masih set manual gatau mau di gimanain
    const [isColor, setIsColor] = useState<string>("");
    const [isDay, setIsDay] = useState<string>(""); // sementara masih di gabung dengan useEffectnye greeting
    const [getSchedule, setGetSchedule] = useState<string>("");

    const handleStatus = () => {
        setIsStatus((prev) => !prev);
    };

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
        const namesByDay: { [key: string]: string } = {
            Sunday: "Zovan Rizza",
            Monday: "Sapto Gusty",
            Tuesday: "Deris F",
            Wednesday: "Dana",
            Thursday: "Adam Raga",
            Friday: "Vicar Al",
            Saturday: "Oza",
        };
        setGetSchedule(namesByDay[isDay]);
    }, [isGreeting, isDay]);

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
        <div className="flex flex-col lg:flex-row min-h-screen overflow-y-auto">
            <Sidebar />
            <div className="mt-8 flex flex-col items-center justify-center w-full h-full gap-4 px-4">
                <div className="relative w-full max-w-5xl">
                    <div className="relative z-10 ">
                        <Image src={isImage} alt="Evening" className="w-full h-54 object-cover rounded-md shadow-[6px_6px_8px_rgba(0,0,0,0.9)]" />
                        <h2 className=" absolute w-max text-white text-lg md:text-xl lg:text-2xl right-1/2 lg:bottom-2 bottom-8 translate-x-1/2 md:top-2/3 md:right-8 md:translate-x-0 md:transform md:-translate-y-1/2">
                            Hi, {isGreeting}. How are you?
                        </h2>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between gap-6 mt-3 w-full max-w-5xl">
                    <div className="flex flex-col gap-2 w-full lg:w-1/2">
                        <h1 className="text-xl md:text-2xl font-medium">Device Status</h1>
                        <div className="w-full h-60 bg-[rgb(243,243,243)] text-ring flex items-center justify-center rounded-md border-black border-[3px] shadow-[6px_6px_8px_rgba(0,0,0,0.9)]">
                            {isStatus ? (
                                <div
                                    className="text-green-400 opacity-75 flex flex-row text-center justify-center items-center gap-4 text-2xl md:text-3xl hover:cursor-pointer"
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
                    <div className="flex flex-col gap-2 w-full lg:w-1/2">
                        <h1 className="text-xl md:text-2xl font-medium">Capacity</h1>
                        <div className="w-full h-60 bg-[rgb(243,243,243)] flex items-end rounded-md border-black border-[3px] shadow-[6px_6px_8px_rgba(0,0,0,0.9)] overflow-hidden">
                            <div className="w-full rounded-sm flex items-end justify-end px-3" style={{ height: `${isCapacity}%`, backgroundColor: isColor }}>
                                <span className="text-2xl md:text-4xl font-medium pb-10 pr-6">{isCapacity}%</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full max-w-5xl mt-1 ">
                    <h1 className="text-xl md:text-2xl font-medium">Schedule</h1>
                    <div className="w-full h-36 bg-[rgb(243,243,243)] rounded-md border-[3px] border-black shadow-[6px_6px_8px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col sm:flex-row">
                        <div className="sm:w-1/6 w-full sm:border-r-2 border-b-2 sm:border-b-0 border-gray-300 flex items-center justify-center">
                            <span className="text-lg md:text-xl font-semibold text-gray-700">{isDay}</span>
                        </div>
                        <div className="sm:w-5/6 w-full flex flex-col sm:flex-row justify-between items-center px-4 py-2 sm:py-0 sm:px-6">
                            <div className="flex flex-col gap-2 sm:gap-3 text-center sm:text-left">
                                <span className="text-lg md:text-xl font-medium">throw garbage</span>
                                <span className="text-md md:text-lg font-semibold text-[rgb(156,87,87)]">{getSchedule}</span>
                            </div>
                            <span className="text-lg md:text-xl font-semibold text-black">{getHour()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
