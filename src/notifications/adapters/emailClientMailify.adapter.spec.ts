import { mailifyApi } from '../../mailify';
import { userFixture } from '../../user_context/interfaces/user-dto.fixture';
import { EmailClientMailify } from './emailClientMailify.adapter';

describe('Email Client Mailify', () => {
  const emailClient = new EmailClientMailify();
  it('should send a welcome email to the user', async () => {
    const fakeUser = userFixture;

    jest.spyOn(mailifyApi, 'sendMail').mockImplementationOnce((mailConfig) => {
      console.log('mailConfig', mailConfig);
      return Promise.resolve();
    });

    await emailClient.sendWelcomeEmail(fakeUser.email);
    expect(mailifyApi.sendMail).toHaveBeenCalledWith({
      to: fakeUser.email,
      subject: 'Welcome to our app',
      body: `Welcome ${fakeUser.email}!`,
    });
  });
});
