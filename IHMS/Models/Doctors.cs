using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class Doctors
    {
        [Key]
        public int DoctorId { get; set; }
        public string DoctorName { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public string Password { get; set; }
        public decimal DoctorFee { get; set; }
        public string Image { get; set; }
        public string Education { get; set; }
        public int DepartmentId { get; set; }
        public int Status { get; set; }
    }
}