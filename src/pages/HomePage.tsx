import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import RealtimePurchase from '../components/RealtimePurchase';
import LiveChat from '../components/LiveChat';
import PainPoints from '../components/PainPoints';
import Services from '../components/Services';
import Cases from '../components/Cases';
import Reviews from '../components/Reviews';
import WhyUs from '../components/WhyUs';
import FAQ from '../components/FAQ';
import BottomCTA from '../components/BottomCTA';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      <Hero />
      <PainPoints />
      <Services />
      <Cases />
      <Reviews />
      <WhyUs />
      <FAQ />
      <BottomCTA />
      <Footer />
      <RealtimePurchase />
      <LiveChat />
    </div>
  );
}
