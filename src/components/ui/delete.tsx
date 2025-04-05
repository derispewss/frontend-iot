import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./dialog";
import toast from "react-hot-toast";

interface IDeleteForm {
    Delete: boolean;
    setDelete: (isDelete: boolean) => void;
    id: number;
    onSucces: () => void;
}

const Delete = ({ Delete, setDelete, id, onSucces }: IDeleteForm) => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const handleDelete = async () => {
        setDelete(false);
        setIsChecked(false);
        try {
            const response = await fetch(`/api/schedule/${id}`, { method: "DELETE" });
            if (!response.ok) throw new Error("Failed to delete");
            toast.success("Delete Succesfully");
            onSucces();
        } catch (error) {
            console.error("Error deleting schedule:", error);
            toast.error("Error deleting data!");
        }
    };
    return (
        <>
            <Dialog open={Delete} onOpenChange={setDelete}>
                <DialogContent className="p-6 rounded-lg w-[400px]">
                    <DialogTitle className="text-lg font-semibold text-red-600">Delete Confirmation</DialogTitle>
                    <div className="flex flex-col gap-4">
                        <h1 className="text-xl text-gray-800">Are you sure you want to delete this data?</h1>

                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="confirmDelete"
                                className="w-5 h-5 accent-red-500 mr-3 hover:cursor-pointer"
                                onChange={(e) => setIsChecked(e.target.checked)}
                            />
                            <label htmlFor="confirmDelete" className="text-gray-700">
                                Yes, I want to delete this data
                            </label>
                        </div>
                        <div className="flex justify-center mt-4">
                            <button
                                onClick={handleDelete}
                                disabled={!isChecked}
                                className={`px-4 py-2 rounded-md text-white transition ${
                                    isChecked ? "bg-red-500 hover:bg-red-600 hover:cursor-pointer" : "bg-red-300 cursor-not-allowed"
                                }`}
                            >
                                Delete Data
                            </button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Delete;
