using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class Admin
    {
        [Key]
        public int AdminId { get; set; }
     //   [Required(ErrorMessage ="Name is Required")]
        public string Name { get; set; }
     //   [Required(ErrorMessage = "Email is Required")]
        public string Email { get; set; }
        [Required]
        public string Contact { get; set; }
        [Required]
        public string Password { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public string CNIC { get; set; }
        [Required]
        public int Status { get; set; }
        [Required]
        public string Image { get; set; }
    }
}