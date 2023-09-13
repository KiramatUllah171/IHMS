using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.Pharmacy.Controllers
{
    [RouteArea("Pharmacy")]
    public class CustomerController : PharmacyBase
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        // GET: Pharmacy/Customer
        public ActionResult AddCustomer()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddCustomer(Customer cus)
        {
            if (cus.CustomerId > 0) 
            {
                db.Entry(cus).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Customer.Add(cus);
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EditById(int CId)
        {
            Customer ct = new Customer();
            if (CId > 0) 
            {
                ct = db.Customer.Where(x => x.CustomerId == CId).FirstOrDefault();
            }
            return Json(ct, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetData()
        {
            return Json(db.Customer.ToList(),JsonRequestBehavior.AllowGet);
        }
    }
}