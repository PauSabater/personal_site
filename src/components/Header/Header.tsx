import { NavLink } from "react-router-dom"
import styles from "./Header.module.scss"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import { easeOutLong } from "../../assets/ts/styles/styles"
import { CustomEase } from "gsap/CustomEase"
gsap.registerPlugin(CustomEase)

export function Header({ links }: { links: string[]}) {

    let oldScrollY = 0
    const [direction, setDirection] = useState('up')

    const refHeader = useRef(null)

    const tlHeaderShow = gsap.timeline()
    const tlHeaderHide = gsap.timeline()

    // gsap.to(refHeader.current, {
    //     rotation: 360,
    //     duration: 5,
    //     ease: "elastic"
    // })

    // gsap.to(refHeader.current, {
    //     opacity: 1,
    //     y: 0,
    //     duration: 1,
    //     ease: CustomEase.create("custom", easeOutLong)
    // })

    // gsap.to(refHeader.current, {
    //     opacity: 0,
    //     y: -150,
    //     duration: 1,
    //     ease: CustomEase.create("custom", easeOutLong)
    // })

    // tlHeaderShow.pause()

    const controlDirection = () => {
        if(window.scrollY > oldScrollY) {
            if (direction !== 'down') setDirection('down')
            gsap.to(refHeader.current, {
                opacity: 0,
                y: -150,
                duration: 1,
                delay: 0.7,
                ease: CustomEase.create("custom", easeOutLong)
            })
        } else {
            if (direction !== 'up') setDirection('up')
            gsap.to(refHeader.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.7,
                ease: CustomEase.create("custom", easeOutLong)
            })
        }
        oldScrollY = window.scrollY
    }

    useEffect(() => {
        window.addEventListener('scroll', controlDirection)
        return () => {
            window.removeEventListener('scroll', controlDirection)
        }
    },[])



    return (
        <div ref={refHeader} id="header" className={styles.container}>
            <ul className={styles.list}>
                <li className={styles.item}>
                    <NavLink to='/'>about</NavLink>
                </li>
                <li className={styles.item}>
                    <NavLink to='/projects/papernest'>projects</NavLink>
                </li>
                <li className={styles.item}>
                    <NavLink to='/projects/weather-app'>how I work</NavLink>
                </li>
            </ul>
            <ul className={styles.list}>
                <li className={styles.item}><a>contact</a></li>
            </ul>
        </div>
    )
}