using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.Doctor.Controllers
{
    [RouteArea("Doctor")]
    public class AppointmentController : DoctorBase
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult AddAppointment()
        {
            ViewBag.appointmentlist = AppointmentList(Convert.ToInt32(Session["DoctorId"]));
            return View();
        }

        public dynamic AppointmentList(int doctorid)
        {
            var data = (from a in db.Appointment
                        join D in db.Doctors on a.DoctorID equals D.DoctorId
                        join p in db.Patient on a.PatientId equals p.PatientId
                        select new MyModel
                        {
                            MyAppointment = a,
                            MyDoctor = D,
                            MyPatient = p
                        }).Where(x => x.MyDoctor.DoctorId == doctorid).ToList();
            return data;
        }

        [HttpGet]
        public ActionResult Delete(int ID)
        {
            Appointment App = db.Appointment.Where(X => X.AppointmentID == ID).FirstOrDefault();
            db.Appointment.Remove(App);
           // TempData["msg"] = "Data has been Deleted";
            db.SaveChanges();
            return RedirectToAction(nameof(AddAppointment));
        }
    }
}