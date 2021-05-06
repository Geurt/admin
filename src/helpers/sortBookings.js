import dayjs from 'dayjs'
import { todayAtHome } from './todayAtHome'

export const sortBookings = (bookings) => {
    const today = todayAtHome()

    bookings.sort((a,b) => {
        return dayjs(a.departure).isBefore(b.departure, 'days') ? -1 : 1
    })

    return bookings
}
