using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.Patient.Controllers
{
    [RouteArea("Patient")]
    public class DashboardController : PatientBase
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult AddDashboard()
        {
            ViewBag.ScheduleList = DocScheList();
            return View();
        }
        public dynamic DocScheList()
        {
            var data = (from Ds in db.DoctorSchedule
                        join D in db.Doctors on Ds.DoctorId equals D.DoctorId
                        join De in db.Department on Ds.DepartmentId equals De.DepartmentId
                        select new MyModel
                        {
                            MyDepartment=De,
                            MyDoctor = D,
                            MySchedule = Ds
                        }).ToList();
            return data;
        }
        [HttpGet]
        public ActionResult RequestAppointment(int DocId)
        {
            MyModel model = new MyModel()
            {
                MyPatient = new tblPatient()
            };
            model = (from d in db.Doctors
                     join dep in db.Department on d.DepartmentId equals dep.DepartmentId
                     select new MyModel
                     {
                         MyDepartment = dep,
                         MyDoctor = d
                     }).Where(x => x.MyDoctor.DoctorId == DocId).FirstOrDefault();
            model.MyPatient = db.Patient.Find(Convert.ToInt32(Session["PatientId"]));
            return View(model);
        }
        [HttpPost]
        public ActionResult RequestAppointment(MyModel model)
        {
            Appointment a = new Appointment();
            a = model.MyAppointment;
            a.DoctorID = model.MyDoctor.DoctorId;
            a.PatientId = Convert.ToInt32(Session["PatientId"]);
            model.MyAppointment.AppointmentDay = Convert.ToDateTime(model.MyAppointment.AppointmentDate).ToString("dddd");
            model.MyAppointment.AvailableTime = Convert.ToDateTime(model.MyAppointment.AppointmentDate).ToString("hh:mm:ss tt");
            db.Appointment.Add(a);
            db.SaveChanges();
            TempData["msg1"] = "Your Request has been Submitted to Doctor so kindly wait for Doctor Reply/Response Thanks!";
            return RedirectToAction("AddDashboard", "Dashboard");
        }
        [HttpGet]
        public ActionResult MyAppointment()
        {
            ViewBag.myappointment = MyAppointment(Convert.ToInt32(Session["PatientId"]));
            return View();
        }

        public List<MyModel> MyAppointment(int PatientId)
        {
            List<MyModel> model = (from ap in db.Appointment
                                   join D in db.Doctors on ap.DoctorID equals D.DoctorId
                                   join dep in db.Department on D.DepartmentId equals dep.DepartmentId
                                   join P in db.Patient on ap.PatientId equals P.PatientId
                                   select new MyModel
                                   {
                                       MyAppointment = ap,
                                       MyPatient = P,
                                       MyDoctor = D,
                                       MyDepartment = dep
                                   }).Where(x => x.MyPatient.PatientId == PatientId).ToList();
            return model;
        }

        public ActionResult SignOut()
        {
            Session.Clear();
            return RedirectToAction("SignIn", "PatientAccount");
        }
        [HttpGet]
        public ActionResult ProfileView()
        {
            int patid = Convert.ToInt32(Session["PatientId"]);
            ViewBag.ScheduleList = DocScheList();
            return View(db.Patient.Where(x => x.PatientId == patid).FirstOrDefault());
        }

        void LoadDropDown()
        {
            SelectList List = new SelectList(
                new List<SelectListItem>
                {
                    new SelectListItem{Selected=true,Text="Male",Value="1"},
                    new SelectListItem{Selected=false,Text="Female",Value="0"}
                }, "Value", "Text");
            ViewBag.gender = List;
        }
        void LoadMarriedDropDown()
        {
            SelectList List = new SelectList(
                new List<SelectListItem>
                {
                    new SelectListItem{Selected=true,Text="Married",Value="1"},
                    new SelectListItem{Selected=false,Text="Unmarried",Value="0"}
                }, "Value", "Text");
            ViewBag.mar = List;
        }

        [HttpGet]
        public ActionResult ProfileEdit()
        {
            LoadDropDown();
            LoadMarriedDropDown();
            tblPatient tp = db.Patient.Find(Convert.ToInt32(Session["PatientId"]));
            return View(tp);
        }
        [HttpPost]
        public ActionResult ProfileEdit(tblPatient adm, HttpPostedFileBase Image)
        {
            LoadDropDown();
            LoadMarriedDropDown();
            tblPatient tp = db.Patient.Find(adm.PatientId);
            db.Entry(tp).CurrentValues.SetValues(adm); //Current value means picks old data// setvalues means update new value with old values;
            db.SaveChanges();
            Session["Name"] = adm.Name;
            Session["Email"] = adm.Email;
            Session["Password"] = adm.Password;
            return RedirectToAction("AddDashboard", "Dashboard");
        }
    }
}