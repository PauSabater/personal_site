import { Fragment, useLayoutEffect, useRef } from "react"
import styles from "./TextBanner.module.scss"
import { Cta, ICtaProps } from '../UI/Cta/Cta'
import { setTextBannerAnimations } from "./TextBanner.animations"
import { TextBannerCanvas } from "./TextBannerCanvas/TextBannerCanvas"
import { ReactComponent as NoteLogo } from '../../assets/svg/note-logo.svg'
import { isMobileScreen } from "../../assets/ts/utils/utils"

export interface ITextBannerTexts {
    title: string,
    textDesktop: string[],
    textMobile: string[],
    Cta: ICtaProps
}


export function TextBanner({ texts, mode }: { texts: ITextBannerTexts, mode: string}) {

    const refTextBanner = useRef(null)

    useLayoutEffect(() => {
        setTextBannerAnimations(refTextBanner)
    }, [])

    return (
        <div ref={refTextBanner} className={styles.container} id="text-banner" data-theme={mode}>
            <div className={styles.wrap} >
                <p className={styles.title}>{texts.title}</p>
                {
                    texts.textDesktop.map((line, i) =>
                        <div className={`${styles.lineWrap} ${styles.textDesktop} text-desktop`} key={`destktop-${i}`}>
                            <p className={styles.text} dangerouslySetInnerHTML={{__html: line}}></p>
                        </div>
                    )}
                    {texts.textMobile.map((line, i) =>
                        <div className={`${styles.lineWrap} ${styles.textMobile} text-mobile`} key={`mobile-${i}`}>
                            <p className={styles.text} dangerouslySetInnerHTML={{__html: line}}></p>
                        </div>
                )}
                <Cta props={texts.Cta}></Cta>

                {!isMobileScreen() ?
                    <div className={styles.canvasContainer} id="text-banner-canvas">
                        <TextBannerCanvas mode={mode}/>
                        <NoteLogo/>
                    </div>
                    : ''
                }
            </div>
        </div>
    )
}