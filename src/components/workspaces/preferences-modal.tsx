import { useUpdateWorkspace } from "@/api/use-update-workspace";
import { useRemoveWorkspace } from "@/api/use-remove-workspace";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { TrashIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { useWorkspaceId } from "@/api/use-workspace-id";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface PreferencesModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  initialValue: string;
}

const PreferencesModal = ({
  open,
  setOpen,
  initialValue,
}: PreferencesModalProps) => {
  const router = useRouter();

  const [value, setValue] = useState(initialValue);
  const [editOpen, setEditOpen] = useState(false);
  const workspaceId = useWorkspaceId();
  const { mutate: updateWorkspace, isPending: isUpdatingWorkspace } =
    useUpdateWorkspace();
  const { mutate: removeWorkspace, isPending: isRemovingWorkspace } =
    useRemoveWorkspace();

  // setEditOpen opens and closes modal
  // based on the interactivity you want, the child modal is opened and clossed using Dialog trigger
  // see explanation at 4:44:30

  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateWorkspace(
      { id: workspaceId, name: value },
      {
        onSuccess: () => {
          toast.success("Workspace updated successfully");
          setEditOpen(false);
        },
        onError: () => toast.error("Failed to update workspace"),
      },
    );
    setEditOpen(false);
  };

  const handleDelete = () => {
    removeWorkspace(
      { id: workspaceId },
      {
        onSuccess: () => {
          router.replace("/");
          toast.success("Workspace deleted successfully");
          setEditOpen(false);
        },
        onError: () => toast.error("Failed to delete workspace"),
      },
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="p-0 bg-gray-50 overflow-hidden">
        <DialogHeader className="p-4 border-b bg-white">
          <DialogTitle>{value}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here
          </DialogDescription>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger asChild>
              <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">Workspace name</p>
                  <p className="text-sm text-[#1264a3] hover:underline font-semibold">
                    Edit
                  </p>
                </div>
                <p className="text-sm">{value}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Workspace</DialogTitle>
                <form className="space-y-4" onSubmit={handleEdit}>
                  <Input
                    value={value}
                    disabled={isUpdatingWorkspace}
                    onChange={(e) => setValue(e.target.value)}
                    required
                    autoFocus
                    minLength={3}
                    maxLength={80}
                    placeholder="Workspace name e.g 'Work', 'Home', 'Personal'"
                  />

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline" disabled={isUpdatingWorkspace}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit" disabled={isUpdatingWorkspace}>
                      Save
                    </Button>
                  </DialogFooter>
                </form>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <button
            disabled={false}
            onClick={handleDelete}
            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50 text-rose-600"
          >
            <TrashIcon className="size-4" />
            <p className="text-sm font-semibold">Delete Workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreferencesModal;
