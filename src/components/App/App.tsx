import { Suspense, lazy } from 'react'

import { useLayoutEffect, useState } from 'react';
import {texts} from "../../assets/ts/texts/texts"
import './App.css'
import '../../assets/scss/variables.scss'
import '../../assets/scss/classes.scss'
import '../../assets/scss/fonts.scss'

import { Header } from '../Header/Header'
import { Routes, Route, useLocation } from 'react-router-dom'
import { SwitchTransition, Transition } from 'react-transition-group'
import { Home } from '../../pages/home'
import { TransitionImages } from '../TransitionImages/TransitionImages'
import { executeEnterAnimations, executeExitAnimations } from './App.animations'
import { Overlay } from '../Overlay/Overlay'
import { msTransitionPage, msTransitionPageLong } from '../../assets/ts/utils/utils'
import { Footer } from '../Footer/Footer'
import Projects from '../../pages/projects'
import Contact from '../../pages/contact'
import PersonalSiteProject from '../../pages/projects/PersonalSite'
import PapernestProject from '../../pages/projects/Papernest'
import WeatherAppProject from '../../pages/projects/WeatherApp'
// import WeatherAppLiveResult from '../../pages/projectsLive/WeatherAppLiveResult'


// const Contact = lazy(() => import('../../pages/contact'))
// const Projects = lazy(() => import('../../pages/projects'))
// const PersonalSiteProject = lazy(() => import('../../pages/projects/PersonalSite'))
// const PapernestProject = lazy(() => import('../../pages/projects/Papernest'))
// const WeatherAppProject = lazy(() => import('../../pages/projects/WeatherApp'))
const WeatherAppLiveResult = lazy(() => import('../../pages/projectsLive/WeatherAppLiveResult'))


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

    // @ts-ignore
    const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {}

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

    function getTransitionLength(route: string) {
        if (route.includes("projects") && route.includes("projects/") === false) {
            return msTransitionPageLong
        } else {
            return msTransitionPage
        }
    }


    return (
        <div className="main" data-theme={theme}>
            <Header links={ texts.header.links } mode={theme}/>
            <TransitionImages mode={theme} />
                <div className='page' id="page-content">
                    <Suspense fallback={<div>Loading...</div>}>
                        <Routes>
                            {routes.map((route, i) =>
                                <Route path={route.path} key={`route-${i}`} element={
                                    <SwitchTransition>
                                        <Transition
                                            key={location.pathname}
                                            nodeRef={nodeRef}
                                            timeout={getTransitionLength(route.path)}
                                            classNames="page"
                                            unmountOnExit={false}
                                            onExit={(node: HTMLElement) => {
                                                executeExitAnimations(node.id || '', node, route.path)
                                            }}
                                            onEnter={(node: HTMLElement) => {
                                                executeEnterAnimations(node.id || '', node, route.path)
                                            }}
                                        >
                                            <route.Component
                                                mode={theme}
                                            ></route.Component>
                                        </Transition>
                                    </SwitchTransition>
                                }
                                ></Route>
                            )}
                        </Routes>
                    </Suspense>
                </div>
            <Footer mode={theme} />
            <Overlay/>
        </div>
    )
}

export default App
