using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.admindetailinfo.Controllers
{
    [RouteArea("admindetailinfo")]
    public class RoomController : AdminBase
    {
        AppDbContext db = new AppDbContext();
        void joindata()
        {
            var p = db.Patient.ToList();
            p.Insert(0, new Models.tblPatient { PatientId = -1, Name = "---Select Patient Name" });
            ViewBag.patient = p;
            var rt = db.RoomType.ToList();
            rt.Insert(0, new RoomType { RoomTypeId = -1, Roomtype = "---Select Room Type" });
            ViewBag.roomtype = rt;
        }
        [HttpGet]
        public ActionResult AddRoom()
        {
            joindata();
            return View();
        }
        [HttpPost]
        public ActionResult AddRoom(Room r)
        {
            joindata();
            if (r.RoomId > 0) 
            {
                db.Entry(r).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.Room.Add(r);
            }
            db.SaveChanges();
            return Json("", JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public ActionResult EditById(int RId)
        {
            Room r = new Room();
            if (RId > 0) 
            {
                r = db.Room.Where(x => x.RoomId == RId).FirstOrDefault();
            }
            return Json(r, JsonRequestBehavior.AllowGet);
        }
        [HttpGet]
        public ActionResult GetData()
        {
            var data = (from R in db.Room
                        join rt in db.RoomType on R.RoomTypeId equals rt.RoomTypeId
                        join P in db.Patient on R.PatientId equals P.PatientId
                        select new MyModel()
                        {
                            MyPatient = P,
                            MyRoom = R,
                            MyRoomType = rt
                        }).ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

    }
}