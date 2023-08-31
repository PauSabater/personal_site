import { Fragment, Suspense, useLayoutEffect } from "react"
import { ProjectList } from "../components/ProjectsList/ProjectList"
import { showHeader } from "../components/Header/Header.animations"
import gsap from 'gsap'


const projectList = {
    title: "All projects",
    intro: 'Here are displayed the main projects I have worked on and the corresponding cases. More projects to be added soon !',
    projects: [
        {
            title: "/ WORK AT PAPERNEST",
            labels: ["professional experience"],
            text: "Work during my two years working as a frontend developer papernest",
            cta: {
                text: "Visit case",
                href: "papernest",
                target: "_self",
                color: "black",
                isBold: false,
                isLink: false
            },
            imgPath: "papernest.svg"
        },
        {
            title: "/ WEATHER FORECAST COMPONENT",
            labels: ["side project"],
            text: "React component to display weather forecasts",
            cta: {
                text: "Visit case",
                href: "weather-app",
                target: "_self",
                color: "black",
                isBold: false,
                isLink: false
            },
            imgPath: "mountains"
        },
        {
            title: "/ PERSONAL SITE",
            labels: ["side project"],
            text: "Site to be used as a playground and to display my work",
            cta: {
                text: "Visit case",
                href: "personal-site",
                target: "_self",
                color: "black",
                isBold: false,
                isLink: false
            },
            imgPath: "personal-site.svg"
        }
    ],
    bottomCta: {
        text: "check out my Github",
        href: "https://github.com/PauSabater?tab=repositories",
        color: "secondary",
        target: "_blank"
    }
}

export function Projects({props, mode}:{props: any, mode: string}) {

    useLayoutEffect(()=> {
        showHeader()
        window.scrollTo(0,0)
    }, [])

    return (
        <ProjectList props={props} mode={mode}></ProjectList>
    )
}