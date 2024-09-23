import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";

// this is a function so it's technically not a props
interface useGetWorkspaceProps {
  id: Id<"workspaces">;
}

export const useGetWorkspace = ({ id }: useGetWorkspaceProps) => {
  const data = useQuery(api.workspaces.getById, { id });
  const isLoading = data === undefined;

  return { data, isLoading };
};
