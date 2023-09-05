import { Fragment, Suspense, useLayoutEffect } from "react"
import { ProjectList } from "../components/ProjectsList/ProjectList"
import { showHeader } from "../components/Header/Header.animations"
import { FootBanner } from "../components/FootBanner/FootBanner"
import { hasPageBeenLoaded } from "../assets/ts/utils/utils"
import { setPageFadeInAnimation } from "../components/App/App.animations"

export function Contact({props, mode}:{props: any, mode: string}) {

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