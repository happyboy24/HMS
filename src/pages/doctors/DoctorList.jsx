import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllDoctors, deleteDoctor } from '../../store/doctorSlice'

export default function DoctorList() {
  const doctors = useSelector(selectAllDoctors)
  const dispatch = useDispatch()

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Doctors</h2>
        <Link to="/doctors/new" className="btn btn-primary">
          + Add Doctor
        </Link>
      </div>

      {doctors.length === 0 ? (
        <p className="empty-state">No doctors added yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Department</th>
              <th>License No.</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id}>
                <td>Dr. {doc.name}</td>
                <td>{doc.specialization}</td>
                <td>{doc.department}</td>
                <td>{doc.licenseNumber}</td>
                <td>{doc.email}</td>
                <td className="actions">
                  <Link to={`/doctors/${doc.id}/edit`} className="btn btn-sm btn-secondary">
                    Edit
                  </Link>
                  <button
                    onClick={() => dispatch(deleteDoctor(doc.id))}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
