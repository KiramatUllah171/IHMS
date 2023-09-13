using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class MedicinePurchase
    {
        [Key]
        public int MedicinePurchaseID { get; set; }
        public int MedicineID { get; set; }
        public int InvoiceNo { get; set; }
        public int Quantity { get; set; }
        public decimal PurchasePrice { get; set; }
        public int Discount { get; set; }
        public int Bonus { get; set; }
        public int Status { get; set; }
        public int SupplierId { get; set; }
    }
}