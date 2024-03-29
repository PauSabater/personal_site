import { useLayoutEffect, useRef } from "react"
import styles from "./SkillsBanner.module.scss"
import { setSkillsBannerAnimation } from "./SkillsBanner-animations"


export interface ISkillsBannerTexts {
    title: string,
    skills: {
        name: string,
        icon: string,
        percentage: string
    }[]
}

export function SkillsBanner({texts, mode}: {texts: ISkillsBannerTexts, mode: string}) {

    const refBanner: React.MutableRefObject<null> = useRef(null)

    useLayoutEffect(() => {
        const elBanner: HTMLElement | null = refBanner.current

        if (elBanner === null) return
        setSkillsBannerAnimation(elBanner)
    }, [])

    return (
        <div className={styles.container} data-theme={"dark"}>
            <div ref={refBanner} className={styles.banner}>
                <h1>{texts.title}</h1>
                <div className={styles.skillsContainer}>
                    {texts.skills.map((skill, i) => { return (
                        <div className={`${styles.skillContainer} skill-container`} key={`skill-${i}`}>
                            <img
                                alt={`skill ${skill}`}
                                className={styles.img}
                                src={require(`../../assets/svg/logos/${skill.icon}.svg`)}
                            ></img>
                            <p className={styles.name}>{skill.name}</p>
                            <div className={styles.level}>
                                <div className={`${styles.levelBar} ${styles[`bar-${skill.percentage}`]} level-bar`}></div>
                            </div>
                        </div>
                    )})}
                </div>
            </div>
        </div>
    )
}