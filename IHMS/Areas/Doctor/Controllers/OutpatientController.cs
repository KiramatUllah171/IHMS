using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.Doctor.Controllers
{
    [RouteArea("Doctor")]
    public class OutpatientController : DoctorBase
    {
        AppDbContext db = new AppDbContext();

        [HttpGet]
        public ActionResult AddOutpatient()
        {
            ViewBag.AppointmentList = Appointment(Convert.ToInt32(Session["DoctorId"]));
            ViewBag.outpatient = Outpatientlist(Convert.ToInt32(Session["DoctorId"]));
            return View();
        }
        [HttpPost]
        public ActionResult AddOutpatient(OutPatient otp)
        {
            if (otp.OutPatientId > 0)
            {
                db.Entry(otp).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.OutPatient.Add(otp);
            }
            db.SaveChanges();
            ViewBag.outpatient = Outpatientlist(Convert.ToInt32(Session["DoctorId"]));
            return Json("", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EditById(int otpId)
        {
            OutPatient otp = new OutPatient();
            if (otpId > 0)
            {
                otp = db.OutPatient.Where(x => x.OutPatientId == otpId).FirstOrDefault();
            }
            return Json(otp, JsonRequestBehavior.AllowGet);
        }
        public dynamic Outpatientlist(int Id)
        {
            var data = (from O in db.OutPatient
                        join P in db.Patient on O.PatientId equals P.PatientId
                        join D in db.Doctors on O.DoctorId equals D.DoctorId
                        select new MyModel
                        {
                            MyDoctor = D,
                            MyPatient = P,
                            MyOutPatient = O
                        }).Where(x=>x.MyDoctor.DoctorId==Id).ToList();
            return data;
        }
        [HttpGet]
        public ActionResult GetData()
        {
            ViewBag.outpatient = Outpatientlist(Convert.ToInt32(Session["DoctorId"]));
            List<OutPatient> list = db.OutPatient.ToList();
            return PartialView("_AddOutpatient", list);
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
    }
}