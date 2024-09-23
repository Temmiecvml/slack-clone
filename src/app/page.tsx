"use client";
import { useCreateWorkspaceModal } from "@/api/use-create-workspace-modal";
import { useGetWorkspaces } from "@/api/use-get-workspaces";
import { UserButton } from "@/components/user-button";
import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = useCreateWorkspaceModal();
  // data is a list of workspaces the authenticated user belongs to
  const { data, isLoading } = useGetWorkspaces();
  // workspace Id is the Id of the first workspace
  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  // This is the home page
  useEffect(() => {
    if (isLoading) return;

    // you get redirected automatically to the workspace if it exists
    if (workspaceId) {
      router.replace(`/workspace/${workspaceId}`);
    } else {
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen, router]);

  return (
    <div>
      Logged In!
      <UserButton />
    </div>
  );
}
