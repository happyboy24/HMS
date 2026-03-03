
import { createSlice } from '@reduxjs/toolkit'
import { createPatient } from '../models/Patient'

const initialState = {
  list: [],
  selected: null,
  loading: false,
  error: null,
}

const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {
    addPatient(state, action) {
      state.list.push(createPatient(action.payload))
    },
    updatePatient(state, action) {
      const idx = state.list.findIndex((p) => p.id === action.payload.id)
      if (idx !== -1) state.list[idx] = { ...state.list[idx], ...action.payload }
    },
    deletePatient(state, action) {
      state.list = state.list.filter((p) => p.id !== action.payload)
    },
    selectPatient(state, action) {
      state.selected = state.list.find((p) => p.id === action.payload) || null
    },
    clearSelected(state) {
      state.selected = null
    },
  },
})

export const { addPatient, updatePatient, deletePatient, selectPatient, clearSelected } =
  patientSlice.actions

// Selectors
export const selectAllPatients = (state) => state.patients.list
export const selectSelectedPatient = (state) => state.patients.selected

export default patientSlice.reducer
