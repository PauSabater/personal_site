import { useEffect, useLayoutEffect, useRef } from "react"
import styles from "./TransitionImages.module.scss"
import imgPapernest from "../../assets/svg/papernest.svg"
// import { setSkillsBannerAnimation } from "./SkillsBanner-animations"
import gsap from "gsap"
import { isElProportionHigherThanViewport } from "../../assets/ts/utils/utils"



export interface ISkillsBannerTexts {
    title: string,
    skills: {
        name: string,
        icon: string,
        percentage: string
    }[]
}

export function TransitionImages({}: {}) {

    const refContainer: React.MutableRefObject<null> = useRef(null)

    useEffect(() => {
        if (refContainer.current === null) return
        const elsImg: NodeListOf<HTMLImageElement> = (refContainer.current as HTMLElement).querySelectorAll("img")

        // Set img width and height depending on its proportions:
        elsImg.forEach((img)=> isElProportionHigherThanViewport(img)
            ? gsap.set(img, {width: '100vw', height: 'auto'})
            : gsap.set(img, {height: '100vh', width: 'auto'})
        )
    }, [])




    return (
        <div ref={refContainer} className={styles.container}>
            <div className={styles.imageContainer}>
                <img className={styles.image} src={imgPapernest} id={`transition-img-${'papernest'}`}></img>
            </div>
        </div>
    )
}