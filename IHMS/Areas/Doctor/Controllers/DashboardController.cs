using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.Doctor.Controllers
{
    [RouteArea("Doctor")]
    public class DashboardController : DoctorBase
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult AddDashboard()
        {
            ViewBag.Schedulist = DoctorScheduleList(Convert.ToInt32(Session["DoctorId"]));
            ViewBag.AppointmentList = Appointment(Convert.ToInt32(Session["DoctorId"]));
            return View();
        }
        public dynamic DoctorScheduleList(int DId)
        {
            var data = (from D in db.DoctorSchedule
                        join Do in db.Doctors on D.DoctorId equals Do.DoctorId
                        select new MyModel
                        {
                            MyDoctor = Do,
                            MySchedule = D
                        }).Where(x => x.MyDoctor.DoctorId == DId).ToList();
            return data;
        }
        public dynamic Appointment(int AId)
        {
            var data = (from ap in db.Appointment
                        join d in db.Doctors on ap.DoctorID equals d.DoctorId
                        join P in db.Patient on ap.PatientId equals P.PatientId
                        select new MyModel
                        {
                            MyPatient = P,
                            MyDoctor = d,
                            MyAppointment = ap
                        }).Where(x => x.MyDoctor.DoctorId == AId).ToList();
            return data;
        }
        [HttpGet]
        public ActionResult ViewAppointment(int appID)
        {
            int DoctorId = Convert.ToInt32(Session["DoctorId"]);
            ViewBag.AppointmentList = Appointment(Convert.ToInt32(Session["DoctorId"]));
            MyModel model = (from ap in db.Appointment
                             join D in db.Doctors on ap.DoctorID equals D.DoctorId
                             join dep in db.Department on D.DepartmentId equals dep.DepartmentId
                             join p in db.Patient on ap.PatientId equals p.PatientId
                             select new MyModel
                             {
                                 MyPatient = p,
                                 MyDoctor = D,
                                 MyDepartment = dep,
                                 MyAppointment = ap
                             }).Where(x => x.MyAppointment.AppointmentID == appID).FirstOrDefault();
            return View(model);
        }

        public ActionResult CheckStatus(int appid,int status)
        {
            Appointment a = db.Appointment.Find(appid);
            if (status == 0) 
            {
                a.Status = 0;
            }
            else if (status==1)
            {
                a.Status = 1;
            }
            else if (status==2)
            {
                a.Status = 2;
            }
            else
            {
                a.Status = 3;
            }
            db.Entry(a).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return RedirectToAction("AddDashboard", new { appID = appid });
        }

        public ActionResult SignOut()
        {
            Session.Clear();
            return RedirectToAction("SignIn", "Account");
        }

        [HttpGet]
        public ActionResult ProfileView()
        {
            int DoctId = Convert.ToInt32(Session["DoctorId"]);
            ViewBag.AppointmentList =Appointment(Convert.ToInt32(Session["DoctorId"]));
            MyModel model = (from D in db.Doctors
                            join Dep in db.Department on D.DepartmentId equals Dep.DepartmentId
                            select new MyModel
                            {
                                MyDepartment = Dep,
                                MyDoctor = D
                            }).Where(X => X.MyDoctor.DoctorId == DoctId).FirstOrDefault();
            return View(model);
        }

        [HttpGet]
        public ActionResult ViewAllNotification()
        {
            ViewBag.AppointmentList = Appointment(Convert.ToInt32(Session["DoctorId"]));
            return View();
        }

        void LoadDropDown()
        {
            SelectList List = new SelectList(
                new List<SelectListItem>
                {
                    new SelectListItem{Selected=true,Text="Active",Value="1"},
                    new SelectListItem{Selected=false,Text="InActive",Value="0"}
                }, "Value", "Text");
            ViewBag.status = List;
           ViewBag.dep = db.Department.ToList();
        }

        [HttpGet]
        public ActionResult ProfileEdit()
        {
            ViewBag.AppointmentList = Appointment(Convert.ToInt32(Session["DoctorId"]));
            LoadDropDown();
            Doctors adm = db.Doctors.Find(Convert.ToInt32(Session["DoctorId"]));
            return View(adm);
        }
        [HttpPost]
        public ActionResult ProfileEdit(Doctors adm, HttpPostedFileBase Image)
        {
            ViewBag.AppointmentList = Appointment(Convert.ToInt32(Session["DoctorId"]));
            LoadDropDown();
            if (string.IsNullOrEmpty(adm.Image) || Image != null)
            {
                string imgName = Guid.NewGuid() + Image.FileName;
                Image.SaveAs(Server.MapPath("~/UploadImage/") + imgName);
                adm.Image = imgName;
            }
            Doctors ph = db.Doctors.Find(adm.DoctorId);
            db.Entry(ph).CurrentValues.SetValues(adm); //Current value means picks old data// setvalues means update new value with old values;
            db.SaveChanges();
            Session["Name"] = adm.DoctorName;
            Session["Email"] = adm.Email;
            Session["Password"] = adm.Password;
            Session["Image"] = adm.Image;
            return RedirectToAction("AddDashboard", "Dashboard");
        }
        //   profile EditWork Remaining in jquery

        //[HttpGet]
        //public ActionResult ProfileEdit()
        //{
        //    Doctors doc = db.Doctors.Find(Convert.ToInt32(Session["DoctorId"]));
        //    return View(doc);

        //}

        //[HttpPost]
        //public ActionResult ProfileEdit(Doctors doc, HttpPostedFileBase Image)
        //{
        //    if (string.IsNullOrEmpty(doc.Image) || Image != null)
        //    {
        //        string imgName = Guid.NewGuid() + Image.FileName;
        //        Image.SaveAs(Server.MapPath("~/UploadImage/") + imgName);
        //        doc.Image = imgName;
        //    }
        //    Doctors Doctor = db.Doctors.Find(doc.DoctorId);
        //    db.Entry(Doctor).CurrentValues.SetValues(doc); //Current value means picks old data// setvalues means update new value with old values;
        //    db.SaveChanges();
        //    Session["DoctorName"] = doc.DoctorName;
        //    Session["DoctorImage"] = doc.Image;
        //    return RedirectToAction("AddDashboard", "Dashboard");
        //}
    }
}