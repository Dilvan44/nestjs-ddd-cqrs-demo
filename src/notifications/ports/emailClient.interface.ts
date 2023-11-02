export type IEmailClient = {
  sendWelcomeEmail: (to: string) => Promise<void>;
  sendWellDoneEmail: (to: string) => Promise<void>;
};
