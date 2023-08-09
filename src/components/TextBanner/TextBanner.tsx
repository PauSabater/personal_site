import { Fragment, useLayoutEffect, useRef } from "react"
import styles from "./TextBanner.module.scss"
import parse from 'html-react-parser'
import { Cta, ICtaProps } from '../UI/Cta/Cta'
import { setTextBannerAnimations } from "./TextBanner.animations"
import { isVerticalMobileTablet } from "../../assets/ts/utils/utils"

export interface ITextBannerTexts {
    title: string,
    textDesktop: string[],
    textMobile: string[],
    Cta: ICtaProps
}

export function TextBanner({ texts }: { texts: ITextBannerTexts}) {

    const refTextBanner = useRef(null)

    useLayoutEffect(() => {
        setTextBannerAnimations(refTextBanner)
    }, [])


    return (
        <div ref={refTextBanner} className={styles.container}>
            <div className={styles.wrap} >
                <p className={styles.title}>{texts.title}</p>
                {
                    texts.textDesktop.map((line) =>
                        <div className={`${styles.lineWrap} ${styles.textDesktop}`}>
                            <p className={styles.text}>{parse(line)}</p>
                        </div>
                    )}
                    {texts.textMobile.map((line) =>
                        <div className={`${styles.lineWrap} ${styles.textMobile}`}>
                            <p className={styles.text}>{parse(line)}</p>
                        </div>
                )}
                <Cta props={texts.Cta}></Cta>
            </div>
        </div>
    )
}