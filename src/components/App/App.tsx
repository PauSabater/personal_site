import { Suspense, lazy, useEffect, useRef } from 'react'
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
// @ts-ignore -- TODO: solve declaration file from package
import { getPerfMode, matchMediaMobile, msTransitionPage, msTransitionPageLong } from '@pausabater/utils/dist/index.esm.js'
import { Footer } from '../Footer/Footer'
import Projects from '../../pages/projects'
import Contact from '../../pages/contact'
import PersonalSiteProject from '../../pages/projects/PersonalSite'
import PapernestProject from '../../pages/projects/Papernest'
import WeatherAppProject from '../../pages/projects/WeatherApp'
const WeatherAppLiveResult = lazy(() => import('../../pages/projectsLive/WeatherAppLiveResult'))


// gsap.registerPlugin(ScrollTrigger);

// import { ScrollSmoother } from 'gsap-trial/ScrollSmoother'
// import { gsap, ScrollTrigger } from "gsap-trial/all";
// gsap.registerPlugin(ScrollSmoother);

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
    const [homepageClass, setHomePageClass] = useState(
        !location.pathname.includes('projects') && !location.pathname.includes('contact')
            ? 'homepage' : ''
    )

    const main = useRef(null)
    const smoother = useRef()

    const mqMobile = window.matchMedia(matchMediaMobile)

    // @ts-ignore
    const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {}
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
    const [perfMode, setPerfMode] = useState(getPerfMode(navigator.hardwareConcurrency))
    const [isMobileView, setIsMobileView] = useState(mqMobile.matches)

    console.log("PERF IN APP")
    console.log(perfMode)

    mqMobile.onchange = () => {
        setIsMobileView(mqMobile.matches)
        const location = window.location.href
        if (!location.includes("projects") && !location.includes("contact"))
            window.location.href = window.location.href
    }

    useEffect(()=> {
        setHomePageClass(
            !location.pathname.includes('projects') && !location.pathname.includes('contact')
                ? 'homepage'
                : location.pathname.includes('contact') ? 'contact' : '')
    }, [location])

    useLayoutEffect(()=> {

        if (window.location.href.includes("projects") || window.location.href.includes("contact")) {
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

        document.addEventListener('perfChange', (e)=> {
            console.log("heyy change perf")
            e.preventDefault()
            // const theme = document.body.getAttribute("data-theme") || "light"
            setPerfMode(perfMode === "high" ? "low" : "high")
            // localStorage.setItem("theme", theme)
            e.stopPropagation()
        })
    }, [perfMode])

    function getTransitionLength(route: string) {

        if (route.includes("projects") && route.includes("projects/") === false) {
            return msTransitionPageLong
        } else {
            return msTransitionPage
        }
    }


    return (
        <div className="main" data-theme={theme} id="scrollsmoother-container">
            <div id="smooth-content">
            <Header links={ texts.header.links } mode={theme} isMobile={isMobileView} perfMode={perfMode}/>
            <TransitionImages mode={theme} />
                <div className={`page ${homepageClass}`} id="page-content">
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
                                                perfMode={perfMode}
                                                mode={theme}
                                                isMobile={isMobileView}
                                            ></route.Component>
                                        </Transition>
                                    </SwitchTransition>
                                }
                                ></Route>
                            )}
                        </Routes>
                    </Suspense>
                </div>
            <Footer mode={theme} perfMode={perfMode}/>
            <Overlay/>
            </div>
        </div>
    )
}

export default App
