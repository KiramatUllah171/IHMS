using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class Medicine
    {
        [Key]
        public int MedicineID { get; set; }
        public int ManufacturerID { get; set; }
        public int UnitID { get; set; }
        public int CategoryID { get; set; }
        public int SubCategoryID { get; set; }
        public string MedicineName { get; set; }
        public string GenericName { get; set; }
    }
}