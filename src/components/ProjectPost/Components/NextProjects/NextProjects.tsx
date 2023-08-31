import gsap from 'gsap'
import { Link } from "react-router-dom"
import { getImg, getMountainImgs } from "../../../WorkBanner/Card/Card"
import styles from "./NextProjects.module.scss"
import { arrowFilled } from "../../../../assets/svg/ts/arrowFilled"
import parse from "html-react-parser"
import { setLeaveAnimation } from "../../../ProjectsList/ProjectList.animations"
import { disableScroll, getGsapDistToCenterElXAxis, getGsapDistToCenterElYAxis, getScaleToCoverViewPort } from "../../../../assets/ts/utils/utils"
import { leaveFromMoreProjectsClick } from '../../ProjectPost.animations'

export interface INextProjects {
    title: string,
    projects: {
        title: string,
        description: string,
        path: string
        img: string
    }[]
}

export function NextProjects({ props }: { props: INextProjects }) {

    // const handleLinkClick = (e: React.MouseEvent) => {
    //     const elTarget: HTMLElement = e.target as HTMLElement
    //     const elImgContainer: HTMLElement | null = elTarget.querySelector(".img-container")
    //     const elImg: HTMLElement | null = elTarget.querySelector("[data-transitioned-image]")

    //     if (elImgContainer === null || elImg === null) return

    //     const tl = gsap.timeline()
    //     // .set(document.body, {overflow: 'hidden'})
    //     // .set(document.body, {height: 'auto'})
    //     .set(elImg, {borderRadius: '0px'})
    //     .to(elImg, {
    //         y: getGsapDistToCenterElYAxis(elImg as HTMLElement),
    //         x: getGsapDistToCenterElXAxis(elImg as HTMLElement),
    //         scale: getScaleToCoverViewPort(elImg as HTMLElement),
    //         duration: 1,
    //         onStart: ()=> {
    //             disableScroll()
    //             const durSkew = 0.35
    //             gsap.to(elImg, {skewY: '5deg', duration: durSkew})
    //             gsap.to(elImg, {skewY: '0deg', duration: durSkew, delay: durSkew})
    //         }
    //     }, 'start')
    //     tl.play()
    // }

    return (
        <div className={`${styles.container}`}>
            <h1 className={styles.heading}>{props.title}</h1>
            {   props.projects.map((project, i)=> {
                    return (
                        <Link
                            onClick={(e)=> leaveFromMoreProjectsClick(e)}
                            to={project.path}
                            className={`${styles.project} more-projects-link`}
                            id={`more-projects-link-${i}`}
                            key={`more-projects-link-${i}`}
                        >
                            <p className={styles.title}>{project.title}</p>
                            <div className={`${styles.imgContainer} img-container`}>
                                {project.img === 'mountains'
                                    ? <div className={styles.mountainContainer} data-transitioned-image data-img-mountain>{getMountainImgs()}</div>
                                    : getImg(project.img, false)}
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    )
}