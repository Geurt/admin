export const isPresentAtDay = (day, booking) => {
    const arrInt = parseInt(booking.arrival.replaceAll("-",""))
    const depInt = parseInt(booking.departure.replaceAll("-",""))
    const dayInt = parseInt(day.format("YYYYMMDD"))

    // the parseInt trick preserves ordering, so:
    return (arrInt <= dayInt) && (dayInt <= depInt)
}

// an optimized version (it is executed ~1000s of times in calculating daytotals)
// expects precomputed dayInt, and arrInt, depInt on booking
export const isPresentAtDayInt = (dayInt, booking) => (
    (booking.arrInt <= dayInt) && (dayInt <= booking.depInt)
)
