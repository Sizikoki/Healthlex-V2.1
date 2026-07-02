import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { Navbar } from '@/components/Navbar';
import { Home } from '@/pages/Home';
import { Dashboard } from '@/pages/Dashboard';
import { Login, Register } from '@/pages/Auth';
import { Study } from '@/pages/Study';
import { Games } from '@/pages/Games';
import { Flashcards } from '@/pages/Flashcards';
import { MatchGame } from '@/pages/MatchGame';
import { Quiz } from '@/pages/Quiz';
import { MorphemeGame } from '@/pages/MorphemeGame';
import { ProgressPage } from '@/pages/Progress';
import { Profile } from '@/pages/Profile';
import { isLoggedIn, syncProgressFromFirestore } from '@/utils/storage';
import { seedMedicalTerms } from '@/firebase/seeder';
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
    <BrowserRouter>

      <div className="App min-h-screen bg-background">
        <Navbar />
        <Routes>
          <Route path="/" element={isLoggedIn() ? <Dashboard /> : <Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/study" element={<Study />} />
          <Route path="/games" element={<Games />} />
          <Route path="/flashcards" element={
            <ProtectedRoute>
              <Flashcards />
            </ProtectedRoute>
          } />
          <Route path="/match" element={
            <ProtectedRoute>
              <MatchGame />
            </ProtectedRoute>
          } />
          <Route path="/quiz" element={
            <ProtectedRoute>
              <Quiz />
            </ProtectedRoute>
          } />
          <Route path="/morpheme" element={
            <ProtectedRoute>
              <MorphemeGame />
            </ProtectedRoute>
          } />
          <Route path="/progress" element={
            <ProtectedRoute>
              <ProgressPage />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
        <Toaster position="top-right" richColors />
      </div>
    </BrowserRouter>
  );
}

export default App;