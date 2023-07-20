import { Fragment, useLayoutEffect, useRef } from "react"
import styles from "./TextBanner.module.scss"
import parse from 'html-react-parser'
import { Button, IBtnProps } from '../UI/Button/Button'
import { setTextBannerAnimations } from "./TextBanner.animations"

export interface ITextBannerTexts {
    title: string,
    textDesktop: string[],
    textMobile: string[],
    button: IBtnProps
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
                {texts.textDesktop.map((line) =>
                    <div className={styles.lineWrap}>
                        <p className={styles.text}>{parse(line)}</p>
                    </div>
                )}
                <Button btnProps={texts.button}></Button>
            </div>
        </div>
    )
}