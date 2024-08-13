import Message from "../models/message.model.js";
import User from "../models/user.model.js";

export const sendMail = async (req, res) => {
  try {
    const { to, subject, body } = req.body;
    const fromUserId = req.user.id;

    const recipient = await User.findOne({ email: to });
    if (!recipient) {
      console.error(`Recipient not found for email: ${to}`);
      return res.status(404).json({ error: "Recipient not found" });
    }

    const newMessage = await Message.create({
      from: fromUserId,
      to: recipient._id,
      subject,
      body,
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
