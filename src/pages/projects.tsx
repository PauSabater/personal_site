import { Fragment, Suspense, useLayoutEffect } from "react"
import { ProjectList } from "../components/ProjectsList/ProjectList"
import { showHeader } from "../components/Header/Header.animations"
import gsap from 'gsap'

export function Projects({props, mode}:{props: any, mode: string}) {

    useLayoutEffect(()=> {
        showHeader()
        window.scrollTo(0,0)
    }, [])

    return (
        <ProjectList props={props} mode={mode}></ProjectList>
    )
}