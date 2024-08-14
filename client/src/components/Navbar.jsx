import { useDispatch, useSelector } from "react-redux";
import Toggleswitch from "../components/ToggleSwitch";
import { signoutSuccess } from "../redux/user/UserSlice.js";
import axios from "axios";
import toast from "react-hot-toast";
import { Tooltip as ReactTooltip } from 'react-tooltip';

const Navbar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    try {
      const { data } = await axios.post("/api/v1/auth/signout");

      if (data.success === false) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        toast.success("Logout Successfully");
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="w-[95%] fixed right-0 p-6">
      <div className="w-full flex items-center justify-between">
        <h2 className="font-OpenSans-Bold text-xl">Onebox</h2>
        <div className="flex items-center justify-center gap-3">
          <Toggleswitch />
          <h1 className="font-OpenSans-SemiBold text-xl">
            {currentUser.username.split(" ")[0]}’s Workspace
          </h1>
          <img
            src="/icons/logout.png"
            alt="logout"
            className="w-6 h-6 cursor-pointer"
            onClick={handleSignOut}
            data-tooltip-id="logout-tooltip"
            data-tooltip-content="Sign Out"
            data-tooltip-place="right"
          />
        </div>
      </div>
      <ReactTooltip id="logout-tooltip" place="top" type="dark"  />
    </div>
  );
};

export default Navbar;
