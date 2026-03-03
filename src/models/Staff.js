

import { User } from './User'

export class Staff extends User {
  constructor({ id, name, email, phoneNumber, employeeID, department, joinDate }) {
    super({ id, name, email, phoneNumber })
    this.employeeID = employeeID
    this.department = department
    this.joinDate = joinDate
    this.role = 'staff'
  }
}


export class Doctor extends Staff {
  constructor(data) {
    super(data)
    this.specialization = data.specialization
    this.licenseNumber = data.licenseNumber
    this.role = 'doctor'
  }

  consult(patientId, notes) {
    return { doctorId: this.id, patientId, notes, date: new Date().toISOString() }
  }

  prescribeMedication({ medicineName, dosage, durationDays }) {
    return { medicineName, dosage, durationDays, prescribedBy: this.id }
  }
}


export class Nurse extends Staff {
  constructor(data) {
    super(data)
    this.role = 'nurse'
  }
}


export const createDoctor = (data) => ({
  id: data.id || crypto.randomUUID(),
  name: data.name || '',
  email: data.email || '',
  phoneNumber: data.phoneNumber || '',
  employeeID: data.employeeID || '',
  department: data.department || '',
  joinDate: data.joinDate || new Date().toISOString(),
  specialization: data.specialization || '',
  licenseNumber: data.licenseNumber || '',
  role: 'doctor',
  createdAt: data.createdAt || new Date().toISOString(),
})

export const createNurse = (data) => ({
  id: data.id || crypto.randomUUID(),
  name: data.name || '',
  email: data.email || '',
  phoneNumber: data.phoneNumber || '',
  employeeID: data.employeeID || '',
  department: data.department || '',
  joinDate: data.joinDate || new Date().toISOString(),
  role: 'nurse',
  createdAt: data.createdAt || new Date().toISOString(),
})
