// "use client";
import DefaultHeader from "@/components/home/home-v2/Header";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import OverView from "@/components/property/property-single-style/single-activity/OverView";
import PropertyAddress from "@/components/property/property-single-style/single-activity/PropertyAddress";
import PropertyDetails from "@/components/property/property-single-style/single-activity/PropertyDetails";
import PropertyFeaturesAminites from "@/components/property/property-single-style/single-activity/PropertyFeaturesAminites";
import ProperytyDescriptions from "@/components/property/property-single-style/single-activity/ProperytyDescriptions";
import PropertyGallery from "@/components/property/property-single-style/single-activity/PropertyGallery";
import PropertyHeader from "@/components/property/property-single-style/single-activity/PropertyHeader";
import OtherInArea from "@/components/property/property-single-style/single-activity/OtherInArea"; // Import CustomContact
export const metadata = {
  title: "Property Single V2 || Homez - Real Estate NextJS Template",
};

const SingleV2 = ({params}) => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Property All Single V1 */}
      <section className="pt30 pb0 bgc-white">
        <div className="container">
          <div className="row">
            <PropertyHeader id={params.id} />
          </div>
          {/* End .row */}

          <div className="row mb30 mt30">
            <PropertyGallery id={params.id} />
          </div>
          {/* End .row */}

          <div className="row mt30">
            <OverView id={params.id} />
          </div>
          {/* End .row */}
        </div>
        {/* End .container */}
      </section>
      {/* End Property All Single V1  */}
      
      <section className="pt60 pb90 bgc-f7">
        <div className="container">
          <div className="row wrap">
            <div className="col-lg-8">
              
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <h4 className="title fz17 mb30">About activity</h4>
                <ProperytyDescriptions id={params.id} />
                {/* End property description */}
                <div className="row">
                  <PropertyDetails id={params.id}/>
                </div>
              </div>
              {/* End .ps-widget */}

              <div id="custom-background-input" className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <div className="row">
                  <PropertyAddress id={params.id} />
                </div>
              </div>
              {/* End .ps-widget */}
            </div>
            {/* End .col-8 */}
            <div className="col-lg-4">
              <div className="column">
                <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                  <OtherInArea id={params.id}/>
                </div>
              </div>
            </div>
          </div>
          {/* End .row */}
        </div>
      </section>

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default SingleV2;
