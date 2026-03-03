
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectAllPatients, deletePatient } from '../../store/patientSlice'

export default function PatientList() {
  const patients = useSelector(selectAllPatients)
  const dispatch = useDispatch()

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Patients</h2>
        <Link to="/patients/new" className="btn btn-primary">
          + Add Patient
        </Link>
      </div>

      {patients.length === 0 ? (
        <p className="empty-state">No patients registered yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Blood Group</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.name}</td>
                <td>{patient.email}</td>
                <td>{patient.phoneNumber}</td>
                <td>
                  <span className="badge badge--info">{patient.bloodGroup}</span>
                </td>
                <td>{patient.address}</td>
                <td className="actions">
                  <Link
                    to={`/patients/${patient.id}/edit`}
                    className="btn btn-sm btn-secondary"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/medical-records/${patient.id}`}
                    className="btn btn-sm btn-secondary"
                  >
                    Records
                  </Link>
                  <button
                    onClick={() => dispatch(deletePatient(patient.id))}
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
