using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.Pharmacy.Controllers
{
    [RouteArea("Pharmacy")]
    public class ManufacturerController : PharmacyBase
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult AddManufacturer()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddManufacturer(Manufacturer manfac)
        {
            if (manfac.ManufacturerID > 0) 
            {
                db.Entry(manfac).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Manufacturer.Add(manfac);
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EditById(int MID)
        {
            Manufacturer m = new Manufacturer();
            if (MID > 0) 
            {
                m = db.Manufacturer.Where(x => x.ManufacturerID == MID).FirstOrDefault();
            }
            return Json(m, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetData()
        {
            return Json(db.Manufacturer.ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}