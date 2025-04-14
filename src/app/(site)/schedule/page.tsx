'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ISchedule } from '@/utils/types/Types'
import { useEffect, useState } from 'react'

const headers = [
    { key: 'hari', label: 'Day' },
    { key: 'nama', label: 'Name' },
    { key: 'jam', label: 'Time' },
    { key: 'telegram_id', label: 'ID telegram' },
]

const Schedule = () => {
    const [schedule, setSchedule] = useState<ISchedule[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchSchedule = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/schedule')
                if (!res.ok) throw new Error('Failed to fetch schedule')
                const data = await res.json()
                setSchedule(data)
            } catch (error) {
                console.error('Error fetching schedule:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchSchedule()
    }, [])

    const renderTableBody = () => {
        if (loading) {
            return (
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={headers.length + 1} className="text-center py-10">
                            <div className="flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-amber-400"></div>
                            </div>
                        </TableCell>
                    </TableRow>
                </TableBody>
            )
        }

        if (schedule.length === 0) {
            return (
                <TableBody>
                    <TableRow>
                        <TableCell colSpan={headers.length + 1} className="text-center py-6">
                            No schedule available.
                        </TableCell>
                    </TableRow>
                </TableBody>
            )
        }

        return (
            <TableBody className="bg-[rgb(241,241,241)]">
                {schedule.map((row, index) => (
                    <TableRow key={index} className="border-t border-gray-200">
                        <TableCell className="text-center">{index + 1}</TableCell>
                        {headers.map(({ key }) => (
                            <TableCell key={key} className="text-center">
                                {row[key as keyof ISchedule] ?? '-'}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        )
    }

    return (
        <div className="w-full px-5 py-18 flex flex-col font-medium">
            <div className="justify-between flex px-0 xl:px-6 lg:px-6 mb-3">
                <h1 className="font-semibold text-2xl mb-6">Schedule</h1>
            </div>
            <div className="w-full h-full rounded-2xl px-0 lg:px-6 xl:px-6">
                <div className="w-full h-[282px] overflow-x-auto rounded-xl shadow-md border border-gray-200">
                    <Table className="min-w-[700px] h-[280px] text-sm overflow-x-auto">
                        <TableHeader className="bg-[rgb(202,202,202)] text-black">
                            <TableRow>
                                <TableHead className="w-[50px] text-center">No</TableHead>
                                {headers.map(({ label }, index) => (
                                    <TableHead key={index} className="text-center">
                                        {label}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        {renderTableBody()}
                    </Table>
                </div>
            </div>
        </div>
    )
}

export default Schedule
