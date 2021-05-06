export const convertDateToInt = (dateString) => parseInt(dateString.replaceAll("-",""))

export const addDateIntsToBookings = (bookings) => {
    return bookings.forEach(booking => {
        booking.arrInt = convertDateToInt(booking.arrival)
        booking.depInt = convertDateToInt(booking.departure)
    });
}
