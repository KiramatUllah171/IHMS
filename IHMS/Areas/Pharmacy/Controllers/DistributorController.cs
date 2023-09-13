using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IHMS.Models;

namespace IHMS.Areas.Pharmacy.Controllers
{
    [RouteArea("Pharmacy")]
    public class DistributorController : PharmacyBase
    {
        AppDbContext db = new AppDbContext();
        // GET: Pharmacy/Distributor
        [HttpGet]
        public ActionResult AddDistributor()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AddDistributor(Distributor d)
        {
            if (d.DistributorId > 0) 
            {
                db.Entry(d).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Distributor.Add(d);
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EditById(int DID)
        {
            Distributor d = new Distributor();
            if (DID > 0) 
            {
                d = db.Distributor.Where(x => x.DistributorId == DID).FirstOrDefault();
            }
            return Json(d, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetData()
        {
            return Json(db.Distributor.ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}