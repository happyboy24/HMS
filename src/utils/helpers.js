
export const ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  RECEPTIONIST: 'receptionist',
}

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

export const DEPARTMENTS = [
  'Emergency', 'Cardiology', 'Neurology', 'Orthopedics',
  'Pediatrics', 'Radiology', 'General Surgery', 'Psychiatry',
]


// utils/helpers.js
export const formatDate = (isoString) =>
  new Date(isoString).toLocaleDateString('en-NG', {
    year: 'numeric', month: 'short', day: 'numeric',
  })

export const formatDateTime = (isoString) =>
  new Date(isoString).toLocaleString('en-NG', {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })

export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(amount)

export const truncateId = (id, len = 8) => id?.slice(0, len).toUpperCase() + '…'
