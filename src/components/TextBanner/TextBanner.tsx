import { Fragment } from "react"
import styles from "./TextBanner.module.scss"
// import { HightLightedSpan } from '../Header/Header'
import parse from 'html-react-parser'
import { Button, IBtnProps } from '../Button/Button'

export interface ITextBannerTexts {
    title: string,
    textDesktop: string[],
    textMobile: string[],
    button: IBtnProps
}

export function TextBanner({ texts }: { texts: ITextBannerTexts}) {
    return (
        <Fragment>
            <div className={styles.container}>
                <div className={styles.wrapp} >
                    <p className={styles.title}>{texts.title}</p>
                    {texts.textDesktop.map((line) =>
                        <p className={styles.text}>{parse(line)}</p>
                    )}
                    <Button btnProps={texts.button}></Button>
                </div>
            </div>
        </Fragment>
    )
}