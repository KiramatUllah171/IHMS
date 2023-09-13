using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IHMS.Models;

namespace IHMS.Areas.Pharmacy.Controllers
{
    [RouteArea("Pharmacy")]
    public class PurchaseReturnController : PharmacyBase
    {
        AppDbContext db = new AppDbContext();
        void DropDownList()
        {
            ViewBag.Medicine = (from mp in db.MedicinePurchase
                                join m in db.Medicine on mp.MedicineID equals m.MedicineID
                                group mp by new { mp.MedicineID, m.MedicineName } into g
                                select new
                                {
                                    g.Key.MedicineID,
                                    g.Key.MedicineName
                                }).ToList();
            ViewBag.MedicinePurchase = (from mp in db.MedicinePurchase
                                        join mpr in db.MedicinePurchaseReturn on mp.MedicineID equals mpr.MedicineId
                                        group mp by new { mp.MedicineID, mp.InvoiceNo } into g
                                        select new
                                        {
                                            g.Key.MedicineID,
                                            g.Key.InvoiceNo
                                        }).ToList();
        }
        // GET: Pharmacy/PurchaseReturn
        [HttpGet]
        public ActionResult AddPurchaseReturn()
        {
            DropDownList();
            ViewBag.ReturnList = ReturnList();
            return View();
        }

        [HttpPost]
        public ActionResult AddPurchaseReturn(MedicinePurchaseReturn MedPurReturn)
        {
            DropDownList();
            MedicinePurchase medPur = db.MedicinePurchase.Where(x => x.MedicineID == MedPurReturn.MedicineId && x.InvoiceNo == MedPurReturn.InvoiceNo).FirstOrDefault();
            List<Stock> stockList = db.Stock.Where(x => x.MedicneId == medPur.MedicineID && x.Status == 1).ToList();

            int? TotalRemQty = 0;
            for (int i = 0; i < stockList.Count; i++)
            {
                TotalRemQty += stockList[i].RemainingQuantity;
            }
            if (MedPurReturn.Quantity <= TotalRemQty)
            {
                db.MedicinePurchaseReturn.Add(MedPurReturn);
                db.SaveChanges();
                int? TotalReturnQTY = MedPurReturn.Quantity;
                List<Stock> MyStockList = db.Stock.Where(x => x.MedicneId == medPur.MedicineID && x.Status == 1).ToList();

                for (int i = 0; i < MyStockList.Count; i++)
                {
                    int? curRemQty = MyStockList[i].RemainingQuantity;
                    if (TotalReturnQTY <= curRemQty)
                    {
                        int? stockId = MyStockList[i].StockId;
                        Stock stock = db.Stock.Where(x => x.StockId == stockId).FirstOrDefault();
                        int RemQty = Convert.ToInt32(TotalReturnQTY - curRemQty);
                        stock.RemainingQuantity = Math.Abs(RemQty);
                        stock.TotalQuantity = (int)(stock.TotalQuantity - TotalReturnQTY);
                        db.Entry(stock).State = System.Data.Entity.EntityState.Modified;
                        db.SaveChanges();
                        if (RemQty < 0)
                        {
                            break;
                        }
                    }
                }
            }
            else
            {
                ViewBag.msg = "Sorry. Your requested qty is not available. Kindly choose less amount.\n Available QTY is =" + TotalRemQty;
            }
            ViewBag.ReturnList = ReturnList();
            return View();
        }

        public dynamic ReturnList()
        {
            var data = (from MPR in db.MedicinePurchaseReturn
                        join Med in db.Medicine on MPR.MedicineId equals Med.MedicineID
                        select new MyModel
                        {
                            MyMedicine = Med,
                            MyMedPurReturn = MPR
                        }
                      ).ToList();
            return data;
        }
    }
}