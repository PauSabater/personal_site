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
import { getGsapDistToCenterElXAxis, getGsapDistToCenterElYAxis, getProportionRelToElement, getScaleToCoverViewPort, getViewportAspectRatio, hidePageOverlay, isViewportPropHigherThanEl } from "../../assets/ts/utils/utils"
import { calendar } from "../../assets/svg/ts/calendar"
import { LinkInline } from "./Components/LinkInline/LinkInline"
import { easeOutLong } from "../../assets/ts/styles/styles"
import { getImg } from "../WorkBanner/Card/Card"
import { executeEnteringMountainAnimation, executePageEnterAnimation, leaveFromArrowClick, setMountainsAnimationObserver, setMountainsScale } from "./ProjectPost.animations"
import { getCloudsAnimation } from "../WorkBanner/WorkBanner.animations"
import { INextProjects, NextProjects } from "./Components/NextProjects/NextProjects"
import { arrowFilled } from "../../assets/svg/ts/arrowFilled"
import { removeOutlineHeader } from "../Header/Header.animations"


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

    useEffect(() => {
        // window.scroll(0, 0)
        const elImgTransition: HTMLElement | null = document.getElementById(`transition-img-${props.imgPath}`)
        hidePageOverlay()
        if (elImgTransition === null) return
        elImgTransition.style.opacity = '1'

    })


    useLayoutEffect(() => {
        removeOutlineHeader()
        executePageEnterAnimation(props.imgPath)

        const elImage: HTMLElement | null = refPostImageContainer.current

        if (props.imgPath === "mountains") {
            // setMountainsScale(elImage)
            setMountainsAnimationObserver()
        }
    }, [])

    /*
        Receives item click event, substracts referal to the corresponding title and triggers scroll to the title
    */
    // const handleItemClickEvent = (e: React.MouseEvent<HTMLLIElement, MouseEvent>)=> {
    //     const elArticleContainer: HTMLElement | null = refArticleContainer.current
    //     if (elArticleContainer === null) return

    //     const elTarget: HTMLElement = e.target as HTMLElement
    //     const attrTarget = elTarget.getAttribute("data-title")
    //     gsap.to(window, {
    //         duration: 1,
    //         ease: "power3.out",
    //         scrollTo: {
    //             y: (elArticleContainer as HTMLElement).querySelector(`[data-title-target=${attrTarget}]`) as HTMLElement,
    //             offsetY: 100
    //         }
    //     })

    // }

    return (
        <div id="page-project-post" className={styles.projectPostContainer}>
            <div id="post-container-image" className={styles.containerImage}>
                <div className={styles.container} ref={refPostImageContainer}>
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
        <Link to={path} onClick={(e) => leaveFromArrowClick(e)} className={styles.nextProjectContainer}>
            Next project
            {parse(arrowFilled())}
        </Link>
    )
}

//https://www.fournisseur-energie.com/fournisseurs-electricite/

//https://www.fournisseur-energie.com/comparateur/estimation/