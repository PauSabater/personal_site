import { Fragment } from "react"
import "./Footer.css"
import { FooterCanvas } from "./FooterCanvas/FooterCanvas"

export function Footer({mode}: {mode: string}) {

    return (
        <Fragment>
            <div className="footer-canvas" id="footer-canvas">
                <FooterCanvas mode={mode} />
            </div>
            <div className="footer" id="footer">
                <p>find me on</p>
                <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/pau-sabater-vilar-b0189989">LINKEDIN</a>
                <a target="_blank" rel="noreferrer" href="https://github.com/PauSabater/weather_app">GITHUB</a>
                <a target="_blank" rel="noreferrer" href="https://www.strava.com/athletes/5420602">STRAVA</a>
            </div>
        </Fragment>
    )
}