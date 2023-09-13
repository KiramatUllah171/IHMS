using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class Pharmacist
    {
        [Key]
        public int PharmacistId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Contact { get; set; }
        public string Password { get; set; }
        public string Gender { get; set; }
        public string Image { get; set; }
        public int Status { get; set; }
    }
}