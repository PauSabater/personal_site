import { JSXElementConstructor, ReactElement, ReactNode, ReactPortal, useLayoutEffect, useRef } from "react"
import styles from "./Grid.module.scss"


export interface ISkillsBannerTexts {
    title: string,
    skills: {
        name: string,
        icon: string,
        percentage: string
    }[]
}

export function GridBg({children}: {children: JSX.Element[]})  {

    const refBanner: React.MutableRefObject<null> = useRef(null)

    useLayoutEffect(() => {
        // const elBanner: HTMLElement | null = refBanner.current

        // if (elBanner === null) return
        // setSkillsBannerAnimation(elBanner)
    }, [])




    return (
        <div className={styles.container}>

        <svg viewBox="0 0 3988 2355" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 344C3169.6 344 4005.5 344 3981 350" stroke="#C0C0C0"/>
            <path d="M0 394C3169.6 394 4005.5 394 3981 400" stroke="#C0C0C0"/>
            <path d="M0 444C3169.6 444 4005.5 444 3981 450" stroke="#C0C0C0"/>
        </svg>

        {children}
        </div>
    )
}



