
import { useSelector, useDispatch } from 'react-redux'
import { selectAllBills, markAsPaid } from '../../store/billingSlice'
import { selectAllPatients } from '../../store/patientSlice'

export default function BillList() {
  const bills = useSelector(selectAllBills)
  const patients = useSelector(selectAllPatients)
  const dispatch = useDispatch()

  const getPatientName = (id) => patients.find((p) => p.id === id)?.name || 'Unknown'

  const totalRevenue = bills.filter((b) => b.isPaid).reduce((sum, b) => sum + b.amount, 0)
  const pendingAmount = bills.filter((b) => !b.isPaid).reduce((sum, b) => sum + b.amount, 0)

  return (
    <div>
      <h2 className="page-title">Billing</h2>

      <div className="stats-grid stats-grid--small">
        <div className="stat-card stat-card--green">
          <p className="stat-value">₦{totalRevenue.toLocaleString()}</p>
          <p className="stat-label">Total Revenue</p>
        </div>
        <div className="stat-card stat-card--red">
          <p className="stat-value">₦{pendingAmount.toLocaleString()}</p>
          <p className="stat-label">Outstanding</p>
        </div>
        <div className="stat-card stat-card--blue">
          <p className="stat-value">{bills.length}</p>
          <p className="stat-label">Total Bills</p>
        </div>
      </div>

      {bills.length === 0 ? (
        <p className="empty-state">No bills generated yet. Complete an appointment to auto-generate a bill.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Invoice #</th>
              <th>Patient</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill.id}>
                <td className="mono">INV-{bill.id.slice(0, 8).toUpperCase()}</td>
                <td>{getPatientName(bill.patientId)}</td>
                <td>₦{bill.amount.toLocaleString()}</td>
                <td>
                  <span className={`badge ${bill.isPaid ? 'badge--completed' : 'badge--pending'}`}>
                    {bill.isPaid ? 'PAID' : 'UNPAID'}
                  </span>
                </td>
                <td>{new Date(bill.createdAt).toLocaleDateString()}</td>
                <td>
                  {!bill.isPaid && (
                    <button
                      onClick={() => dispatch(markAsPaid(bill.id))}
                      className="btn btn-sm btn-primary"
                    >
                      Mark Paid
                    </button>
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
