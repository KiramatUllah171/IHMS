using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.admindetailinfo.Controllers
{
    [RouteArea("admindetailinfo")]
    public class DashboardController : AdminBase
    {
        AppDbContext db = new AppDbContext();
        [HttpGet]
        public ActionResult Index()
        {
            ViewBag.Department = db.Department.Count();
            ViewBag.Doctor = db.Doctors.Count();
            ViewBag.Pharmacist = db.Pharmacist.Count();
            ViewBag.Room = db.Room.Count();
            ViewBag.RoomType = db.RoomType.Count();
            ViewBag.dep = db.Department.ToList();
            ViewBag.doct = db.Doctors.ToList();
            ViewBag.phar = db.Pharmacist.ToList();
            ViewBag.r = db.Room.ToList();
            ViewBag.rt = db.RoomType.ToList();

            return View();
        }


        public ActionResult SignOut()
        {
            Session.Clear();
            return RedirectToAction("LogIn", "Account");
        }

        [HttpGet]
        public ActionResult ProfileView()
        {
            int adminId = Convert.ToInt32(Session["AdminId"]);
            return View(db.Admin.Where(x => x.AdminId == adminId).FirstOrDefault());
        }
        void LoadDropDown()
        {
            SelectList List = new SelectList(
                new List<SelectListItem>
                {
                    new SelectListItem{Selected=true,Text="Active",Value="1"},
                    new SelectListItem{Selected=false,Text="InActive",Value="0"}
                }, "Value", "Text");
            ViewBag.status = List;
        }

        [HttpGet]
        public ActionResult ProfileEdit()
        {
            LoadDropDown();
            Admin adm = db.Admin.Find(Convert.ToInt32(Session["AdminId"]));
            return View(adm);
        }
        [HttpPost]
        public ActionResult ProfileEdit(Admin adm, HttpPostedFileBase Image)
        {
            LoadDropDown();
            if (string.IsNullOrEmpty(adm.Image) || Image != null)
            {
                string imgName = Guid.NewGuid() + Image.FileName;
                Image.SaveAs(Server.MapPath("~/UploadImage/") + imgName);
                adm.Image = imgName;
            }
            Admin ph = db.Admin.Find(adm.AdminId);
            db.Entry(ph).CurrentValues.SetValues(adm); //Current value means picks old data// setvalues means update new value with old values;
            db.SaveChanges();
            Session["Name"] = adm.Name;
            Session["Email"] = adm.Email;
            Session["Password"] = adm.Password;
            Session["Image"] = adm.Image;
            return RedirectToAction("Index", "Dashboard");
        }
    }
}