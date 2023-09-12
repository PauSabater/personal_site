import { useLayoutEffect } from "react"
import { showHeader } from "../components/Header/Header.animations"
import { FootBanner } from "../components/FootBanner/FootBanner"
import { hasPageBeenLoaded } from "../assets/ts/utils/utils"
import { setPageFadeInAnimation } from "../components/App/App.animations"

export default function Contact({mode}:{mode: string}) {

    useLayoutEffect(()=> {
        setPageFadeInAnimation()
        showHeader()
        window.scrollTo(0,0)
        hasPageBeenLoaded()
    }, [])

    return (
        <div id="page-contact">
            <FootBanner />
        </div>
    )
}