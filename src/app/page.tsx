import { Navbar } from "@/components/site/sections/Navbar";
import { HeroSection } from "@/components/site/sections/HeroSection";
import { TrustedCompanies } from "@/components/site/sections/TrustedCompanies";
import { ProductOverview } from "@/components/site/sections/ProductOverview";
import { PlatformShowcase } from "@/components/site/sections/PlatformShowcase";
import { FeatureTimeline } from "@/components/site/sections/FeatureTimeline";
import { SaaSModules } from "@/components/site/sections/SaaSModules";
import { POSExperience } from "@/components/site/sections/POSExperience";
import { KitchenDisplay } from "@/components/site/sections/KitchenDisplay";
import { InventorySection } from "@/components/site/sections/InventorySection";
import { CRMSection } from "@/components/site/sections/CRMSection";
import { AIAnalytics } from "@/components/site/sections/AIAnalytics";
import { SecuritySection } from "@/components/site/sections/SecuritySection";
import { PerformanceSection } from "@/components/site/sections/PerformanceSection";
import { ScreenshotsGallery } from "@/components/site/sections/ScreenshotsGallery";
import { PricingSection } from "@/components/site/sections/PricingSection";
import { TestimonialsSection } from "@/components/site/sections/TestimonialsSection";
import { ContactSection } from "@/components/site/sections/ContactSection";
import { SiteFooter } from "@/components/site/sections/SiteFooter";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <TrustedCompanies />
        <ProductOverview />
        <PlatformShowcase />
        <FeatureTimeline />
        <SaaSModules />
        <POSExperience />
        <KitchenDisplay />
        <InventorySection />
        <CRMSection />
        <AIAnalytics />
        <SecuritySection />
        <PerformanceSection />
        <ScreenshotsGallery />
        <PricingSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </div>
  );
}
