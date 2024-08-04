import { useLayoutEffect } from "react"
import { Project } from "./Project/Project"
import styles from "./projectsSlide.module.scss"
import { setProjectSlideAnimations } from "./projectsSlide.animations"

export function ProjectsSlide() {

    useLayoutEffect(()=> {

        setProjectSlideAnimations()

    })
    return (
        <div className={styles.container} id="projects-slider-section">
            <div className={styles.containerSlider} id="projects-slider">
                <Project />
                <Project />
                <Project />
                <Project />
                <Project />
            </div>

        </div>
    )
}