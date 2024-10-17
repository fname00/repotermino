'use client'

import AdvanceFilterModal from "@/components/common/advance-filter";
import HeroContent from "./HeroContent";
import { useTranslation } from "react-i18next"; // Import useTranslation hook

const Hero = () => {
  const { t } = useTranslation('common'); // Initialize translation hook with 'common' namespace

  return (
    <>
      <div className="inner-banner-style2 text-center position-relative">
        <h2 className="hero-title" data-aos="fade-up" data-aos-delay="150">
          {t('findYourDreamHome')}
        </h2>

        <HeroContent />
      </div>
      {/* End Hero content */}

      {/* <!-- Advance Feature Modal Start --> */}
      <div className="advance-feature-modal">
        <div
          className="modal fade"
          id="advanceSeachModal"
          tabIndex={-1}
          aria-labelledby="advanceSeachModalLabel"
          aria-hidden="true"
        >
          <AdvanceFilterModal />
        </div>
      </div>
      {/* <!-- Advance Feature Modal End --> */}
    </>
  );
};

export default Hero;
