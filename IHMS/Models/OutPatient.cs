using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class OutPatient
    {
        [Key]
        public int OutPatientId { get; set; }
        public int PatientId { get; set; }
        public int DoctorId { get; set; }
        public System.DateTime DischargeDate { get; set; }
    }
}