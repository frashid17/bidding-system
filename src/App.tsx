import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navigation } from './components/Navigation';
import { Overview } from './pages/Overview';
import { Analytics } from './pages/Analytics';
import { Performance } from './pages/Performance';
import { Settings } from './pages/Settings';
import { Layout } from './components/Layout';
import { Advertisement } from './components/Advertisement';


const sampleAdUnit = {
  code: 'div-gpt-ad-1234567890',
  mediaTypes: {
    banner: {
      sizes: [[300, 250]]  
    }
  },
  bids: [
    {
      bidder: 'appnexus',
      params: {
        placementId: '13144370'
      }
    }
  ]
};

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
          <Advertisement adUnit={sampleAdUnit} />
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;