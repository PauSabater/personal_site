import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react"
import { TagLabels } from "./Components/TagLabels/TagLabels"
import { Callout } from "./Components/Callout/Callout"
import { ImageArticle } from "./Components/ImageArticle/ImageArticle"
import styles from "./ProjectPost.module.scss"
import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"

import { chevronSvg } from "../../assets/svg/ts/arrow"
import parse from "html-react-parser"
import { Link, NavLink } from "react-router-dom"
import { getGsapDistToCenterElXAxis, getGsapDistToCenterElYAxis, getProportionRelToElement, getScaleToCoverViewPort, getViewportAspectRatio, hidePageOverlay, isViewportPropHigherThanEl, msEnterPageLong, scEnterPageLong } from "../../assets/ts/utils/utils"
import { calendar } from "../../assets/svg/ts/calendar"
import { LinkInline } from "./Components/LinkInline/LinkInline"
import { easeOutLong } from "../../assets/ts/styles/styles"
import { getImg } from "../WorkBanner/Card/Card"
import { executeEnteringMountainAnimation, executePageEnterAnimation, leaveFromArrowClick, setMountainsAnimationObserver, setMountainsScale } from "./ProjectPost.animations"
import { getCloudsAnimation } from "../WorkBanner/WorkBanner.animations"
import { INextProjects, NextProjects } from "./Components/NextProjects/NextProjects"
import { arrowFilled } from "../../assets/svg/ts/arrowFilled"
import { removeOutlineHeader } from "../Header/Header.animations"
import { PersonalSiteCanvas } from "./PersonalSiteCanvas/PersonalSiteCanvas"


gsap.registerPlugin(CustomEase)
// gsap.registerPlugin(ScrollTrigger)


export interface IPropsProjectPost {
    element?: HTMLElement,
    indexTitle: string,
    wysiwyg: JSX.Element,
    imgPath: string,
    pathNextProject: string,
    currentPath: string,
    nextProjects: INextProjects
}

export function ProjectPost({ props }: { props: IPropsProjectPost}) {

    // console.log('PROOOOOPS')
    // console.log(props)

    const refArticleContainer = useRef(null)
    const refIndexContainer = useRef(null)
    const refPostImageContainer = useRef(null)

    const [titles, setTitles] = useState<NodeListOf<Element> | null>(null)
    const [showCanvas, setShowCanvas] = useState(false)

    useLayoutEffect(() => {

    }, [])


    useLayoutEffect(() => {
        window.scroll(0, 0)

        const elImgTransition: HTMLElement | null = document.getElementById(`transition-img-${props.imgPath}`)
        hidePageOverlay()
        if (elImgTransition === null) return
        // elImgTransition.style.opacity = '1'
        gsap.set(elImgTransition, {opacity: 1})
        gsap.set(document.querySelector(".footer-canvas"), {marginTop: '-45vh'})

        removeOutlineHeader()
        executePageEnterAnimation(props.imgPath)

        const elImage: HTMLElement | null = refPostImageContainer.current

        if (props.imgPath === "mountains") {
            // setMountainsScale(elImage)
            setMountainsAnimationObserver()
        }

        console.log(props.imgPath)

        if (props.imgPath === "personal-site.svg") {
            console.log("IEEEEEE SET CANVAS")
            setTimeout(()=> setShowCanvas(true), msEnterPageLong + 200)
        }

    }, [])

    return (
        <div id="page-project-post" className={styles.projectPostContainer}>
            <div id="post-container-image" className={styles.containerImage}>
                <div className={styles.container} ref={refPostImageContainer}>
                    { showCanvas === true ? <PersonalSiteCanvas /> : '' }
                    {/* {getImg(props.imgPath)} */}
                    {/* {props.imgPath !== 'mountains'
                        ? <img ref={refPostImageContainer} className={styles.image} src={require(`../../assets/${props.imgPath}`)}></img>
                        : getImg('mountains')
                    } */}
                </div>
            </div>

            {props.wysiwyg}

            <div className={styles.moreProjectsContainer}>
                <NextProjects props={props.nextProjects}></NextProjects>
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

//https://www.fournisseur-energie.com/fournisseurs-electricite/

//https://www.fournisseur-energie.com/comparateur/estimation/