import { Suspense, lazy, useEffect } from 'react'
import { useLayoutEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
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
import { Footer } from '../Footer/Footer'
import Projects from '../../pages/projects'
import Contact from '../../pages/contact'
import PersonalSiteProject from '../../pages/projects/PersonalSite'
import PapernestProject from '../../pages/projects/Papernest'
import WeatherAppProject from '../../pages/projects/WeatherApp'
// @ts-ignore -- TODO: solve declaration file from package
import { highPerf, lowPerf, matchMediaMobile, msTransitionPage, msTransitionPageLong } from '@pausabater/utils/dist/index.esm.js'
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
    const [homepageClass, setHomePageClass] = useState(
        !location.pathname.includes('projects') && !location.pathname.includes('contact')
            ? 'homepage' : ''
    )

    // Media query for mobile view:
    const mqMobile = window.matchMedia(matchMediaMobile)

    // @ts-ignore
    const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {}
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || document.body.parentElement?.getAttribute("data-theme") || "light"
    )
    const [perfMode, setPerfMode] = useState(
        localStorage.getItem("perfMode") || "high"
    )
    const [isMobileView, setIsMobileView] = useState(mqMobile.matches)

    // Change state on desktop / mobile view change and reload page if we are on homepage
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
                : location.pathname.includes('contact') ? 'contact' : ''
        )
    }, [location])

    useLayoutEffect(()=> {

        if (window.location.href.includes("projects") || window.location.href.includes("contact")) {
            document.querySelector(".page-loader")?.classList.remove("is-loading")
        }

        // Listen to event to inform that we must change the theme and set theme in localstorage
        document.addEventListener('themeChange', (e)=> {
            e.preventDefault()
            const theme = document.body.parentElement?.getAttribute("data-theme") || "light"
            setTheme(theme || "light")
            localStorage.setItem("theme", theme)
            e.stopPropagation()
        })

        // Event listener for page perf mode change
        document.addEventListener('perfChange', (e)=> {
            e.preventDefault()
            // const perfMode = document.body.getAttribute("data-perf") || lowPerf
            const nextMode = perfMode === highPerf ? lowPerf : highPerf
            setPerfMode(nextMode)
            localStorage.setItem("perfMode", nextMode)
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
        <div className="main" data-theme={theme} data- id="scrollsmoother-container">
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
            <Analytics />
        </div>
    )
}

export default App
