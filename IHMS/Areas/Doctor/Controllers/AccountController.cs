using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MailKit.Net.Smtp;
using System.Net.Mail;
using MimeKit;
using System.Net;

namespace IHMS.Areas.Doctor.Controllers
{
    [RouteArea("Doctor")]
    public class AccountController : Controller
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult SignIn()
        {
            return View();
        }
        [HttpPost]
        public ActionResult SignIn(Doctors d)
        {
            d = db.Doctors.Where(x => x.Email == d.Email && x.Password == d.Password).FirstOrDefault();
            if (d != null)
            {
                Session["DoctorId"] = d.DoctorId;
                Session["DoctorName"] = d.DoctorName;
                Session["Email"] = d.Email;
                Session["Image"] = d.Image;
                return Json(new { msg = true, JsonRequestBehavior.AllowGet });
            }
            else
            {
                return Json(new { msg = false, JsonRequestBehavior.AllowGet });
            }
        }

        [HttpGet]
        public ActionResult GetdoctData()
        {
            return Json(db.Doctors.ToList(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ForgotPassword(Doctors obj)
        {
            Doctors doc = db.Doctors.Where(x => x.Email == obj.Email).FirstOrDefault();
            if (doc != null)
            {
                string msg = "Please reset your password by clicking the Link 👉👉<a href='https://localhost:44369/Doctor/Account/Reset?email='" + doc.Email + ">Reset Password</a>";
                bool IsSend = EmailSender.SendEmail(doc.Email, msg, "Forget Password");
                db.SaveChanges();
                return Json(new { msg = true, JsonRequestBehavior.AllowGet });
            }
            else
            {
                return Json(new { msg = false, JsonRequestBehavior.AllowGet });
                 //ViewBag.msg = "No user found with that email";
            }
            //return View();
        }

        [HttpGet]
        public ActionResult Reset(string email)
        {
            Doctors doc = new Doctors();
            doc.Email = email;
            return View(doc);
        }

        [HttpPost]
        public ActionResult Reset(Doctors obj)
        {
          Doctors doc= db.Doctors.Where(x => x.Email == obj.Email).FirstOrDefault();
            if (doc != null)
            {
                doc.Password = obj.Password;
                db.Entry(doc).State = System.Data.Entity.EntityState.Modified;
                string msg = "Dear <b>" + doc.DoctorName + "</b><br>Your Email = <b>" + doc.Email + "</b><br>Your new Password = <b>" + doc.Password + "</b><br>";
                bool IsSend = EmailSender.SendEmail(doc.Email, msg, "Reset Password");
                db.SaveChanges();
                return Json(new { msg = true, JsonRequestBehavior.AllowGet });
            }
            else
            {
                return Json(new { msg = false, JsonRequestBehavior.AllowGet });
            }
        }
    }
}