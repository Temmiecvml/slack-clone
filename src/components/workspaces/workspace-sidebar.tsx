import { useCurrentMember } from "@/api/use-current-members";
import { useGetWorkspace } from "@/api/use-get-workspace";
import { useWorkspaceId } from "@/api/use-workspace-id";
import { AlertTriangle, Loader } from "lucide-react";
import WorkspaceHeader from "./workspace-header";

const WorkspaceSidebar = () => {
  const workspaceId = useWorkspaceId();
  const { currentMember: member, isLoading: memberLoading } = useCurrentMember({
    workspaceId,
  });
  const { data: workspace, isLoading: workspaceLoading } = useGetWorkspace({
    id: workspaceId,
  });

  if (workspaceLoading || memberLoading) {
    return (
      <div className="flex flex-col bg-[#5E2C5F] h-full items-center justify-center">
        <Loader className="size-5 animate-spin text-white" />
      </div>
    );
  }

  if (!workspace || !member) {
    return (
      <div className="flex flex-col gap-y-2  bg-[#5E2C5F] h-full items-center justify-center">
        <AlertTriangle className="size-5 text-white" />
        <p className="text-white text-sm">Workspace not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 bg-[#5E2C5F] h-full">
      <WorkspaceHeader
        workspace={workspace}
        isAdmin={member.role === "admin"}
      />
    </div>
  );
};

export default WorkspaceSidebar;
