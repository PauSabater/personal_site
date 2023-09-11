import styles from "./LinkInline.module.scss"

export function LinkInline({ href, text }: { href: string, text: string }) {
    return (<a className={styles.linkInline} href={href} target="_blank">{text}</a>)
}