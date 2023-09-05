import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react"
import styles from "./ProjectPost.module.scss"
import gsap from "gsap"
import parse from "html-react-parser"
import { Link } from "react-router-dom"
import { hasPageBeenLoaded, hidePageOverlay, msEnterPageLong } from "../../assets/ts/utils/utils"
import { executePageEnterAnimation, leaveFromArrowClick, setMountainsAnimationObserver } from "./ProjectPost.animations"
import { INextProjects, NextProjects } from "./Components/NextProjects/NextProjects"
import { arrowFilled } from "../../assets/svg/ts/arrowFilled"
import { removeOutlineHeader } from "../Header/Header.animations"
import { PersonalSiteCanvas } from "./PersonalSiteCanvas/PersonalSiteCanvas"
import { setPageFadeInAnimation, setPageFadeOutAnimation } from "../App/App.animations"
import { Footer } from "../Footer/Footer"

export interface IPropsProjectPost {
    element?: HTMLElement,
    indexTitle: string,
    wysiwyg: JSX.Element,
    imgPath: string,
    pathNextProject: string,
    currentPath: string,
    nextProjects: INextProjects
}

export function ProjectPost({ props, mode }: { props: IPropsProjectPost, mode: string}) {
    const refPostImageContainer = useRef(null)
    const [showCanvas, setShowCanvas] = useState(false)

    // console.log(props)

    useEffect(()=> {
        window.scroll(0, 0)
    }, [])

    useLayoutEffect(() => {
        const elImgTransition: HTMLElement | null = document.getElementById(`transition-img-${props.imgPath}`)
        hidePageOverlay()
        if (elImgTransition === null) return
        gsap.set(elImgTransition, {opacity: 1})

        removeOutlineHeader()

        if (hasPageBeenLoaded()) {
            executePageEnterAnimation(props.imgPath)
        } else {
            setTimeout(()=> {
                window.scrollTo(0, 0)
                executePageEnterAnimation(props.imgPath)
                setPageFadeInAnimation()
            }, 750)
        }

        // executePageEnterAnimation(props.imgPath)

        if (props.imgPath === "mountains") {
            setMountainsAnimationObserver()
        }

        if (props.imgPath === "personal-site.svg") {
            setTimeout(()=> setShowCanvas(true), msEnterPageLong + 200)
        }
    }, [])

    return (
        <div id="page-project-post" className={styles.projectPostContainer} data-theme={mode}>
            <div id="post-container-image" className={styles.containerImage}>
                <div className={styles.container} ref={refPostImageContainer}>
                    { showCanvas === true ? <PersonalSiteCanvas mode={mode}/> : '' }
                    <div className={styles.gradientContainer}>
                        <div className={styles.gradient}></div>
                    </div>
                </div>
            </div>

            {props.wysiwyg}

            <div className={styles.moreProjectsContainer}>
                <NextProjects props={props.nextProjects} mode={mode}></NextProjects>
            </div>
        </div>
    )
}

export const getArrowLinkTemplate = (path: string)=> {
    return (
        <Link to={path} onClick={() => leaveFromArrowClick()} className={styles.nextProjectContainer}>
            Next project
            {parse(arrowFilled())}
        </Link>
    )
}