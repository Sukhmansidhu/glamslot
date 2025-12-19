import Hero from "../sections/Hero";
import BrandStory from "../sections/BrandStory";
import ServicesGrid from "../sections/ServicesGrid";
import CampaignBanner from "../sections/CampaignBanner";
import EditorialSplit from "../sections/EditorialSplit";
import WhyGlamSlot from "../sections/WhyGlamSlot";
import JoinCommunity from "../sections/JoinCommunity";
import Footer from "../sections/Footer";

import "../styles/landingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Hero />

      <section className="landing-section">
        <BrandStory />
      </section>

      <section className="landing-section">
        <ServicesGrid />
      </section>

      <div className="section-divider" />

      <section className="landing-section">
        <CampaignBanner />
      </section>

      <div className="section-divider" />

      <section className="landing-section">
        <EditorialSplit />
      </section>

      <section className="landing-section dark">
        <WhyGlamSlot />
      </section>

      <section className="landing-section gradient">
        <JoinCommunity />
      </section>

      <Footer />
    </div>
  );
}











// import Hero from "../sections/Hero";
// import BrandStory from "../sections/BrandStory";
// import ServicesGrid from "../sections/ServicesGrid";
// import CampaignBanner from "../sections/CampaignBanner";
// import EditorialSplit from "../sections/EditorialSplit";
// import WhyGlamSlot from "../sections/WhyGlamSlot";
// import JoinCommunity from "../sections/JoinCommunity";
// import Footer from "../sections/Footer";

// export default function LandingPage() {
//   return (
//     <>
//       <Hero />
//       <BrandStory />
//       <ServicesGrid />
//       <div className="section-divider" />
//       <CampaignBanner />
//       <div className="section-divider" />
//       <EditorialSplit />
//       <WhyGlamSlot />
//       <JoinCommunity />
//       <Footer />
//     </>
//   );
// }