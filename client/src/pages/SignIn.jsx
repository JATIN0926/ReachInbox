import { Link } from "react-router-dom";

const SignUp = () => {
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
          <div className="w-[80%] cursor-pointer h-[3rem] border-[1px] border-[#707172] bg-transparent rounded-md flex items-center justify-center gap-2">
            <div className=" aspect-square w-6 relative">
              <img
                src="/icons/google.webp"
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
            <p className=" font-OpenSans-Regular">Sign In with Google</p>
          </div>
          <button className=" rounded-md bg-gradient-to-r from-[#4B63DD] to-[#0524BF] font-OpenSans-SemiBold px-6 p-3">Login</button>
          <h1 className=" font-OpenSans-Regular text-[#909296]">Don`t have an account? <Link to="/sign-up"><span className="text-white hover:underline cursor-pointer">Sign Up</span></Link></h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
