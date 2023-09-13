using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class MedicineSell
    {
        [Key]
        public int MedicineSellId { get; set; }
        public int MedicineId { get; set; }
        public int InvoiceNo { get; set; }
        public int Quantity { get; set; }
        public decimal SoldPrice { get; set; }
        public int Dicount { get; set; }
        public int Bonus { get; set; }
        public int status { get; set; }
    }
}