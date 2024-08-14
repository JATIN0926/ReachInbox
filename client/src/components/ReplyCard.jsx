import React from "react";

const ReplyCard = ({ reply, theme }) => {
  return (
    <div className="w-[90%] p-5 rounded-lg flex flex-col items-start justify-center gap-8 bg-[#F9F9F9] dark:bg-[#141517] border-[1.5px] border-[#777777] dark:border-gray-600 self-center mb-4">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col items-start justify-center gap-2">
          <h1 className="font-OpenSans-SemiBold text-lg">
            {reply.subject}
          </h1>
          <p className="text-[#637381] dark:text-[#AEAEAE] font-OpenSans-Regular text-base">
            from: {reply.from.email}
          </p>
          <p className="text-[#637381] dark:text-[#AEAEAE] font-OpenSans-Regular text-base">
            to: {reply.to.email}
          </p>
        </div>
        <p className="text-[#AEAEAE] font-OpenSans-Regular text-base self-start">
          {new Date(reply.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-start justify-center font-OpenSans-Regular text-[1.1rem] text-[#172B4D] dark:text-[#E1E0E0]">
        {reply.body}
      </div>
    </div>
  );
};

export default ReplyCard;
