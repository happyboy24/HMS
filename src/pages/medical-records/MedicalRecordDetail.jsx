
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllRecords, addRecord, addPrescriptionToRecord } from '../../store/medicalRecordSlice'
import { selectAllPatients } from '../../store/patientSlice'
import { selectAllDoctors } from '../../store/doctorSlice'

export default function MedicalRecordDetail() {
  const { id: patientId } = useParams()
  const dispatch = useDispatch()
  const allRecords = useSelector(selectAllRecords)
  const patients = useSelector(selectAllPatients)
  const doctors = useSelector(selectAllDoctors)

  const records = allRecords.filter((r) => r.patientId === patientId)
  const patient = patients.find((p) => p.id === patientId)

  const [showNewRecord, setShowNewRecord] = useState(false)
  const [newRecord, setNewRecord] = useState({ diagnosis: '', vitals: '', doctorId: '' })
  const [prescriptionForm, setPrescriptionForm] = useState({
    recordId: '', medicineName: '', dosage: '', durationDays: 1,
  })

  const handleAddRecord = (e) => {
    e.preventDefault()
    dispatch(addRecord({ ...newRecord, patientId }))
    setNewRecord({ diagnosis: '', vitals: '', doctorId: '' })
    setShowNewRecord(false)
  }

  const handleAddPrescription = (e) => {
    e.preventDefault()
    dispatch(addPrescriptionToRecord({
      recordId: prescriptionForm.recordId,
      prescription: {
        medicineName: prescriptionForm.medicineName,
        dosage: prescriptionForm.dosage,
        durationDays: prescriptionForm.durationDays,
      },
    }))
    setPrescriptionForm({ recordId: '', medicineName: '', dosage: '', durationDays: 1 })
  }

  return (
    <div>
      <h2 className="page-title">
        Medical Records — {patient?.name || 'Unknown Patient'}
      </h2>

      <div className="page-header">
        <p className="text-muted">Total Records: {records.length}</p>
        <button className="btn btn-primary" onClick={() => setShowNewRecord(!showNewRecord)}>
          + Add Record
        </button>
      </div>

      {showNewRecord && (
        <form className="form-card" onSubmit={handleAddRecord}>
          <h3>New Medical Record</h3>
          <div className="form-group">
            <label>Doctor</label>
            <select
              value={newRecord.doctorId}
              onChange={(e) => setNewRecord({ ...newRecord, doctorId: e.target.value })}
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((d) => <option key={d.id} value={d.id}>Dr. {d.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Diagnosis</label>
            <textarea
              value={newRecord.diagnosis}
              onChange={(e) => setNewRecord({ ...newRecord, diagnosis: e.target.value })}
              rows={2}
              required
            />
          </div>
          <div className="form-group">
            <label>Vitals (BP, Temp, Heart Rate, etc.)</label>
            <input
              value={newRecord.vitals}
              onChange={(e) => setNewRecord({ ...newRecord, vitals: e.target.value })}
              placeholder="e.g. BP: 120/80, Temp: 37°C"
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => setShowNewRecord(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Record</button>
          </div>
        </form>
      )}

      {records.map((record) => (
        <div key={record.id} className="record-card">
          <div className="record-header">
            <div>
              <strong>Diagnosis:</strong> {record.diagnosis}
              <span className="record-date">
                {new Date(record.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p><strong>Vitals:</strong> {record.vitals}</p>
          </div>

          <div className="prescriptions-section">
            <h4>Prescriptions ({record.prescriptions.length})</h4>
            {record.prescriptions.map((rx) => (
              <div key={rx.id} className="prescription-item">
                💊 <strong>{rx.medicineName}</strong> — {rx.dosage} for {rx.durationDays} days
              </div>
            ))}

            <form className="prescription-form" onSubmit={handleAddPrescription}>
              <input type="hidden" value={record.id} />
              <div className="form-row">
                <input
                  placeholder="Medicine name"
                  value={prescriptionForm.recordId === record.id ? prescriptionForm.medicineName : ''}
                  onChange={(e) => setPrescriptionForm({ ...prescriptionForm, recordId: record.id, medicineName: e.target.value })}
                />
                <input
                  placeholder="Dosage (e.g. 500mg twice daily)"
                  value={prescriptionForm.recordId === record.id ? prescriptionForm.dosage : ''}
                  onChange={(e) => setPrescriptionForm({ ...prescriptionForm, recordId: record.id, dosage: e.target.value })}
                />
                <input
                  type="number" min="1"
                  placeholder="Days"
                  value={prescriptionForm.recordId === record.id ? prescriptionForm.durationDays : ''}
                  onChange={(e) => setPrescriptionForm({ ...prescriptionForm, recordId: record.id, durationDays: Number(e.target.value) })}
                />
                <button type="submit" className="btn btn-sm btn-primary">+ Add</button>
              </div>
            </form>
          </div>
        </div>
      ))}

      {records.length === 0 && !showNewRecord && (
        <p className="empty-state">No medical records for this patient.</p>
      )}
    </div>
  )
}
