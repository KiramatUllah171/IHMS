using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class RoomType
    {
        [Key]
        public int RoomTypeId { get; set; }
        public string Roomtype { get; set; }
    }
}