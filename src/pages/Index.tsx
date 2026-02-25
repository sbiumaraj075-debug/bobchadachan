import StickyNav from "@/components/StickyNav";
import HeroBanner from "@/components/HeroBanner";
import BankingServices from "@/components/BankingServices";
import NewAccountDetails from "@/components/NewAccountDetails";
import AadhaarServices from "@/components/AadhaarServices";
import GovtSchemes from "@/components/GovtSchemes";
import PMKisanServices from "@/components/PMKisanServices";
import AEPSServices from "@/components/AEPSServices";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <StickyNav />
      <HeroBanner />
      <div id="banking"><BankingServices /></div>
      <div id="new-account"><NewAccountDetails /></div>
      <div id="aadhaar"><AadhaarServices /></div>
      <div id="govt-schemes"><GovtSchemes /></div>
      <div id="pm-kisan"><PMKisanServices /></div>
      <div id="aeps"><AEPSServices /></div>
      <Footer />
    </div>
  );
};

export default Index;