import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import { Overview } from './pages/Overview';
import { Analytics } from './pages/Analytics';
import { Performance } from './pages/Performance';
import { Settings } from './pages/Settings';
import { Layout } from './components/Layout';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Navigation />
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;