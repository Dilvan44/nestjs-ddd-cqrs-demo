import { Injectable } from '@nestjs/common';
import { mailifyApi } from '../../mailify';
import { IEmailClient } from '../ports/emailClient.interface';

@Injectable()
export class EmailClientMailify implements IEmailClient {
  async sendWelcomeEmail(to) {
    // Send welcome email to the user
    mailifyApi.sendMail({
      to: to,
      subject: 'Welcome to our app',
      body: `Welcome ${to}!`,
    });
  }

  async sendWellDoneEmail(to) {
    // Send well done email to the user
    mailifyApi.sendMail({
      to: to,
      subject: 'Well done!',
      body: `Well done you have completed Ten Tasks ${to}!`,
    });
  }
}
