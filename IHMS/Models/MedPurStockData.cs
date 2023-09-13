using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class MedPurStockData
    {
        public int TotalMedicines { get; set; }
        public int? InvoiceNo { get; set; }
        public string SupplierName { get; set; }
        public string SupplierContact { get; set; }
        public string SupplierCNIC { get; set; }
        public string ShopName { get; set; }
        public int? Status { get; set; }
    }
}