import { useEffect, useLayoutEffect } from "react"
import { hideAllTransitionImages } from "../../assets/ts/utils/utils"
import styles from "./WeatherAppLiveResult.module.scss"
import { WeatherApp } from "weather-app-ps/dist/esm/index"
import { setPageFadeInAnimation } from "../../components/App/App.animations"


export function WeatherAppLiveResult({props, mode}: {props: any, mode: any}) {

    useEffect(() => {
        hideAllTransitionImages()
    }, [])

    useLayoutEffect(() => {
        window.scrollTo(0, 0)
        setPageFadeInAnimation()
    }, [])

    const stylesOverwrite = `
        --bg-box-content: var(--c-whitest);
        --bg-main: var(--bg-white);
        --bg-box-content: var(--bg-white-translucent);
    `

    return (
        <div className={styles.container} data-theme={mode}>
            <h2 className={styles.title}>Weather app live result</h2>
            <WeatherApp stylesOverwrite={stylesOverwrite}/>
        </div>
    )
}