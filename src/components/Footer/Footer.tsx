import { Fragment, useEffect } from "react"
import "./Footer.css"
import { FooterCanvas } from "./FooterCanvas/FooterCanvas"
// import { setSkillsBannerAnimation } from "./SkillsBanner-animations"


export function Footer() {
    const currentUrl = window.location.href
    console.log("weeeee")
    console.log(currentUrl)

    return (
        <Fragment>
            <div className="footer-canvas" id="footer-canvas">
                {window.location.href !== "http://localhost:3000/" ? <FooterCanvas/> : ''}
            </div>
            <div className="footer" id="footer">
                <p>find me on</p>
                <a target="_blank" href="https://www.linkedin.com/in/pau-sabater-vilar-b0189989">LINKEDIN</a>
                <a target="_blank" href="https://github.com/PauSabater/weather_app">GITHUB</a>
                <a target="_blank" href="https://www.strava.com/athletes/5420602">STRAVA</a>
            </div>
        </Fragment>
    )
}