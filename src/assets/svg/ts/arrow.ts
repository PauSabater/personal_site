export const arrowSvg = (color: string) => {
    return `
        <svg width="48" height="54" viewBox="0 0 48 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={styles.arrowPath} d="M3 23.5359L40.5 1.88526C43.1667 0.345659 46.5 2.27016 46.5 5.34936L46.5 48.6506C46.5 51.7298 43.1667 53.6543 40.5 52.1147L2.99999 30.4641C0.33333 28.9245 0.33333 25.0755 3 23.5359Z" stroke-dasharray="2" stroke="${color}" stroke-width="2"/>
        </svg>`
}

export const chevronSvg = (color: string) => {
    return `
        <svg width="23" height="48" viewBox="0 0 23 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 47L2.53553 27.5355C0.582913 25.5829 0.582912 22.4171 2.53553 20.4645L22 1" stroke="${color}"/>
        </svg>`
}
