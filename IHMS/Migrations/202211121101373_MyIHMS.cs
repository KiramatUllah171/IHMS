namespace IHMS.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class MyIHMS : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Admins",
                c => new
                    {
                        AdminId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Email = c.String(),
                        Contact = c.String(nullable: false),
                        Password = c.String(nullable: false),
                        Address = c.String(nullable: false),
                        CNIC = c.String(nullable: false),
                        Status = c.Int(nullable: false),
                        Image = c.String(nullable: false),
                    })
                .PrimaryKey(t => t.AdminId);
            
            CreateTable(
                "dbo.AdminCategories",
                c => new
                    {
                        CategoryId = c.Int(nullable: false, identity: true),
                        CategoryName = c.String(),
                    })
                .PrimaryKey(t => t.CategoryId);
            
            CreateTable(
                "dbo.Appointments",
                c => new
                    {
                        AppointmentID = c.Int(nullable: false, identity: true),
                        DoctorID = c.Int(nullable: false),
                        PatientId = c.Int(nullable: false),
                        AppointmentDate = c.DateTime(nullable: false),
                        AppointmentDay = c.String(),
                        AvailableTime = c.String(),
                        Reason = c.String(),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.AppointmentID);
            
            CreateTable(
                "dbo.Categories",
                c => new
                    {
                        CategoryId = c.Int(nullable: false, identity: true),
                        CategoryName = c.String(),
                    })
                .PrimaryKey(t => t.CategoryId);
            
            CreateTable(
                "dbo.Customers",
                c => new
                    {
                        CustomerId = c.Int(nullable: false, identity: true),
                        CustomerName = c.String(),
                        CustomerEmail = c.String(),
                        CustomerContact = c.String(),
                        CustomerAddres = c.String(),
                        CustomerCNIC = c.String(),
                        PotalCode = c.String(),
                        status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.CustomerId);
            
            CreateTable(
                "dbo.Departments",
                c => new
                    {
                        DepartmentId = c.Int(nullable: false, identity: true),
                        DepartmentName = c.String(),
                    })
                .PrimaryKey(t => t.DepartmentId);
            
            CreateTable(
                "dbo.Distributors",
                c => new
                    {
                        DistributorId = c.Int(nullable: false, identity: true),
                        SupplierName = c.String(),
                        SupplierEmail = c.String(),
                        SupplierContact = c.String(),
                        SupplierAddress = c.String(),
                        SupplierCNIC = c.String(),
                        PostalCode = c.String(),
                        ShopName = c.String(),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.DistributorId);
            
            CreateTable(
                "dbo.Doctors",
                c => new
                    {
                        DoctorId = c.Int(nullable: false, identity: true),
                        DoctorName = c.String(),
                        Email = c.String(),
                        Contact = c.String(),
                        Password = c.String(),
                        DoctorFee = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Image = c.String(),
                        Education = c.String(),
                        DepartmentId = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.DoctorId);
            
            CreateTable(
                "dbo.DoctorSchedules",
                c => new
                    {
                        ScheduleId = c.Int(nullable: false, identity: true),
                        DoctorId = c.Int(nullable: false),
                        ScheduleDate = c.DateTime(nullable: false),
                        StartTime = c.DateTime(nullable: false),
                        EndTime = c.DateTime(nullable: false),
                        ConsultingTime = c.DateTime(nullable: false),
                        DepartmentId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ScheduleId);
            
            CreateTable(
                "dbo.Inpatients",
                c => new
                    {
                        AdmitId = c.Int(nullable: false, identity: true),
                        PatientId = c.Int(nullable: false),
                        RoomId = c.Int(nullable: false),
                        DoctorId = c.Int(nullable: false),
                        DateofAdmit = c.DateTime(nullable: false),
                        DateofDischarge = c.DateTime(nullable: false),
                        Advance = c.Decimal(nullable: false, precision: 18, scale: 2),
                        DieaseName = c.String(),
                    })
                .PrimaryKey(t => t.AdmitId);
            
            CreateTable(
                "dbo.Manufacturers",
                c => new
                    {
                        ManufacturerID = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Email = c.String(),
                        Contact = c.String(),
                        Address = c.String(),
                        CompanyCode = c.String(),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ManufacturerID);
            
            CreateTable(
                "dbo.Medicines",
                c => new
                    {
                        MedicineID = c.Int(nullable: false, identity: true),
                        ManufacturerID = c.Int(nullable: false),
                        UnitID = c.Int(nullable: false),
                        CategoryID = c.Int(nullable: false),
                        SubCategoryID = c.Int(nullable: false),
                        MedicineName = c.String(),
                        GenericName = c.String(),
                    })
                .PrimaryKey(t => t.MedicineID);
            
            CreateTable(
                "dbo.MedicinePurchases",
                c => new
                    {
                        MedicinePurchaseID = c.Int(nullable: false, identity: true),
                        MedicineID = c.Int(nullable: false),
                        InvoiceNo = c.Int(nullable: false),
                        Quantity = c.Int(nullable: false),
                        PurchasePrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Discount = c.Int(nullable: false),
                        Bonus = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                        SupplierId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.MedicinePurchaseID);
            
            CreateTable(
                "dbo.MedicinePurchaseReturns",
                c => new
                    {
                        MedPurReturnId = c.Int(nullable: false, identity: true),
                        MedicineId = c.Int(nullable: false),
                        Quantity = c.Int(nullable: false),
                        InvoiceNo = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.MedPurReturnId);
            
            CreateTable(
                "dbo.MedicineSells",
                c => new
                    {
                        MedicineSellId = c.Int(nullable: false, identity: true),
                        MedicineId = c.Int(nullable: false),
                        InvoiceNo = c.Int(nullable: false),
                        Quantity = c.Int(nullable: false),
                        SoldPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Dicount = c.Int(nullable: false),
                        Bonus = c.Int(nullable: false),
                        status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.MedicineSellId);
            
            CreateTable(
                "dbo.OutPatients",
                c => new
                    {
                        OutPatientId = c.Int(nullable: false, identity: true),
                        PatientId = c.Int(nullable: false),
                        DoctorId = c.Int(nullable: false),
                        DischargeDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.OutPatientId);
            
            CreateTable(
                "dbo.tblPatients",
                c => new
                    {
                        PatientId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Email = c.String(),
                        Contact = c.String(),
                        Password = c.String(),
                        DOB = c.String(),
                        Gender = c.String(),
                        MaritialStatus = c.String(),
                    })
                .PrimaryKey(t => t.PatientId);
            
            CreateTable(
                "dbo.Pharmacists",
                c => new
                    {
                        PharmacistId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Email = c.String(),
                        Contact = c.String(),
                        Password = c.String(),
                        Gender = c.String(),
                        Image = c.String(),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.PharmacistId);
            
            CreateTable(
                "dbo.Roles",
                c => new
                    {
                        RoleID = c.Int(nullable: false, identity: true),
                        RoleName = c.String(),
                    })
                .PrimaryKey(t => t.RoleID);
            
            CreateTable(
                "dbo.Rooms",
                c => new
                    {
                        RoomId = c.Int(nullable: false, identity: true),
                        RoomNo = c.String(),
                        RoomTypeId = c.Int(nullable: false),
                        PatientId = c.Int(nullable: false),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.RoomId);
            
            CreateTable(
                "dbo.RoomTypes",
                c => new
                    {
                        RoomTypeId = c.Int(nullable: false, identity: true),
                        Roomtype = c.String(),
                    })
                .PrimaryKey(t => t.RoomTypeId);
            
            CreateTable(
                "dbo.Staffs",
                c => new
                    {
                        StaffId = c.Int(nullable: false, identity: true),
                        StaffName = c.String(),
                        AdminId = c.Int(nullable: false),
                        StaffEmail = c.String(),
                        Contact = c.String(),
                        Salary = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.StaffId);
            
            CreateTable(
                "dbo.Stocks",
                c => new
                    {
                        StockId = c.Int(nullable: false, identity: true),
                        MedicneId = c.Int(nullable: false),
                        MedicinePurchaseId = c.Int(nullable: false),
                        TotalQuantity = c.Int(nullable: false),
                        RemainingQuantity = c.Int(nullable: false),
                        SoldQuantity = c.Int(nullable: false),
                        PurchasePrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        SolidPrice = c.Decimal(nullable: false, precision: 18, scale: 2),
                        Status = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.StockId);
            
            CreateTable(
                "dbo.SubCategories",
                c => new
                    {
                        SubCategoryId = c.Int(nullable: false, identity: true),
                        CategoryId = c.Int(nullable: false),
                        SubCategoryName = c.String(),
                    })
                .PrimaryKey(t => t.SubCategoryId);
            
            CreateTable(
                "dbo.Units",
                c => new
                    {
                        UnitId = c.Int(nullable: false, identity: true),
                        UnitName = c.String(),
                    })
                .PrimaryKey(t => t.UnitId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.Units");
            DropTable("dbo.SubCategories");
            DropTable("dbo.Stocks");
            DropTable("dbo.Staffs");
            DropTable("dbo.RoomTypes");
            DropTable("dbo.Rooms");
            DropTable("dbo.Roles");
            DropTable("dbo.Pharmacists");
            DropTable("dbo.tblPatients");
            DropTable("dbo.OutPatients");
            DropTable("dbo.MedicineSells");
            DropTable("dbo.MedicinePurchaseReturns");
            DropTable("dbo.MedicinePurchases");
            DropTable("dbo.Medicines");
            DropTable("dbo.Manufacturers");
            DropTable("dbo.Inpatients");
            DropTable("dbo.DoctorSchedules");
            DropTable("dbo.Doctors");
            DropTable("dbo.Distributors");
            DropTable("dbo.Departments");
            DropTable("dbo.Customers");
            DropTable("dbo.Categories");
            DropTable("dbo.Appointments");
            DropTable("dbo.AdminCategories");
            DropTable("dbo.Admins");
        }
    }
}
