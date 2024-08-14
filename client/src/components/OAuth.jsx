import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signInSucess } from "../redux/user/UserSlice";
import { useDispatch } from "react-redux";
export default function OAuth({text,navigateTo}) {
  const auth = getAuth(app);
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("/api/v1/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("SuccessFul!");
        dispatch(signInSucess(data));
        navigate("/");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
    }
  };
  return (
    <div
      className="w-[100%] cursor-pointer h-[3rem] border-[1px] border-[#707172] bg-transparent rounded-md flex items-center justify-center gap-2"
      onClick={handleGoogleClick}
    >
      <div className=" aspect-square w-6 relative">
        <img
          src="/icons/google.webp"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <p className=" font-OpenSans-Regular">{text}</p>
    </div>
  );
}
