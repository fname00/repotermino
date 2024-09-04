import DefaultHeader from "@/components/home/home-v2/Header";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import PropertyFilteringList from "@/components/listing/grid-view/grid-activity/ProperteyFiltering";
import React from "react";

export const metadata = {
  title: "List || Homez - Real Estate NextJS Template",
};

const ListV1 = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}
      {/* Home Banner Style V2 */}
      <section className="activity-banner-style2 p0">
        <div className="home-style2">
          <div className="container maxw1600">
            <div className="home2-activity-banner bdrs12">
              <div className="row">
                <div className="col-xl-10 mx-auto">
                  <div className="inner-banner-style2 text-center position-relative">
                    <h2 className="hero-title" data-aos="fade-up" data-aos-delay="150">
                      BOOK YOUR TRIP
                    </h2>
                  </div>
              </div>
            </div>
          </div>
        </div>
          {/* End .container */}
        </div>
      </section>
      {/* End Home Banner Style V2 */}

      {/* Property Filtering */}
      <PropertyFilteringList/>
     
      {/* Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default ListV1;
