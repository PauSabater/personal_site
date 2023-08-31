import { useEffect, useLayoutEffect } from "react"
import { hideAllTransitionImages } from "../../assets/ts/utils/utils"
import styles from "./WeatherAppLiveResult.module.scss"
import { WeatherApp } from "weather-app-ps/dist/esm/index"
import { setPageFadeInAnimation } from "../../components/App/App.animations"


export function WeatherAppLiveResult(mode: string) {

    useEffect(() => {
        hideAllTransitionImages()
    }, [])

    useLayoutEffect(() => {
        setPageFadeInAnimation()
    }, [])

    const stylesOverwrite = `
        --bg-box-content: var(--c-whitest);
    `

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Weather app live result</h2>
            <WeatherApp stylesOverwrite={stylesOverwrite}/>
        </div>
    )
}