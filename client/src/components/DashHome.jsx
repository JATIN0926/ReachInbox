const DashHome = () => {
  return (
    <div className=" absolute right-0 top-[15%] w-[93%] h-[87vh] max-h-[90vh]  overflow-hidden">
      <div className="w-full h-full flex items-center justify-center overflow-hidden">
        <div className=" flex flex-col items-center justify-center gap-4 w-full">
          <img
            src="/images/No_Message_illustration.png"
            alt=""
            className=" h-[40%] w-[30%]"
          />
          <h1 className=" text-2xl font-DMSans-Bold">
            It’s the beginning of a legendary sales pipeline{" "}
          </h1>
          <p className=" text-[#9E9E9E] font-DMSans-Medium w-[25%] text-center text-base">
            When you have inbound E-mails you’ll see them here
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashHome;
