import LandingPageNavbar from "../components/navbar/LandingPageNavbar";
import LandingPageFooter from "../components/footer/LandingPageFooter";
import HeroSection from "../scenes_LP/HeroSection";
import Workflow from "../scenes_LP/Workflow";
import Testimonials from "../scenes_LP/Testimonials";

const LandingPage = () => {
  return (
    <>
      <LandingPageNavbar />
      <div className="max-w-7xl mx-auto pt-20 px-6">
        <HeroSection />
        <Workflow />
        <Testimonials />
        <LandingPageFooter />
      </div>
    </>
  );
};

export default LandingPage;