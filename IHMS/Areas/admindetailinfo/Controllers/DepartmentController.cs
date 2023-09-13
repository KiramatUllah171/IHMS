using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.admindetailinfo.Controllers
{
    [RouteArea("admindetailinfo")]
    public class DepartmentController : AdminBase
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult AddDepartment()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddDepartment(Department dep)
        {
            if (dep.DepartmentId > 0) 
            {
                db.Entry(dep).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Department.Add(dep);
            }
            db.SaveChanges();
            return Json("",JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EditById(int DId)
        {
            Department d = new Department();
            if (DId > 0) 
            {
                d = db.Department.Where(x => x.DepartmentId == DId).FirstOrDefault();
            }
            return Json(d,JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetData()
        {
            return Json(db.Department.ToList(),JsonRequestBehavior.AllowGet);
        }

    }
}