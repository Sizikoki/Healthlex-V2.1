import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@/components/Navbar';
import { Home } from '@/pages/Home';
import { Login, Register } from '@/pages/Auth';
import { Study } from '@/pages/Study';
import { Games } from '@/pages/Games';
import { Flashcards } from '@/pages/Flashcards';
import { MatchGame } from '@/pages/MatchGame';
import { Quiz } from '@/pages/Quiz';
import { MorphemeGame } from '@/pages/MorphemeGame';
import { MorphemeExplorer } from '@/pages/MorphemeExplorer';
import { ProgressPage } from '@/pages/Progress';
import { Profile } from '@/pages/Profile';
import { isLoggedIn, syncProgressFromFirestore } from '@/utils/storage';
import { seedMedicalTerms } from '@/firebase/seeder';
import { LanguageProvider } from '@/context/LanguageContext';
import './App.css';

const ProtectedRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
};

function App() {
  useEffect(() => {
    seedMedicalTerms();
    if (isLoggedIn()) {
      syncProgressFromFirestore();
    }
  }, []);


  return (
    <LanguageProvider>
      <BrowserRouter>

        <div className="App min-h-screen bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Navigate to="/" replace />} />
            <Route path="/panel" element={<Navigate to="/" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/study" element={<Study />} />
            <Route path="/games" element={<Games />} />
            <Route path="/flashcards" element={<Flashcards />} />
            <Route path="/match" element={<MatchGame />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/morpheme" element={<MorphemeGame />} />
            <Route path="/morphemes" element={<MorphemeExplorer />} />
            <Route path="/morpheme-explorer" element={<MorphemeExplorer />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </Routes>
          <Toaster position="top-right" richColors />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;