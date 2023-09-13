using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class Appointment
    {
        [Key]
        public int AppointmentID { get; set; }
        public int DoctorID { get; set; }
        public int PatientId { get; set; }
        public System.DateTime AppointmentDate { get; set; }
        public string AppointmentDay { get; set; }
        public string AvailableTime { get; set; }
        public string Reason { get; set; }
        public int Status { get; set; }
    }
}