const LEADING_ZERO_FORMATTER = new Intl.NumberFormat(undefined, { minimumIntegerDigits: 2, })

export function formatDuration(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
        return `${hours}:${LEADING_ZERO_FORMATTER.format(minutes)}:${LEADING_ZERO_FORMATTER.format(remainingSeconds)}`;
    } else {
        return `${minutes}:${LEADING_ZERO_FORMATTER.format(remainingSeconds)}`;
    }
}