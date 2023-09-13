using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.Pharmacy.Controllers
{
    [RouteArea("Pharmacy")]
    public class DashboardController : PharmacyBase
    {
        AppDbContext db = new AppDbContext();
        public ActionResult Index()
        {
            ViewBag.TotalMedicine = db.Medicine.Count();
            ViewBag.TotalCategories = db.Category.Count();
            ViewBag.totalCustomer = db.Customer.Count();
            ViewBag.TotalManufacturer = db.Manufacturer.Count();
            ViewBag.TotalSellMedicine = db.MedicineSell.Count();
            ViewBag.TotalStock = db.Stock.Count();
            ViewBag.TotalSubCategory = db.SubCategory.Count();
            ViewBag.medpur = db.MedicinePurchase.Count();
            ViewBag.TotalUnit = db.Unit.Count();

            //  ViewBag.TotalReturnMedicine = db.MedicinePurchaseReturn.Count();
            return View();
        }

        public ActionResult SignOut()
        {
            Session.Clear();
            return RedirectToAction("SignIn", "Account");
        }

        [HttpGet]
        public ActionResult ProfileView()
        {
            int pid = Convert.ToInt32(Session["PharmacistId"]);
            return View(db.Pharmacist.Where(x => x.PharmacistId == pid).FirstOrDefault());
        }

        void LoadDropDown()
        {
            SelectList List = new SelectList(
                new List<SelectListItem>
                {
                    new SelectListItem{Selected=true,Text="Male",Value="1"},
                    new SelectListItem{Selected=false,Text="Female",Value="0"}
                }, "Value", "Text");
            ViewBag.gender = List;
        }

        [HttpGet]
        public ActionResult ProfileEdit()
        {
            LoadDropDown();
            Pharmacist adm = db.Pharmacist.Find(Convert.ToInt32(Session["PharmacistId"]));
            return View(adm);
        }
        [HttpPost]
        public ActionResult ProfileEdit(Pharmacist adm, HttpPostedFileBase Image)
        {
            LoadDropDown();
            if (string.IsNullOrEmpty(adm.Image) || Image != null)
            {
                string imgName = Guid.NewGuid() + Image.FileName;
                Image.SaveAs(Server.MapPath("~/UploadImage/") + imgName);
                adm.Image = imgName;
            }
            Pharmacist ph = db.Pharmacist.Find(adm.PharmacistId);
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