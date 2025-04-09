import React from "react";
import PropertiesHero from "../components/PropertyComponents/PropertiesHero";
import SearchFilterBar from "../components/PropertyComponents/SearchFilterBar";
import PropertyGrid from "../components/PropertyComponents/PropertyGrid";
import InfiniteScrollSection from "../components/PropertyComponents/InfiniteScrollSection";
import CallToAction from "../components/PropertyComponents/CallToAction";

const Property = () => {
  return (
    <>
      <PropertiesHero />
      <SearchFilterBar />
      {/* <PropertyGrid /> */}
      <InfiniteScrollSection />
      <CallToAction />
    </>
  );
};

export default Property;
