import Hero from './components/hero/Hero';
import Features from './components/Features';
import ContentGrid from './components/ContentGrid';
import MindfulnessExercises from './components/MindfulnessExercises';
import AIInsights from './components/AIInsights';
import StayOnTrack from './components/StayOnTrack';
import MoodTrackerDemo from './components/MoodTrackerDemo';
import ContentLibrary from './components/ContentLibrary';
import UpcomingFeatures from './components/UpcomingFeatures';
import Testimonials from './components/Testimonials';
import EarlyAccess from './components/EarlyAccess';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50/50">
      <main className="relative z-10">
        <Hero />
        <div className="relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-violet-100/20 via-transparent to-transparent"></div>
          <Features />
        </div>
        <ContentGrid />
        <MindfulnessExercises />
        <AIInsights />
        <StayOnTrack />
        <MoodTrackerDemo />
        <ContentLibrary />
        <UpcomingFeatures />
        <Testimonials />
        <EarlyAccess />
      </main>
      <Footer />
    </div>
  );
}

export default App;