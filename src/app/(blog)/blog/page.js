import Pagination from "@/components/blog/Pagination";
import Blog from "@/components/blog/blog-list-v2/Blog";
import BlogSidebar from "@/components/blog/sidebar";
import DefaultHeader from "@/components/home/home-v2/Header";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";

export const metadata = {
  title: "Teneryfa.org.pl",
};

const BlogV2 = () => {
  return (
    <div className="bgc-f7">
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcrumb Start */}
      <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">Blog</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcrumb Start */}

      <section className="our-blog pt-0">
        <div className="container">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>
      {/* Blog Section Area 
      <section className="our-blog pt-0">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <div className="col-lg-8">
              <Blog />
              <div className="row">
                <div className="mbp_pagination text-center">
                  <Pagination />
                  <p className="mt10 pagination_page_count text-center">
                    1 – 20 of 300+ property available
                  </p>
                </div>
              </div>
            </div>


            <div className="col-lg-4">
              <BlogSidebar />
            </div>
           
          </div>
        </div>
      </section>
      {/* End Blog Section Area */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </div>
  );
};

export default BlogV2;
