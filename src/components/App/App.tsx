import React from 'react';
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

const routes = [
    {path: '/', name: 'Home', Component: Home},
    {path: '/projects/papernest', name: 'PapernestProject', Component: PapernestProject},
    {path: '/projects/weather-app', name: 'WeatherAppProject', Component: WeatherAppProject},
]


function App() {

    const location = useLocation()
    const currentOutlet = useOutlet()
    // @ts-ignore
    const { nodeRef } = routes.find((route) => route.path === location.pathname) ?? {}

    const onEnter = (node: HTMLElement) => {
        console.log("HELLO ENTER!!")
        // gsap.from(
        //   [node.children[0].firstElementChild, node.children[0].lastElementChild],
        //   0.6,
        //   {
        //     y: 30,
        //     delay: 0.6,
        //     ease: "power3.InOut",
        //     opacity: 0,
        //     stagger: {
        //       amount: 0.6
        //     }
        //   }
        // );
    }

    const onExit = (node: HTMLElement) => {
        console.log("HELLO EXIT!!")
        // gsap.to(
        //     [node.children[0].firstElementChild, node.children[0].lastElementChild],
        //     0.6,
        //     {
        //     y: -30,
        //     ease: "power3.InOut",
        //     stagger: {
        //         amount: 0.2
        //     }
        //     }
        // );
    }

    const propss: IPropsProjectPost = {
        indexTitle: "CONTENT",
        wysiwyg: papernestContent(),
        imgPath: "svg/papernest.svg",
        pathNextProject: "weather-app",
        currentPath: "papernest"
    }

    function getProjectProps(props: IPropsProjectPost, element: HTMLElement): IPropsProjectPost {
        props.element = element
        return props
    }

    return (
        <div className="main">
            <Header links={ texts.header.links }/>
            {/* <TransitionImages/> */}
            <div className='page'>
                    <Routes>
                        {routes.map((route) =>
                            <Route path={route.path} element={
                                <SwitchTransition>
                                    <Transition
                                        key={location.pathname}
                                        nodeRef={nodeRef}
                                        timeout={500}
                                        classNames="page"
                                        unmountOnExit
                                        onExit={(node: HTMLElement) => {
                                            executeExitAnimations(node.firstElementChild?.id || '', node)
                                            // gsap
                                            //   .timeline({ paused: true })
                                            //   .to(node, { scale: 0.8, duration: 0.2 })
                                            //   .to(node, { xPercent: 100, autoAlpha: 0, duration: 0.2 })
                                            //   .play();
                                        }}
                                        onEnter={(node: HTMLElement) => {
                                            executeEnterAnimations(node.firstElementChild?.id || '', node)
                                        }}
                                    >
                                         <route.Component props={getProjectProps(propss, nodeRef)}></route.Component>
                                    </Transition>
                                </SwitchTransition>
                            }
                            ></Route>
                        )}
                    </Routes>
            </div>
        </div>
    )
}

export default App
