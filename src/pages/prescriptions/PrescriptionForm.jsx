// pages/prescriptions/PrescriptionForm.jsx
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addPrescriptionToRecord } from '../../store/medicalRecordSlice'
import { selectAllRecords } from '../../store/medicalRecordSlice'

export default function PrescriptionForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const records = useSelector(selectAllRecords)

  const [form, setForm] = useState({
    medicalRecordId: '',
    medicineName: '',
    dosage: '',
    durationDays: 1,
  })

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addPrescriptionToRecord({
      recordId: form.medicalRecordId,
      prescription: {
        medicineName: form.medicineName,
        dosage: form.dosage,
        durationDays: Number(form.durationDays),
      },
    }))
    navigate(-1)
  }

  return (
    <div className="form-page">
      <h2 className="page-title">Add Prescription</h2>
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Medical Record</label>
          <select name="medicalRecordId" value={form.medicalRecordId} onChange={handleChange} required>
            <option value="">Select Medical Record</option>
            {records.map((r) => (
              <option key={r.id} value={r.id}>
                {r.diagnosis} — {new Date(r.createdAt).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Medicine Name</label>
          <input name="medicineName" value={form.medicineName} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Dosage</label>
            <input name="dosage" value={form.dosage} placeholder="e.g. 500mg twice daily" onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Duration (Days)</label>
            <input type="number" name="durationDays" min="1" value={form.durationDays} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>Cancel</button>
          <button type="submit" className="btn btn-primary">Add Prescription</button>
        </div>
      </form>
    </div>
  )
}
