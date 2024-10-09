import DefaultHeader from "@/components/home/home-v2/Header";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import FavoritesList from "@/app/(pages)/favorites/favoritesList"; // Import the FavoritesList component

export const metadata = {
  title: "Favourites || Teneryfa.org.pl",
};

const FavoritesPage = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Favorites List Section */}
      <FavoritesList /> {/* Insert the FavoritesList component here */}
      {/* End Favorites List Section */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default FavoritesPage;
