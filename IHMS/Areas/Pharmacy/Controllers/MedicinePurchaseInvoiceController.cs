using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.Pharmacy.Controllers
{
    [RouteArea("Pharmacy")]
    public class MedicinePurchaseInvoiceController : PharmacyBase
    {
        AppDbContext db = new AppDbContext();
        // GET: Pharmacy/MedicinePurchaseInvoice
        [HttpGet]
        public ActionResult MedPurInvoice(int invoiceno)
        {
            ViewBag.MedicinePurchaseList = MedicinePurchaseList(invoiceno);
            return View();
        }
        public dynamic MedicinePurchaseList(int invoiceno)
        {
            var data = (from Med in db.MedicinePurchase
                        join M in db.Medicine on Med.MedicineID equals M.MedicineID
                        select new MyModel
                        {
                            MyMedicine = M,
                            MyMedicinePurchase = Med
                        }).Where(x => x.MyMedicinePurchase.InvoiceNo == invoiceno).ToList();
            return data;
        }
    }
}