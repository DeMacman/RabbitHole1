import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ParticleBackground from './components/ParticleBackground';
import UniversePreview from './components/UniversePreview';
import FeatureCards from './components/FeatureCards';
import VisionSection from './components/VisionSection';
import Footer from './components/Footer';
import EntityDetailPage from './pages/EntityDetailPage';

function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#050505]">
        <ParticleBackground />
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <main>
                <Hero />
                <UniversePreview />
                <FeatureCards />
                <VisionSection />
              </main>
            }
          />
          <Route path="/entity/:slug" element={<EntityDetailPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;