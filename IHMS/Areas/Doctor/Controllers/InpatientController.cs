using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.Doctor.Controllers
{
    [RouteArea("Doctor")]
    public class InpatientController : DoctorBase
    {
        AppDbContext db = new AppDbContext();
        
        [HttpGet]
        public ActionResult AddInpatient()
        {
            ViewBag.AppointmentList = Appointment(Convert.ToInt32(Session["DoctorId"]));
            ViewBag.inpatient = Inpatientlist(Convert.ToInt32(Session["DoctorId"]));
            return View();
        }
        [HttpPost]
        public ActionResult AddInPatient(Inpatient ip)
        {
            if (ip.AdmitId > 0) 
            {
                db.Entry(ip).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Inpatient.Add(ip);
            }
            db.SaveChanges();
            ViewBag.inpatient = Inpatientlist(Convert.ToInt32(Session["DoctorId"]));
            return Json("", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EditById(int InId)
        {
            Inpatient ip = new Inpatient();
            if (InId > 0) 
            {
                ip = db.Inpatient.Where(x => x.AdmitId == InId).FirstOrDefault();
            }
            return Json(ip, JsonRequestBehavior.AllowGet);
        }
        public dynamic Inpatientlist(int DID)
        {
            var data = (from IP in db.Inpatient
                        join P in db.Patient on IP.PatientId equals P.PatientId
                        join R in db.Room on IP.RoomId equals R.RoomId
                        join D in db.Doctors on IP.DoctorId equals D.DoctorId
                        select new MyModel
                        {
                            MyInpatient = IP,
                            MyDoctor = D,
                            MyRoom = R,
                            MyPatient = P
                        }).Where(x => x.MyDoctor.DoctorId == DID).ToList();
            return data;
        }
        [HttpGet]
        public ActionResult GetData()
        {
            ViewBag.inpatient = Inpatientlist(Convert.ToInt32(Session["DoctorId"]));
            List<Inpatient> list = db.Inpatient.ToList();
            return PartialView("_AddInpatient", list);
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