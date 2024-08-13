import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import DashSidebar from "../components/Sidebar";
import { useLocation } from "react-router-dom";
import DashHome from "../components/DashHome";
import DashInbox from "../components/DashInbox";
import ComposeMail from "../components/ComposeMail";

const HomePage = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");

    setTab(tabFromUrl || "");
  }, [location.search]);

  return (
    <div className="bg-black min-h-screen w-screen max-w-full">
      <Navbar />
      <DashSidebar />
      {!tab && <DashHome />}
      {tab === "inbox" && <DashInbox />}
      {tab === "email" && <ComposeMail />}
    </div>
  );
};

export default HomePage;
