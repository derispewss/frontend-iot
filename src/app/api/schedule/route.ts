import { NextRequest, NextResponse } from "next/server";
const filePath = path.join(process.cwd(), "src/database/schedules.json");
import fs from "fs";
import path from "path";

const readData = () => {
    try {
        const data = fs.readFileSync(filePath, "utf8");
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
        return [];
    }
};

const writeData = (data: []) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

export async function GET(req: NextRequest) {
    const day = req.nextUrl.searchParams.get("day");
    const jsonData = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(jsonData);
    const filteredData = day ? data.filter((item: { day: string }) => item.day.toLowerCase() === day.toLowerCase()) : data;
    return NextResponse.json(filteredData);
}

export async function POST(req: Request) {
    const newSchedule = await req.json();
    const schedules = readData();

    const newId = schedules.length > 0 ? schedules[schedules.length - 1].id + 1 : 1;
    const newEntry = { id: newId, ...newSchedule };

    schedules.push(newEntry);
    writeData(schedules);

    return NextResponse.json(newEntry, { status: 201 });
}
