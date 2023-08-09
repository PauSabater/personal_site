import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react"
import { TagLabels } from "./Components/TagLabels/TagLabels"
import { Callout } from "./Components/Callout/Callout"
import { ImageArticle } from "./Components/ImageArticle/ImageArticle"
import styles from "./ProjectPost.module.scss"
import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"

import ScrollToPlugin from "gsap/ScrollToPlugin"
import { chevronSvg } from "../../assets/svg/ts/arrow"
import parse from "html-react-parser"
import { NavLink } from "react-router-dom"
import { getProportionRelToElement, getViewportAspectRatio, isViewportPropHigherThanEl } from "../../assets/ts/utils/utils"
import { calendar } from "../../assets/svg/ts/calendar"
import { LinkInline } from "./Components/LinkInline/LinkInline"
import { easeOutLong } from "../../assets/ts/styles/styles"
import { getImg } from "../WorkBanner/Card/Card"
import { executeEnteringMountainAnimation, setMountainsAnimation } from "./ProjectPost.animations"
import { getCloudsAnimation } from "../WorkBanner/WorkBanner.animations"


gsap.registerPlugin(CustomEase)


gsap.registerPlugin(ScrollToPlugin)
// gsap.registerPlugin(ScrollTrigger)


export interface IPropsProjectPost {
    element?: HTMLElement,
    indexTitle: string,
    wysiwyg: JSX.Element,
    imgPath: string,
    pathNextProject: string,
    currentPath: string
}

export function ProjectPost({ props }: { props: IPropsProjectPost}) {

    // console.log('PROOOOOPS')
    // console.log(props)

    const refArticleContainer = useRef(null)
    const refIndexContainer = useRef(null)
    const refPostImage = useRef(null)

    const [titles, setTitles] = useState<NodeListOf<Element> | null>(null)



    useLayoutEffect(() => {

        const elImage = refPostImage.current
        let elImgMountainContainer

        if (elImage === null) {
            elImgMountainContainer = document.querySelector("#card-3-img-wrap") as HTMLElement
            executeEnteringMountainAnimation(elImgMountainContainer)
            setMountainsAnimation(elImgMountainContainer)
        }

        if (elImage !== null) {
            if (isViewportPropHigherThanEl(elImage)) {
                (elImage as HTMLImageElement).setAttribute('data-locked-width', '');
                (elImage as HTMLImageElement).removeAttribute('data-locked-height');
            } else {
                (elImage as HTMLImageElement).setAttribute('data-locked-height', '');
                (elImage as HTMLImageElement).removeAttribute('data-locked-width');
            }
        }

        const elImg = document.querySelector("#post-container-image") === null
            ? document.querySelector("#card-3-img-wrap")
            : document.querySelector("#post-container-image")

        gsap
            .timeline({ paused: true })
                .to(!elImgMountainContainer
                    ? elImg
                    : [elImgMountainContainer, elImg], {
                    height: '75vh',
                    duration: 0.8,
                    delay: 0.2,
                    ease: CustomEase.create("custom", easeOutLong),
                }, 0)
                .to(document.querySelector("#intro-article"), {
                    y: '0',
                    opacity: 1,
                    duration: 0.2,
                    delay: 0.2,
                    ease: CustomEase.create("custom", easeOutLong),
                }, 0)
                .to(document.querySelector(".intro-container"), {
                    y: '0',
                    opacity: '1',
                    duration: 0.8,
                    delay: 0.,
                    ease: CustomEase.create("custom", easeOutLong),
                }, 0)
        .play();

        if (elImgMountainContainer) {

        }

    }, [])

    /*
        Receives item click event, substracts referal to the corresponding title and triggers scroll to the title
    */
    const handleItemClickEvent = (e: React.MouseEvent<HTMLLIElement, MouseEvent>)=> {
        const elArticleContainer: HTMLElement | null = refArticleContainer.current
        if (elArticleContainer === null) return

        const elTarget: HTMLElement = e.target as HTMLElement
        const attrTarget = elTarget.getAttribute("data-title")
        gsap.to(window, {
            duration: 1,
            ease: "power3.out",
            scrollTo: {
                y: (elArticleContainer as HTMLElement).querySelector(`[data-title-target=${attrTarget}]`) as HTMLElement,
                offsetY: 100
            }
        })

    }

    return (
        <div id="page-project-post" className={styles.projectPostContainer}>
            <div id="post-container-image" className={styles.containerImage}>
                <div className={styles.container}>
                    {props.imgPath !== 'mountains'
                        ? <img ref={refPostImage} className={styles.image} src={require(`../../assets/${props.imgPath}`)}></img>
                        : getImg('mountains')
                    }
                </div>
            </div>

            {props.wysiwyg}
            <div className={styles.nextProjects}>
                <h1>Other projects</h1>
            </div>
        </div>
    )
}

//https://www.fournisseur-energie.com/fournisseurs-electricite/

//https://www.fournisseur-energie.com/comparateur/estimation/