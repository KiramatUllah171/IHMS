using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.admindetailinfo.Controllers
{
    [RouteArea("admindetailinfo")]
    public class DoctorController : AdminBase
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult AddDoctor()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddDoctor(Doctors d,HttpPostedFileBase MyImage)
        {
            if (MyImage != null || d.Image == null) 
            {
                string imgname = Guid.NewGuid() + MyImage.FileName;
                MyImage.SaveAs(Server.MapPath("~/UploadImage/") + imgname);
                d.Image = imgname;
            }
            if (d.DoctorId > 0)
            {
                //string imgname = Guid.NewGuid() + MyImage.FileName;
                //MyImage.SaveAs(Server.MapPath("~/UploadImage/") + imgname);
                //d.Image = imgname;
                db.Entry(d).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Doctors.Add(d);
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult EditById(int DId)
        {
            Doctors d = new Doctors();
            if (DId > 0) 
            {
                d = db.Doctors.Where(x => x.DoctorId == DId).FirstOrDefault();
            }
            return Json(d, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetData()
        {
            var data = (from D in db.Doctors
                        join De in db.Department on D.DepartmentId equals De.DepartmentId
                        select new MyModel
                        {
                            MyDepartment = De,
                            MyDoctor = D
                        }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }
    }
}