using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class MyModel
    {
        public SubCategory MySubCategory { get; set; }
        public Manufacturer MyManufacturer { get; set; }
        public Unit MyUnit { get; set; }
        public Medicine MyMedicine { get; set; }
        public MedicinePurchase MyMedicinePurchase { get; set; }
        public MedicineSell MyMedicineSell { get; set; }
        public Stock MyStock { get; set; }
        public MedicinePurchaseReturn MyMedPurReturn { get; set; }
        public Distributor MyDistributor { get; set; }
        public Appointment MyAppointment { get; set; }
        public Doctors MyDoctor { get; set; }
        public Department MyDepartment { get; set; }
        public DoctorSchedule MySchedule { get; set; }
        public RoomType MyRoomType { get; set; }
        public Room MyRoom { get; set; }
        public Inpatient MyInpatient { get; set; }
        public OutPatient MyOutPatient { get; set; }
        public tblPatient MyPatient { get; set; }
        public Category MyCategory { get; set; }
    }
}