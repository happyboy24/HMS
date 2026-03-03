
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  selectAllAppointments,
  cancelAppointmentById,
  completeAppointment,
} from '../../store/appointmentSlice'
import { selectAllPatients } from '../../store/patientSlice'
import { selectAllDoctors } from '../../store/doctorSlice'
import { generateBill } from '../../store/billingSlice'
import { APPOINTMENT_STATUS } from '../../models/Appointment'

export default function AppointmentList() {
  const appointments = useSelector(selectAllAppointments)
  const patients = useSelector(selectAllPatients)
  const doctors = useSelector(selectAllDoctors)
  const dispatch = useDispatch()

  const getPatientName = (id) => patients.find((p) => p.id === id)?.name || id
  const getDoctorName = (id) => doctors.find((d) => d.id === id)?.name || id

  const handleComplete = (appt) => {
    dispatch(completeAppointment(appt.id))
    
    dispatch(generateBill({
      appointmentId: appt.id,
      patientId: appt.patientId,
      amount: 5000.00,
      items: [{ description: 'Consultation Fee', cost: 5000.00 }],
    }))
  }

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Appointments</h2>
        <Link to="/appointments/new" className="btn btn-primary">
          + Schedule Appointment
        </Link>
      </div>

      {appointments.length === 0 ? (
        <p className="empty-state">No appointments scheduled yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{new Date(appt.appointmentTime).toLocaleString()}</td>
                <td>{getPatientName(appt.patientId)}</td>
                <td>Dr. {getDoctorName(appt.doctorId)}</td>
                <td>
                  <span className={`badge badge--${appt.status.toLowerCase()}`}>
                    {appt.status}
                  </span>
                </td>
                <td className="actions">
                  {appt.status === APPOINTMENT_STATUS.SCHEDULED && (
                    <>
                      <button
                        onClick={() => handleComplete(appt)}
                        className="btn btn-sm btn-primary"
                      >
                        Complete
                      </button>
                      <button
                        onClick={() => dispatch(cancelAppointmentById(appt.id))}
                        className="btn btn-sm btn-danger"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
