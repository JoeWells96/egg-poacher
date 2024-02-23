function toPx(pixels: number): string {
    return `${pixels}px`
}

function formatSecondsToText(totalSeconds: number, withLeadingZeroMinute: boolean = false): string {
    const minutes: number = Math.floor(totalSeconds / 60)
    const minutesString: String = minutes < 10 && withLeadingZeroMinute ? `0${minutes}` : `${minutes}`
    const seconds: number = totalSeconds % 60
    const secondsString: string = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${minutesString}:${secondsString}`
}

function formatTextToSeconds(timeText: string): number {
    const time: string[] = timeText.split(':')
    return (Number(time[0]) * 60) + Number(time[1])
}