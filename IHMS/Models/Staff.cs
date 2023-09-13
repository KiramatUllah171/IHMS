using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class Staff
    {
        [Key]
        public int StaffId { get; set; }
        public string StaffName { get; set; }
        public int AdminId { get; set; }
        public string StaffEmail { get; set; }
        public string Contact { get; set; }
        public decimal Salary { get; set; }
        public int Status { get; set; }
    }
}