import { useLayoutEffect } from "react"
import { showHeader } from "../components/Header/Header.animations"
import { FootBanner } from "../components/FootBanner/FootBanner"
// @ts-ignore -- TODO: solve declaration file from package
import { hasPageBeenLoaded } from "@pausabater/utils/dist/index.esm.js"
import { setPageFadeInAnimation } from "../components/App/App.animations"

export default function Contact({mode, perfMode}:{mode: string, perfMode: string}) {

    useLayoutEffect(()=> {
        setPageFadeInAnimation()
        showHeader()
        window.scrollTo(0,0)
        hasPageBeenLoaded()
    }, [])

    return (
        <div id="page-contact">
            <FootBanner perfMode={perfMode}/>
        </div>
    )
}