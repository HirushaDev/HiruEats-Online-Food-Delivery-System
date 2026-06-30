import PublicNavbar from '../Components/PublicNavbar';
import AppDownload from '../Pages/Home/AppDownloadSection';
import HeroSection from '../Pages/Home/HeroSection';
import HowItWorks from '../Pages/User-Home/HowItWorks';
import ShowcaseSection from '../Pages/Home/ShowcaseSection';
import Footer from '../Components/Footer';
import SriLankaMap from '../Pages/Home/SriLankaMap';
import ScrollToTop from '../Components/ScrollToTop';


const Home = () => {

  return (
    <div>
     
      <HeroSection />
      <ShowcaseSection />
      <HowItWorks />
      <SriLankaMap />
      <AppDownload/>
      <ScrollToTop />
    
        
    </div>
  );
}

export default Home;
