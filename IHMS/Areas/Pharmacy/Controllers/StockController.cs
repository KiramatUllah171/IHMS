using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.Pharmacy.Controllers
{
    [RouteArea("Pharmacy")]
    public class StockController : PharmacyBase
    {
        AppDbContext db = new AppDbContext();

        [HttpGet]
        public ActionResult AddStock(int status = 1)
        {
            ViewBag.StockList = StockList(status);
            return View();
        }


        List<MyModel> StockList(int status)
        {
            return (from s in db.Stock
                    join m in db.Medicine on s.MedicneId equals m.MedicineID
                    join mp in db.MedicinePurchase on s.MedicinePurchaseId equals mp.MedicinePurchaseID
                    select new MyModel
                    {
                        MyMedicine = m,
                        MyStock = s,
                        MyMedicinePurchase = mp
                    }).Where(x => x.MyStock.Status == status).ToList();
        }

        [HttpPost]
        public ActionResult StockData(int status)
        {
            return RedirectToAction("AddStock", new { status = status });
        }
    }
}