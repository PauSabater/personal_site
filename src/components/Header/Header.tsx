import { Link, NavLink } from "react-router-dom"
import styles from "./Header.module.scss"
import gsap from "gsap"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import { easeOutLong } from "../../assets/ts/styles/styles"
import { CustomEase } from "gsap/CustomEase"
import parse from "html-react-parser"
import { gitHubLogo, linkedInLogo } from "../../assets/svg/ts/varied"
import { disableScroll, enableScroll, isMobileScreen } from "../../assets/ts/utils/utils"
import ScrollToPlugin from "gsap/ScrollToPlugin"
import { scrollToFromHomePage } from "./Header.animations"


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

    const tlHeaderShow = gsap.timeline()
    const tlHeaderHide = gsap.timeline()

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

    // const resetHeaderMobile = () => {
    //     gsap.set([refIconsContainer.current, refHeaderListContainer.current], {
    //         opacity: 0, duration: 0, pointerEvents: 'none'
    //     })
    //     gsap.set(refLogoContainer.current, {color: 'var(--c-black)'})
    //     gsap.set(refBurgerBackground.current, {scale: 1})
    // }

    const handleClickLink = (e: React.MouseEvent)=> {
        if(isMobileScreen()) animationCloseBurger(true, true)

        const elTarget: HTMLLinkElement = e.target as HTMLLinkElement

        if (window.location.href !== elTarget.href) {
            gsap.to(document.getElementById("page-overlay"), {opacity: 1, duration: 0.75})

        } else if (elTarget.hasAttribute("data-scroll-to")) {
            scrollToFromHomePage(elTarget)
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

                {/* <svg width="156" height="156" viewBox="0 0 156 156" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 15C0 6.71573 6.71573 0 15 0H48V48H0V15Z" fill="#050505"/>
                    <rect x="54" width="48" height="48" fill="#050505"/>
                    <path d="M108 0H141C149.284 0 156 6.71573 156 15V48H108V0Z" fill="#050505"/>
                    <rect y="54" width="48" height="48" fill="#050505"/>
                    <rect x="54" y="54" width="48" height="48" fill="#050505"/>
                    <path d="M108 54H156V87C156 95.2843 149.284 102 141 102H108V54Z" fill="#050505"/>
                    <path d="M0 108H48V141C48 149.284 41.2843 156 33 156H0V108Z" fill="#050505"/>
                </svg> */}


                    {/* <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.167 0H7C3.13401 -2.04858e-06 2.04858e-06 3.134 0 7V15.1667H15.167L15.167 0ZM15.167 18.1667H0V31.8333H15.167V18.1667ZM18.167 31.8333L18.167 18.1667H31.833L31.833 31.8333H18.167ZM15.167 34.8333H0V43C0 46.866 3.13401 50 7 50H15.167L15.167 34.8333ZM18.167 50V34.8333H31.833V50H18.167ZM18.167 15.1667V0H31.833V15.1667H18.167ZM34.833 18.1667L34.833 31.8333H50V18.1667H34.833ZM34.833 34.8333V50H43C46.866 50 50 46.866 50 43V34.8333H34.833ZM34.833 0V15.1667H50V7C50 3.13401 46.866 0 43 0H34.833Z" fill="#050505"/>
                    </svg> */}
                        <p className={styles.logoName}>PS</p>
                        {/* <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M51 33.6922C51 34.7542 50.139 35.6152 49.0769 35.6152L2.92308 35.6152C1.86099 35.6152 0.999999 34.7542 0.999999 33.6922C0.999999 32.6301 1.86099 31.7691 2.92308 31.7691L49.0769 31.7691C50.139 31.7691 51 32.6301 51 33.6922Z" stroke="#272727" stroke-linecap="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1 18.3078C1 17.2458 1.86099 16.3848 2.92308 16.3848H49.0769C50.139 16.3848 51 17.2458 51 18.3078C51 19.3699 50.139 20.2309 49.0769 20.2309H2.92308C1.86099 20.2309 1 19.3699 1 18.3078Z" stroke="#272727" stroke-linecap="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M33.6922 1C34.7542 1 35.6152 1.86099 35.6152 2.92308L35.6152 49.0769C35.6152 50.139 34.7542 51 33.6922 51C32.6301 51 31.7691 50.139 31.7691 49.0769L31.7691 2.92308C31.7691 1.86099 32.6301 1 33.6922 1Z" stroke="#272727" stroke-linecap="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3074 1C19.3695 1 20.2305 1.86099 20.2305 2.92308L20.2305 49.0769C20.2305 50.139 19.3695 51 18.3074 51C17.2453 51 16.3843 50.139 16.3843 49.0769L16.3843 2.92308C16.3843 1.86099 17.2453 1 18.3074 1Z" stroke="#272727" stroke-linecap="round"/>
                        </svg> */}
                    </Link>
                    <div ref={refHeaderListContainer} className={styles.listContainer}>
                        <ul className={styles.list}>
                            <li className={styles.item}>
                                <NavLink
                                    onClick={(e) => {handleClickLink(e)}}
                                    className={'header-link'}
                                    to='/'
                                >about
                                </NavLink>
                            </li>
                            <li className={`${styles.item} header-iterm`}>
                                <NavLink
                                    onClick={(e) => {handleClickLink(e)}}
                                    className={'header-link'}
                                    to='/projects'
                                >projects
                                </NavLink>
                            </li>
                            <li className={`${styles.item} header-iterm`}>
                                <NavLink
                                    onClick={(e) => {handleClickLink(e)}}
                                    className={'header-link'}
                                    to='/'
                                    data-scroll-to="text-banner"
                                >who am I
                                </NavLink>
                            </li>
                        </ul>
                        <ul ref={refItemLink} className={styles.list}>
                            <li className={styles.item}>
                                <div className={styles.backgroundLink}></div>
                                <div ref={refLinesContainer} className={styles.linesContainer}>
                                    <div></div><div></div><div></div><div></div>
                                </div>
                                <NavLink
                                    onClick={(e) => {handleClickLink(e)}}
                                    ref={refLinkContact}
                                    to='/'
                                    data-scroll-to="foot-banner"
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
                    </div>
                </div>

            </div>
    )
}