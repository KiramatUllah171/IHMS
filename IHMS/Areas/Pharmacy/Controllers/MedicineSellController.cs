using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IHMS.Models;

namespace IHMS.Areas.Pharmacy.Controllers
{
    [RouteArea("Pharmacy")]
    public class MedicineSellController : PharmacyBase
    {
        AppDbContext db = new AppDbContext();

        public static List<MyModel> MedicineList = new List<MyModel>();
        void DropDownList()
        {
            ViewBag.med = (from mp in db.MedicinePurchase
                           join ms in db.Medicine on mp.MedicineID equals ms.MedicineID
                           group mp by new { mp.MedicineID, ms.MedicineName } into g
                           select new
                           {
                               g.Key.MedicineID,
                               g.Key.MedicineName
                           }).ToList();
        }
        [HttpGet]
        public ActionResult AddMedicineSell()
        {
            DropDownList();
            ViewBag.MedicineList = MedicineList;
            MedicineSell MS = new MedicineSell();
            int? MAXId = db.MedicineSell.Max(u => (int?)u.InvoiceNo);
            if (MAXId == null)
                MAXId = 1;
            else
                MAXId++;
            MS.InvoiceNo = (int)MAXId;

            ViewBag.SellMedicineList = SellMedicineList();
            return View(MS);
        }

        [HttpPost]
        [ActionName("AddMedicineSell")]
        public ActionResult AddMedicineSells()
        {
            string msg = "";
            DropDownList();
            int? TotalRemQty = 0;
            if (MedicineList.Count == 0)
            {
                TempData["Message1"] = "Please your data";
            }
            for (int j = 0; j < MedicineList.Count; j++)
            {
                MedicineSell MS = new MedicineSell();
                MS = MedicineList[j].MyMedicineSell;
                List<Stock> stockList = db.Stock.Where(x => x.MedicneId == MS.MedicineId && x.Status == 1).ToList();
                for (int i = 0; i < stockList.Count; i++)
                {
                    TotalRemQty += stockList[i].RemainingQuantity;
                }
                if (MS.Quantity <= TotalRemQty)
                {
                    MS.status = 0;
                    db.MedicineSell.Add(MS);
                    db.SaveChanges();
                    int? TotalSaleQTY = MS.Quantity;
                    List<Stock> MyStockList = db.Stock.Where(x => x.MedicneId == MS.MedicineId && x.Status == 1).ToList();
                    for (int i = 0; i < MyStockList.Count; i++)
                    {
                        int? curRemQty = MyStockList[i].RemainingQuantity;
                        if (TotalSaleQTY <= curRemQty)
                        {
                            int? stockId = MyStockList[i].StockId;
                            Stock stock = db.Stock.Where(x => x.StockId == stockId).FirstOrDefault();
                            int RemQty = Convert.ToInt32(TotalSaleQTY - curRemQty);
                            stock.RemainingQuantity = Math.Abs(RemQty);
                            stock.SoldQuantity = (int)TotalSaleQTY;
                            db.Entry(stock).State = System.Data.Entity.EntityState.Modified;
                            db.SaveChanges();
                            if (RemQty < 0)
                            {
                                break;
                            }
                        }
                        else
                        {
                            int? stockId = stockList[i].StockId;
                            Stock stock = db.Stock.Where(x => x.StockId == stockId).FirstOrDefault();
                            stock.RemainingQuantity = 0;
                            stock.Status = 0;
                            stock.SoldQuantity = (int)curRemQty;
                            TotalSaleQTY = TotalSaleQTY - curRemQty;
                            db.Entry(stock).State = System.Data.Entity.EntityState.Modified;
                            db.SaveChanges();
                        }
                    }
                    TempData["Message2"] = "Data has been Added";
                }
                else
                {
                    Medicine med = db.Medicine.Where(x => x.MedicineID == MS.MedicineId).FirstOrDefault();
                    msg += "Quantity of " + med.MedicineName + " is not available.\n";
                    TempData["Message3"] = msg; 
                    ViewBag.MedicineList = null;
                }

            }
            MedicineList = new List<MyModel>();
            ViewBag.SellMedicineList = SellMedicineList();
            return RedirectToAction(nameof(AddMedicineSell));
        }

        [HttpPost]
        public ActionResult SellMedicineList(MedicineSell ms) //<------
        {
                ms.status = 0;
                MyModel data = new MyModel() { MyMedicineSell = new MedicineSell(), MyMedicine = new Medicine() };
                data.MyMedicine = db.Medicine.Where(x => x.MedicineID == ms.MedicineId).First();
                data.MyMedicineSell = ms;
                MedicineList.Add(data);
            return Json(new { msg = true, JsonRequestBehavior.AllowGet });
        }
        public dynamic SellMedicineList()
        {

            List<MedSellTotal> data = (from MS in db.MedicineSell
                                       join MED in db.Medicine on MS.MedicineId equals MED.MedicineID
                                       group MS by new { MS.InvoiceNo, MS.status } into g
                                       select new MedSellTotal
                                       {
                                           InvoiceNo = g.Key.InvoiceNo,
                                           Status = g.Key.status,
                                           TotalMedicine = g.Count()
                                       }).ToList();
            return data;
        }

        [HttpGet]
        public ActionResult GetData()
        {
            ViewBag.SellMedicineList = SellMedicineList();
            List<MedicineSell> list = db.MedicineSell.ToList();
            return PartialView("_MedicineSell", list);
        }
    }
}