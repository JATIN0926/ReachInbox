import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  from: {
    type: String,  // Email address of the sender
    required: true,
  },
  to: {
    type: String,  // Email address of the recipient
    required: true,
  },
  subject: {
    type: String,  // Subject of the email
    required: true,
  },
  body: {
    type: String,  // HTML content of the email
    required: true,
  },
  status: {
    type: String,  
  },
  isRead: {
    type: Boolean,
    default: false
  }
  user: {
    type: mongoose.Schema.Types.ObjectId,  // Reference to the user who owns this message
    ref: 'User',
    required: true,
  }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

export default Message;
