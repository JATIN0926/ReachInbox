import { useState, useEffect } from "react";
import axios from "axios";
import MailCard from "./MailCard";
import { Dropdown } from "flowbite-react";

const DashInbox = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({
    label: "Meeting Completed",
    color: "bg-yellow-500",
  });

  const statuses = [
    { label: "Meeting Completed", color: "bg-yellow-500" },
    { label: "Interested", color: "bg-green-500" },
    { label: "Closed", color: "bg-purple-500" },
    { label: "Meeting Booked", color: "bg-violet-500" },
  ];

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
    setSelectedEmail(email);
  };

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
    setDropdownOpen(false);
  };

  console.log(selectedEmail);
  return (
    <div className="text-white text-2xl absolute right-0 top-[13%] w-[95%] h-[87vh] max-h-[90vh]">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[25%] h-full px-4 py-2 flex flex-col items-start justify-start gap-2  overflow-x-hidden border-r-[1px] border-r-[#343A40]">
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
          <div className="flex items-center justify-between w-full border-b-[1px] border-b-[#343A40] py-2.5">
            <div className="flex items-center justify-center gap-1">
              <div className="rounded-full bg-[#222426] p-1 px-2 text-[#5C7CFA] text-sm">
                26
              </div>
              <h1 className="text-[#E6E6E6] text-[1.1rem] font-OpenSans-Bold tracking-wide">
                New Replies
              </h1>
            </div>
            <Dropdown
              label="Newest"
              size="xs"
              className=" border-2 border-white bg-black font-OpenSans-SemiBold"
              color="black"
            >
              <Dropdown.Item className=" rounded-md text-sm font-OpenSans-SemiBold bg-black text-white">
                Latest
              </Dropdown.Item>
            </Dropdown>
          </div>
          <div className="flex flex-col w-full overflow-y-auto">
            {emails.map((email) => (
              <MailCard
                key={email._id}
                email={email}
                onClick={() => handleEmailClick(email)}
              />
            ))}
          </div>
        </div>

        <div className="w-[75%] h-full flex items-center justify-center">
          {selectedEmail ? (
            <>
              <div className="w-[65%] h-full p-4 flex flex-col gap-5  ">
                <div className="flex items-center justify-between w-full  border-b-[1px] border-b-[#343A40] py-2 pb-4">
                  <div className="flex flex-col justify-center items-start">
                    <h1 className="text-white font-Inter-SemiBold text-xl tracking-wide">
                      {selectedEmail.from.username}
                    </h1>
                    <h2 className="text-sm text-gray-600">
                      From: {selectedEmail.from.email}
                    </h2>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center text-base bg-[#1F1F1F] text-white p-2 rounded-md focus:outline-none"
                    >
                      <span
                        className={`w-3 h-3 rounded-full ${selectedStatus.color} mr-2`}
                      ></span>
                      {selectedStatus.label}
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        ></path>
                      </svg>
                    </button>

                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-[#33373C] rounded-md shadow-lg z-10">
                        {statuses.map((status) => (
                          <button
                            key={status.label}
                            onClick={() => handleStatusChange(status)}
                            className="flex items-center w-full px-4 py-2 text-sm text-white hover:bg-gray-600 rounded-md focus:outline-none"
                          >
                            <span
                              className={`w-3 h-3 rounded-full ${status.color} mr-2`}
                            ></span>
                            {status.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-[90%] p-5 rounded-lg flex flex-col items-start justify-center gap-8 bg-[#141517] self-center">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col items-start justify-center gap-2">
                      <h1 className=" font-OpenSans-SemiBold text-lg">
                        {selectedEmail.subject}
                      </h1>
                      <p className=" text-[#AEAEAE] font-OpenSans-Regular text-base">
                        from : {selectedEmail.from.email}
                      </p>
                      <p className=" text-[#AEAEAE] font-OpenSans-Regular text-base">
                        to : {selectedEmail.to.email}
                      </p>
                    </div>
                    <p className=" text-[#AEAEAE] font-OpenSans-Regular text-base self-start">
                      {new Date(selectedEmail.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-start justify-center font-OpenSans-Regular text-[1.1rem]">
                    {selectedEmail.body}
                  </div>
                </div>
              </div>
              <div className="w-[35%] flex flex-col justify-start items-center gap-4 h-full p-4 border-l-[1px] border-l-[#343A40]">
                <div className="bg-[#23272C] w-full rounded-md text-white font-Inter-Medium px-4 p-1 text-xl">
                  Lead Details
                </div>
                <div className="flex flex-col items-center justify-center gap-1 w-full px-4 font-Inter-Regular">
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-[0.85rem]">Name</h1>
                    <p className="text-[0.9rem] text-[#B9B9B9]">{selectedEmail.from.username}</p>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-[0.85rem]">Contact No</h1>
                    <p className="text-[0.9rem] text-[#B9B9B9]">{selectedEmail.from.contactNo?selectedEmail.from.contactNo:"Not Provided!"}</p>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-[0.85rem]">Email ID</h1>
                    <p className="text-[0.9rem] text-[#B9B9B9]">{selectedEmail.from.email}</p>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-[0.85rem]">Name</h1>
                    <p className="text-[0.9rem] text-[#B9B9B9]">{selectedEmail.from.username}</p>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-[0.85rem]">Company Name</h1>
                    <p className="text-[0.9rem] text-[#B9B9B9]">{selectedEmail.from.company?selectedEmail.from.company:"Not Provided"}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <h1 className="font-OpenSans-Bold text-4xl w-1/2 text-center">
              Your Inbox at a Glance: Manage, Respond, and Conquer Your Cold
              Outreach with Ease.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashInbox;
