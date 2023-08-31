import { Link, NavLink } from "react-router-dom"
import styles from "./Header.module.scss"
import gsap from "gsap"
import { useLayoutEffect, useRef, useState } from "react"
import { easeOutLong } from "../../assets/ts/styles/styles"
import { CustomEase } from "gsap/CustomEase"
import parse from "html-react-parser"
import { gitHubLogo, linkedInLogo } from "../../assets/svg/ts/varied"
import { disableScroll, enableScroll, isMobileScreen } from "../../assets/ts/utils/utils"
import ScrollToPlugin from "gsap/ScrollToPlugin"

gsap.registerPlugin(CustomEase, ScrollToPlugin)

export function Header({ links }: { links: string[]}) {

    const [isBurgerOpen, setIsBurgerOpen] = useState(false)

    let oldScrollY = 0
    const [direction, setDirection] = useState('up')

    const refHeader = useRef(null)
    const refBurger = useRef(null)
    const refBurgerBackground = useRef(null)
    const refLinesContainer = useRef(null)
    const refLinkContact = useRef(null)
    const refItemLink = useRef(null)
    const refHeaderListContainer = useRef(null)
    const refIconsContainer = useRef(null)
    const refLogoContainer = useRef(null)

    const controlDirection = () => {
        if(window.scrollY > oldScrollY) {
            if (direction !== 'down') setDirection('down')
            gsap.to(refHeader.current, {
                y: -150,
                duration: 2,
                ease: CustomEase.create("custom", easeOutLong)
            })
        } else {
            if (direction !== 'up') setDirection('up')
            gsap.to(refHeader.current, {
                y: 0,
                duration: 2,
                ease: CustomEase.create("custom", easeOutLong)
            })
        }
        oldScrollY = window.scrollY
    }

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {},[]);

        const mql = window.matchMedia('(max-width: 768px)');
            mql.onchange = (e) => {
                if (mql.matches === false) {
                    animationCloseBurger(false)
                    setIsBurgerOpen(false)
                } else {
                    animationCloseBurger(true)
                    setIsBurgerOpen(false)
                }
        }

        window.addEventListener('scroll', controlDirection)
        return () => {
            window.removeEventListener('scroll', controlDirection)
            ctx.revert()
        }
    },[])

    const handleBurgerClick = (e: React.MouseEvent)=> {
        if (isBurgerOpen === false) {
            animationOpenBurger()
            setIsBurgerOpen(true)
        }
        if (isBurgerOpen === true) {
            animationCloseBurger()
            setIsBurgerOpen(false)
        }
    }

    const animationOpenBurger = ()=> {

        const elBurgerBackground: HTMLElement | null = refBurgerBackground.current
        if (elBurgerBackground === null || refHeaderListContainer.current === null
            || refLinesContainer.current === null || refBurger.current === null) return

        const elsLines = (refLinesContainer.current as HTMLElement).querySelectorAll("div")
        const elsItems = Array.from((refHeaderListContainer.current as HTMLElement).querySelectorAll(".header-link"))
        const elsBurgerLines = Array.from((refBurger.current as HTMLElement).querySelectorAll(".burger-line"))
        const tlOpenBurger = gsap.timeline()

        tlOpenBurger
            .pause()
            .set(refBurger.current, {
                pointerEvents: 'none'
            })
            .set(elsItems, {
                y: 100,
                opacity: 0
            })
            .set(elsLines, {
                scale: 1,
            })
            .set([refItemLink.current, refLinkContact.current], {
                opacity: 0
            })
            .set(elsBurgerLines, {
                transformOrigin: "center"
            })
            .set(elsLines[0], {
                transformOrigin: "left"
            })
            .set(elsLines[1], {
                transformOrigin: "top"
            })
            .set(elsLines[2], {
                transformOrigin: "bottom"
            })
            .set(elsLines[3], {
                transformOrigin: "right"
            })
            .set([refHeaderListContainer.current, refIconsContainer.current], {
                pointerEvents: 'all'
            })
            .to(elsBurgerLines[0], {
                y: '8',
                duration: 0.4,
                onStart: () => disableScroll()
            }, 0)
            .to(elsBurgerLines[2], {
                y: '-8',
                duration: 0.4
            }, 0)
            .to([elsBurgerLines[0],elsBurgerLines[1]], {
                rotate: '45deg',
                duration: 0.45,
                delay: 0.4
            }, 0)
            .to(elsBurgerLines[2], {
                rotate: '-45deg',
                duration: 0.4,
                delay: 0.4
            }, 0)
            .to(elBurgerBackground, {
                scaleY: () => (window.innerHeight / (elBurgerBackground as HTMLElement).getBoundingClientRect().height) * 2.2,
                scaleX: () => (window.innerWidth / (elBurgerBackground as HTMLElement).getBoundingClientRect().width) * 2.2,
                duration: 0.4,
                ease: "power4.in"
            }, 0)
            .to(refHeaderListContainer.current, {
                opacity: '1',
                duration: 0.4,
                delay: 0.1
            }, 0)
            .to(refItemLink.current, {
                opacity: '1',
                duration: 0,
                delay: 0.5
            }, 0)
            .to(elsItems, {
                y: 0,
                opacity: 1,
                delay: 0.4,
                duration: 0.3,
                stagger: 0.075,
                ease: "power1.out"
            }, 0)
            .to(elsLines[0], {
                duration: 0.2,
                delay: 0.6,
                scaleX: 0,
                ease: "none"
            }, 0)
            .to(elsLines[1], {
                duration: 0.1,
                delay: 0.8,
                scaleY: 0,
                ease: "none"
            }, 0)
            .to(elsLines[3], {
                duration: 0.25,
                delay: 0.9,
                scaleX: 0,
                ease: "none"
            }, 0)
            .to(elsLines[2], {
                duration: 0.3,
                delay: 1.15,
                scaleY: 0,
                ease: "none"
            }, 0)
            .to([refLinkContact.current, refIconsContainer.current], {
                opacity: 1,
                duration: 0.3,
                delay: 0.875,
            }, 0)
            .set(refLogoContainer.current, {
                color: 'var(--c-white)',
                delay: 0.875,
            }, 0)
            .set(refBurger.current, {
                pointerEvents: 'all',
                delay: 0.875,
            }, 0)
        .play()
    }

    const animationCloseBurger = (isMobile = true, isLinkClicked = false) => {
        const tlCloseBurger = gsap.timeline().pause()

        const duration = isLinkClicked ? 0.5 : 0.4
        if (refBurger.current === null) return
        const elsBurgerLines = Array.from((refBurger.current as HTMLElement).querySelectorAll(".burger-line"))

        tlCloseBurger
            .set([refIconsContainer.current, refHeaderListContainer.current], {
                pointerEvents: isMobile ? 'none' : 'all',
            })
            .set(refBurger.current, {pointerEvents: 'none'})
            .set(refLogoContainer.current, {color: 'var(--c-black)'})
            .to([elsBurgerLines[0],elsBurgerLines[1], elsBurgerLines[2]], {
                rotate: '0deg',
                duration: duration,
            }, 0)
            .to([elsBurgerLines[0], elsBurgerLines[2]], {
                y: '0',
                duration: duration,
                delay: duration
            }, 0)
            .to(refBurgerBackground.current, {
                scale: 1,
                duration: duration,
                delay: duration
            }, 0)
            .to([refHeaderListContainer.current, refItemLink.current, refIconsContainer.current], {
                opacity: isMobile ? 0 : 1,
                duration: duration,
                onComplete: () => enableScroll()
            }, 0)
            .set(refBurger.current, {
                pointerEvents: 'all'
            }, 'end')
            .play()
    }

    const handleClickLink = (e: React.MouseEvent)=> {
        if(isMobileScreen()) animationCloseBurger(true, true)
        const elTarget: HTMLLinkElement = e.target as HTMLLinkElement

        if (elTarget.hasAttribute("data-scroll-to")) {
            gsap.to(window, {
                duration: 1.5,
                ease: "power2.inOut",
                scrollTo: {
                    y: document.getElementById(elTarget.getAttribute("data-scroll-to") as string) as Element,
                }
            })
        }

    }

    return (
        <div ref={refHeader} id="header" className={styles.header}>
            <div ref={refBurger} className={`${styles.burger} ${isBurgerOpen ? 'is-open' : ''} `} onClick={(e)=> handleBurgerClick(e)}>
                <div ref={refBurgerBackground} className={styles.burgerBackground}></div>
                <div className={`${styles.burgerLine} burger-line`}></div>
                <div className={`${styles.burgerLine} burger-line`}></div>
                <div className={`${styles.burgerLine} burger-line`}></div>
            </div>
            <div className={styles.container}>
                <Link ref={refLogoContainer} to={"/"} className={styles.logoContainer}>
                    <svg width="48" height="156" viewBox="0 0 48 156" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="10" fill="#050505"/>
                    <rect y="54" width="48" height="48" rx="10" fill="#050505"/>
                    <rect y="108" width="48" height="48" rx="10" fill="#050505"/>
                    </svg>
                    <p className={styles.logoName}>PS</p>
                </Link>
                <div ref={refHeaderListContainer} className={styles.listContainer}>
                    <ul className={styles.list}>
                        <li className={styles.item} key={1}>
                            <NavLink
                                onClick={(e) => {handleClickLink(e)}}
                                className={'header-link'}
                                to='/'
                            >about
                            </NavLink>
                        </li>
                        <li className={`${styles.item} header-iterm`} key={2}>
                            <NavLink
                                onClick={(e) => {handleClickLink(e)}}
                                className={'header-link'}
                                to='/projects'
                            >projects
                            </NavLink>
                        </li>
                    </ul>
                    <ul ref={refItemLink} className={styles.list}>
                        <li className={styles.item} key={3}>
                            <div className={styles.backgroundLink}></div>
                            <div ref={refLinesContainer} className={styles.linesContainer}>
                                <div></div><div></div><div></div><div></div>
                            </div>
                            <NavLink
                                onClick={(e) => {handleClickLink(e)}}
                                ref={refLinkContact}
                                to='#'
                                data-scroll-to="footer-canvas"
                            >contact me
                            </NavLink>
                        </li>
                    </ul>
                </div>
                <div ref={refIconsContainer} className={styles.iconsContainer}>
                    <a className={styles.iconLink} href="https://github.com/PauSabater/weather_app" target="_blank">
                        {parse(gitHubLogo("var(--c-white)"))}
                    </a>
                    <a className={styles.iconLink} href="https://www.linkedin.com/in/pau-sabater-vilar-b0189989" target="_blank">
                        {parse(linkedInLogo("var(--c-black"))}
                    </a>
                    <div className={styles.gradientLight}></div>
                </div>
            </div>
        </div>
    )
}