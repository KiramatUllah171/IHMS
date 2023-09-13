using IHMS.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IHMS.Areas.Pharmacy.Controllers
{
    [RouteArea("Pharmacy")]
    public class MedPurchaseController : PharmacyBase
    {
        AppDbContext db = new AppDbContext();
        public static List<MyModel> ListMedicinePur = new List<MyModel>();
     
        [HttpGet]
        public ActionResult AddMedPurchase()
        {
            ViewBag.ListMedicinePur = ListMedicinePur;
            MedicinePurchase MP = new MedicinePurchase();
            int? maxID = db.MedicinePurchase.Max(u => (int?)u.InvoiceNo);
            if (maxID == null)
                maxID = 1;
            else
                maxID++;
            MP.InvoiceNo = (int)maxID;

            ViewBag.MedPurchaseList = MedPurchaseList();
            
            return View(MP);
        }

        [HttpPost]
        [ActionName("AddMedPurchase")]
        public ActionResult AddMedPurchases()
        {
            if (ListMedicinePur.Count == 0)
            {
                return Json(new { msg = false, JsonRequestBehavior.AllowGet });
            }
            for (int i = 0; i < ListMedicinePur.Count; i++) //<------
            {
                MedicinePurchase MedPurchase = new MedicinePurchase();//<------
                MedPurchase = ListMedicinePur[i].MyMedicinePurchase;//<------
                MedPurchase.Status = 1;
                int? nullableSupplierId = MedPurchase.SupplierId;
                db.MedicinePurchase.Add(MedPurchase);
                db.SaveChanges();
                MedicinePurchase obj = db.MedicinePurchase.OrderByDescending(model => model.MedicinePurchaseID).First();
                Stock Stock = new Stock()
                {
                    MedicneId = obj.MedicineID,
                    MedicinePurchaseId = obj.MedicinePurchaseID,
                    TotalQuantity = obj.Quantity,
                    RemainingQuantity = obj.Quantity,
                    SoldQuantity = 0,
                    PurchasePrice = obj.PurchasePrice,
                    SolidPrice = obj.PurchasePrice,
                    Status = 1
                };
                db.Stock.Add(Stock);
                db.SaveChanges();
                TempData["msg"] = "Data successfully Added to your stock please check your stock for detail";
            }
           // ListMedicinePur = null;
            ListMedicinePur = new List<MyModel>();
            ViewBag.MedPurchaseList = MedPurchaseList();
            return Json(new { msg = true, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public ActionResult MedicineList(MedicinePurchase MedPurchase) 
        {
            MedPurchase.Status = 0;
            MyModel data = new MyModel() { MyMedicine = new Medicine(), MyMedicinePurchase = new MedicinePurchase() };
            data = (from Med in db.Medicine
                    select new MyModel
                    {
                        MyMedicine = Med
                    }).Where(x => x.MyMedicine.MedicineID == MedPurchase.MedicineID).FirstOrDefault();

            data.MyMedicinePurchase = MedPurchase;
            ListMedicinePur.Add(data);
            return Json(new { msg = true, JsonRequestBehavior.AllowGet });
        }

        [HttpPost]
        public ActionResult MedicinePayment(int MPId)
        {
            List<MedicinePurchase> MP = db.MedicinePurchase.Where(model => model.InvoiceNo == MPId).ToList();
            foreach (var item in MP)
            {
                item.Status = 1;
                db.Entry(item).State = EntityState.Modified;

            }
            db.SaveChanges();
            // TempData["MSG"] = "Payment successfully paid.";
            //return RedirectToAction(nameof(AddMedPurchase));
            return Json(new { msg = true, JsonRequestBehavior.AllowGet });
        }
        public dynamic MedPurchaseList()
        {

            List<MedPurStockData> data = (from MP in db.MedicinePurchase
                                          join Med in db.Medicine on MP.MedicineID equals Med.MedicineID
                                          join su in db.Distributor on MP.SupplierId equals su.DistributorId
                                          group MP by new { MP.InvoiceNo, su.SupplierName, su.SupplierContact, su.SupplierCNIC, su.ShopName, MP.Status } into g
                                          select new MedPurStockData
                                          {
                                              InvoiceNo = g.Key.InvoiceNo,
                                              SupplierName = g.Key.SupplierName,
                                              SupplierContact = g.Key.SupplierContact,
                                              SupplierCNIC = g.Key.SupplierCNIC,
                                              ShopName = g.Key.ShopName,
                                              Status = g.Key.Status,
                                              TotalMedicines = g.Count()
                                          }).ToList();
            return data;
        }

        //[HttpGet]
        //public ActionResult GetData()
        //{
        //    ViewBag.MedPurchaseList = MedPurchaseList();
        //    List<MedicinePurchase> list = db.MedicinePurchase.ToList();
        //    return PartialView("_MedPurchase", list);
        //}
    }
}