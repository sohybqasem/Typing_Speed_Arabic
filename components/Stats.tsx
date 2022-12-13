import styles from '../styles/Stats.module.scss'
import { getSpeed } from '../lib/utils'

type StatsProps = {
  timeTaken: number
  errors: number
  charsTyped: number
}

export function convertDigitIn(enDigit: string) {
  // PERSIAN, ARABIC, URDO
  var newValue = ''
  for (var i = 0; i < enDigit.length; i++) {
    var ch = enDigit.charCodeAt(i)
    if (ch >= 48 && ch <= 57) {
      // european digit range
      var newChar = ch + 1584
      newValue = newValue + String.fromCharCode(newChar)
    } else newValue = newValue + String.fromCharCode(ch)
  }
  return newValue
}

export function Stats(props: StatsProps) {
  const { timeTaken, errors, charsTyped } = props
  const wpmSpeed = getSpeed(charsTyped, timeTaken * 5)
  const errorRate = charsTyped === 0 ? 0 : (errors * 100) / charsTyped
  const accuracy = charsTyped === 0 ? 0 : Math.max(Math.round(100 - errorRate), 0)

  return (
    <div className={styles.statsContainer}>
      <Stat value={wpmSpeed} unit="كلمة بالدقيقة" />
      <Stat unit="%" value={accuracy} />
    </div>
  )
}

type StatProps = {
  unit: string
  value: string | number
  className?: string
}

function Stat(props: StatProps) {
  const { unit, value, className } = props
  return (
    <div className={`${styles.stat} ${className || ''}`}>
      <div className={styles.value}>
        <span className={styles.unit}> {unit}</span>
        <span> {convertDigitIn(value.toString())} </span>
        {/* <span className={styles.unit}>{unit}</span> */}
      </div>
    </div>
  )
}
