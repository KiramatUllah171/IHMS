
using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.admindetailinfo.Controllers
{
    [RouteArea("admindetailinfo")]
    public class AccountController : Controller
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult SignUp()
        {
            return View();
        }
        [HttpPost]
        public ActionResult SignUp(Admin adm, HttpPostedFileBase MyImage)
        {
            if (MyImage != null || adm.Image == null)
            {
                string imgname = Guid.NewGuid() + MyImage.FileName;
                MyImage.SaveAs(Server.MapPath("~/UploadImage/") + imgname);
                adm.Image = imgname;
            }
            db.Admin.Add(adm);
            db.SaveChanges();
            return View();
        }

        [HttpGet]
        public ActionResult LogIn()
        {
            return View();
        }
        [HttpPost]
        public ActionResult LogIn(Admin adm)
        {
            adm = db.Admin.Where(x => x.Email == adm.Email && x.Password == adm.Password).FirstOrDefault();
            if (adm != null)
            {
                Session["AdminId"] = adm.AdminId;
                Session["Name"] = adm.Name;
                Session["Email"] = adm.Email;
                Session["Image"] = adm.Image;
                return Json(new { msg = true, JsonRequestBehavior.AllowGet });
            }
            else
            {
                return Json(new { msg = false, JsonRequestBehavior.AllowGet });
            }
            // return View();
        }

        [HttpGet]
        public ActionResult GetRoomData()
        {
            return Json(db.Room.ToList(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ForgotPassword(Admin obj)
        {
            Admin adm = db.Admin.Where(x => x.Email == obj.Email).FirstOrDefault();
            if (adm != null)
            {
                string msg = "Please reset your password by clicking the Link 👉👉<a href='https://localhost:44369/admindetailinfo/Account/Reset?email='" + adm.Email + ">Reset Password</a>";
                bool IsSend = EmailSender.SendEmail(adm.Email, msg, "Forget Password");
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
            Admin adm = new Admin();
            adm.Email = email;
            return View(adm);
        }

        [HttpPost]
        public ActionResult Reset(Admin obj)
        {
            Admin adm = db.Admin.Where(x => x.Email == obj.Email).FirstOrDefault();
            if (adm != null)
            {
                adm.Password = obj.Password;
                db.Entry(adm).State = System.Data.Entity.EntityState.Modified;
                string msg = "Dear <b>" + adm.Name + "</b><br>Your Email = <b>" + adm.Email + "</b><br>Your new Password = <b>" + adm.Password + "</b><br>";
                bool IsSend = EmailSender.SendEmail(adm.Email, msg, "Reset Password");
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