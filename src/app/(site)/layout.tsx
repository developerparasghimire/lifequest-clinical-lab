import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingActions from "@/components/layout/FloatingActions";
import ScrollProgress from "@/components/ui/ScrollProgress";

// Footer + page banners read live data from the DB on every request.
export const dynamic = "force-dynamic";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <FloatingActions />
    </>
  );
}
