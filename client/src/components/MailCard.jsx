const MailCard = ({ email, onClick }) => {
    return (
      <div onClick={onClick} className="w-full flex flex-col justify-center items-start gap-2 border-b-[1px] border-b-[#343A40] py-2 pb-5 cursor-pointer">
          <div className="flex items-center justify-between w-full">
              <h1 className="text-base font-Inter-Medium">{email.from.email}</h1>
              <p className=" text-[#393c40] text-[0.9rem] font-Inter-Regular">{new Date(email.createdAt).toLocaleDateString()}</p>
          </div>
          <p className=" line-clamp-2 text-sm font-Inter-Regular text-[#E1E0E0]">{email.body}</p>
          <div className=" bg-[#222426] rounded-full p-0.5 px-3.5 flex items-center justify-center gap-2">
              <div className="rounded-full w-4 h-4 bg-[#57E0A6] border-[3px] border-[#2D3833]"></div>
              <p className="text-[#57E0A6] text-[0.8rem] font-OpenSans-SemiBold tracking-wide">{email.isRead ? 'Read' : 'Unread'}</p>
          </div>
      </div>
    );
  };
  
  export default MailCard;
  