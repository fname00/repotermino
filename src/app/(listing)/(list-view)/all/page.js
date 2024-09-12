import DefaultHeader from "@/components/home/home-v2/Header";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import PropertyFilteringList from "@/components/listing/list-view/list-all/PropertyFilteringList";
import React, { Suspense } from "react";
export const metadata = {
  title: "List || Teneryfa.org.pl",
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

      {/* Property Filtering */}
      <Suspense fallback={<div>Loading...</div>}>
        <PropertyFilteringList />
      </Suspense>
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
