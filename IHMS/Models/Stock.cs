using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class Stock
    {
        [Key]
        public int StockId { get; set; }
        public int MedicneId { get; set; }
        public int MedicinePurchaseId { get; set; }
        public int TotalQuantity { get; set; }
        public int RemainingQuantity { get; set; }
        public int SoldQuantity { get; set; }
        public decimal PurchasePrice { get; set; }
        public decimal SolidPrice { get; set; }
        public int Status { get; set; }
    }
}