using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.Patient.Controllers
{
    public class IndexviewController : Controller
    {
        AppDbContext db = new AppDbContext();
        void loaddropdown()
        {
            ViewBag.ph = db.Pharmacist.ToList();
            ViewBag.med = Medicinelist();
        }
        [HttpGet]
        public ActionResult Index()
        {
            loaddropdown();
            ViewBag.doctor = doctorlist();
            return View();
        }

        [HttpGet]
        public ActionResult Department()
        {
            ViewBag.dept = db.Department.ToList();
            return View();
        }
        
        [HttpGet]
        public ActionResult Doctor()
        {
            ViewBag.doctor = doctorlist();
            return View();
        }

        [HttpGet]
        public ActionResult VisitPharmacy()
        {
            loaddropdown();
            return View();
        }

        [HttpGet]
        public ActionResult AboutUs()
        {
            return View();
        }
        
        [HttpGet]
        public ActionResult DoctorMujeebGilani()
        {
            return View();
        }

        [HttpGet]
        public ActionResult ZaheerAbbas()
        {
            return View();
        }

        [HttpGet]
        public ActionResult DoctorNisar()
        {
            return View();
        }
        
        [HttpGet]
        public ActionResult HammadMehsood()
        {
            return View();
        }

        public dynamic Medicinelist()
        {
            var model = (from M in db.Medicine
                         join Ma in db.Manufacturer on M.ManufacturerID equals Ma.ManufacturerID
                         join U in db.Unit on M.UnitID equals U.UnitId
                         join C in db.Category on M.CategoryID equals C.CategoryId
                         join SC in db.SubCategory on M.SubCategoryID equals SC.SubCategoryId
                         select new MyModel
                         {
                             MyMedicine = M,
                             MyManufacturer = Ma,
                             MyCategory = C,
                             MyUnit = U,
                             MySubCategory = SC
                         }).ToList();
            return model;
        }
        public dynamic doctorlist()
        {
            var data = (from D in db.Doctors
                        join De in db.Department on D.DepartmentId equals De.DepartmentId
                        select new MyModel
                        {
                            MyDepartment = De,
                            MyDoctor = D
                        }).ToList();
            return data;
        }

        [HttpGet]
        public ActionResult ContactUs()
        {
            return View();
        }

    }
}