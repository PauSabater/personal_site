import React, { useEffect } from 'react';
import {texts} from "../../assets/ts/texts/texts"
import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"
import './App.css'
import '../../assets/scss/variables.scss'
import '../../assets/scss/classes.scss'
import '../../assets/scss/fonts.scss'

//import
import { Header } from '../Header/Header'
import { PapernestProject } from '../../pages/projects/Papernest'
import { WeatherAppProject } from '../../pages/projects/WeatherApp'


import { Routes, Route, useLocation, useOutlet } from 'react-router-dom'
import { CSSTransition, TransitionGroup, SwitchTransition, Transition } from 'react-transition-group'

import { Home } from '../../pages/home'
import { TransitionImages } from '../TransitionImages/TransitionImages';
import { IPropsProjectPost } from '../ProjectPost/ProjectPost';
import { papernestContent } from '../ProjectPost/Content/papernest';
import { easeOutLong } from '../../assets/ts/styles/styles';
import { executeEnterAnimations, executeExitAnimations, setProjectPostEnterAnimation } from './App.animations';
import { Projects } from '../../pages/projects';
import { PersonalSiteProject } from '../../pages/projects/PersonalSite';
import { Overlay } from '../Overlay/Overlay';
import { msTransitionPage } from '../../assets/ts/utils/utils';
import { Footer } from '../Footer/Footer';
import { WeatherAppLiveResult } from '../../pages/projectsLive/WeatherAppLiveResult';

const routes = [
    {path: '/', name: 'Home', Component: Home},
    {path: '/projects', name: 'PapernestProject', Component: Projects},
    {path: '/projects/papernest', name: 'PapernestProject', Component: PapernestProject},
    {path: '/projects/weather-app', name: 'WeatherAppProject', Component: WeatherAppProject},
    {path: '/projects/personal-site', name: 'PersonalSiteProject', Component: PersonalSiteProject},
    {path: '/projects/weather-app/live-result', name: 'WeatherAppProjectLiveResult', Component: WeatherAppLiveResult},
]


function App() {

    const location = useLocation()
    const currentOutlet = useOutlet()
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

    function getProjectProps(route: string): IPropsProjectPost {
        if (route === "papernest") return propsPpn
        else if (route === "weather-app") return propsWeatherApp
        else if (route === "personal-site") return propsPersonalSite

        else return propsPpn
    }

    useEffect(()=> {
        window.addEventListener("load", ()=> console.log("LOADEEEEEED"))
    }, [])

    return (
        <div className="main">
            <Header links={ texts.header.links }/>
            <TransitionImages/>
                <div className='page' id="page-content">
                        <Routes>
                            {routes.map((route) =>
                                <Route path={route.path} element={
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
                                            <route.Component props={getProjectProps(route.path)}></route.Component>
                                        </Transition>
                                    </SwitchTransition>
                                }
                                ></Route>
                            )}
                        </Routes>
                </div>
            <Footer/>
            <Overlay/>
        </div>
    )
}

export default App
