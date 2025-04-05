import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "src/database/schedules.json");

interface ScheduleItem {
    id: number;
    name: string;
    action: string;
    day: string;
    time: string;
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json();
    const id = parseInt(params.id);
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const index = data.findIndex((item: ScheduleItem) => item.id === id);
    if (index === -1) return NextResponse.json({ message: "Not found" }, { status: 404 });

    data[index] = { ...data[index], ...body };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json(data[index], { status: 200 });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        const newData = data.filter((item: ScheduleItem) => item.id !== id);
        fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

        return NextResponse.json({ message: "Deleted", status: 200 });
    } catch (error) {
        console.log(error);
    }
}
