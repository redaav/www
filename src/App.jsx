import { Routes, Route, Navigate } from 'react-router-dom'
import { StoreProvider } from './stores/StoreContext'
import BottomNav from './components/BottomNav'
import HomePage from './pages/HomePage'
import VehiclePage from './pages/VehiclePage'
import TrackingPage from './pages/TrackingPage'
import HistoryPage from './pages/HistoryPage'
import ProfilePage from './pages/ProfilePage'
import PaymentPage from './pages/PaymentPage'

export default function App() {
  return (
    <StoreProvider>
      <div className="h-screen w-screen max-w-md mx-auto bg-gray-50 relative overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/vehicles" element={<VehiclePage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <BottomNav />
      </div>
    </StoreProvider>
  )
}
