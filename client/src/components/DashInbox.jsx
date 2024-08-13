import { useState, useEffect } from "react";
import axios from "axios";
import MailCard from "./MailCard";

const DashInbox = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null); // State to track selected email

  useEffect(() => {
    const fetchInboxEmails = async () => {
      try {
        const response = await axios.get("/api/v1/onebox/inbox");
        setEmails(response.data);
      } catch (error) {
        console.error("Failed to fetch inbox emails", error);
      }
    };
    
    fetchInboxEmails();
  }, []);

  const handleEmailClick = (email) => {
    setSelectedEmail(email); // Set the selected email when a MailCard is clicked
  };

  return (
    <div className="text-white text-2xl absolute right-0 top-[13%] w-[95%] h-[87vh] max-h-[90vh]">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[25%] h-full px-4 py-2 flex flex-col items-start justify-start gap-2">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-[#4285F4] text-xl font-OpenSans-Bold tracking-wide">
              All Inbox(s)
            </h1>
            <img
              src="/icons/refresh.svg"
              alt="refresh"
              className="h-9 w-9 cursor-pointer"
            />
          </div>
          <h1 className="font-OpenSans-Bold text-[1.1rem]">
            {emails.length}/25{" "}
            <span className="text-[#7F7F7F] font-OpenSans-Regular">
              {" "}
              Inboxes selected
            </span>
          </h1>
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full h-full bg-[#23272C] rounded-md pl-11"
            />
            <img
              src="/icons/search.png"
              alt="search"
              className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2"
            /> 
          </div>
          <div className="flex flex-col w-full">
            {emails.map(email => (
              <MailCard key={email._id} email={email} onClick={() => handleEmailClick(email)} />
            ))}
          </div>
        </div>
        
        <div className="w-[75%] h-full flex items-center justify-center">
          {selectedEmail ? (
            <div className="w-[50%] bg-green-900 h-full p-4">
              <h2 className="text-xl font-bold">{selectedEmail.subject}</h2>
              <p className="text-sm">From: {selectedEmail.from.email}</p>
              <p className="text-sm">To: {selectedEmail.to.email}</p>
              <p className="mt-4">{selectedEmail.body}</p>
            </div>
          ) : (
            <h1 className="font-OpenSans-Bold text-4xl w-1/2 text-center">
              Your Inbox at a Glance: Manage, Respond, and Conquer Your Cold Outreach with Ease.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashInbox;
