import { Routes, Route, Navigate } from 'react-router-dom'
import { useContext } from 'react'
import Layout from './components/common/Layout'
import Dashboard from './pages/Dashboard'
import PatientList from './pages/patients/PatientList'
import PatientForm from './pages/patients/PatientForm'
import DoctorList from './pages/doctors/DoctorList'
import DoctorForm from './pages/doctors/DoctorForm'
import AppointmentList from './pages/appointments/AppointmentList'
import AppointmentForm from './pages/appointments/AppointmentForm'
import MedicalRecordDetail from './pages/medical-records/MedicalRecordDetail'
import PrescriptionForm from './pages/prescriptions/PrescriptionForm'
import BillList from './pages/billing/BillList'
import Login from './pages/Login'
import { AuthContext } from './context/AuthContext'

function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext)
  return user ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="patients" element={<PatientList />} />
        <Route path="patients/new" element={<PatientForm />} />
        <Route path="patients/:id/edit" element={<PatientForm />} />
        <Route path="doctors" element={<DoctorList />} />
        <Route path="doctors/new" element={<DoctorForm />} />
        <Route path="doctors/:id/edit" element={<DoctorForm />} />
        <Route path="appointments" element={<AppointmentList />} />
        <Route path="appointments/new" element={<AppointmentForm />} />
        <Route path="medical-records/:id" element={<MedicalRecordDetail />} />
        <Route path="prescriptions/new" element={<PrescriptionForm />} />
        <Route path="billing" element={<BillList />} />
      </Route>
    </Routes>
  )
}
