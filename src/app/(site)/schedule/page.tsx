import Sidebar from "@/components/ui/sidebar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Icon } from "@iconify/react/dist/iconify.js";

interface ISchedule {
    Day: string;
    Activity: string;
    Name: string;
    Time: string;
}

const scheduleData: ISchedule[] = [
    {
        Day: "Sunday",
        Activity: "Throw garbage",
        Name: "zovan rizza",
        Time: "6.00 Am",
    },
    {
        Day: "Monday",
        Activity: "Throw garbage",
        Name: "Deris Firmansyah",
        Time: "6.00 Am",
    },
    {
        Day: "Tuesday",
        Activity: "Throw garbage",
        Name: "Vicar al faruq",
        Time: "6.00 Am",
    },
    {
        Day: "Wednesday",
        Activity: "Throw garbage",
        Name: "Sapto Gusty",
        Time: "6.99 Am",
    },
    {
        Day: "Thursday",
        Activity: "Throw garbage",
        Name: "Mahdana",
        Time: "7.89 Am",
    },
    {
        Day: "Friday",
        Activity: "Throw garbage",
        Name: "Oza",
        Time: "1.33 Am",
    },
    {
        Day: "Saturday",
        Activity: "Throw garbage",
        Name: "Raga Adam",
        Time: "9.99 Am",
    },
];
const Schedule = () => {
    const headers = Object.keys(scheduleData[0]);
    return (
        <div className="flex">
            <Sidebar />
            <div className="w-full px-4 py-6 flex flex-col items-center text-center font-medium">
                <div>
                    <h1 className="font-semibold text-2xl mb-6">Schedule</h1>
                </div>
                <div className="w-full lg:w-[1125px] h-[480px] rounded-2xl">
                    <div className="w-full overflow-x-auto rounded-xl shadow-md border border-gray-200">
                        <Table className="min-w-[700px] text-sm">
                            <TableHeader className="bg-[rgb(202,202,202)] text-black">
                                <TableRow>
                                    <TableHead className="w-[50px] text-center">No</TableHead>
                                    {headers.map((header, index) => (
                                        <TableHead key={index} className="text-center">
                                            {header}
                                        </TableHead>
                                    ))}
                                    <TableHead className="w-[100px] text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody className="bg-[rgb(241,241,241)]">
                                {scheduleData.map((row: ISchedule, index: number) => (
                                    <TableRow key={index} className="border-t border-gray-200">
                                        <TableCell className="text-center">{index + 1}</TableCell>
                                        {headers.map((col, colIndex) => (
                                            <TableCell key={colIndex} className="text-center">
                                                {row[col as keyof ISchedule]}
                                            </TableCell>
                                        ))}
                                        <TableCell>
                                            <div className="flex justify-center gap-2">
                                                <Icon icon="mdi:pencil-outline" className="text-[rgb(29,98,227)] w-4 h-4 hover:cursor-pointer" />
                                                <Icon icon="gg:trash" className="text-[rgb(231,15,15)] w-4 h-4 hover:cursor-pointer" />
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
    );
};

export default Schedule;
