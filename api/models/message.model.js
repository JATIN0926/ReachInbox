import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    isRead: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ["Meeting Completed", "Interested", "Closed", "Meeting Booked"],
      default: null 
    },
    replyTo: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message',
      default: null
    }]    
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
