using System.Web.Mvc;

namespace IHMS.Areas.admindetailinfo
{
    public class admindetailinfoAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "admindetailinfo";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            context.MapRoute(
                "admindetailinfo_default",
                "admindetailinfo/{controller}/{action}/{id}",
                new { action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}