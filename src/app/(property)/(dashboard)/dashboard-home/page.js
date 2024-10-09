import { getServerSession } from "next-auth/next";
import { authOptions } from "/pages/api/auth/[...nextauth]"; // Import nowej konfiguracji
import DashboardHeader from "@/components/common/DefaultHeader";
import MobileMenu from "@/components/common/mobile-menu";
import DboardMobileNavigation from "@/components/property/dashboard/DboardMobileNavigation";
import Footer from "@/components/property/dashboard/Footer";
import SidebarDashboard from "@/components/property/dashboard/SidebarDashboard";
import RecentActivities from "@/components/property/dashboard/dashboard-home/RecentActivities";
import TopStateBlock from "@/components/property/dashboard/dashboard-home/TopStateBlock";
import PropertyViews from "@/components/property/dashboard/dashboard-home/property-view";

export const metadata = {
  title: "Dashboard Home || Teneryfa.org.pl",
};

export default async function DashboardHome() {
  const session = await getServerSession(authOptions);

  // Sprawdzenie sesji użytkownika i roli
  if (!session) {
    return (
      <div>
        <h1>Nie masz dostępu do tej strony</h1>
        <a href="login">Zaloguj się tutaj</a>
      </div>
    );
  }

  if (session.user.role !== "admin") {
    return (
      <div>
        <h1>Nie masz odpowiednich uprawnień</h1>
        <a href="/">Powrót do strony głównej</a>
      </div>
    );
  }

  return (
    <>
      {/* Main Header Nav */}
      <DashboardHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* dashboard_content_wrapper */}
      <div className="dashboard_content_wrapper">
        <div className="dashboard dashboard_wrapper pr30 pr0-xl">
          <SidebarDashboard />
          {/* End .dashboard__sidebar */}

          <div className="dashboard__main pl0-md">
            <div className="dashboard__content bgc-f7">
              <div className="row pb40">
                <div className="col-lg-12">
                  <DboardMobileNavigation />
                </div>
                {/* End .col-12 */}

                <div className="col-lg-12">
                  <div className="dashboard_title_area">
                    <h2>Howdy, Adminie!</h2>
                    <p className="text">Dobrze Cię znowu widzieć!</p>
                  </div>
                </div>
                {/* col-lg-12 */}
              </div>
              {/* End .row */}

              {/* Inne komponenty, jak RecentActivities, TopStateBlock, PropertyViews */}
              <Footer />
            </div>
            {/* End .dashboard__content */}

            <Footer />
          </div>
          {/* End .dashboard__main */}
        </div>
      </div>
      {/* dashboard_content_wrapper */}
    </>
  );
}
