import PublicNavbar from '../Components/PublicNavbar';
import AppDownload from '../Pages/AppDownloadSection';
import HeroSection from '../Pages/HeroSection';
import HowItWorks from '../Pages/HowItWorks';
import ShowcaseSection from '../Pages/ShowcaseSection';
import Footer from '../Components/Footer';
import SriLankaMap from '../Pages/SriLankaMap';


const Home = () => {
  return (
    <div>
     
      <HeroSection />
      <ShowcaseSection />
      <HowItWorks />
      <SriLankaMap />
      <AppDownload/>
     
        
    </div>
  );
}

export default Home;
