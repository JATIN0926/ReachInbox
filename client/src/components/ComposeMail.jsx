import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const ComposeMail = () => {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    body: "",
  });

  
  const { currentUser } = useSelector((state) => state.user);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/v1/onebox/send", formData,  { withCredentials: true });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error("Failed to send mail");
    }
  };

  return (
    <div className="text-white text-2xl absolute right-0 top-[13%] w-[95%] h-[87vh] max-h-[90vh]">
      <div className="flex justify-center items-center h-full w-full">
        <form
          className="w-[70%] h-[80%] bg-[#141517] flex flex-col rounded-lg gap-1"
          onSubmit={handleSubmit}
        >
          <div className="w-full h-[10%] bg-[#23272C] rounded-lg flex items-center justify-start px-4">
            <p className="text-start text-[#BAB9BD] text-base font-OpenSans-Bold tracking-wide">
              Send Mail
            </p>
          </div>
          <div className="w-full py-1.5 px-8 font-OpenSans-SemiBold text-[#E7E7E7] text-lg border-b-[1px] border-b-[#34383D] flex items-center justify-center gap-1">
            <span className="text-[#BAB9BD] font-OpenSans-Regular">To: </span>
            <input
              type="text"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="bg-transparent border-none outline-none w-full"
            />
          </div>
          <div className="w-full py-1.5 px-8 font-OpenSans-SemiBold text-[#E7E7E7] text-lg border-b-[1px] border-b-[#34383D]">
            <span className="text-[#BAB9BD] font-OpenSans-Regular">From: </span>
            {currentUser.email}
          </div>
          <div className="w-full py-1.5 px-8 font-OpenSans-SemiBold text-[#E7E7E7] text-lg border-b-[1px] border-b-[#34383D] flex items-center justify-center gap-1">
            <span className="text-[#BAB9BD] font-OpenSans-Regular">
              Subject:{" "}
            </span>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              className="bg-transparent border-none outline-none w-full"
            />
          </div>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            placeholder="Write Something..."
            className="h-[55%] w-full bg-transparent px-8 font-OpenSans-SemiBold resize-none border-b-[1px] border-b-[#34383D]"
          ></textarea>
          <button
            type="submit"
            className="my-3 rounded-md bg-gradient-to-r from-[#4B63DD] to-[#0524BF] font-OpenSans-SemiBold px-6 p-2 w-[15%] self-center"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ComposeMail;
