using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.admindetailinfo.Controllers
{
    [RouteArea("admindetailinfo")]
    public class DoctorScheduleController : AdminBase 
    {
        AppDbContext db = new AppDbContext();
        void JoinData()
        {
            var Doc = db.Doctors.ToList();
            Doc.Insert(0, new Doctors { DoctorId = -1, DoctorName = "--select DoctorName--" });
            ViewBag.doctor = Doc;
        }
        [HttpGet]
        public ActionResult AddDoctorSchedule()
        {
            JoinData();
            ViewBag.ScheduleList = Schedulelist();
            
            return View();
        }
        [HttpPost]
        public ActionResult AddDoctorSchedule(DoctorSchedule ds)
        {
            JoinData();
            if (ds.ScheduleId > 0)
            {
                db.Entry(ds).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.DoctorSchedule.Add(ds);
            }
            db.SaveChanges();
            ViewBag.ScheduleList = Schedulelist();
            return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EditById(int DsId)
        {
            DoctorSchedule ds = new DoctorSchedule();
            if (DsId > 0)
            {
                ds = db.DoctorSchedule.Where(x => x.ScheduleId == DsId).FirstOrDefault();
            }
            return Json(ds, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Selectbyid(int Id)
        {

            var data = (from  D in db.Doctors
                        join Dept in db.Department on D.DepartmentId equals Dept.DepartmentId
                        select new MyModel
                        {
                            MyDoctor = D,
                            MyDepartment = Dept,
                        }).Where(x => x.MyDoctor.DoctorId == Id).FirstOrDefault();

            // var data = db.Doctors.Where(x => x.DoctorId == Id).FirstOrDefault();
            return Json(data,JsonRequestBehavior.AllowGet);
        }

        public dynamic Schedulelist()
        {
            var data = (from Ds in db.DoctorSchedule
                        join D in db.Doctors on Ds.DoctorId equals D.DoctorId
                        join Dept in db.Department on Ds.DepartmentId equals Dept.DepartmentId
                        select new MyModel
                        {
                            MyDoctor = D,
                            MyDepartment = Dept,
                            MySchedule = Ds
                        }).ToList();
            return data;
        }

        [HttpGet]
        public ActionResult GetData()
        {
            ViewBag.ScheduleList = Schedulelist();
            List<DoctorSchedule> list = db.DoctorSchedule.ToList();
            return PartialView("_AddDoctorSchedule", list);
        }
    }
}