import { useLayoutEffect, useState } from 'react';
import {texts} from "../../assets/ts/texts/texts"
import './App.css'
import '../../assets/scss/variables.scss'
import '../../assets/scss/classes.scss'
import '../../assets/scss/fonts.scss'

import { Header } from '../Header/Header'
import { PapernestProject } from '../../pages/projects/Papernest'
import { WeatherAppProject } from '../../pages/projects/WeatherApp'
import { Routes, Route, useLocation, useOutlet } from 'react-router-dom'
import { SwitchTransition, Transition } from 'react-transition-group'
import { Home } from '../../pages/home'
import { TransitionImages } from '../TransitionImages/TransitionImages'
import { IPropsProjectPost } from '../ProjectPost/ProjectPost'
import { papernestContent } from '../ProjectPost/Content/papernest'
import { executeEnterAnimations, executeExitAnimations } from './App.animations'
import { Projects } from '../../pages/projects'
import { PersonalSiteProject } from '../../pages/projects/PersonalSite'
import { Overlay } from '../Overlay/Overlay'
import { msTransitionPage, msTransitionPageLong } from '../../assets/ts/utils/utils'
import { Footer } from '../Footer/Footer'
import { WeatherAppLiveResult } from '../../pages/projectsLive/WeatherAppLiveResult'
import { Contact } from '../../pages/contact';


const routes = [
    {path: '/', name: 'Home', Component: Home},
    {path: '/projects', name: 'Projects', Component: Projects},
    {path: '/projects/papernest', name: 'PapernestProject', Component: PapernestProject},
    {path: '/projects/weather-app', name: 'WeatherAppProject', Component: WeatherAppProject},
    {path: '/projects/personal-site', name: 'PersonalSiteProject', Component: PersonalSiteProject},
    {path: '/projects/weather-app/live-result', name: 'WeatherAppProjectLiveResult', Component: WeatherAppLiveResult},
    {path: '/contact', name: 'Contact', Component: Contact},
]


function App() {

    const location = useLocation()
    const [isHomepage, setIsHomepage] = useState(location.pathname.includes("projects") === false)

    // @ts-ignore
    const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {}

    const propsPpn: IPropsProjectPost = {
        indexTitle: "CONTENT",
        wysiwyg: papernestContent(),
        imgPath: "papernest.svg",
        pathNextProject: "weather-app",
        currentPath: "papernest",
        nextProjects: {
            title: "More projects",
            projects: [{
                title: "/ personal site",
                description: "",
                path: "/projects/personal-site",
                img: "personal-site.svg"
            },{
                title: "/ weather forecast app",
                description: "",
                path: "/projects/weather-app",
                img: "mountains"
        }]}
    }

    const propsWeatherApp: IPropsProjectPost = {
        indexTitle: "CONTENT",
        wysiwyg: papernestContent(),
        imgPath: "personal-site.svg",
        pathNextProject: "weather-app",
        currentPath: "weather-app",
        nextProjects: {
            title: "More projects",
            projects: [{
                title: "/ personal site",
                description: "",
                path: "/projects/personal-site",
                img: "personal-site.svg"
            },{
                title: "/ weather forecast app",
                description: "",
                path: "/projects/weather-app",
                img: "mountains"
        }]}
    }

    const propsPersonalSite: IPropsProjectPost = {
        indexTitle: "CONTENT",
        wysiwyg: papernestContent(),
        imgPath: "personal-site.svg",
        pathNextProject: "weather-app",
        currentPath: "personal-site",
        nextProjects: {
            title: "More projects",
            projects: [{
                title: "/ personal site",
                description: "",
                path: "projects/personal-site",
                img: "personal-site.svg"
            },{
                title: "/ weather forecast app",
                description: "",
                path: "projects/weather-app",
                img: "mountains"
        }]}
    }

    function getProjectProps(route: string): any {
        console.log("ROUTEEE: "+location.pathname)
        if (route === "/projects/papernest") return propsPpn
        else if (route === "/projects/weather-app") return propsWeatherApp
        else if (route === "/projects/personal-site") return propsPersonalSite
        else if (route === "/projects") return texts.projectsList
        else if (route === "/projects/weather-app/live-result") return texts.projectsList
        else if (route === "/contact") return texts.projectsList

        else return texts.home
    }

    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")

    useLayoutEffect(()=> {
        if (window.location.href.includes("projects")) {
            document.querySelector(".page-loader")?.classList.remove("is-loading")
        }

        // Listen to event to inform that we must change the theme and set theme in localstorage
        document.addEventListener('themeChange', (e)=> {
            e.preventDefault()
            const theme = document.body.getAttribute("data-theme") || "light"
            setTheme(theme || "light")
            localStorage.setItem("theme", theme)
            e.stopPropagation()
        })
    }, [])


    return (
        <div className="main" data-theme={theme}>
            <Header links={ texts.header.links } mode={theme}/>
            <TransitionImages mode={theme} />
                <div className='page' id="page-content">
                        <Routes>
                            {routes.map((route, i) =>
                                <Route path={route.path} key={`route-${i}`} element={
                                    <SwitchTransition>
                                        <Transition
                                            key={location.pathname}
                                            nodeRef={nodeRef}
                                            timeout={msTransitionPage}
                                            classNames="page"
                                            unmountOnExit
                                            onExit={(node: HTMLElement) => {
                                                executeExitAnimations(node.id || '', node, route.path)
                                            }}
                                            onEnter={(node: HTMLElement) => {
                                                executeEnterAnimations(node.id || '', node, route.path)
                                            }}
                                        >
                                            <route.Component
                                                mode={theme}
                                                props={getProjectProps(location.pathname)}
                                            ></route.Component>
                                        </Transition>
                                    </SwitchTransition>
                                }
                                ></Route>
                            )}
                        </Routes>
                </div>
            <Footer mode={theme} />
            <Overlay/>
        </div>
    )
}

export default App
