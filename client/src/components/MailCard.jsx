import { useSelector } from "react-redux";

const MailCard = ({ email, onClick, onDelete, showSentEmails }) => {
  const { theme } = useSelector((state) => state.theme);
  const statuses = {
    "Meeting Completed": {
      label: "Meeting Completed",
      color: "bg-yellow-500",
      text: "text-[#E6D162]",
      border_light: "border-[#F0EBC3]",
      border_dark: "border-[#444234]",
    },
    Interested: {
      label: "Interested",
      color: "bg-green-500",
      text: "text-[#57E0A6]",
      border_light: "border-[#C4ECDA]",
      border_dark: "border-[#2D3833]",
    },
    Closed: {
      label: "Closed",
      color: "bg-purple-500",
      text: "text-[#626FE6]",
      border_light: "border-[#BDC4ED]",
      border_dark: "border-[#323440]",
    },
    "Meeting Booked": {
      label: "Meeting Booked",
      color: "bg-violet-500",
      text: "text-[#9C62E6]",
      border_light: "border-[#D7C6EA]",
      border_dark: "border-[#352F3C]",
    },
    "No Status": {
      label: "No Status",
      color: "text-gray-600",
      text: theme === "light" ? "text-black" : "text-white",
      border_light: "border-[#CCCCCC]",
      border_dark: "border-[#555555]",
    },
  };

  const status = statuses[email.status] || statuses["No Status"];

  return (
    <div
      onClick={onClick}
      className="w-full flex flex-col justify-center items-start gap-2 border-b-[1px] border-b-[#343A40] py-2 pb-5 cursor-pointer"
    >
      <div className="flex items-center justify-between w-full">
        <h1 className="text-base font-Inter-Medium dark:text-white text-[#343A40]">
          {showSentEmails ? "You" : email.from.email}
        </h1>
        <p className="text-[#393c40] text-[0.9rem] font-Inter-Regular">
          {new Date(email.createdAt).toLocaleDateString()}
        </p>
      </div>
      <p className="line-clamp-2 text-sm font-Inter-Regular text-[#172B4D] dark:text-[#E1E0E0] w-[90%]">
        {email.body}
      </p>
      <div className=" w-full flex items-center justify-between">
        <div
          className={` bg-[#F0F0F0] dark:bg-[#222426] rounded-full p-0.5 px-3.5 flex items-center justify-center gap-2 `}
        >
          <span
            className={`w-4 h-4 rounded-full ${status.color} border-[3px] ${
              theme === "light" ? status.border_light : status.border_dark
            }`}
          ></span>
          <p
            className={`text-[0.8rem] font-OpenSans-SemiBold tracking-wider ${status.text}`}
          >
            {status.label}
          </p>
        </div>
        <img
          src="/icons/delete.png"
          alt="img"
          className="w-7 h-7"
          onClick={(e) => {
            e.stopPropagation(); // Prevents triggering onClick of MailCard
            onDelete(email._id); // Calls onDelete prop with email id
          }}
        />
      </div>
    </div>
  );
};

export default MailCard;
