using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class MedicinePurchaseReturn
    {
        [Key]
        public int MedPurReturnId { get; set; }
        public int MedicineId { get; set; }
        public int Quantity { get; set; }
        public int InvoiceNo { get; set; }
    }
}