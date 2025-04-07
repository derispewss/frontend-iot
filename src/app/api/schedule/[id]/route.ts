import { NextRequest, NextResponse } from "next/server";
import { ISchedule } from "@/utils/types/Types";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "src/database/schedules.json");

export async function GET(req: NextRequest, { params }: { params?: { id?: string } }) {
    try {
      if (!fs.existsSync(filePath)) {
        return NextResponse.json({ error: "Schedule data file not found" }, { status: 404 });
      }
  
      const jsonData = fs.readFileSync(filePath, "utf-8");
      const allSchedules: ISchedule[] = JSON.parse(jsonData);
      const day = req.nextUrl.searchParams.get("day");
  
      if (params?.id) {
        const id = parseInt(params.id);
        if (isNaN(id)) {
          return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
        }
        const schedule = allSchedules.find(item => item.id === id);
        if (!schedule) {
          return NextResponse.json({ error: "Schedule not found" }, { status: 404 });
        }
        return NextResponse.json(schedule);
      }
  
      if (day) {
        const filteredSchedules = allSchedules.filter(item => item.day.toLowerCase() === day.toLowerCase());
        return NextResponse.json(filteredSchedules);
      }
  
      return NextResponse.json(allSchedules);
    } catch (error) {
      console.error("Error processing schedule data:", error);
      return NextResponse.json({ error: "Failed to process schedule data" }, { status: 500 });
    }
  }
  

export async function PUT(req: Request, { params }: { params: { id: string } }) {
    const id = parseInt(params.id);
    const body = await req.json();
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    const index = data.findIndex((item: ISchedule) => item.id === id);
    if (index === -1) return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });

    data[index] = { ...data[index], ...body };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json(data[index], { status: 200 });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    try {
        const id = parseInt(params.id);
        const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));

        const newData = data.filter((item: ISchedule) => item.id !== id);
        fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));

        return NextResponse.json({ success: true, message: "succesfully deleted" });
    } catch (error) {
        console.log(error);
    }
}
