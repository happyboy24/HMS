
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addPatient, updatePatient, selectAllPatients } from '../../store/patientSlice'

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

const emptyForm = {
  name: '',
  email: '',
  phoneNumber: '',
  bloodGroup: '',
  address: '',
}

export default function PatientForm() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const patients = useSelector(selectAllPatients)

  const existing = id ? patients.find((p) => p.id === id) : null
  const [form, setForm] = useState(existing || emptyForm)

  useEffect(() => {
    if (existing) setForm(existing)
  }, [id])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (existing) {
      dispatch(updatePatient({ ...form, id }))
    } else {
      dispatch(addPatient(form))
    }
    navigate('/patients')
  }

  return (
    <div className="form-page">
      <h2 className="page-title">{existing ? 'Edit Patient' : 'Register Patient'}</h2>
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone Number</label>
            <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Blood Group</label>
            <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange} required>
              <option value="">Select Blood Group</option>
              {BLOOD_GROUPS.map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea name="address" value={form.address} onChange={handleChange} rows={3} />
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/patients')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {existing ? 'Update Patient' : 'Register Patient'}
          </button>
        </div>
      </form>
    </div>
  )
}
