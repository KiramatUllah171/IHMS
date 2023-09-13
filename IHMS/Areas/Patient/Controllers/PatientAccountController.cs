using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.Patient.Controllers
{
    [RouteArea("Patient")]
    public class PatientAccountController : Controller
    {
        AppDbContext db = new AppDbContext();
        void joindata()
        {
            SelectList list = new SelectList(
                new List<SelectListItem>
                {
                     new SelectListItem{Selected=true,Text="Married",Value="1"},
                    new SelectListItem{Selected=false,Text="UnMarried",Value="0"}
                }, "Value", "Text");
            ViewBag.maitialstatus = list;
            SelectList glist = new SelectList(
                new List<SelectListItem>
                {
                    new SelectListItem{Selected=true,Text="Male",Value="1"},
                    new SelectListItem{Selected=false,Text="Female",Value="0"}
                }, "Value", "Text");
            ViewBag.gender = glist;
        }
        [HttpGet]
        // GET: Patient/PatientAccount
        public ActionResult SignUp()
        {
            joindata();
            return View();
        }
        [HttpPost]
        public ActionResult SignUp(tblPatient p)
        {
            joindata();
            db.Patient.Add(p);
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult SignIn()
        {
            return View();
        }
        [HttpPost]
        public ActionResult SignIn(tblPatient p)
        {
            p = db.Patient.Where(x => x.Email == p.Email && x.Password == p.Password).FirstOrDefault();
            if (p != null) 
            {
                Session["PatientId"] = p.PatientId;
                Session["Name"] = p.Name;
                Session["gmail"] = p.Email;
                return Json(new { msg = true, JsonRequestBehavior.AllowGet });
            }
            else
            {
                return Json(new { msg = false, JsonRequestBehavior.AllowGet });
            }
        }

        [HttpGet]
        public ActionResult GetData()
        {
            return Json(db.Patient.ToList(),JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        [HttpPost]
        public ActionResult ForgotPassword(tblPatient obj)
        {
            tblPatient pt = db.Patient.Where(x => x.Email == obj.Email).FirstOrDefault();
            if (pt != null)
            {
                string msg = "Please reset your password by clicking the Link 👉👉<a href='https://localhost:44369/Patient/PatientAccount/Reset?email='" + pt.Email + ">Reset Password</a>";
                bool IsSend = EmailSender.SendEmail(pt.Email, msg, "Forget Password");
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
            tblPatient pt = new tblPatient();
            pt.Email = email;
            return View(pt);
        }

        [HttpPost]
        public ActionResult Reset(tblPatient obj)
        {
            tblPatient pt = db.Patient.Where(x => x.Email == obj.Email).FirstOrDefault();
            if (pt != null)
            {
                pt.Password = obj.Password;
                db.Entry(pt).State = System.Data.Entity.EntityState.Modified;
                string msg = "Dear <b>" + pt.Name + "</b><br>Your Email = <b>" + pt.Email + "</b><br>Your new Password = <b>" + pt.Password + "</b><br>";
                bool IsSend = EmailSender.SendEmail(pt.Email, msg, "Reset Password");
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