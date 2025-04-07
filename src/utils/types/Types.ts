export interface ISchedule {
    id: number;
    name: string;
    action: string;
    day: string;
    time: string;
}

export interface IScheduleFormProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onSuccess: () => void;
    id?: number;
}

export interface IFormField {
    name: string;
    label: string;
    type: "text" | "select";
    required?: boolean;
    options?: string[];
    validation?: (value: string) => string | null;
}

export interface IScheduleData {
    name: string;
    action: string;
    day: string;
    time: string;
}

export interface IDeleteForm {
  Delete: boolean;
  setDelete: (isDelete: boolean) => void;
  id: number;
  onSucces: () => void;
}