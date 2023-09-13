using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.Pharmacy.Controllers
{
    [RouteArea("Pharmacy")]
    public class UnitController : PharmacyBase
    {
        AppDbContext db = new AppDbContext();
        // GET: Pharmacy/Unit
        [HttpGet]
        public ActionResult AddUnit()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddUnit(Unit u)
        {
            if (u.UnitId > 0) 
            {
                db.Entry(u).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Unit.Add(u);
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EditById(int UID)
        {
            Unit u = new Unit();
            if (UID > 0) 
            {
                u = db.Unit.Where(x => x.UnitId == UID).FirstOrDefault();
            }
            return Json(u,JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetData()
        {
            return Json(db.Unit.ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}