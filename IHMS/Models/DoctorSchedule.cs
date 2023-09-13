using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class DoctorSchedule
    {
        [Key]
        public int ScheduleId { get; set; }
        public int DoctorId { get; set; }

       // [DisplayFormat(DataFormatString = "{MM/dd/yyyy}")]
        public DateTime ScheduleDate { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public DateTime ConsultingTime { get; set; }
        public int DepartmentId { get; set; }
    }
}