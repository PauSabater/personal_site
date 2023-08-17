import styles from "./Overlay.module.scss"
// import { setSkillsBannerAnimation } from "./SkillsBanner-animations"


export function Overlay() {
    return (
        <div className={styles.overlay} id="page-overlay"></div>
    )
}