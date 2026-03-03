
import { createSlice } from '@reduxjs/toolkit'
import { createAppointment, cancelAppointment, APPOINTMENT_STATUS } from '../models/Appointment'

const initialState = {
  list: [],
  selected: null,
}

const appointmentSlice = createSlice({
  name: 'appointments',
  initialState,
  reducers: {
    addAppointment(state, action) {
      state.list.push(createAppointment(action.payload))
    },
    updateAppointment(state, action) {
      const idx = state.list.findIndex((a) => a.id === action.payload.id)
      if (idx !== -1) state.list[idx] = { ...state.list[idx], ...action.payload }
    },
    cancelAppointmentById(state, action) {
      const idx = state.list.findIndex((a) => a.id === action.payload)
      if (idx !== -1) state.list[idx] = cancelAppointment(state.list[idx])
    },
    completeAppointment(state, action) {
      const idx = state.list.findIndex((a) => a.id === action.payload)
      if (idx !== -1) state.list[idx].status = APPOINTMENT_STATUS.COMPLETED
    },
    selectAppointment(state, action) {
      state.selected = state.list.find((a) => a.id === action.payload) || null
    },
  },
})

export const {
  addAppointment,
  updateAppointment,
  cancelAppointmentById,
  completeAppointment,
  selectAppointment,
} = appointmentSlice.actions

export const selectAllAppointments = (state) => state.appointments.list

export default appointmentSlice.reducer
