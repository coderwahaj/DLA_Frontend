const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user:  process.env.EMAIL_USER,
        pass: process.env. EMAIL_PASSWORD
      }
    });
  }

  async sendEmail(to, subject, html) {
    try {
      const info = await this.transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html
      });

      console.log('Email sent:', info.messageId);
      return info;
    } catch (error) {
      console.error('Email error:', error);
      throw error;
    }
  }

  async sendVerificationEmail(email, token) {
    const verificationUrl = `${process.env. FRONTEND_URL}/verify-email? token=${token}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Email Verification</h2>
        <p>Thank you for registering with Digital Legal Advisor! </p>
        <p>Please click the button below to verify your email address:</p>
        <a href="${verificationUrl}" 
           style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; 
                  color: white; text-decoration: none; border-radius: 4px; margin:  16px 0;">
          Verify Email
        </a>
        <p>Or copy this link into your browser:</p>
        <p style="color: #666; word-break: break-all;">${verificationUrl}</p>
        <p>This link will expire in 24 hours.</p>
        <p>If you didn't create this account, please ignore this email. </p>
      </div>
    `;

    return this.sendEmail(email, 'Verify Your Email - Digital Legal Advisor', html);
  }

  async sendPasswordResetEmail(email, token) {
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
    
    const html = `
      <div style="font-family: Arial, sans-serif; max-width:  600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>You requested to reset your password for Digital Legal Advisor.</p>
        <p>Please click the button below to reset your password:</p>
        <a href="${resetUrl}" 
           style="display:  inline-block; padding: 12px 24px; background-color: #4F46E5; 
                  color: white; text-decoration: none; border-radius: 4px; margin:  16px 0;">
          Reset Password
        </a>
        <p>Or copy this link into your browser:</p>
        <p style="color: #666; word-break: break-all;">${resetUrl}</p>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email and your password will remain unchanged.</p>
      </div>
    `;

    return this.sendEmail(email, 'Password Reset - Digital Legal Advisor', html);
  }

  async sendWelcomeEmail(email, firstName) {
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome to Digital Legal Advisor! </h2>
        <p>Hi ${firstName},</p>
        <p>Welcome to Digital Legal Advisor - your trusted companion for Pakistani financial law assistance.</p>
        <p>You can now: </p>
        <ul>
          <li>Ask questions about financial laws</li>
          <li>Get legal document summaries</li>
          <li>Find relevant case precedents</li>
          <li>Access your query history</li>
        </ul>
        <p>Get started by visiting our platform and asking your first question! </p>
        <a href="${process.env.FRONTEND_URL}" 
           style="display: inline-block; padding:  12px 24px; background-color: #4F46E5; 
                  color:  white; text-decoration: none; border-radius: 4px; margin: 16px 0;">
          Go to Dashboard
        </a>
      </div>
    `;

    return this.sendEmail(email, 'Welcome to Digital Legal Advisor', html);
  }
}

module.exports = new EmailService();