import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { toast } from "sonner";
import { IDeleteForm } from "@/utils/types/Types";

const Delete = ({ Delete: isOpen, setDelete, id, onSucces }: IDeleteForm) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!isChecked) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/schedule/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");
      toast.success("Deleted successfully");
      onSucces();
      setDelete(false);
    } catch (error) {
      console.error("Error deleting schedule:", error);
      toast.error("Failed to delete data");
    } finally {
      setIsLoading(false);
      setIsChecked(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setDelete}>
      <DialogContent className="p-6 rounded-lg w-[400px]">
        <DialogTitle className="text-lg font-semibold text-red-600">
          Delete Confirmation
        </DialogTitle>
        <div className="flex flex-col gap-4">
          <p className="text-gray-800 text-sm">
            Are you sure you want to permanently delete this item? This action
            cannot be undone.
          </p>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="confirmDelete"
              className="w-5 h-5 accent-red-500 mr-3"
              onChange={(e) => setIsChecked(e.target.checked)}
              checked={isChecked}
              aria-checked={isChecked}
            />
            <label htmlFor="confirmDelete" className="text-xs text-gray-700">
              Yes, I understand and want to delete this data
            </label>
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleDelete}
              disabled={!isChecked || isLoading}
              className={`px-4 py-2 rounded-md text-white transition flex items-center gap-2 
              ${isChecked && !isLoading ? "bg-red-500 hover:bg-red-600 hover:cursor-pointer" : "bg-red-300 cursor-not-allowed"}`}>
                {isLoading ? (
                    <>
                        <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Deleting...
                    </>
                ) : (
                    "Delete Data"
                )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Delete;
