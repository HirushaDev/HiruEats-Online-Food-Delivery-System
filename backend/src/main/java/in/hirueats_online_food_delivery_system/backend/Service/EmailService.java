package in.hirueats_online_food_delivery_system.backend.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    public void sendWelcomeEmail(String toEmail, String name) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("Welcome to HiruEats! 🍔 Let's Start Your Food Journey");
            helper.setFrom(fromEmail);

            String htmlContent = "<!DOCTYPE html>" +
                    "<html>" +
                    "<head>" +
                    "<style>" +
                    "    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }"
                    +
                    "    .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }"
                    +
                    "    .header { background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 30px; text-align: center; }"
                    +
                    "    .header h1 { margin: 0; color: white; font-size: 28px; letter-spacing: 1px; }" +
                    "    .header p { margin: 10px 0 0; color: #fff3e0; font-size: 14px; }" +
                    "    .content { padding: 40px 30px; }" +
                    "    .welcome-text { font-size: 24px; color: #333; margin-bottom: 20px; }" +
                    "    .highlight { color: #ff6b35; font-weight: bold; }" +
                    "    .offer-card { background: linear-gradient(135deg, #000000, #000000); border-left: 4px solid #ff6b35; padding: 20px; margin: 25px 0; border-radius: 8px; }"
                    +
                    "    .offer-code { background: #ff6b35; color: white; padding: 8px 16px; border-radius: 6px; font-family: monospace; font-size: 18px; font-weight: bold; display: inline-block; letter-spacing: 2px; }"
                    +
                    "    .features { display: flex; justify-content: space-between; margin: 30px 0; }" +
                    "    .feature { text-align: center; flex: 1; }" +
                    "    .feature-icon { font-size: 32px; margin-bottom: 10px; }" +
                    "    .feature-text { font-size: 12px; color: #666; }" +
                    "    .btn { display: inline-block; background: #ff6b35; color: white; padding: 14px 35px; text-decoration: none; border-radius: 50px; font-weight: bold; margin: 20px 0; transition: all 0.3s; }"
                    +
                    "    .btn:hover { background: #e55a2b; transform: translateY(-2px); }" +
                    "    .footer { background: #2c2c2c; color: #999; padding: 20px; text-align: center; font-size: 12px; }"
                    +
                    "    .social-links { margin: 15px 0; }" +
                    "    .social-links a { color: #ff6b35; text-decoration: none; margin: 0 10px; }" +
                    "    hr { border: none; border-top: 1px solid #eee; margin: 20px 0; }" +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<div class='container'>" +
                    "    <div class='header'>" +
                    "        <h1>🍕 HiruEats</h1>" +
                    "        <p>Online Food Delivery System</p>" +
                    "    </div>" +
                    "    <div class='content'>" +
                    "        <div class='welcome-text'>Welcome aboard, <span class='highlight'>" + name
                    + "</span>! 👋</div>" +
                    "        <p style='color: #555; line-height: 1.6;'>Thank you for joining <strong>HiruEats</strong> – your ultimate destination for delicious meals delivered right to your doorstep. We're thrilled to have you as part of our foodie family!</p>"
                    +
                    "        " +
                    "        <div class='offer-card'>" +
                    "            <div style='font-size: 20px; font-weight: bold; margin-bottom: 10px;'>🎉 Exclusive Welcome Offer!</div>"
                    +
                    "            <p style='margin: 10px 0;'>Get <strong>20% OFF</strong> on your first order (up to $10)</p>"
                    +
                    "            <div class='offer-code'>WELCOME20</div>" +
                    "            <p style='font-size: 12px; margin-top: 10px;'>*Valid for first-time orders. Minimum order $15.</p>"
                    +
                    "        </div>" +
                    "        " +
                    "        <div class='features'>" +
                    "            <div class='feature'>" +
                    "                <div class='feature-icon'>🚚</div>" +
                    "                <div class='feature-text'>Free Delivery<br>on $25+</div>" +
                    "            </div>" +
                    "            <div class='feature'>" +
                    "                <div class='feature-icon'>⏱️</div>" +
                    "                <div class='feature-text'>30-Min Delivery<br>or It's Free</div>" +
                    "            </div>" +
                    "            <div class='feature'>" +
                    "                <div class='feature-icon'>🎁</div>" +
                    "                <div class='feature-text'>Rewards Points<br>on Every Order</div>" +
                    "            </div>" +
                    "        </div>" +
                    "        " +
                    "        <div style='text-align: center;'>" +
                    "            <a href='https://hirueats.com/order' class='btn'>🍽️ Start Ordering Now →</a>" +
                    "        </div>" +
                    "        " +
                    "        <hr>" +
                    "        <p style='color: #666; font-size: 14px; text-align: center;'><strong>What's next?</strong></p>"
                    +
                    "        <ul style='color: #555; font-size: 14px; line-height: 1.8;'>" +
                    "            <li>✅ Complete your profile for personalized recommendations</li>" +
                    "            <li>✅ Add your delivery address for faster checkout</li>" +
                    "            <li>✅ Explore 200+ restaurants near you</li>" +
                    "            <li>✅ Download our mobile app for exclusive deals</li>" +
                    "        </ul>" +
                    "    </div>" +
                    "    <div class='footer'>" +
                    "        <p>📍 Delivery across Colombo & Suburbs</p>" +
                    "        <p>📞 Customer Support: +94 77 695 7704 | 📧 hirueatsfood.com</p>" +
                    "        <div class='social-links'>" +
                    "            <a href='#'>Facebook</a> | " +
                    "            <a href='#'>Instagram</a> | " +
                    "            <a href='#'>Twitter</a>" +
                    "        </div>" +
                    "        <p style='margin-top: 15px;'>&copy; 2026 HiruEats. All rights reserved.<br>" +
                    "        <small>You received this email because you registered on HiruEats.</small></p>" +
                    "        <p><small><a href='{{unsubscribe_link}}' style='color: #ff6b35;'>Unsubscribe</a></small></p>"
                    +
                    "    </div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            helper.setText(htmlContent, true);
            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            e.printStackTrace();
            // Log error and handle appropriately
            throw new RuntimeException("Failed to send welcome email to: " + toEmail, e);
        }
    }

    public void sendResetOtpEmail(String toEmail, String name, String otp) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("🔐 Password Reset Request - HiruEats");
            helper.setFrom(fromEmail);

            String htmlContent = "<!DOCTYPE html>" +
                    "<html>" +
                    "<head>" +
                    "<style>" +
                    "    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }"
                    +
                    "    .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }"
                    +
                    "    .header { background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 30px; text-align: center; }"
                    +
                    "    .header h1 { margin: 0; color: white; font-size: 28px; letter-spacing: 1px; }" +
                    "    .header p { margin: 10px 0 0; color: #fff3e0; font-size: 14px; }" +
                    "    .content { padding: 40px 30px; }" +
                    "    .reset-text { font-size: 24px; color: #333; margin-bottom: 20px; }" +
                    "    .highlight { color: #ff6b35; font-weight: bold; }" +
                    "    .warning-card { background: #fff5f0; border-left: 4px solid #ff6b35; padding: 20px; margin: 25px 0; border-radius: 8px; }"
                    +
                    "    .otp-code { background: #ff6b35; color: white; padding: 12px 24px; border-radius: 8px; font-family: monospace; font-size: 32px; font-weight: bold; display: inline-block; letter-spacing: 4px; text-align: center; }"
                    +
                    "    .timer-note { background: #fef3c7; padding: 12px; border-radius: 6px; margin: 20px 0; text-align: center; font-size: 14px; color: #92400e; }"
                    +
                    "    .btn { display: inline-block; background: #ff6b35; color: white; padding: 14px 35px; text-decoration: none; border-radius: 50px; font-weight: bold; margin: 20px 0; transition: all 0.3s; }"
                    +
                    "    .btn:hover { background: #e55a2b; transform: translateY(-2px); }" +
                    "    .footer { background: #2c2c2c; color: #999; padding: 20px; text-align: center; font-size: 12px; }"
                    +
                    "    .social-links { margin: 15px 0; }" +
                    "    .social-links a { color: #ff6b35; text-decoration: none; margin: 0 10px; }" +
                    "    hr { border: none; border-top: 1px solid #eee; margin: 20px 0; }" +
                    "    .security-note { background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 13px; color: #0369a1; }"
                    +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<div class='container'>" +
                    "    <div class='header'>" +
                    "        <h1>🍕 HiruEats</h1>" +
                    "        <p>Online Food Delivery System</p>" +
                    "    </div>" +
                    "    <div class='content'>" +
                    "        <div class='reset-text'>Password Reset Request, <span class='highlight'>" + name
                    + "</span>! 🔐</div>" +
                    "        <p style='color: #555; line-height: 1.6;'>We received a request to reset the password for your <strong>HiruEats</strong> account. Use the OTP below to complete the password reset process.</p>"
                    +
                    "        " +
                    "        <div class='warning-card'>" +
                    "            <div style='font-size: 18px; font-weight: bold; margin-bottom: 15px; text-align: center;'>🔑 Your One-Time Password (OTP)</div>"
                    +
                    "            <div style='text-align: center; margin: 20px 0;'>" +
                    "                <div class='otp-code'>" + otp + "</div>" +
                    "            </div>" +
                    "            <div class='timer-note'>" +
                    "                ⏰ This OTP is valid for <strong>5 minutes</strong> from the time of this email.<br>"
                    +
                    "                For security reasons, do not share this OTP with anyone." +
                    "            </div>" +
                    "        </div>" +
                    "        " +
                    "        <div style='text-align: center;'>" +
                    "            <a href='https://hirueats.com/reset-password' class='btn'>🔄 Proceed to Reset Password →</a>"
                    +
                    "        </div>" +
                    "        " +
                    "        <div class='security-note'>" +
                    "            <strong>🛡️ Didn't request this?</strong><br>" +
                    "            If you didn't request a password reset, please ignore this email or contact our support team immediately. Your password remains secure unless you click the link above and create a new password."
                    +
                    "        </div>" +
                    "        " +
                    "        <hr>" +
                    "        <p style='color: #666; font-size: 14px; text-align: center;'><strong>Security Tips:</strong></p>"
                    +
                    "        <ul style='color: #555; font-size: 14px; line-height: 1.8;'>" +
                    "            <li>✅ Never share your OTP with anyone, even if they claim to be from HiruEats</li>" +
                    "            <li>✅ Create a strong, unique password for your account</li>" +
                    "            <li>✅ Enable two-factor authentication for extra security</li>" +
                    "            <li>✅ Always verify you're on the official HiruEats website</li>" +
                    "        </ul>" +
                    "    </div>" +
                    "    <div class='footer'>" +
                    "        <p>📍 Delivery across Colombo & Suburbs</p>" +
                    "        <p>📞 Customer Support: +94 77 695 7704 | 📧 support@hirueats.com</p>" +
                    "        <div class='social-links'>" +
                    "            <a href='#'>Facebook</a> | " +
                    "            <a href='#'>Instagram</a> | " +
                    "            <a href='#'>Twitter</a>" +
                    "        </div>" +
                    "        <p style='margin-top: 15px;'>&copy; 2026 HiruEats. All rights reserved.<br>" +
                    "        <small>This is an automated message, please do not reply directly to this email.</small></p>"
                    +
                    "        <p><small><a href='{{unsubscribe_link}}' style='color: #ff6b35;'>Unsubscribe</a></small></p>"
                    +
                    "    </div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            helper.setText(htmlContent, true);
            javaMailSender.send(mimeMessage);

        } catch (MessagingException e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to send password reset OTP email to: " + toEmail, e);
        }
    }

    public void sendOtpEmail(String toEmail, String name, String otp) {
        System.out.println(" [sendOtpEmail] Starting email to: " + toEmail + " | Name: " + name + " | OTP: " + otp);
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();

        try {
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("✅ Your Verification Code - HiruEats");
            helper.setFrom(fromEmail);
            System.out.println("📧 [sendOtpEmail] From: " + fromEmail + " | To: " + toEmail);

            String htmlContent = "<!DOCTYPE html>" +
                    "<html>" +
                    "<head>" +
                    "<style>" +
                    "    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }"
                    +
                    "    .container { max-width: 600px; margin: 20px auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }"
                    +
                    "    .header { background: linear-gradient(135deg, #ff6b35, #f7931e); padding: 30px; text-align: center; }"
                    +
                    "    .header h1 { margin: 0; color: white; font-size: 28px; letter-spacing: 1px; }" +
                    "    .header p { margin: 10px 0 0; color: #fff3e0; font-size: 14px; }" +
                    "    .content { padding: 40px 30px; }" +
                    "    .verify-text { font-size: 24px; color: #333; margin-bottom: 20px; }" +
                    "    .highlight { color: #ff6b35; font-weight: bold; }" +
                    "    .verify-card { background: #f0fff4; border-left: 4px solid #22c55e; padding: 20px; margin: 25px 0; border-radius: 8px; }"
                    +
                    "    .otp-code { background: #22c55e; color: white; padding: 12px 24px; border-radius: 8px; font-family: monospace; font-size: 32px; font-weight: bold; display: inline-block; letter-spacing: 4px; text-align: center; }"
                    +
                    "    .timer-note { background: #fef3c7; padding: 12px; border-radius: 6px; margin: 20px 0; text-align: center; font-size: 14px; color: #92400e; }"
                    +
                    "    .btn { display: inline-block; background: #22c55e; color: white; padding: 14px 35px; text-decoration: none; border-radius: 50px; font-weight: bold; margin: 20px 0; transition: all 0.3s; }"
                    +
                    "    .btn:hover { background: #16a34a; transform: translateY(-2px); }" +
                    "    .footer { background: #2c2c2c; color: #999; padding: 20px; text-align: center; font-size: 12px; }"
                    +
                    "    .social-links { margin: 15px 0; }" +
                    "    .social-links a { color: #ff6b35; text-decoration: none; margin: 0 10px; }" +
                    "    hr { border: none; border-top: 1px solid #eee; margin: 20px 0; }" +
                    "    .benefits-note { background: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0; font-size: 13px; color: #0369a1; }"
                    +
                    "</style>" +
                    "</head>" +
                    "<body>" +
                    "<div class='container'>" +
                    "    <div class='header'>" +
                    "        <h1>🍕 HiruEats</h1>" +
                    "        <p>Online Food Delivery System</p>" +
                    "    </div>" +
                    "    <div class='content'>" +
                    "        <div class='verify-text'>Welcome! ✅</div>" +
                    "        <p style='color: #555; line-height: 1.6;'>Thank you for creating an account with <strong>HiruEats</strong>. Please verify your email address to complete your registration and start ordering delicious food!</p>"
                    +
                    "        " +
                    "        <div class='verify-card'>" +
                    "            <div style='font-size: 18px; font-weight: bold; margin-bottom: 15px; text-align: center;'>🔑 Your Verification Code</div>"
                    +
                    "            <div style='text-align: center; margin: 20px 0;'>" +
                    "                <div class='otp-code'>" + otp + "</div>" +
                    "            </div>" +
                    "            <div class='timer-note'>" +
                    "                ⏰ This OTP is valid for <strong>24 Hours</strong> from the time of this email.<br>"
                    +
                    "                Enter this code on the verification page to activate your account." +
                    "            </div>" +
                    "        </div>" +
                    "        " +
                    "        <div style='text-align: center;'>" +
                    "            <a href='https://hirueats.com/verify' class='btn'>✅ Verify My Account →</a>" +
                    "        </div>" +
                    "        " +
                    "        <div class='benefits-note'>" +
                    "            <strong>🎁 What you get after verification:</strong><br>" +
                    "            • Full access to all restaurant menus<br>" +
                    "            • Exclusive welcome offer: 20% OFF your first order<br>" +
                    "            • Earn reward points on every purchase<br>" +
                    "            • Real-time order tracking and delivery updates" +
                    "        </div>" +
                    "        " +
                    "        <hr>" +
                    "        <p style='color: #666; font-size: 14px; text-align: center;'><strong>Why verify your email?</strong></p>"
                    +
                    "        <ul style='color: #555; font-size: 14px; line-height: 1.8;'>" +
                    "            <li>✅ Secure your account and recover password easily</li>" +
                    "            <li>✅ Receive order confirmations and delivery updates</li>" +
                    "            <li>✅ Get personalized restaurant recommendations</li>" +
                    "            <li>✅ Access exclusive deals and promotional offers</li>" +
                    "        </ul>" +
                    "        " +
                    "        <p style='color: #888; font-size: 13px; text-align: center; margin-top: 20px;'>" +
                    "            If you didn't create an account with HiruEats, please ignore this email." +
                    "        </p>" +
                    "    </div>" +
                    "    <div class='footer'>" +
                    "        <p>📍 Delivery across Colombo & Suburbs</p>" +
                    "        <p>📞 Customer Support: +94 77 695 7704 | 📧 support@hirueats.com</p>" +
                    "        <div class='social-links'>" +
                    "            <a href='#'>Facebook</a> | " +
                    "            <a href='#'>Instagram</a> | " +
                    "            <a href='#'>Twitter</a>" +
                    "        </div>" +
                    "        <p style='margin-top: 15px;'>&copy; 2026 HiruEats. All rights reserved.<br>" +
                    "        <small>This is an automated message, please do not reply directly to this email.</small></p>"
                    +
                    "        <p><small><a href='{{unsubscribe_link}}' style='color: #ff6b35;'>Unsubscribe</a></small></p>"
                    +
                    "    </div>" +
                    "</div>" +
                    "</body>" +
                    "</html>";

            helper.setText(htmlContent, true);
            System.out.println(" [sendOtpEmail] Sending email via SMTP...");
            javaMailSender.send(mimeMessage);
            System.out.println(" [sendOtpEmail] Email sent successfully to: " + toEmail);

        } catch (MessagingException e) {
            System.err.println("[sendOtpEmail] SMTP ERROR!");
            System.err.println("   To: " + toEmail);
            System.err.println("   From: " + fromEmail);
            System.err.println("   Error Message: " + e.getMessage());
            e.printStackTrace();
            throw new RuntimeException("Failed to send verification OTP email to: " + toEmail + " | Error: " + e.getMessage(), e);
        }
    }

}