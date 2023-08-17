import styles from "./Rain.module.scss"
// import { setSkillsBannerAnimation } from "./SkillsBanner-animations"


export function Rain(isSmall = false) {
    return (
        <div className={styles.rain} id="rain-container">
            {[...Array(400)].map((_, i) => <div className={isSmall ? styles.dropSmall : styles.drop}></div>)}
        </div>
    )
}