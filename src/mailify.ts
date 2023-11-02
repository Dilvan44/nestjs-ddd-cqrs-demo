export const mailifyApi = {
  sendMail: async (mailConfig: {
    to: string;
    subject: string;
    body: string;
  }) => {
    // send mail
    console.log(
      `Mail sent to ${mailConfig.to} with subject ${mailConfig.subject} and body ${mailConfig.body}`,
    );
  },
};
