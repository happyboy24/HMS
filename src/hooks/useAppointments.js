
import { useSelector, useDispatch } from 'react-redux'
import {
  selectAllAppointments,
  addAppointment,
  cancelAppointmentById,
  completeAppointment,
} from '../store/appointmentSlice'
import { APPOINTMENT_STATUS } from '../models/Appointment'

export function useAppointments() {
  const dispatch = useDispatch()
  const appointments = useSelector(selectAllAppointments)

  const todayAppointments = appointments.filter(
    (a) =>
      a.status === APPOINTMENT_STATUS.SCHEDULED &&
      new Date(a.appointmentTime).toDateString() === new Date().toDateString()
  )

  return {
    appointments,
    todayAppointments,
    schedule: (data) => dispatch(addAppointment(data)),
    cancel: (id) => dispatch(cancelAppointmentById(id)),
    complete: (id) => dispatch(completeAppointment(id)),
  }
}
