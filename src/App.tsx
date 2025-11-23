import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Statistics from './pages/Statistics'
import PhoneManagement from './pages/PhoneManagement'
import OrderBoard from './pages/OrderBoard'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/statistics" replace />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="/phones" element={<PhoneManagement />} />
          <Route path="/orders" element={<OrderBoard />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
