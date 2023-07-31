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
import { getProportionRelToElement, getViewportProportion, isViewportPropHigherThanEl } from "../../assets/ts/utils/utils"
import { calendar } from "../../assets/svg/ts/calendar"
import { LinkInline } from "./Components/LinkInline/LinkInline"
import { easeOutLong } from "../../assets/ts/styles/styles"
import { getImg } from "../WorkBanner/Card/Card"


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

    useEffect(() => {
        const elHeader = document.querySelector("#header") as HTMLElement
        console.log(elHeader)
        if (elHeader !== null) elHeader.style.opacity = "1"

        const elArticleContainer: HTMLElement | null = refArticleContainer.current
        const elIndexContainer: HTMLElement | null = refIndexContainer.current
        if (elArticleContainer === null || elIndexContainer === null) return

        const elsHeading: NodeListOf<Element> = (elArticleContainer as HTMLElement).querySelectorAll("h2, h3")
        setTitles(elsHeading)

        const observer = new IntersectionObserver((entries)=> observerCallback(entries),
            {
                root: null,
                rootMargin: "0px 0px -50% 0px",
                threshold: 1
            });

        const observerCallback = (entries: any) => {
            entries.forEach((entry: any) => {
                if (entry.isIntersecting) {
                    const elsItem: NodeListOf<Element> = (elIndexContainer as HTMLElement).querySelectorAll(".article-index-title")
                    Array.from(elsItem).forEach((elItem)=> elItem.removeAttribute("data-is-highlighted"))

                    const attrTarget: string = entry.target.getAttribute("data-title-target")
                    const elListItem = (elIndexContainer as HTMLElement).querySelector(`[data-title="${attrTarget}"]`)
                    elListItem?.setAttribute("data-is-highlighted", "")
                }
            })
        }

        Array.from(elsHeading).forEach((heading)=> observer.observe(heading))

    }, [refArticleContainer])

    useLayoutEffect(() => {

        const elImage = refPostImage.current
        let elImgMountainContainer

        if (elImage === null) {
            elImgMountainContainer = document.querySelector("#card-3-img-wrap") as HTMLElement
            elImgMountainContainer.style.height = `${(getProportionRelToElement(elImgMountainContainer.firstElementChild as HTMLElement) * window.innerHeight).toString()}px`
            elImgMountainContainer.style.width = '100vw'

            gsap
                .set([
                    elImgMountainContainer,
                    elImgMountainContainer.querySelectorAll("img"),
                    elImgMountainContainer.querySelectorAll("svg")
                ], {
                    height: `${(getProportionRelToElement(elImgMountainContainer.firstElementChild as HTMLElement) * window.innerHeight).toString()}px`,
                    width: '100vw'
                })
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

        console.log("ANIMATEEE")
        console.log(elImg)

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