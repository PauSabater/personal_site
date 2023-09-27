import { Fragment, useLayoutEffect, useRef } from "react"
import styles from "./LowPerfLogo.module.scss"
import { Cta, ICtaProps } from '../../UI/Cta/Cta'
import { setTextBannerAnimations } from "./../TextBanner.animations"
import { TextBannerCanvas } from "./../TextBannerCanvas/TextBannerCanvas"
import { ReactComponent as NoteLogo } from '../../../assets/svg/note-logo.svg'
import { isMobileScreen } from "../../../assets/ts/utils/utils"


export function LowPerfLogo() {

    const refTextBanner = useRef(null)

    useLayoutEffect(() => {
        setTextBannerAnimations(refTextBanner)
    }, [])

    return (
        <div className={styles.container}>
                {!isMobileScreen() ?
                    <Fragment>
                        <svg id="low-perf-logo" className={styles.logo} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path data-logo d="M20 0.5H45C47.4853 0.5 49.5 2.51472 49.5 5V45C49.5 47.4853 47.4853 49.5 45 49.5H5C2.51472 49.5 0.5 47.4853 0.5 45V20C0.5 9.23045 9.23045 0.5 20 0.5Z" fill="none" stroke="var(--c-font-global)"/>
                            <path data-logo d="M59 0.5H99C101.485 0.5 103.5 2.51472 103.5 5V45C103.5 47.4853 101.485 49.5 99 49.5H59C56.5147 49.5 54.5 47.4853 54.5 45V5C54.5 2.51472 56.5147 0.5 59 0.5Z" fill="none" stroke="var(--c-font-global)"/>
                            <path data-logo d="M113 0.5H138C148.77 0.5 157.5 9.23045 157.5 20V45C157.5 47.4853 155.485 49.5 153 49.5H113C110.515 49.5 108.5 47.4853 108.5 45V5C108.5 2.51472 110.515 0.5 113 0.5Z" fill="none" stroke="var(--c-font-global)"/>
                            <path data-logo d="M5 54.5H45C47.4853 54.5 49.5 56.5147 49.5 59V99C49.5 101.485 47.4853 103.5 45 103.5H5C2.51472 103.5 0.5 101.485 0.5 99V59C0.5 56.5147 2.51472 54.5 5 54.5Z" fill="none" stroke="var(--c-font-global)"/>
                            <path data-logo d="M59 54.5H99C101.485 54.5 103.5 56.5147 103.5 59V99C103.5 101.485 101.485 103.5 99 103.5H59C56.5147 103.5 54.5 101.485 54.5 99V59C54.5 56.5147 56.5147 54.5 59 54.5Z" fill="none" stroke="var(--c-font-global)"/>
                            <path data-logo d="M113 54.5H153C155.485 54.5 157.5 56.5147 157.5 59V84C157.5 94.7696 148.77 103.5 138 103.5H113C110.515 103.5 108.5 101.485 108.5 99V59C108.5 56.5147 110.515 54.5 113 54.5Z" fill="none" stroke="var(--c-font-global)"/>
                            <path data-logo d="M5 108.5H45C47.4853 108.5 49.5 110.515 49.5 113V153C49.5 155.485 47.4853 157.5 45 157.5H20C9.23045 157.5 0.5 148.77 0.5 138V113C0.5 110.515 2.51472 108.5 5 108.5Z" fill="none" stroke="var(--c-font-global)"/>
                        </svg>
                        <NoteLogo/>
                    </Fragment>
                    : ''
                }
        </div>
    )
}






