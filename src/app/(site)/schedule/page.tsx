"use client";

import Delete from "@/components/ui/delete";
import ScheduleForm from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ISchedule } from "@/utils/types/Types";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";

const headers = [
    { key: "day", label: "Day" },
    { key: "action", label: "Activity" },
    { key: "name", label: "Name" },
    { key: "time", label: "Time" },
];

const Schedule = () => {
    const [isSchedule, setIsSchedule] = useState<ISchedule[]>([]);
    const [open, setOpen] = useState<boolean>(false);
    const [isUpdate, setIsUpdate] = useState<boolean>(false);
    const [isDelete, setIsDelete] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const fetchData = async () => {
        try {
            const res = await fetch("/api/schedule");
            if (!res.ok) throw new Error("Failed to fetch schedule");
            const data = await res.json();
            setIsSchedule(data);
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <div>
                <div className="w-full px-5 py-18 flex flex-col font-medium">
                    <div className="justify-between flex px-0 xl:px-6 lg:px-6 mb-3">
                        <h1 className="font-semibold text-2xl mb-6">Schedule</h1>
                        <Icon
                            icon="basil:add-outline"
                            className="w-10 h-10 hover:cursor-pointer"
                            onClick={() => {
                                setOpen(true);
                            }}
                            />
                        <ScheduleForm open={open} setOpen={setOpen} onSuccess={fetchData} />
                    </div>
                    <div className="w-full h-full rounded-2xl px-0 lg:px-6 xl:px-6">
                        <div className="w-full h-[482px] overflow-x-auto rounded-xl shadow-md border border-gray-200">
                            <Table className="min-w-[700px] h-[480px] text-sm overflow-x-auto">
                                <TableHeader className="bg-[rgb(202,202,202)] text-black">
                                    <TableRow>
                                        <TableHead className="w-[50px] text-center">No</TableHead>
                                        {headers.map(({ label }, index) => (
                                            <TableHead key={index} className="text-center">
                                                {label}
                                            </TableHead>
                                        ))}
                                        <TableHead className="w-[100px] text-center">Action</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody className="bg-[rgb(241,241,241)]">
                                    {isSchedule.map((row, index) => (
                                        <TableRow key={index} className="border-t border-gray-200">
                                            <TableCell className="text-center">{index + 1}</TableCell>
                                            {headers.map(({ key }) => (
                                                <TableCell key={key} className="text-center">
                                                    {row[key as keyof typeof row] ?? "-"}
                                                </TableCell>
                                            ))}
                                            <TableCell className="text-center">
                                                <div className="flex justify-center gap-2">
                                                    <Icon
                                                        icon="mdi:pencil-outline"
                                                        className="text-[rgb(29,98,227)] w-4 h-4 hover:cursor-pointer"
                                                        onClick={() => {
                                                            setSelectedId(row.id);
                                                            setIsUpdate(true);
                                                        }}
                                                        />
                                                    <Icon
                                                        icon="gg:trash"
                                                        className="text-[rgb(231,15,15)] w-4 h-4 hover:cursor-pointer"
                                                        onClick={() => {
                                                            setIsDelete(true);
                                                            setSelectedId(row.id);
                                                        }}
                                                        />
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            {selectedId !== null && <ScheduleForm open={isUpdate} setOpen={setIsUpdate} onSuccess={fetchData} id={selectedId} />}
            {selectedId !== null && <Delete Delete={isDelete} setDelete={setIsDelete} id={selectedId} onSucces={fetchData} />}
        </>
    );
};

export default Schedule;
