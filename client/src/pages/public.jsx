import React from "react";
import Hero from "../components/hero";
import Header from "../components/header";
import PublicPageCourseGrid from "../features/courses/ui/publicPageCourseGrid";
import { useNavigate } from "react-router-dom";
import FAQ from "../components/faq";
import Footer from "../components/footer";
import Banner from "../components/banner";
import Video from "../components/video";
const Public = () => {
  return (
    <>
      <main className="bg-slate-100">
        <Hero />
        <PublicPageCourseGrid />
        <Banner />
        <Video />
      </main>
    </>
  );
};

export default Public;
