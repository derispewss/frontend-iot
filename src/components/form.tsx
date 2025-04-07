"use client";
import { Dialog, DialogContent, DialogTitle, DialogHeader } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { IFormField, IScheduleData, IScheduleFormProps } from "@/utils/types/Types";
import { toast } from "sonner"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const HOURS = Array.from({ length: 12 }, (_, i) => i === 0 ? 12 : i);
const MINUTES = Array.from({ length: 60 }, (_, i) => String(i).padStart(2, "0"));
const PERIODS = ["AM", "PM"];

const ScheduleForm = ({ open, setOpen, onSuccess, id }: IScheduleFormProps) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({
        name: "",
        action: "",
        day: DAYS[0],
    });
    const [selectedHour, setSelectedHour] = useState<number>(12);
    const [selectedMinute, setSelectedMinute] = useState<string>("00");
    const [selectedPeriod, setSelectedPeriod] = useState<string>("AM");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const formFields: IFormField[] = [
        {
            name: "name",
            label: "Schedule Name",
            type: "text",
            required: true,
            validation: (value) => value.trim() ? null : "Schedule name is required"
        },
        {
            name: "action",
            label: "Activity",
            type: "text",
            required: true,
            validation: (value) => value.trim() ? null : "Action is required"
        },
        {
            name: "day",
            label: "Day of Week",
            type: "select",
            options: DAYS,
            required: true
        }
    ];

    useEffect(() => {
        const fetchExistingData = async () => {
            if (!id || !open) return;
            
            setIsLoading(true);
            try {
                const response = await fetch(`/api/schedule/${id}`);
                if (!response.ok) throw new Error("Failed to fetch schedule data");
                
                const data: IScheduleData = await response.json();
                const timeMatch = data.time.match(/(\d+):(\d+)\s+(AM|PM)/i);

                if (timeMatch) {
                    const [_, hour, minute, period] = timeMatch;
                    setSelectedHour(parseInt(hour) === 0 ? 12 : parseInt(hour));
                    setSelectedMinute(minute);
                    setSelectedPeriod(period.toUpperCase());
                }
                
                setFormData({
                    name: data.name || "",
                    action: data.action || "",
                    day: data.day || DAYS[0]
                });
            } catch (error) {
                console.error("Error fetching schedule:", error);
                toast.error("Failed to load schedule data");
            } finally {
                setIsLoading(false);
            }
        };
        
        fetchExistingData();
    }, [id, open]);
    
    const validateForm = (): boolean => {
        const newErrors: { [key: string]: string } = {};
        
        formFields.forEach(field => {
            if (field.required && field.validation) {
                const error = field.validation(formData[field.name] || "");
                if (error) newErrors[field.name] = error;
            }
        });
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        const scheduleData = {
            name: formData.name,
            action: formData.action,
            day: formData.day,
            time: `${selectedHour}:${selectedMinute} ${selectedPeriod}`,
        };

        const isEdit = !!id;
        const url = isEdit ? `/api/schedule/${id}` : "/api/schedule/";
        const method = isEdit ? "PUT" : "POST";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(scheduleData),
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => null);
                throw new Error(errorData?.message || `Failed to ${isEdit ? "update" : "create"} schedule`);
            }

            const data = await res.json();
            toast.success(isEdit ? "Schedule updated successfully" : "Schedule created successfully");

            onSuccess();
            setOpen(false);
        } catch (error) {
            console.error("Error:", error);
            toast.error(error instanceof Error ? error.message : "An unexpected error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setFormData({
            name: "",
            action: "",
            day: DAYS[0],
        });
        setSelectedHour(12);
        setSelectedMinute("00");
        setSelectedPeriod("AM");
        setErrors({});
    };

    useEffect(() => {
        if (!open) {
            setTimeout(resetForm, 300);
        }
    }, [open]);

    const dialogTitle = id ? "Edit Schedule" : "Create New Schedule";

    if (isLoading) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>{dialogTitle}</DialogTitle>
                    </DialogHeader>
                    <div className="flex items-center justify-center p-8">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Dialog open={open} onOpenChange={(newOpen) => {
            if (!isSubmitting) setOpen(newOpen);
        }}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{dialogTitle}</DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                    {formFields.map((field) => (
                        <div key={field.name} className="space-y-2">
                            <Label htmlFor={field.name} className="font-medium">
                                {field.label}
                                {field.required && <span className="text-red-500 ml-1">*</span>}
                            </Label>
                            
                            {field.type === "text" ? (
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    value={formData[field.name] || ""}
                                    onChange={(e) => handleChange(field.name, e.target.value)}
                                    placeholder={`Enter ${field.label.toLowerCase()}`}
                                    className={errors[field.name] ? "border-red-500" : ""}
                                    disabled={isSubmitting}
                                />
                            ) : field.type === "select" && field.options ? (
                                <Select 
                                    value={formData[field.name] || field.options[0]}
                                    onValueChange={(value) => handleChange(field.name, value)}
                                    disabled={isSubmitting}
                                >
                                    <SelectTrigger className={errors[field.name] ? "border-red-500" : ""}>
                                        <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {field.options.map((option) => (
                                            <SelectItem key={option} value={option}>
                                                {option}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            ) : null}
                            
                            {errors[field.name] && (
                                <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
                            )}
                        </div>
                    ))}

                    <div className="space-y-2">
                        <Label htmlFor="time" className="font-medium">
                            Time <span className="text-red-500">*</span>
                        </Label>
                        <div className="flex items-center space-x-2">
                            <Select 
                                value={String(selectedHour)}
                                onValueChange={(value) => setSelectedHour(parseInt(value))}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger className="w-24">
                                    <SelectValue placeholder="Hour" />
                                </SelectTrigger>
                                <SelectContent>
                                    {HOURS.map((hour) => (
                                        <SelectItem key={hour} value={String(hour)}>
                                            {hour}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <span className="text-xl font-medium">:</span>

                            <Select 
                                value={selectedMinute}
                                onValueChange={setSelectedMinute}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger className="w-24">
                                    <SelectValue placeholder="Min" />
                                </SelectTrigger>
                                <SelectContent className="h-64">
                                    {MINUTES.map((minute) => (
                                        <SelectItem key={minute} value={minute}>
                                            {minute}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Select 
                                value={selectedPeriod}
                                onValueChange={setSelectedPeriod}
                                disabled={isSubmitting}
                            >
                                <SelectTrigger className="w-24">
                                    <SelectValue placeholder="AM/PM" />
                                </SelectTrigger>
                                <SelectContent>
                                    {PERIODS.map((period) => (
                                        <SelectItem key={period} value={period}>
                                            {period}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit"
                            disabled={isSubmitting}
                            className="min-w-24"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    {id ? "Updating..." : "Creating..."}
                                </>
                            ) : (
                                id ? "Update" : "Create"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ScheduleForm;