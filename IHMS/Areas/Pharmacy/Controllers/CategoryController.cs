using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.Pharmacy.Controllers
{
    [RouteArea("Pharmacy")]
    public class CategoryController : PharmacyBase
    {
        AppDbContext db = new AppDbContext();

        [HttpGet]
        public ActionResult AddCategory()
        {
            return View();
        }

        [HttpPost]
        public ActionResult AddCategory(Category cat)
        {
            Category c = db.Category.Where(x => x.CategoryName == cat.CategoryName).FirstOrDefault();
            if (c!=null && c.CategoryId != cat.CategoryId)
            {
                return Json(new { msg = true, JsonRequestBehavior.AllowGet });
            }
            else
            {
                if (cat.CategoryId > 0)
                {
                    db.Entry(cat).State = System.Data.Entity.EntityState.Modified;
                }
                else
                {
                    db.Category.Add(cat);
                }
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EditById(int CId)
        {
            Category cat = new Category();
            if (CId > 0) 
            {
                cat = db.Category.Where(x => x.CategoryId == CId).FirstOrDefault();
            }
            return Json(cat,JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetData()
        {
            return Json(db.Category.ToList(), JsonRequestBehavior.AllowGet);
        }

    }
}