
import { useSelector } from 'react-redux'
import { selectAllPatients } from '../store/patientSlice'
import { selectAllDoctors } from '../store/doctorSlice'
import { selectAllAppointments } from '../store/appointmentSlice'
import { selectAllBills, selectUnpaidBills } from '../store/billingSlice'
import { APPOINTMENT_STATUS } from '../models/Appointment'

function StatCard({ label, value, color }) {
  return (
    <div className={`stat-card stat-card--${color}`}>
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
    </div>
  )
}

export default function Dashboard() {
  const patients = useSelector(selectAllPatients)
  const doctors = useSelector(selectAllDoctors)
  const appointments = useSelector(selectAllAppointments)
  const bills = useSelector(selectAllBills)
  const unpaidBills = useSelector(selectUnpaidBills)

  const todayAppointments = appointments.filter(
    (a) =>
      a.status === APPOINTMENT_STATUS.SCHEDULED &&
      new Date(a.appointmentTime).toDateString() === new Date().toDateString()
  )

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>

      <div className="stats-grid">
        <StatCard label="Total Patients" value={patients.length} color="blue" />
        <StatCard label="Total Doctors" value={doctors.length} color="green" />
        <StatCard label="Today's Appointments" value={todayAppointments.length} color="purple" />
        <StatCard label="Unpaid Bills" value={unpaidBills.length} color="red" />
      </div>

      <div className="dashboard-section">
        <h3>Recent Appointments</h3>
        {appointments.length === 0 ? (
          <p className="empty-state">No appointments yet.</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Date & Time</th>
                <th>Patient ID</th>
                <th>Doctor ID</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.slice(0, 5).map((appt) => (
                <tr key={appt.id}>
                  <td>{new Date(appt.appointmentTime).toLocaleString()}</td>
                  <td>{appt.patientId.slice(0, 8)}…</td>
                  <td>{appt.doctorId.slice(0, 8)}…</td>
                  <td>
                    <span className={`badge badge--${appt.status.toLowerCase()}`}>
                      {appt.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
