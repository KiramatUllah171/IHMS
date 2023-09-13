using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class Inpatient
    {
        [Key]
        public int AdmitId { get; set; }
        public int PatientId { get; set; }
        public int RoomId { get; set; }
        public int DoctorId { get; set; }
        public System.DateTime DateofAdmit { get; set; }
        public System.DateTime DateofDischarge { get; set; }
        public decimal Advance { get; set; }
        public string DieaseName { get; set; }
    }
}