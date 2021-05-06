export const getUniqueBookings = (bookings) => {
    const uniqueBookings = []
    const map = new Map()
    bookings.forEach(booking => {
        if (!map.has(booking.id)) {
            map.set(booking.id)
            uniqueBookings.push(booking)
        }
    })
    return uniqueBookings
}
