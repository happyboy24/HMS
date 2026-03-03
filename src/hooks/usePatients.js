// hooks/usePatients.js
import { useSelector, useDispatch } from 'react-redux'
import { selectAllPatients, addPatient, updatePatient, deletePatient } from '../store/patientSlice'

export function usePatients() {
  const dispatch = useDispatch()
  const patients = useSelector(selectAllPatients)

  return {
    patients,
    addPatient: (data) => dispatch(addPatient(data)),
    updatePatient: (data) => dispatch(updatePatient(data)),
    deletePatient: (id) => dispatch(deletePatient(id)),
  }
}
