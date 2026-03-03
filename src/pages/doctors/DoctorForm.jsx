
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addDoctor, updateDoctor, selectAllDoctors } from '../../store/doctorSlice'

const SPECIALIZATIONS = [
  'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics',
  'Dermatology', 'Oncology', 'General Surgery', 'Psychiatry', 'Radiology',
]

const emptyForm = {
  name: '', email: '', phoneNumber: '',
  employeeID: '', department: '', joinDate: '',
  specialization: '', licenseNumber: '',
}

export default function DoctorForm() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const doctors = useSelector(selectAllDoctors)

  const existing = id ? doctors.find((d) => d.id === id) : null
  const [form, setForm] = useState(existing || emptyForm)

  useEffect(() => {
    if (existing) setForm(existing)
  }, [id])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    existing ? dispatch(updateDoctor({ ...form, id })) : dispatch(addDoctor(form))
    navigate('/doctors')
  }

  return (
    <div className="form-page">
      <h2 className="page-title">{existing ? 'Edit Doctor' : 'Add Doctor'}</h2>
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
            <label>Employee ID</label>
            <input name="employeeID" value={form.employeeID} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Specialization</label>
            <select name="specialization" value={form.specialization} onChange={handleChange} required>
              <option value="">Select Specialization</option>
              {SPECIALIZATIONS.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Department</label>
            <input name="department" value={form.department} onChange={handleChange} required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>License Number</label>
            <input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Join Date</label>
            <input type="date" name="joinDate" value={form.joinDate} onChange={handleChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate('/doctors')}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {existing ? 'Update Doctor' : 'Add Doctor'}
          </button>
        </div>
      </form>
    </div>
  )
}
