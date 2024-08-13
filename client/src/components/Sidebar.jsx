import { Link, useLocation } from "react-router-dom";

const DashSidebar = () => {
  const location = useLocation();

  const tabs = [
    { src: "/icons/Home.svg", alt: "Home", path: "/" },
    { src: "/icons/people.svg", alt: "People", path: "/?tab=people" },
    { src: "/icons/email.svg", alt: "Email", path: "/?tab=email" },
    { src: "/icons/sent.svg", alt: "Sent", path: "/?tab=sent" },
    { src: "/icons/list.svg", alt: "List", path: "/?tab=list" },
    { src: "/icons/inbox.svg", alt: "Inbox", path: "/?tab=inbox" },
  ];

  return (
    <div className="min-h-screen h-screen w-[7%] fixed top-0 left-0 border-[#343A40] border-[1px]">
      <div className="h-full w-full flex flex-col items-center justify-between py-6">
        <img
          src="/icons/oneBoxLogo.svg"
          alt="logo"
          className="aspect-square w-10"
        />
        <div className="flex flex-col items-center justify-center gap-6">
          {tabs.map((tab) => (
            <Link to={tab.path} key={tab.alt}>
              <div
                className={`aspect-square w-10 p-2 rounded ${
                  location.search === tab.path.substring(1) ? "bg-gray-600" : ""
                }`}
              >
                <img src={tab.src} alt={tab.alt} className="w-full h-full" />
              </div>
            </Link>
          ))}
        </div>
        <div className="">profile</div>
      </div>
    </div>
  );
};

export default DashSidebar;
