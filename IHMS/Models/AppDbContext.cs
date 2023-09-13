using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace IHMS.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext()
            : base("name=AppDbContext")
        {
        }

        public  DbSet<Admin> Admin { get; set; }
        public  DbSet<Category> Category { get; set; }
        public  DbSet<Customer> Customer { get; set; }
        public  DbSet<Manufacturer> Manufacturer { get; set; }
        public  DbSet<Medicine> Medicine { get; set; }
        public  DbSet<Role> Role { get; set; }
        public  DbSet<SubCategory> SubCategory { get; set; }
        public  DbSet<Unit> Unit { get; set; }
        public  DbSet<Stock> Stock { get; set; }
        public  DbSet<MedicinePurchaseReturn> MedicinePurchaseReturn { get; set; }
        public  DbSet<Distributor> Distributor { get; set; }
        public  DbSet<Room> Room { get; set; }
        public  DbSet<MedicinePurchase> MedicinePurchase { get; set; }
        public  DbSet<MedicineSell> MedicineSell { get; set; }
        public  DbSet<Staff> Staff { get; set; }
        public  DbSet<Department> Department { get; set; }
        public  DbSet<AdminCategory> AdminCategory { get; set; }
        public  DbSet<DoctorSchedule> DoctorSchedule { get; set; }
        public  DbSet<Doctors> Doctors { get; set; }
        public  DbSet<RoomType> RoomType { get; set; }
        public  DbSet<Inpatient> Inpatient { get; set; }
        public  DbSet<OutPatient> OutPatient { get; set; }
        public  DbSet<tblPatient> Patient { get; set; }
        public  DbSet<Appointment> Appointment { get; set; }
        public  DbSet<Pharmacist> Pharmacist { get; set; }
    }
}