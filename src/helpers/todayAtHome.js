import dayjs from '../utils/dayConfig'

export const todayAtHome = () => {
    // we get the current date at home, timezone aware
    const todayAtHomeString = dayjs.tz().format('YYYY-MM-DD')
    // formatted to keep only day granularity, consistent with server dates (otherwise dayjs comparisons may depend on exact time)
    const today = dayjs(todayAtHomeString)

    return today
}
