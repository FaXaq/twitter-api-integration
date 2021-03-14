// FIXME: hard coded duration formatter
// Array of conversion values :
// - 1000 : ms to s
// - 60 : s to m
// - 60 : m to h
// - 24 : h to d
// - 365 : d to y
const CONVERTERS = [1000, 60, 60, 24, 365];

/**
 * Converts a duration in MS to some time ago :
 * - 1000ms = 1s
 * - 2500ms = 2s
 * - 69000ms = 1m
 * ...
 */
export function formatDuration(duration: number) {
  let remainingDuration = -duration;
  const converters = [...CONVERTERS];

  while (converters[0] !== undefined && remainingDuration > converters[0]) {
    remainingDuration /= converters[0];
    converters.shift();
  }

  switch (converters.length) {
    // means no conversion has been needed. The duration is in milliseconds
    case CONVERTERS.length:
      return `${Math.floor(remainingDuration)}ms`
    // means 1 conversion have been needed. The duration is in seconds
    case CONVERTERS.length - 1:
      return `${Math.floor(remainingDuration)}s`
    // means 2 conversions have been needed. The duration is in minutes
    case CONVERTERS.length - 2:
      return `${Math.floor(remainingDuration)}m`
    // means 3 conversions have been needed. The duration is in hours
    case CONVERTERS.length - 3:
      return `${Math.floor(remainingDuration)}h`
    // means 4 conversions have been needed. The duration is in days
    case CONVERTERS.length - 4:
      return `${Math.floor(remainingDuration)}d`
    // means 4 conversions have been needed. The duration is in years
    default:
      return `${Math.floor(remainingDuration)}y`
  }
}