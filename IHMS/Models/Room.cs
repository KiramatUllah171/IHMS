using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class Room
    {
        [Key]
        public int RoomId { get; set; }
        public string RoomNo { get; set; }
        public int RoomTypeId { get; set; }
        public int PatientId { get; set; }
        public int Status { get; set; }
    }
}