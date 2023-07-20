import { useLayoutEffect, useRef } from "react"
import styles from "./MethodSection.module.scss"


export interface ISkillsBannerTexts {
    title: string,
    skills: {
        name: string,
        icon: string,
        percentage: string
    }[]
}

export function MethodSection({}: {}) {

    // const refBanner: React.MutableRefObject<null> = useRef(null)

    // useLayoutEffect(() => {
    //     const elBanner: HTMLElement | null = refBanner.current

    //     console.log("banner is")
    //     console.log(elBanner)

    //     if (elBanner === null) return
    //     setSkillsBannerAnimation(elBanner)
    // }, [])




    return (
        <div className={styles.container}>
            <div className={styles.containerContent}>
                <h1 className={styles.title}>How do I work?</h1>
                <h1 className={styles.phrase}>Think of the users, think of the colleagues</h1>
                <p>A feature could be awesome for the users, but a nightmare for your colleagues. And the other way round</p>
                <h1 className={styles.phrase}>Do not forget native solutions</h1>
                <h1 className={styles.phrase}>Spend time planning, save time later</h1>
                <h1 className={styles.phrase}>Devs have a work on product</h1>
            </div>
        </div>
    )
}