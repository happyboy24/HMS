
import { createSlice } from '@reduxjs/toolkit'
import { createBill, processPayment } from '../models/Records'

const initialState = { list: [] }

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    generateBill(state, action) {
      state.list.push(createBill(action.payload))
    },
    markAsPaid(state, action) {
      const idx = state.list.findIndex((b) => b.id === action.payload)
      if (idx !== -1) state.list[idx] = processPayment(state.list[idx])
    },
    updateBill(state, action) {
      const idx = state.list.findIndex((b) => b.id === action.payload.id)
      if (idx !== -1) state.list[idx] = { ...state.list[idx], ...action.payload }
    },
  },
})

export const { generateBill, markAsPaid, updateBill } = billingSlice.actions

export const selectAllBills = (state) => state.billing.list
export const selectUnpaidBills = (state) => state.billing.list.filter((b) => !b.isPaid)

export default billingSlice.reducer
