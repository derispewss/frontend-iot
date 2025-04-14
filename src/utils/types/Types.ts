export interface ISchedule {
    id: number
    nama: string
    hari: string
    jam: string
}

export interface IScheduleFormProps {
    open: boolean
    setOpen: (open: boolean) => void
    onSuccess: () => void
    id?: number
}

export interface IFormField {
    name: string
    label: string
    type: 'text' | 'select'
    required?: boolean
    options?: string[]
    validation?: (value: string) => string | null
}

export interface IScheduleData {
    nama: string
    hari: string
    jam: string
    telegram_id: number
}

export interface IDeleteForm {
    Delete: boolean
    setDelete: (isDelete: boolean) => void
    id: number
    onSucces: () => void
}
