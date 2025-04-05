"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import toast from "react-hot-toast";

interface Iform {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSucces: () => void;
    id?: number;
}
interface IFormData {
    placeholder: string;
    type: string;
}

const days: string[] = ["sunday", "monday", "thuesday", "wednesday", "thursday", "friday", "saturday"];
const hour: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const minutes: string[] = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));

const formData: IFormData[] = [
    {
        placeholder: "Name",
        type: "text",
    },
    {
        placeholder: "Action",
        type: "text",
    },
    {
        placeholder: "Day",
        type: "select",
    },
];

const Form = ({ open, setOpen, onSucces, id }: Iform) => {
    const [formValues, setFormValues] = useState<{ [key: string]: string }>({});
    const [selectedHour, setSelectedHour] = useState<number>(0);
    const [selectedMinute, setSelectedMinute] = useState<string>("00");
    const [selectedPeriod, setSelectedPeriod] = useState<string>("AM");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        const newSchedule = {
            name: formValues["Name"],
            action: formValues["Action"],
            day: formValues["day"],
            time: `${selectedHour}:${selectedMinute} ${selectedPeriod}`,
        };

        const isEdit = !!id;
        const url = isEdit ? `/api/schedule/${id}` : "/api/schedule/";
        const method = isEdit ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newSchedule),
            });

            if (!res.ok) throw new Error(`${isEdit ? "Update" : "Create"} failed`);

            const data = await res.json();
            console.log(`${isEdit ? "Updated" : "Created"}:`, data);

            toast.success(isEdit ? "Update Successfully" : "Create Succesfully");

            onSucces();
            setOpen(false);
        } catch (error) {
            console.error("Error:", error);
            toast.error("error");
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-2xl p-6 rounded-lg">
                    <DialogTitle />
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <div className="flex flex-col gap-4">
                            {formData.map(
                                (field, index) =>
                                    field.type !== "select" && (
                                        <div key={index} className="flex flex-col">
                                            <input
                                                type={field.type}
                                                name={field.placeholder}
                                                placeholder={field.placeholder}
                                                className="w-full p-2 border rounded-md"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    )
                            )}

                            <div className="flex gap-4">
                                <div className="w-1/2 pr-3">
                                    <label htmlFor="day" className="block text-gray-700 mb-1">
                                        Day
                                    </label>
                                    <select id="day" name="day" required className="w-full p-2 border rounded-md" onChange={handleChange}>
                                        {days.map((day) => (
                                            <option key={day} value={day}>
                                                {day}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-1/2">
                                    <label htmlFor="time" className="block text-gray-700 mb-1">
                                        Time
                                    </label>
                                    <div className="flex items-center justify-center text-center gap-2">
                                        <select
                                            id="time-hour"
                                            className="p-2 border rounded-md bg-[rgb(217,217,217)]"
                                            value={selectedHour}
                                            onChange={(e) => setSelectedHour(parseInt(e.target.value))}
                                        >
                                            {hour.map((hour) => (
                                                <option key={hour} value={hour}>
                                                    {hour}
                                                </option>
                                            ))}
                                        </select>
                                        <span className="text-2xl">:</span>
                                        <select
                                            id="time-minute"
                                            className="p-2 border rounded-md w-16 bg-[rgb(217,217,217)]"
                                            value={selectedMinute}
                                            onChange={(e) => setSelectedMinute(e.target.value)}
                                        >
                                            {minutes.map((minute) => (
                                                <option key={minute} value={minute} className="hover:cursor-pointer">
                                                    {minute}
                                                </option>
                                            ))}
                                        </select>
                                        <select
                                            id="time-period"
                                            className="p-2 border rounded-md bg-[rgb(217,217,217)]"
                                            value={selectedPeriod}
                                            onChange={(e) => setSelectedPeriod(e.target.value)}
                                        >
                                            <option value="AM">AM</option>
                                            <option value="PM">PM</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end mt-4">
                                <button type="submit" className="bg-blue-500 text-white py-2 px-6 rounded-md text-center w-fit hover:cursor-pointer">
                                    Save
                                </button>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Form;
