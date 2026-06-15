import Navbar from "./navbar/navbar";
import Hero from "./hero/hero";
import EvidenceJourney from "./ecosystem/EvidenceJourney";

import About from "./about/about";
import NethraiSection from "./nethraisection/nethraisection";
import SanketSection from "./sanketsection/sanketsection";
import WhyNayank from "./whyNayank/whyNayank";

import RolesSection from "./rolesSection/rolessection";
import Footer from "./footer/footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />

      <Hero />

      <EvidenceJourney />

      <About />

      <NethraiSection />

      <SanketSection />

      <WhyNayank />

      <RolesSection />

      <Footer />
    </>
  );
}