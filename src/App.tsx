import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AccountsPage from './pages/AccountsPage';
import NetworkPage from './pages/NetworkPage';
import GrowthPage from './pages/GrowthPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';

function SubLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-sans antialiased">
      <Navbar />
      {children}
      <Footer />
      <LiveChat />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/accounts"
          element={
            <SubLayout>
              <AccountsPage />
            </SubLayout>
          }
        />
        <Route
          path="/network"
          element={
            <SubLayout>
              <NetworkPage />
            </SubLayout>
          }
        />
        <Route
          path="/growth"
          element={
            <SubLayout>
              <GrowthPage />
            </SubLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
