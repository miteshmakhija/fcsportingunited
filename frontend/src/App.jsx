import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProtectedRoute from './components/common/ProtectedRoute'
import ScrollToTop from './components/common/ScrollToTop'

import Home from './pages/public/Home'
import Coaches from './pages/public/Coaches'
import Achievements from './pages/public/Achievements'
import ILeagueMission from './pages/public/ILeagueMission'
import HighPerformance from './pages/public/HighPerformance'
import AthleteCare from './pages/public/AthleteCare'
import Join from './pages/public/Join'

import Login from './pages/auth/Login'

import AdminDashboard from './pages/admin/AdminDashboard'
import ManagePlayers from './pages/admin/ManagePlayers'
import AssignExercises from './pages/admin/AssignExercises'
import FeeTracker from './pages/admin/FeeTracker'
import PlayerMetricsAdmin from './pages/admin/PlayerMetricsAdmin'
import Enquiries from './pages/admin/Enquiries'

import KidDashboard from './pages/kid/KidDashboard'
import MyExercises from './pages/kid/MyExercises'
import MyStats from './pages/kid/MyStats'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/coaches" element={<Coaches />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/i-league-mission" element={<ILeagueMission />} />
          <Route path="/high-performance" element={<HighPerformance />} />
          <Route path="/athlete-care" element={<AthleteCare />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<Login />} />

          {/* Admin */}
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/players" element={<ManagePlayers />} />
            <Route path="/admin/exercises" element={<AssignExercises />} />
            <Route path="/admin/fees" element={<FeeTracker />} />
            <Route path="/admin/metrics" element={<PlayerMetricsAdmin />} />
            <Route path="/admin/enquiries" element={<Enquiries />} />
          </Route>

          {/* Kid */}
          <Route element={<ProtectedRoute role="kid" />}>
            <Route path="/dashboard" element={<KidDashboard />} />
            <Route path="/dashboard/exercises" element={<MyExercises />} />
            <Route path="/dashboard/stats" element={<MyStats />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

