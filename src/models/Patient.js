
import { User } from './User'

export class Patient extends User {
  constructor({ id, name, email, phoneNumber, bloodGroup, address, medicalHistory = [] }) {
    super({ id, name, email, phoneNumber })
    this.bloodGroup = bloodGroup
    this.address = address
    this.medicalHistory = medicalHistory 
    this.role = 'patient'
  }

  register() {
    return { ...this }
  }

  viewPrescriptions() {
  
    return this.medicalHistory
  }
}


export const createPatient = (data) => ({
  id: data.id || crypto.randomUUID(),
  name: data.name || '',
  email: data.email || '',
  phoneNumber: data.phoneNumber || '',
  bloodGroup: data.bloodGroup || '',
  address: data.address || '',
  medicalHistory: data.medicalHistory || [],
  role: 'patient',
  createdAt: data.createdAt || new Date().toISOString(),
})
