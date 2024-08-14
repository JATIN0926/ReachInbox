import { useState, useEffect } from "react";
import axios from "axios";
import MailCard from "./MailCard";
import {  Dropdown, Modal, Spinner } from "flowbite-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import ReplyCard from "./ReplyCard";

const DashInbox = ({ showSentEmails }) => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState({
    label: "No Status",
    color: "bg-gray-600",
  });
  const [openModal, setOpenModal] = useState(false);
  const [replies, setReplies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('newest');

  const statuses = [
    { label: "Meeting Completed", color: "bg-yellow-500" },
    { label: "Interested", color: "bg-green-500" },
    { label: "Closed", color: "bg-purple-500" },
    { label: "Meeting Booked", color: "bg-violet-500" },
  ];

  const handleSortChange = (order) => {
    setSortOrder(order);
  };
  
  // Update fetchInboxEmails to use the sorting order
  const fetchInboxEmails = async () => {
    try {
      setisLoading(true);
      const endpoint = showSentEmails
        ? "/api/v1/onebox/getsentmails"
        : "/api/v1/onebox/inbox";
      const response = await axios.get(endpoint);
      const sortedEmails = sortOrder === 'newest'
        ? response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        : response.data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setEmails(sortedEmails);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
      console.error("Failed to fetch inbox emails", error);
    }
  };
  useEffect(() => {
    fetchInboxEmails();
  }, [sortOrder]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'r' && selectedEmail) {
        setOpenModal(true);
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [selectedEmail]);
  

  const handleStatusChange = async (status) => {
    try {
      setSelectedStatus(status);
      setDropdownOpen(false);

      const response = await axios.patch(
        `/api/v1/onebox/updateStatus/${selectedEmail._id}`,
        { status: status.label }
      );

      setEmails((prevEmails) =>
        prevEmails.map((email) =>
          email._id === selectedEmail._id
            ? { ...email, status: status.label }
            : email
        )
      );
    } catch (error) {
      console.error("Failed to update status", error);
      toast.error("Failed to update status");
    }
  };

  const handleEmailClick = async (email) => {
    setSelectedEmail(email);
    const currentStatus = statuses.find(
      (status) => status.label === email.status
    ) || {
      label: "No Status",
      color: "bg-gray-600",
    };
    console.log("email id", email._id);
    try {
      const response = await axios.get(
        `/api/v1/onebox/getreplies/${email._id}`
      );
      setReplies(response.data);
      fetchInboxEmails();
    } catch (error) {
      console.error("Failed to fetch replies", error);
    }

    setFormData({
      to: email.from._id,
      subject: `Re: ${email.subject}`,
      body: "",
    });
    setSelectedStatus(currentStatus);
  };

  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    body: "",
  });

  const { theme } = useSelector((state) => state.theme);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/v1/onebox/sendreply",
        {
          ...formData,
          replyTo: selectedEmail._id, // add replyTo field to link this reply to the original email
        },
        {
          withCredentials: true,
        }
      );
      console.log(response.data.newMessage)
      const newReply = response.data.newMessage; // Assuming the API returns the new reply data
      setReplies((prevReplies) => [...prevReplies, newReply]);
  

      toast.success(response.data.message);
      setOpenModal(false); // close the modal after sending
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteEmail = async (emailId) => {
    try {
      await axios.delete(`/api/v1/onebox/delete/${emailId}`);
      setEmails((prevEmails) => prevEmails.filter((email) => email._id !== emailId));
      toast.success("Email deleted successfully");
    } catch (error) {
      console.error("Failed to delete email", error);
      toast.error("Failed to delete email");
    }
  };

  const handleRefresh = async () => {
    try {
      setisLoading(true);
      await fetchInboxEmails();
      toast.success("Inbox refreshed");
    } catch (error) {
      toast.error("Failed to refresh inbox");
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className=" absolute right-0 top-[13%] w-[95%] h-[87vh] max-h-[90vh]">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[25%] h-full px-4 py-2 flex flex-col items-start justify-start gap-2  overflow-x-hidden border-r-[1px] border-r-[#343A40]">
          <div className="flex items-center justify-between w-full">
            <h1 className="text-[#4285F4] text-xl font-OpenSans-Bold tracking-wide">
              All Inbox(s)
            </h1>
            {theme === "light" ? (
              <img
                src="/icons/refresh_black.svg"
                alt="refresh"
                className="h-9 w-9 cursor-pointer"
                onClick={handleRefresh}
              />
            ) : (
              <img
                src="/icons/refresh.svg"
                alt="refresh"
                className="h-9 w-9 cursor-pointer"
                onClick={handleRefresh}
              />
            )}
          </div>
          
          <div className="w-full relative">
            <input
              type="text"
              placeholder="Search"
              className="w-full h-full bg-[#F4F6F8]  dark:bg-[#23272C] rounded-md pl-11"
            />
            {theme === "light" ? (
              <img
                src="/icons/Search_light_mode.svg"
                alt="search"
                className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2"
              />
            ) : (
              <img
                src="/icons/search.png"
                alt="search"
                className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2"
              />
            )}
          </div>
          <div className="flex items-center justify-between w-full border-b-[1px] border-b-[#343A40] py-2.5">
            <div className="flex items-center justify-center gap-1">
              <div className="rounded-full font-Inter-SemiBold bg-[#ECECEC]  dark:bg-[#222426] p-1 px-2 text-[#5C7CFA] text-sm">
                26
              </div>
              <h1 className=" text-[#172B4D] dark:text-[#E6E6E6] text-[1.1rem] font-OpenSans-Bold tracking-wide">
                New Replies
              </h1>
            </div>
            <Dropdown
  label={sortOrder === 'newest' ? "Newest" : "Oldest"}
  size="xs"
  className="border-2 border-white bg-black font-Inter-SemiBold"
  color="black"
>
  <Dropdown.Item
    className="rounded-md text-sm font-OpenSans-SemiBold"
    onClick={() => handleSortChange('newest')}
  >
    Newest
  </Dropdown.Item>
  <Dropdown.Item
    className="rounded-md text-sm font-OpenSans-SemiBold"
    onClick={() => handleSortChange('oldest')}
  >
    Oldest
  </Dropdown.Item>
</Dropdown>

          </div>
          <div className="flex flex-col w-full overflow-y-auto">
            {isLoading ? (
              <Spinner />
            ) : emails.length > 0 ? (
              emails.map((email) => (
                <MailCard
                  key={email._id}
                  email={email}
                  showSentEmails={showSentEmails}
                  onClick={() => handleEmailClick(email)}
                  onDelete={handleDeleteEmail} 
                />
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                <p className=" font-OpenSans-SemiBold text-2xl">
                  No emails yet
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="w-[75%] h-full flex items-center justify-center">
          {selectedEmail ? (
            <>
              <div className="w-[65%] h-full p-4 flex flex-col gap-5 overflow-y-scroll ">
                <div className="flex items-center justify-between w-full  border-b-[1px] border-b-[#343A40] py-2 pb-4">
                  <div className="flex flex-col justify-center items-start">
                    <h1 className=" text-[#343A40] dark:text-white font-Inter-SemiBold text-xl tracking-wide">
                      {selectedEmail.from.username}
                    </h1>
                    <h2 className="text-sm text-gray-600">
                      From: {selectedEmail.from.email}
                    </h2>
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center text-base bg-white dark:bg-[#1F1F1F] border-2 border-[#DFE3E8] dark:border-[#343A40] p-2 rounded-md focus:outline-none"
                    >
                      <span
                        className={`w-4 h-4 rounded-full ${
                          selectedStatus.color
                        } ${
                          theme === "dark"
                            ? "border-[#2D3833]"
                            : "border-[#E1E1E1]"
                        } border-[3px] border-[#2D3833] mr-2`}
                      ></span>
                      {selectedStatus ? selectedStatus.label : "Select Status"}
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
                      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1F1F1F] rounded-md shadow-lg z-10">
                        {statuses.map((status) => (
                          <button
                            key={status.label}
                            onClick={() => handleStatusChange(status)}
                            className="flex items-center w-full px-4 py-2 text-sm rounded-md focus:outline-none"
                          >
                            <span
                              className={`w-4 h-4 rounded-full ${
                                status.color
                              } mr-2 border-[3px] ${
                                theme === "dark"
                                  ? "border-[#2D3833]"
                                  : "border-[#E1E1E1]"
                              }`}
                            ></span>
                            {status.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-[90%] p-5 rounded-lg flex flex-col items-start justify-center gap-8 bg-[#F9F9F9] dark:bg-[#141517] border-[1.5px] border-[#777777] dark:border-gray-600 self-center">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col items-start justify-center gap-2">
                      <h1 className=" font-OpenSans-SemiBold text-lg">
                        {selectedEmail.subject}
                      </h1>
                      <p className=" text-[#637381] dark:text-[#AEAEAE] font-OpenSans-Regular text-base">
                        from : {selectedEmail.from.email}
                      </p>
                      <p className=" text-[#637381] dark:text-[#AEAEAE] font-OpenSans-Regular text-base">
                        to : {selectedEmail.to.email}
                      </p>
                    </div>
                    <p className=" text-[#AEAEAE] font-OpenSans-Regular text-base self-start">
                      {new Date(selectedEmail.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-start justify-center font-OpenSans-Regular text-[1.1rem] text-[#172B4D] dark:text-[#E1E0E0]">
                    {selectedEmail.body}
                  </div>
                </div>

                {replies.map((reply, index) => (
                  <ReplyCard key={index} reply={reply} theme={theme} />
                ))}
                <div className="self-start align-bottom w-[90%]">
                  <button
                    onClick={() => setOpenModal(true)}
                    type="submit"
                    className=" text-white rounded-md bg-gradient-to-r from-[#4B63DD] to-[#0524BF] font-OpenSans-SemiBold px-8 pr-12 p-3 flex items-center justify-center gap-2 text-base tracking-wide"
                  >
                    <img src="/icons/reply.svg" alt="img" className="w-6 h-6" />
                    Reply
                  </button>
                  <Modal show={openModal} onClose={() => setOpenModal(false)} >
                    <Modal.Body className="bg-[#141517] p-0">
                    <Modal.Header className=" h-[10vh]"></Modal.Header>
                      <form
                        className="w-[100%] h-[100%] bg-[#141517] flex flex-col rounded-lg gap-1"
                        onSubmit={handleSubmit}
                      >
                        <div className="w-full h-[10%] bg-[#23272C] rounded-lg flex items-center justify-start px-4">
                          <p className="text-start text-[#BAB9BD] text-base font-OpenSans-Bold tracking-wide">
                            Send Mail
                          </p>
                        </div>
                        <div className="w-full py-1.5 px-8 font-OpenSans-SemiBold text-[#E7E7E7] text-lg border-b-[1px] border-b-[#34383D] flex items-center justify-start gap-1">
                          <h1 className="text-[#BAB9BD] font-OpenSans-Regular">
                            { console.log(selectedEmail)}
                            To: {selectedEmail.from.email}
                          </h1>
                        </div>
                        <div className="w-full py-1.5 px-8 font-OpenSans-SemiBold text-[#E7E7E7] text-lg border-b-[1px] border-b-[#34383D] flex items-center justify-center gap-1">
                          <span className="text-[#BAB9BD] font-OpenSans-Regular">
                            Subject:
                          </span>
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className="bg-transparent border-none outline-none w-full"
                          />
                        </div>
                        <textarea
                          name="body"
                          value={formData.body}
                          onChange={handleChange}
                          placeholder="Write Something..."
                          className="h-[55%] text-white w-full bg-transparent px-8 font-OpenSans-SemiBold resize-none border-b-[1px] border-b-[#34383D]"
                        ></textarea>
                        <button
                          type="submit"
                          className="my-3 rounded-md bg-gradient-to-r from-[#4B63DD] to-[#0524BF] font-OpenSans-SemiBold px-6 p-2 w-[15%] self-center text-white"
                        >
                          Send
                        </button>
                      </form>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
              <div className="w-[35%] flex flex-col justify-start items-center gap-4 h-full p-4 border-l-[1px] border-l-[#343A40]">
                <div className=" bg-[#ECEFF3] dark:bg-[#23272C] w-full rounded-md text-[#454F5B] dark:text-white font-Inter-SemiBold px-4 p-1 text-xl">
                  Lead Details
                </div>
                <div className="flex flex-col items-center justify-center gap-6 w-full px-4 font-Inter-Regular">
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-[0.85rem] text-[#637381] dark:text-white">
                      Name
                    </h1>
                    <p className="text-[0.9rem] text-[#B9B9B9]">
                      {selectedEmail.from.username}
                    </p>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-[0.85rem] text-[#637381] dark:text-white">
                      Contact No
                    </h1>
                    <p className="text-[0.9rem] text-[#B9B9B9]">
                      {selectedEmail.from.contactNo
                        ? selectedEmail.from.contactNo
                        : "Not Provided!"}
                    </p>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-[0.85rem] text-[#637381] dark:text-white">
                      Email ID
                    </h1>
                    <p className="text-[0.9rem] text-[#B9B9B9]">
                      {selectedEmail.from.email}
                    </p>
                  </div>
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-[0.85rem] text-[#637381] dark:text-white">
                      Company Name
                    </h1>
                    <p className="text-[0.9rem] text-[#B9B9B9]">
                      {selectedEmail.from.company
                        ? selectedEmail.from.company
                        : "Not Provided"}
                    </p>
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
