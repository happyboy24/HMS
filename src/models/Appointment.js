
export const APPOINTMENT_STATUS = {
  SCHEDULED: 'SCHEDULED',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED',
  PENDING: 'PENDING',
}

export const createAppointment = (data) => ({
  id: data.id || crypto.randomUUID(),
  patientId: data.patientId || '',
  doctorId: data.doctorId || '',
  appointmentTime: data.appointmentTime || new Date().toISOString(),
  status: data.status || APPOINTMENT_STATUS.PENDING,
  notes: data.notes || '',
  billId: data.billId || null, 
  createdAt: data.createdAt || new Date().toISOString(),
})

export const scheduleAppointment = (appointment) => ({
  ...appointment,
  status: APPOINTMENT_STATUS.SCHEDULED,
})

export const cancelAppointment = (appointment) => ({
  ...appointment,
  status: APPOINTMENT_STATUS.CANCELLED,
})
