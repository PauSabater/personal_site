import { useLayoutEffect, useRef } from "react"

import styles from "./ProjectList.module.scss"
import { TagLabels } from "../ProjectPost/Components/TagLabels/TagLabels"
import { Cta, ICtaProps } from "../UI/Cta/Cta"
import { getImg } from "../WorkBanner/Card/Card"
import parse from 'html-react-parser'
import { Link } from "react-router-dom"
import { setLeaveAnimation, setProjectListEnterAnimation } from "./ProjectList.animations"
import { hideAllTransitionImages } from "../../assets/ts/utils/utils"
import { removeOutlineHeader } from "../Header/Header.animations"
// import "../../assets/svg/"

// import "../../assets/svg/papernest.svg"


export interface IProjectList {
    title: string,
    intro: string,
    projects: {
        title: string,
        text: string,
        labels: string[],
        cta: ICtaProps,
        imgPath: string
    }[]
    bottomCta: ICtaProps
}



export function ProjectList({props}: {props: IProjectList}) {

    const refBanner: React.MutableRefObject<null> = useRef(null)

    useLayoutEffect(() => {
        removeOutlineHeader()
        hideAllTransitionImages()
        setProjectListEnterAnimation()
        // const elBanner: HTMLElement | null = refBanner.current

        // if (elBanner === null) return
        // setSkillsBannerAnimation(elBanner)
    }, [])


    const handleProjectClick = (e: React.MouseEvent) => {
        const elTarget: HTMLElement = e.target as HTMLElement
        if (elTarget === null) return
        setLeaveAnimation(elTarget)
    }

    return (
        <div className={styles.container} id="page-projects">
            <div className={"intro-container"}>
                <h1 className={styles.title}>{props.title}</h1>
                <p className={styles.intro}>{parse(props.intro)}</p>
            </div>
            {props.projects.map((project, i)=> {
                return (
                    <Link
                        className={`${styles.projectContainer} project-card`}
                        to={project.cta.href}
                        target={project.cta.target}
                        onClick={(e) => handleProjectClick(e)}
                        id={`project-${i}`}
                    >
                        <div className={styles.textsContainer}>
                            <p className={styles.projectTitle}>{project.title}</p>
                            <TagLabels tags={project.labels} color={"secondary"}></TagLabels>
                            <p className={styles.projectDescription}>{project.text}</p>
                            <Cta props={project.cta}></Cta>
                        </div>
                        <div className={styles.imgContainer}>
                            {getImg(project.imgPath)}
                            {/* <img className={styles.img} src={require(`../../assets/svg/${project.imgPath}`).default}></img> */}
                        </div>
                    </Link>
                )})
            }
            <div className={`${styles.ctaContainer} cta-container`}>
                <Cta props={props.bottomCta}></Cta>
            </div>
        </div>
    )
}