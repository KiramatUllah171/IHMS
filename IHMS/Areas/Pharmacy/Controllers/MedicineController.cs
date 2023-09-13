using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IHMS.Models;

namespace IHMS.Areas.Pharmacy.Controllers
{
    [RouteArea("Pharmacy")]
    public class MedicineController : PharmacyBase
    {
        AppDbContext db = new AppDbContext();
        // GET: Pharmacy/Medicine
        [HttpGet]
        public ActionResult AddMedicine()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddMedicine(Medicine med)
        {
            if (med.MedicineID > 0) 
            {
                db.Entry(med).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Medicine.Add(med);
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EditById(int MID)
        {
            Medicine m = new Medicine();
            if (MID > 0) 
            {
                m = db.Medicine.Where(x => x.MedicineID == MID).FirstOrDefault();
            }
            return Json(m, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetData()
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
            return Json(model, JsonRequestBehavior.AllowGet);
        }

       
    }
}