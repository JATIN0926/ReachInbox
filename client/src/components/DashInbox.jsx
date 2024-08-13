import { Dropdown, Select } from "flowbite-react";
import MailCard from "./MailCard";

const DashInbox = () => {
  return (
    <div className=" text-white text-2xl absolute right-0 top-[13%] w-[95%] h-[87vh] max-h-[90vh]">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-[25%] h-full px-4 py-2 flex flex-col items-start justify-start gap-2">
          <div className="flex items-center justify-between w-full">
            <h1 className=" text-[#4285F4] text-xl font-OpenSans-Bold tracking-wide">
              All Inbox(s)
            </h1>
            <img
              src="/icons/refresh.svg"
              alt="refresh"
              className="h-9 w-9 cursor-pointer"
            />
          </div>
          <h1 className=" font-OpenSans-Bold text-[1.1rem]">
            25/25{" "}
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
            />{" "}
          </div>

          <div className="flex items-center justify-between w-full border-b-[1px] border-b-[#343A40] py-2.5">
            <div className="flex items-center justify-center gap-1">
              <div className="  rounded-full bg-[#222426] p-1 px-2 text-[#5C7CFA] text-sm">
                26
              </div>
              <h1 className=" text-[#E6E6E6] text-[1.1rem] font-OpenSans-Bold tracking-wide">
                New Replies
              </h1>
            </div>
            <Dropdown label="Newest" size="xs" className=" border-2 border-white bg-black font-OpenSans-SemiBold" color="black">
              <Dropdown.Item className=" rounded-md text-sm font-OpenSans-SemiBold bg-black text-white">Latest</Dropdown.Item>
            </Dropdown>
          </div>
          <div className="flex flex-col w-full">
            <MailCard />
          </div>
        </div>
        <div className="w-[50%] bg-green-900 h-full"></div>
        <div className="w-[25%] bg-blue-900 h-full"></div>
      </div>
    </div>
  );
};

export default DashInbox;
