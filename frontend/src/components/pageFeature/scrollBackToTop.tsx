"use client";
import { useEffect, useState } from "react";

const ScrollBackToTop = ({ }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={handleBackToTop}
          className="fixed bottom-8 right-8 bg-blaze-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-blaze-orange-600 transition"
          aria-label="Back to Top"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default ScrollBackToTop;