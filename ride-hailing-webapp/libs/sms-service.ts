import { Twilio } from "twilio";

// Replace these values with your Twilio Account SID and Auth Token
const accountSid = "AC4dbedd6286dc79b8013a198d645b791f";
const authToken = "3e64a281146569d1320d378353954af6";
const twilioNumber = "+16562188048";

// Create a Twilio client instance
const client = new Twilio(accountSid, authToken);

const sendSMS = (phone: string) => {
  const messageOptions = {
    body: "Xe của bạn đã được đặt, hãy chờ cuộc gọi xác nhận từ tài xế.",
    to: phone,
    from: twilioNumber,
  };

  client.messages
    .create(messageOptions)
    .then((message: any) => {
      console.log(`Message sent with SID: ${message.sid}`);
    })
    .catch((error: any) => {
      console.error(`Error sending message: ${error}`);
    });
};

export default sendSMS
