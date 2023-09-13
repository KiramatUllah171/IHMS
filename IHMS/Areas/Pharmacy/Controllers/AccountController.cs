using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.Pharmacy.Controllers
{
    [RouteArea("Pharmacy")]
    public class AccountController : Controller
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult SignIn()
        {
            return View();
        }
        [HttpPost]
        public ActionResult SignIn(Pharmacist p)
        {
            p = db.Pharmacist.Where(x => x.Email == p.Email && x.Password == p.Password).FirstOrDefault();
            if (p != null) 
            {
                Session["PharmacistId"] = p.PharmacistId;
                Session["Image"] = p.Image;
                Session["Name"] = p.Name;
                Session["Email"] = p.Email;
                return Json(new { msg = true, JsonRequestBehavior.AllowGet });
            }
            else
            {
                return Json(new { msg = false, JsonRequestBehavior.AllowGet });
            }
        }

        [HttpGet]
        public ActionResult ManufacturerGet()
        {
            return Json(db.Manufacturer.ToList(), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult CategoryGet()
        {
            return Json(db.Category.ToList(), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult SubCategoryGet()
        {
            var model = (from S in db.SubCategory
                         join C in db.Category on S.CategoryId equals C.CategoryId
                         select new MyModel
                         {
                             MySubCategory = S,
                             MyCategory = C
                         }).ToList();
            return Json(model, JsonRequestBehavior.AllowGet);
            // return Json(db.SubCategory.ToList(), JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult unitGet()
        {
            return Json(db.Unit.ToList(), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ForgotPassword(Pharmacist obj)
        {
            Pharmacist p = db.Pharmacist.Where(x => x.Email == obj.Email).FirstOrDefault();
            if (p != null)
            {
                string msg = "Please reset your password by clicking the Link 👉👉<a href='https://localhost:44369/Pharmacy/Account/Reset?email='" + p.Email + ">Reset Password</a>";
                bool IsSend = EmailSender.SendEmail(p.Email, msg, "Forget Password");
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
            Pharmacist p = new Pharmacist();
            p.Email = email;
            return View(p);
        }

        [HttpPost]
        public ActionResult Reset(Pharmacist obj)
        {
            Pharmacist p = db.Pharmacist.Where(x => x.Email == obj.Email).FirstOrDefault();
            if (p != null)
            {
                p.Password = obj.Password;
                db.Entry(p).State = System.Data.Entity.EntityState.Modified;
                string msg = "Dear <b>" + p.Name + "</b><br>Your Email = <b>" + p.Email + "</b><br>Your new Password = <b>" + p.Password + "</b><br>";
                bool IsSend = EmailSender.SendEmail(p.Email, msg, "Reset Password");
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