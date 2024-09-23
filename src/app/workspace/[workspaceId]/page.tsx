"use client";

import { useGetWorkspace } from "@/api/use-get-workspace";
import { useWorkspaceId } from "@/api/use-workspace-id";

const WorkspaceIdPage = () => {
  // extract workspace Id from the url
  const workspaceId = useWorkspaceId();
  const { data } = useGetWorkspace({ id: workspaceId });

  return <div>WorkspaceIdPage. ID {workspaceId}</div>;
};

export default WorkspaceIdPage;
