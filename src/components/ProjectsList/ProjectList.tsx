import { useLayoutEffect } from "react"
import styles from "./ProjectList.module.scss"
import { TagLabels } from "../ProjectPost/Components/TagLabels/TagLabels"
import { Cta, ICtaProps } from "../UI/Cta/Cta"
import { getImg } from "../WorkBanner/Card/Card"
import { Link } from "react-router-dom"
import { setLeaveAnimation, setProjectListEnterAnimation } from "./ProjectList.animations"
// @ts-ignore -- TODO: solve declaration file from package
import { hasPageBeenLoaded } from "@pausabater/utils/dist/index.esm.js"
import { hideAllTransitionImages } from "../../assets/ts/utils/utils"
import { removeOutlineHeader } from "../Header/Header.animations"


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

export function ProjectList({props, mode}: {props: IProjectList, mode: string}) {

    useLayoutEffect(() => {
        removeOutlineHeader()
        hideAllTransitionImages()
        if (hasPageBeenLoaded()) {
            setProjectListEnterAnimation()
        } else {
            setTimeout(()=> setProjectListEnterAnimation(), 500)
        }
    }, [])


    const handleProjectClick = (e: React.MouseEvent) => {
        const elTarget: HTMLElement = e.target as HTMLElement
        if (elTarget === null) return
        setLeaveAnimation(elTarget)
    }

    return (
        <div className={styles.container} id="page-projects" data-theme={mode}>
            <div className={styles.gradient}></div>
            <div className={"intro-container"}>
                <h1 className={styles.title}>{props.title}</h1>
                <p className={styles.intro}>{props.intro}</p>
            </div>
            {props.projects.map((project, i)=> {
                return (
                    <Link
                        className={`${styles.projectContainer} project-card`}
                        to={project.cta.href}
                        target={project.cta.target}
                        onClick={(e) => handleProjectClick(e)}
                        id={`project-${i}`}
                        key={`project-${i}`}
                    >
                        <div className={styles.textsContainer}>
                            <p className={styles.projectTitle}>{project.title}</p>
                            <TagLabels tags={project.labels} color={"secondary"}></TagLabels>
                            <p className={styles.projectDescription}>{project.text}</p>
                            <Cta props={project.cta}></Cta>
                        </div>
                        <div className={styles.imgContainer}>
                            {getImg(project.imgPath)}
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