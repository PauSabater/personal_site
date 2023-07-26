import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react"
import { TagLabels } from "./Components/TagLabels/TagLabels"
import { Callout } from "./Components/Callout/Callout"
import { ImageArticle } from "./Components/ImageArticle/ImageArticle"
import styles from "./ProjectPost.module.scss"
import gsap from "gsap"
import ScrollToPlugin from "gsap/ScrollToPlugin"
import { chevronSvg } from "../../assets/svg/ts/arrow"
import parse from "html-react-parser"

gsap.registerPlugin(ScrollToPlugin)
// gsap.registerPlugin(ScrollTrigger)


export interface IPropsProjectPost {
    indexTitle: string,
    wysiwyg: JSX.Element,
    imgPath: string
}

export function ProjectPost({ props }: { props: IPropsProjectPost}) {

    const refArticleContainer = useRef(null)
    const refIndexContainer = useRef(null)

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
        <div>
            <div className={styles.containerImage}>
                <div className={styles.container}>
                    <img className={styles.image} src={require(`../../assets/${props.imgPath}`)}></img>
                </div>
            </div>

            <div className={styles.articleContainer} ref={refArticleContainer}>
                <div className={styles.indexContainer}>
                    <div className={styles.linksContainer}>
                        <div className={styles.linkWrap}>
                            {parse(chevronSvg("currentColor"))}
                            <a className={styles.linkProject}>Previous<br></br>projec</a>
                        </div>
                        <div className={styles.linkWrap}>
                            <a className={styles.linkProject}>Next<br></br>project</a>
                            {parse(chevronSvg("currentColor"))}
                        </div>
                    </div>
                    <div className={styles.listContainer} ref={refIndexContainer}>
                        <li className={styles.itemFirst}>{props.indexTitle}</li>
                        <ul>{titles ? Array.from(titles as NodeListOf<Element>).map((title) => {
                            title.setAttribute('data-title-target', title.innerHTML.toLowerCase().replaceAll(' ', '-'))
                            return title.nodeName === 'H2'
                                ? <li
                                    onClick={(e)=> handleItemClickEvent(e)}
                                    className={`${styles.itemFirst} article-index-title`}
                                    data-title={title.innerHTML.toLowerCase().replaceAll(' ', '-')}
                                >{title.innerHTML}</li>
                                : <li
                                    onClick={(e)=> handleItemClickEvent(e)}
                                    className={`${styles.itemSecond} article-index-title`}
                                    data-title={title.innerHTML.toLowerCase().replaceAll(' ', '-')}
                                >{title.innerHTML}</li>
                            }
                        ): ''}
                        </ul>
                    </div>
                </div>
                {props.wysiwyg}
            </div>
        </div>
    )
}

//https://www.fournisseur-energie.com/fournisseurs-electricite/

//https://www.fournisseur-energie.com/comparateur/estimation/