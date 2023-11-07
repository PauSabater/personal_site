import { useLayoutEffect, useRef } from "react"
import styles from "./TransitionImages.module.scss"
import gsap from "gsap"
// @ts-ignore -- TODO: solve declaration file from package
import { isViewportPropHigherThanEl } from "@pausabater/utils/dist/index.esm.js"
import { getImg } from "../WorkBanner/Card/Card"

export interface ISkillsBannerTexts {
    title: string,
    skills: {
        name: string,
        icon: string,
        percentage: string
    }[]
}

export function TransitionImages({mode}: {mode: string}) {

    const refContainer: React.MutableRefObject<null> = useRef(null)

    useLayoutEffect(() => {
        if (refContainer.current === null) return
        const elsImg: NodeListOf<HTMLImageElement> = (refContainer.current as HTMLElement).querySelectorAll("img")

        // Set img width and height depending on its proportions:
        elsImg.forEach((img)=> {
            isViewportPropHigherThanEl(img)
                ? gsap.set(img, {width: '100vw', height: 'auto'})
                : gsap.set(img, {height: '100vh', width: 'auto'})
            }
        )

        const elFirstCloudsLayerOneCopy = (refContainer.current as HTMLElement).querySelector('#cloud-first-line-1-copy') as HTMLElement
        const elSecondCloudsLayerCopy = (refContainer.current as HTMLElement).querySelector('#cloud-second-line-copy') as HTMLElement
        const elThirdCloudsLayerCopy = (refContainer.current as HTMLElement).querySelector('#cloud-third-line-copy') as HTMLElement
        gsap.set([elFirstCloudsLayerOneCopy, elThirdCloudsLayerCopy], {xPercent: -150, yPercent: -50, scaleX: -1})
        gsap.set([elSecondCloudsLayerCopy], {xPercent: 50, yPercent: -50, scaleX: -1})
    }, [])

    return (
        <div ref={refContainer} className={styles.container} id="transition-images" data-theme={mode}>
            <div className={`${styles.imageContainer} transition-images-container`} id={`transition-img-${'papernest.svg'}`}>
                {getImg("papernest.svg")}
            </div>
            <div className={`${styles.imageContainer} transition-images-container`} id={`transition-img-${'personal-site.svg'}`}>
                {getImg("personal-site.svg")}
            </div>
            <div className={`${styles.imageContainer} transition-images-container`} id={`transition-img-${'mountains'}`}>
                {getImg("mountains", false)}
            </div>
        </div>
    )
}