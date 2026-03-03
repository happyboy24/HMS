
export const createMedicalRecord = (data) => ({
  id: data.id || crypto.randomUUID(),
  patientId: data.patientId || '',
  doctorId: data.doctorId || '',
  diagnosis: data.diagnosis || '',
  vitals: data.vitals || '',
  prescriptions: data.prescriptions || [], 
  createdAt: data.createdAt || new Date().toISOString(),
  updatedAt: data.updatedAt || new Date().toISOString(),
})

export const updateRecord = (record, changes) => ({
  ...record,
  ...changes,
  updatedAt: new Date().toISOString(),
})



export const createPrescription = (data) => ({
  id: data.id || crypto.randomUUID(),
  medicineName: data.medicineName || '',
  dosage: data.dosage || '',
  durationDays: data.durationDays || 1,
  medicalRecordId: data.medicalRecordId || '',
  prescribedBy: data.prescribedBy || '', 
  createdAt: data.createdAt || new Date().toISOString(),
})



export const createBill = (data) => ({
  id: data.id || crypto.randomUUID(),
  appointmentId: data.appointmentId || '',
  patientId: data.patientId || '',
  amount: data.amount || 0.0,
  isPaid: data.isPaid || false,
  items: data.items || [],
  createdAt: data.createdAt || new Date().toISOString(),
})

export const processPayment = (bill) => ({ ...bill, isPaid: true })

export const generateInvoice = (bill, patient, doctor) => ({
  invoiceNumber: `INV-${bill.id.slice(0, 8).toUpperCase()}`,
  bill,
  patient,
  doctor,
  generatedAt: new Date().toISOString(),
})
