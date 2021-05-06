import dayjs from 'dayjs'

import isBetween from 'dayjs/plugin/isBetween'
import utc from 'dayjs/plugin/utc' // timezone dependent on utc plugin
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(isBetween)
dayjs.extend(utc)
dayjs.extend(timezone)

// set timezone to local time
dayjs.tz.setDefault("Europe/Paris")
// NOTE: this only affects calls to dayjs.tz(), not to dayjs()
// So to get current time at home, call dayjs.tz()

export default dayjs
