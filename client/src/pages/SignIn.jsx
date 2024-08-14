import { Link, useNavigate } from "react-router-dom";
import { Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import OAuth from "../components/OAuth";
import { signInFailure, signInStart, signInSucess } from "../redux/user/UserSlice";
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("All fields are required!");
      return dispatch(signInFailure("All Fields are required"));
    }
    try {
      dispatch(signInStart());
      const { data } = await axios.post("/api/v1/auth/signin", formData);

      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return toast.error("Something went wrong!");
      }

      dispatch(signInSucess(data));

      toast.success("Signin Successfull!");
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error));
      console.log(error);
      toast.error("Something went wrong!");
    }
  };
  return (
    <div className=" bg-black border-[1px] border-[#25262B] min-h-screen w-screen max-w-full">
      <div className="flex items-center justify-center gap-2">
        <div className="h-9 w-[15rem] relative my-6">
          <img
            src="/icons/Logo.svg"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="h-[80vh] text-white  max-h-[90vh] w-screen max-w-full flex items-center justify-center">
        <div className="bg-[#111214] aspect-video w-[38%] rounded-xl p-5 flex flex-col items-center justify-center gap-6">
          <h1 className="font-OpenSans-SemiBold text-2xl tracking-wide">
            Login to your account
          </h1>
          <form className="flex flex-col gap-4 w-[80%]" onSubmit={handleSubmit}>
            <div>
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className=" rounded-md bg-gradient-to-r from-[#4B63DD] to-[#0524BF] font-OpenSans-SemiBold px-6 p-3"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Login"
              )}
            </button>

            <OAuth text="Sign In with Google" navigateTo="/" />
          </form>
          <p className=" font-OpenSans-Medium"> OR</p>

          <h1 className=" font-OpenSans-Regular text-[#909296]">
            Don`t have an account?{" "}
            <Link to="/sign-up">
              <span className="text-white hover:underline cursor-pointer">
                Sign Up
              </span>
            </Link>{" "}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
