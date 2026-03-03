
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addAppointment } from '../../store/appointmentSlice'
import { selectAllPatients } from '../../store/patientSlice'
import { selectAllDoctors } from '../../store/doctorSlice'
import { APPOINTMENT_STATUS } from '../../models/Appointment'

export default function AppointmentForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const patients = useSelector(selectAllPatients)
  const doctors = useSelector(selectAllDoctors)

  const [form, setForm] = useState({
    patientId: '',
    doctorId: '',
    appointmentTime: '',
    notes: '',
    status: APPOINTMENT_STATUS.SCHEDULED,
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addAppointment(form))
    navigate('/appointments')
  }

  return (
    <div className="form-page">
      <h2 className="page-title">Schedule Appointment</h2>
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Patient</label>
            <select name="patientId" value={form.patientId} onChange={handleChange} required>
              <option value="">Select Patient</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Doctor</label>
            <select name="doctorId" value={form.doctorId} onChange={handleChange} required>
              <option value="">Select Doctor</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>Dr. {d.name} — {d.specialization}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Appointment Date & Time</label>
            <input
              type="datetime-local"
              name="appointmentTime"
              value={form.appointmentTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Notes</label>
          <textarea name="notes" value={form.notes} onChange={handleChange} rows={3} />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/appointments')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Schedule Appointment
          </button>
        </div>
      </form>
    </div>
  )
}
