
import { createSlice } from '@reduxjs/toolkit'
import { createMedicalRecord, updateRecord, createPrescription } from '../models/Records'

const initialState = { list: [] }

const medicalRecordSlice = createSlice({
  name: 'medicalRecords',
  initialState,
  reducers: {
    addRecord(state, action) {
      state.list.push(createMedicalRecord(action.payload))
    },
    updateRecord(state, action) {
      const idx = state.list.findIndex((r) => r.id === action.payload.id)
      if (idx !== -1)
        state.list[idx] = updateRecord(state.list[idx], action.payload.changes)
    },
    addPrescriptionToRecord(state, action) {
      const { recordId, prescription } = action.payload
      const record = state.list.find((r) => r.id === recordId)
      if (record) record.prescriptions.push(createPrescription({ ...prescription, medicalRecordId: recordId }))
    },
  },
})

export const { addRecord, updateRecord: updateRecordAction, addPrescriptionToRecord } =
  medicalRecordSlice.actions

export const selectAllRecords = (state) => state.medicalRecords.list
export const selectRecordsByPatient = (patientId) => (state) =>
  state.medicalRecords.list.filter((r) => r.patientId === patientId)

export default medicalRecordSlice.reducer
