using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.admindetailinfo.Controllers
{
    [RouteArea("admindetailinfo")]
    public class PharmacistController : AdminBase
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        // GET: admindetailinfo/Pharmacist
        public ActionResult AddPharmacist()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddPharmacist(Pharmacist p,HttpPostedFileBase MyImage)
        {
            if (MyImage != null || p.Image == null) 
            {
                string imgname = Guid.NewGuid() + MyImage.FileName;
                MyImage.SaveAs(Server.MapPath("~/UploadImage/") + imgname);
                p.Image = imgname;
            }
            if (p.PharmacistId > 0) 
            {
                db.Entry(p).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Pharmacist.Add(p);
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EditById(int PId)
        {
            Pharmacist p = new Pharmacist();
            if (PId > 0) 
            {
                p = db.Pharmacist.Where(x => x.PharmacistId == PId).FirstOrDefault();
            }
            return Json(p, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult Getdata()
        {
            return Json(db.Pharmacist.ToList(), JsonRequestBehavior.AllowGet);
        }
    }
}