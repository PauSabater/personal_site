import { Fragment, Suspense, useLayoutEffect, useRef } from "react"
import styles from "./TextBanner.module.scss"
import parse from 'html-react-parser'
import { Cta, ICtaProps } from '../UI/Cta/Cta'
import { setTextBannerAnimations } from "./TextBanner.animations"
import { TextBannerCanvas } from "./TextBannerCanvas/TextBannerCanvas"
import { ReactComponent as NoteLogo } from '../../assets/svg/note-logo.svg'

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
        <div ref={refTextBanner} className={styles.container} id="text-banner">
            <div className={styles.wrap} >
                <p className={styles.title}>{texts.title}</p>
                {
                    texts.textDesktop.map((line) =>
                        <div className={`${styles.lineWrap} ${styles.textDesktop} text-desktop`}>
                            <p className={styles.text}>{parse(line)}</p>
                        </div>
                    )}
                    {texts.textMobile.map((line) =>
                        <div className={`${styles.lineWrap} ${styles.textMobile} text-mobile`}>
                            <p className={styles.text}>{parse(line)}</p>
                        </div>
                )}
                <Cta props={texts.Cta}></Cta>

                <div className={styles.canvasContainer} id="text-banner-canvas">
                <TextBannerCanvas/>
                <NoteLogo/>
            </div>
            </div>
        </div>
    )
}