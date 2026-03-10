import { useState, lazy, Suspense } from 'react';
import TopUtilityBar from '@/components/TopUtilityBar';
import Navbar from '@/components/Navbar';
import VideoHero from '@/components/VideoHero';
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import HeroStatsBar from '@/components/HeroStatsBar';
import NewsTicker from '@/components/NewsTicker';
import FireDetailPanel from '@/components/FireDetailPanel';
import LeaderboardTable from '@/components/LeaderboardTable';
import AnalyticsCharts from '@/components/AnalyticsCharts';
import GlobalStatsSection from '@/components/GlobalStatsSection';
import SpeciesCarousel from '@/components/SpeciesCarousel';
import IntelligenceFeed from '@/components/IntelligenceFeed';
import SDGTracker from '@/components/SDGTracker';
import AlertSubscription from '@/components/AlertSubscription';
import MarketSection from '@/components/MarketSection';
import AboutSection from '@/components/AboutSection';
import HowItWorks from '@/components/HowItWorks';
import ResearchArticles from '@/components/ResearchArticles';
import PartnerLogos from '@/components/PartnerLogos';
import FAQ from '@/components/FAQ';
import DodocoFooter from '@/components/DodocoFooter';
import AuthModal from '@/components/AuthModal';
import SettingsModal from '@/components/SettingsModal';
import BackToTopButton from '@/components/BackToTopButton';
import ScrollProgressBar from '@/components/ScrollProgressBar';
import type { FireEvent } from '@/data/mockData';

const FireMap = lazy(() => import('@/components/FireMap'));

const Index = () => {
  const [selectedFire, setSelectedFire] = useState<FireEvent | null>(null);
  const [authModal, setAuthModal] = useState<{ open: boolean; mode: 'login' | 'signup' }>({ open: false, mode: 'login' });
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background" style={{ paddingTop: 110 }}>
      <ScrollProgressBar />
      <TopUtilityBar />
      <Navbar
        onOpenAuth={(mode) => setAuthModal({ open: true, mode })}
        onOpenSettings={() => setSettingsOpen(true)}
        onToggleSidebar={() => setSidebarOpen(prev => !prev)}
      />
      <VideoHero />

      <div className="max-w-[1600px] mx-auto flex">
        <LeftSidebar open={sidebarOpen} onToggle={() => setSidebarOpen(prev => !prev)} />
        <main className="flex-1 min-w-0 px-4 lg:px-6 py-6 transition-all duration-300">
          <section id="hero-stats"><HeroStatsBar /></section>
          <Suspense fallback={
            <div className="w-full flex items-center justify-center bg-background rounded-lg border border-border" style={{ height: '65vh' }}>
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-muted-foreground font-mono">Loading fire map...</p>
              </div>
            </div>
          }>
            <FireMap onFireSelect={setSelectedFire} />
          </Suspense>
          <NewsTicker />
          <section id="leaderboard"><LeaderboardTable onFireSelect={setSelectedFire} /></section>
          <section id="analytics"><AnalyticsCharts /></section>
          <section id="global-stats"><GlobalStatsSection /></section>
          <section id="species"><SpeciesCarousel /></section>
          <section id="intelligence-feed"><IntelligenceFeed /></section>
          <section id="sdg-tracker"><SDGTracker /></section>
          <MarketSection />
          <HowItWorks />
          <section id="reports"><ResearchArticles /></section>
          <AlertSubscription />
          <PartnerLogos />
          <FAQ />
          <section id="about"><AboutSection /></section>
        </main>
        <RightSidebar />
      </div>

      <DodocoFooter />

      {selectedFire && (
        <FireDetailPanel fire={selectedFire} onClose={() => setSelectedFire(null)} />
      )}

      <AuthModal
        isOpen={authModal.open}
        onClose={() => setAuthModal({ ...authModal, open: false })}
        initialMode={authModal.mode}
      />
      <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <BackToTopButton />
    </div>
  );
};

export default Index;
