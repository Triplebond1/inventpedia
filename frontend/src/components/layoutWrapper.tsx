"use client";

import { usePathname } from "next/navigation";
import Footer from "@/components/footer";
import Navbar from "@/components/header";
import ScrollBackToTop  from "@/components/pageFeature/scrollBackToTop";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define routes that should not include Navbar and Footer
  const noLayoutRoutes = ["/signup", "/login", "/dashboard", "/dashboard/media"];
  const hideLayout = noLayoutRoutes.includes(pathname);

  return (
    <div>
      {!hideLayout && (
        <header className="w-full sticky top-0 z-50">
          <Navbar />
        </header>
      )}
      {children}

      {!hideLayout && (
        <footer className="w-full flex-col sm:items-start items-center bg-gray-900 text-white mt-10 py-10">
          <Footer />
        </footer>
      )}

      {/* Back to Top Button */}
      <ScrollBackToTop />
    </div>
  );
}
