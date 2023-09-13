using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IHMS.Models;

namespace IHMS.Areas.Pharmacy.Controllers
{
    [RouteArea("Pharmacy")]
    public class MedSellInvoiveController : PharmacyBase
    {
        AppDbContext db = new AppDbContext();
        // GET: Pharmacy/MedSellInvoive
        [HttpGet]
        public ActionResult MedicineSellInvoice(int invoiceNo)
        {
            ViewBag.MedSellInvodice = MedSellInvoice(invoiceNo);
            return View();
        }
        public dynamic MedSellInvoice(int invoiceNo)
        {
            var data = (from Med in db.MedicineSell
                        join M in db.Medicine on Med.MedicineId equals M.MedicineID
                        select new MyModel
                        {
                            MyMedicineSell = Med,
                            MyMedicine = M
                        }).Where(x => x.MyMedicineSell.InvoiceNo == invoiceNo).ToList();
            return data;
        }
    }
}