import styles from "./LinkInline.module.scss"


export function LinkInline({ href, text }: { href: string, text: string }) {
    return (<a className={styles.linkInline} href={href} target="_blank">{text}
{/* <svg width="81" height="81" viewBox="0 0 81 81" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M76 76V5M76 5H5M76 5L5 76" stroke="currentColor" stroke-width="10" stroke-linecap="round"/>
</svg> */}


</a>)
}