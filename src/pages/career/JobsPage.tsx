import { useContext, useEffect } from "react";
import { NavbarThemeContext } from "@/App";

const CareersPage = () => {
  const navbarContext = useContext(NavbarThemeContext);

  useEffect(() => {
    navbarContext?.setNavbarTheme("light");
  }, [navbarContext]);

  useEffect(() => {
    const scriptId = "round-hr-embed-script";

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://recruit.roundhr.com/nsuslab/embed";
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      const iframe = document.getElementById("round_embed_iframe");
      if (iframe?.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
      const script = document.getElementById(scriptId);
      if (script?.parentNode) {
        script.parentNode.removeChild(script);
      }

      const newUrl = window.location.pathname + window.location.hash;
      window.history.replaceState(null, '', newUrl);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-white via-[#f5f8fb] to-white text-nsus-gray-900">
      <section className="relative overflow-hidden pt-12 pb-6">
        <h2 className="max-w-screen-xl mx-auto px-4 md:px-8 text-nsus-gray-900 mt-24">
          We're Hiring
        </h2>
      </section>
      <section className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 pb-12 lg:pb-24">
        <div id="round_embed" data-job-layout="sidebar" />
      </section>
    </div>
  );
};

export default CareersPage;