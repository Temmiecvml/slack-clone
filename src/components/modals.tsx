"use client"; // Marks this file as a Client Component, so it is rendered client-side only

import { useState, useEffect } from "react";
import { CreateWorkspaceModal } from "./workspaces/create-workspace-modal";

export const Modals = () => {
  // State to track if the component has mounted on the client side
  const [mounted, setMounted] = useState(false);

  // useEffect runs after the initial render, ensuring this code runs on the client only
  useEffect(() => {
    // Set 'mounted' to true after the component is mounted
    setMounted(true);
  }, []); // Empty dependency array ensures this runs only once after initial render

  // If 'mounted' is false, return null to prevent rendering content on the server side
  if (!mounted) {
    return null;
  }

  // Render the modal component only after the component has mounted on the client
  return (
    <>
      <CreateWorkspaceModal />
    </>
  );
};
