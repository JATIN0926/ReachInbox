import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const sendMail = async (req, res) => {
  try {
    const { to, subject, body, status = null } = req.body;
    const fromUserId = req.user.id;

    const recipient = await User.findOne({ email: to });
    if (!recipient) {
      console.error(`Recipient not found for email: ${to}`);
      return res.status(404).json({ message: "Recipient not found" });
    }

    if (recipient._id.toString() === fromUserId) {
      return res
        .status(404)
        .json({ message: "Cannot send Email to yourself!" });
    }

    const newMessage = await Message.create({
      from: fromUserId,
      to: recipient._id,
      subject,
      body,
      status,
    });

    await User.findByIdAndUpdate(fromUserId, {
      $push: { inboxes: newMessage._id },
    });

    await User.findByIdAndUpdate(recipient._id, {
      $push: { inboxes: newMessage._id },
    });

    res.status(200).json({ message: "Mail sent successfully" });
  } catch (error) {
    console.error("Error while sending mail:", error);
    res.status(500).json({ error: "Failed to send mail" });
  }
};

export const getInbox = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: "inboxes",
      populate: [
        { path: "from", select: "email username contactNo company" },
        { path: "to", select: "email username contactNo company" },
      ],
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    // Filter and sort emails by creation date (newest first)
    const inboxEmails = user.inboxes
      .filter((email) => email.to._id.toString() === userId)
      .sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json(inboxEmails);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve inbox emails" });
  }
};

export const getSentEmails = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).populate({
      path: "inboxes",
      populate: [
        { path: "from", select: "email username contactNo company" },
        { path: "to", select: "email username contactNo company" },
      ],
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    // Filter and sort emails by creation date (newest first)
    const sentEmails = user.inboxes
      .filter((email) => email.from._id.toString() === userId)
      .sort((a, b) => b.createdAt - a.createdAt);

    res.status(200).json(sentEmails);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve sent emails" });
  }
};


export const updateMailStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const message = await Message.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

export const sendReply = async (req, res) => {
  console.log(req.body);
  const { to, subject, body, replyTo } = req.body;
  try {
    const newMessage = new Message({
      from: req.user.id,
      to,
      subject,
      body,
      replyTo,
    });
    await newMessage.save();
    res.status(201).json({ message: "Reply sent successfully", newMessage });
  } catch (error) {
    res.status(500).json({ message: "Failed to send reply", error });
  }
};

export const getReplies = async (req, res) => {
  const { mailId } = req.params;

  console.log("entered into controller",mailId)

  try {
    // Fetch replies where the `replyTo` field contains the `mailId`
    const replies = await Message.find({ replyTo: mailId }).populate([
      { path: "from", select: "email username contactNo company" },
      { path: "to", select: "email username contactNo company" },
    ]);

    console.log(replies)
    res.status(200).json(replies);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch replies" });
  }
};


export const deleteMail = async (req,res)=>{
  const { mailId } = req.params;

  try {
    const deletedMail = await Message.findByIdAndDelete(mailId);

    if (!deletedMail) {
      return res.status(404).json({ message: 'Mail not found' });
    }

    res.status(200).json({ message: 'Mail deleted successfully' });
  } catch (error) {
    console.error('Failed to delete mail', error);
    res.status(500).json({ message: 'Server error' });
  }
}