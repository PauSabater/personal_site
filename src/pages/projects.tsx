import { useLayoutEffect } from "react"
import { ProjectList } from "../components/ProjectsList/ProjectList"
import { showHeader } from "../components/Header/Header.animations"
import {texts} from "../assets/ts/texts/texts"

export default function Projects({mode}:{mode: string}) {

    useLayoutEffect(()=> {
        showHeader()
        window.scrollTo(0,0)
    }, [])

    return (
        <ProjectList props={texts.projectsList} mode={mode}></ProjectList>
    )
}