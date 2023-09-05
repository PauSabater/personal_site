import gsap from 'gsap'
import { Link } from "react-router-dom"
import { getImg, getMountainImgs } from "../../../WorkBanner/Card/Card"
import styles from "./NextProjects.module.scss"
import { arrowFilled } from "../../../../assets/svg/ts/arrowFilled"
import parse from "html-react-parser"
import { setLeaveAnimation } from "../../../ProjectsList/ProjectList.animations"
import { disableScroll, getGsapDistToCenterElXAxis, getGsapDistToCenterElYAxis, getScaleToCoverViewPort } from "../../../../assets/ts/utils/utils"
import { leaveFromArrowClick, leaveFromMoreProjectsClick } from '../../ProjectPost.animations'

export interface INextProjects {
    title: string,
    projects: {
        title: string,
        description: string,
        path: string
        img: string
    }[]
}

export function NextProjects({ props, mode }: { props: INextProjects, mode: string }) {

    return (
        <div className={`${styles.container}`} data-theme={mode}>
            <h1 className={styles.heading}>{props.title}</h1>
            {   props.projects.map((project, i)=> {
                    return (
                        <Link
                            onClick={(e)=> leaveFromArrowClick()}
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