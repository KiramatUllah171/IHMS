using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.admindetailinfo.Controllers
{
    [RouteArea("admindetailinfo")]
    public class RoomTypeController : AdminBase
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult AddRoomType()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddRoomType(RoomType rt)
        {
            if (rt.RoomTypeId > 0) 
            {
                db.Entry(rt).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.RoomType.Add(rt);
            }
            db.SaveChanges();
            ViewBag.btntext = "Add";
            return Json("", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EditById(int RId)
        {
            RoomType rt = new RoomType();
            if (RId > 0) 
            {
                rt = db.RoomType.Where(x => x.RoomTypeId == RId).FirstOrDefault();
                ViewBag.btntext = "Update";
            }
            return Json(rt, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetData()
        {
            return Json(db.RoomType.ToList(),JsonRequestBehavior.AllowGet);
        }
    }
}