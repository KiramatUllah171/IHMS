using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class Distributor
    {
        [Key]
        public int DistributorId { get; set; }
        public string SupplierName { get; set; }
        public string SupplierEmail { get; set; }
        public string SupplierContact { get; set; }
        public string SupplierAddress { get; set; }
        public string SupplierCNIC { get; set; }
        public string PostalCode { get; set; }
        public string ShopName { get; set; }
        public int Status { get; set; }
    }
}