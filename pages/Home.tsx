import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ContentGrid from '../components/ContentGrid';
import MindfulnessExercises from '../components/MindfulnessExercises';
import AIInsights from '../components/AIInsights';
import StayOnTrack from '../components/StayOnTrack';
import MoodTrackerDemo from '../components/MoodTrackerDemo';
import ContentLibrary from '../components/ContentLibrary';
import UpcomingFeatures from '../components/UpcomingFeatures';
import Testimonials from '../components/Testimonials';
import EarlyAccess from '../components/EarlyAccess';

export default function Home() {
  return (
    <>
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
    </>
  );
}
