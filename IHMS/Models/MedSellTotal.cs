using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class MedSellTotal
    {
        public int TotalMedicine { get; set; }
        public string MedicineName { get; set; }
        public int? InvoiceNo { get; set; }
        public int? Quantity { get; set; }
        public decimal? SoldPrice { get; set; }
        public int? Dicount { get; set; }
        public int? Bonus { get; set; }
        public int? Status { get; set; }
    }
}