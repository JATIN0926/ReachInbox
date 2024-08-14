import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const DashSidebar = () => {
  const location = useLocation();

  const tabs = [
    { src: "/icons/Home.svg", alt: "Home", path: "/" },
    { src: "/icons/email.svg", alt: "Email", path: "/?tab=email" },
    { src: "/icons/sent.svg", alt: "Sent", path: "/?tab=sent" },
    { src: "/icons/inbox_2.svg", alt: "Inbox", path: "/?tab=inbox" },
    { src: "/icons/people.svg", alt: "People", path: "/?tab=people" },
  ];

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className="min-h-screen h-screen w-[5%] fixed top-0 left-0 border-[#343A40] border-[1px]">
      <div className="h-full w-full flex flex-col items-center justify-between py-6">
        {theme === "light"?(<img
          src="/icons/OneBoxLogo_light.svg "
          alt="logo"
          className="aspect-square w-10"
        />):(
          <img
          src="/icons/oneBoxLogo.svg"
          alt="logo"
          className="aspect-square w-10"
        />
        )}
        
        {/* */}
        <div className="flex flex-col items-center justify-center gap-6">
          {tabs.map((tab) => (
            <Link to={tab.path} key={tab.alt}>
              <div
                className={`aspect-square w-[2.85rem] p-2 rounded ${
                  location.search === tab.path.substring(1) ? " bg-[#E9EAEB] dark:bg-gray-600" : ""
                }`}
              >
                <img src={tab.src} alt={tab.alt} className="w-full h-full" />
              </div>
            </Link>
          ))}
        </div>
        <div className="relative h-10 w-10">
          <img src={currentUser.profilePicture} alt="" className=" object-cover rounded-full h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default DashSidebar;
