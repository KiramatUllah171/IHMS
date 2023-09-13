using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using System.Web;

namespace IHMS.Models
{
    public class EmailSender
    {
        public static bool SendEmail(string email, string msg, string subject)
        {
            bool isSend = false;
            try
            {
                var body = msg;
                var message = new MailMessage();
                message.To.Add(new MailAddress(email));
                message.From = new MailAddress("your email");
                message.Body = msg;
                message.Subject = !string.IsNullOrEmpty(subject) ? subject : "User Query";
                message.IsBodyHtml = true;
                using (var smtp = new SmtpClient())
                {
                    var credential = new NetworkCredential
                    {
                        UserName = "your email",
                        Password = "your password"
                    };
                    smtp.Credentials = credential;
                    smtp.Host = "your host  name";
                    smtp.Port = Convert.ToInt32("25");
                    smtp.EnableSsl = false;
                    smtp.Send(message);
                    isSend = true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return isSend;
        }

    }
}
