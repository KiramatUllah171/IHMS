using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.Pharmacy.Controllers
{
    [RouteArea("Pharmacy")]
    public class SubcategoryController : PharmacyBase
    {
        AppDbContext db = new AppDbContext();
        
        [HttpGet]
        public ActionResult AddSubcategory()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddSubcategory(SubCategory sc)
        {
            if (sc.SubCategoryId > 0) 
            {
                db.Entry(sc).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.SubCategory.Add(sc);
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EditById(int SCId)
        {
            SubCategory sc = new SubCategory();
            if (SCId > 0) 
            {
                sc = db.SubCategory.Where(x => x.SubCategoryId == SCId).FirstOrDefault();
            }
            return Json(sc, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetData()
        {
            var model = (from S in db.SubCategory
                         join C in db.Category on S.CategoryId equals C.CategoryId
                         select new MyModel
                         {
                             MySubCategory = S,
                             MyCategory = C
                         }).ToList();
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult GetDataByCountryId(int Id)
        {
            var data = (from P in db.SubCategory
                        select new MyModel
                        {
                            MySubCategory = P
                        }).Where(x => x.MySubCategory.CategoryId == Id).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}