import { NavLink } from "react-router-dom"
import styles from "./Header.module.scss"

export function Header({ links }: { links: string[]}) {

    const dummyLinks: string[] = ['about', 'projects', 'how I work']

    const navLinkStyles = { fontWeight: "bold", color: "white" }

    return (
        <div id="header" className={styles.container}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <NavLink to='/'>about</NavLink>
                </li>
                <li className={styles.item}>
                    <NavLink to='/project'>projects</NavLink>
                </li>
                <li className={styles.item}>how I work</li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.item}>contact</li>
            </ul>
        </div>
    )
}