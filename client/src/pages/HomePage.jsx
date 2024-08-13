import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DashSidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import DashHome from "../components/DashHome";
import DashInbox from "../components/DashInbox";

const HomePage = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    // Set the tab state based on the tabFromUrl value or default to empty string for "/"
    setTab(tabFromUrl || "");
  }, [location.search]);

  return (
    <div className="bg-black min-h-screen w-screen max-w-full">
      <Navbar />
      <DashSidebar />
      {!tab && <DashHome />}
      {tab === "inbox" && <DashInbox />}
      {/* Add more conditions here for other tabs */}
    </div>
  );
};

export default HomePage;
