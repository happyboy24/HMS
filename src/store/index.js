
import { configureStore } from '@reduxjs/toolkit'
import patientReducer from './patientSlice'
import doctorReducer from './doctorSlice'
import appointmentReducer from './appointmentSlice'
import medicalRecordReducer from './medicalRecordSlice'
import billingReducer from './billingSlice'

const store = configureStore({
  reducer: {
    patients: patientReducer,
    doctors: doctorReducer,
    appointments: appointmentReducer,
    medicalRecords: medicalRecordReducer,
    billing: billingReducer,
  },
})

export default store
