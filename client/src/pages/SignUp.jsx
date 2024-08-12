import { Link, useNavigate } from "react-router-dom";
import {  Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import axios from "axios"
import toast from "react-hot-toast";
const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return toast.error("All fields are required!")
    }
    try {
      setLoading(true);
      const {data} = await axios.post("/api/auth/signup",formData);

      console.log(data)
      if (data.success === false) {
        return toast.error("Something went wrong!")
      }
      setLoading(false);
      toast.success("Signup Successfull!")
      navigate("/sign-in")
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong!")
      setLoading(false);
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
            Create a new account
          </h1>
          <form className="flex flex-col gap-4 w-[80%]" onSubmit={handleSubmit}>
            <div>
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                className="!bg-transparent w-full"
                color="gray"
                onChange={handleChange}
              />
            </div>
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
            
              <button type="submit" className=" rounded-md bg-gradient-to-r from-[#4B63DD] to-[#0524BF] font-OpenSans-SemiBold px-6 p-3">
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Create an Account"
              )}
              </button>
  
            {/* <OAuth /> */}
          </form>
          <p className=" font-OpenSans-Medium"> OR</p>
          <div className="w-[80%] cursor-pointer h-[3rem] border-[1px] border-[#707172] bg-transparent rounded-md flex items-center justify-center gap-2">
            <div className=" aspect-square w-6 relative">
              <img
                src="/icons/google.webp"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <p className=" font-OpenSans-Regular">Sign Up with Google</p>
          </div>

          <h1 className=" font-OpenSans-Regular text-[#909296]">
            Already have an account?{" "}
            <Link to="/sign-in">
              <span className="text-white hover:underline cursor-pointer">
                Sign In
              </span>
            </Link>{" "}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
