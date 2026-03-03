
import { createSlice } from '@reduxjs/toolkit'
import { createDoctor } from '../models/Staff'

const initialState = {
  list: [],
  selected: null,
}

const doctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {
    addDoctor(state, action) {
      state.list.push(createDoctor(action.payload))
    },
    updateDoctor(state, action) {
      const idx = state.list.findIndex((d) => d.id === action.payload.id)
      if (idx !== -1) state.list[idx] = { ...state.list[idx], ...action.payload }
    },
    deleteDoctor(state, action) {
      state.list = state.list.filter((d) => d.id !== action.payload)
    },
    selectDoctor(state, action) {
      state.selected = state.list.find((d) => d.id === action.payload) || null
    },
  },
})

export const { addDoctor, updateDoctor, deleteDoctor, selectDoctor } = doctorSlice.actions

export const selectAllDoctors = (state) => state.doctors.list
export const selectSelectedDoctor = (state) => state.doctors.selected

export default doctorSlice.reducer
