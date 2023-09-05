import { Link, NavLink, useNavigate } from "react-router-dom"
import styles from "./Header.module.scss"
import gsap from "gsap"
import { useLayoutEffect, useRef, useState } from "react"
import { easeOutLong } from "../../assets/ts/styles/styles"
import { CustomEase } from "gsap/CustomEase"
import parse from "html-react-parser"
import { gitHubLogo, linkedInLogo } from "../../assets/svg/ts/varied"
import { disableScroll, enableScroll, hasElementBeenScrolled, isMobileScreen } from "../../assets/ts/utils/utils"
import ScrollToPlugin from "gsap/ScrollToPlugin"
import { setPageFadeOutAnimation } from "../App/App.animations"

gsap.registerPlugin(CustomEase, ScrollToPlugin)

export function Header({ links, mode }: { links: string[], mode: string}) {

    const [isBurgerOpen, setIsBurgerOpen] = useState(false)
    const [isMobileView, setIsMobileView] = useState(isMobileScreen())
    const navigate = useNavigate()

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
                    setIsMobileView(false)
                } else {
                    animationCloseBurger(true)
                    setIsBurgerOpen(false)
                    setIsMobileView(true)
                }
        }

        window.addEventListener('scroll', controlDirection)
        return () => {
            window.removeEventListener('scroll', controlDirection)
            ctx.revert()
        }
    },[])

    const handleBurgerClick = (e: React.MouseEvent)=> {
        setIsMobileView(isMobileScreen())

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
                color: 'var(--c-white-no-change)',
                delay: 0.95,
            }, 0)
            .set(refBurger.current, {
                pointerEvents: 'all',
                delay: 0.875,
            }, 0)
        .play()
    }

    const animationCloseBurger = (isMobile = true, isLinkClicked = false) => {
        const tlCloseBurger = gsap.timeline().pause()
        setIsBurgerOpen(false)

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
        const currentLocation = window.location.href

        if (elTarget.hasAttribute("data-scroll-to")) {
            const isHomepage = currentLocation.includes("projects") === false
            let duration = 1.5

            const homepagePastHalf = hasElementBeenScrolled(document.getElementById("homepage-second-half") as HTMLElement)

            if (!isHomepage || homepagePastHalf) {
                const scrollTo = !isHomepage ? "footer-canvas" : "foot-banner"
                gsap.to(window, {
                    duration: duration,
                    ease: "power2.inOut",
                    scrollTo: {
                        y: document.getElementById(scrollTo) as Element,
                    }
                })
            } else if (isHomepage === true) {
                navigate("/contact")
            }

        } else {
            const hrefTarget = (e.target as HTMLLinkElement).href
            if (currentLocation.includes(hrefTarget)) {
                const splitLocation = currentLocation.split(hrefTarget)

                // if second string is not empty means the string continues, so not the same page
                if (splitLocation[1] !== "") {
                    setPageFadeOutAnimation()
                }
            } else {
                setPageFadeOutAnimation()
            }
        }
    }

    return (
        <div ref={refHeader} id="header" className={styles.header} data-theme={mode}>
            <div ref={refBurger} className={`${styles.burger} ${isBurgerOpen ? 'is-open' : ''} `} onClick={(e)=> handleBurgerClick(e)}>
                <div ref={refBurgerBackground} className={styles.burgerBackground}></div>
                <div className={`${styles.burgerLine} burger-line`}></div>
                <div className={`${styles.burgerLine} burger-line`}></div>
                <div className={`${styles.burgerLine} burger-line`}></div>
            </div>
            <div className={styles.container}>
                <Link ref={refLogoContainer} to={"/"} className={`${styles.logoContainer} ${isBurgerOpen ? styles.logoWhenOpen : ''}` }>
                    <svg width="48" height="156" viewBox="0 0 48 156" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" rx="10" fill="currentColor"/>
                    <rect y="54" width="48" height="48" rx="10" fill="currentColor"/>
                    <rect y="108" width="48" height="48" rx="10" fill="currentColor"/>
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
                        <li className={`${styles.item} header-iterm`} key={3}>
                            <div
                                onClick={(e) => {
                                    if(isMobileScreen() === true) animationCloseBurger()
                                    document.body.getAttribute("data-theme") === "light"
                                        ? document.body.setAttribute("data-theme", "dark")
                                        : document.body.setAttribute("data-theme", "light")
                                    document.dispatchEvent(new CustomEvent('themeChange', {bubbles: false}))
                                }}
                                className={`${styles.darkModeContainer} header-link`}
                            >
                                <p>
                                    {isMobileView
                                        ? `set ${mode === "light" ? "dark" : "light"} mode`
                                        : `mode`
                                    }
                                </p>
                            <svg viewBox="0 0 125 125" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <title>{mode === "light" ? "set dark mode" : "set light mode"}</title>
                                <circle cx="62.5" cy="61.5" r="39.5" fill="white" stroke="white" stroke-width="10"/>
                                <circle cx="62.5" cy="62.5" r="62" stroke="white"/>
                                <path d="M68 61.5V61.6435V61.7862V61.9278V62.0686V62.2085V62.3474V62.4855V62.6226V62.7589V62.8942V63.0287V63.1622V63.2949V63.4268V63.5577V63.6878V63.817V63.9454V64.0729V64.1995V64.3253V64.4503V64.5744V64.6977V64.8201V64.9417V65.0625V65.1825V65.3017V65.4201V65.5376V65.6544V65.7703V65.8855V65.9998V66.1134V66.2262V66.3383V66.4495V66.56V66.6697V66.7787V66.8869V66.9943V67.101V67.207V67.3122V67.4167V67.5204V67.6235V67.7258V67.8273V67.9282V68.0284V68.1278V68.2266V68.3246V68.422V68.5186V68.6146V68.7099V68.8045V68.8985V68.9917V69.0844V69.1763V69.2676V69.3582V69.4482V69.5376V69.6263V69.7144V69.8018V69.8886V69.9748V70.0604V70.1453V70.2296V70.3134V70.3965V70.479V70.561V70.6423V70.7231V70.8033V70.8829V70.9619V71.0403V71.1182V71.1956V71.2723V71.3486V71.4242V71.4993V71.5739V71.648V71.7215V71.7945V71.8669V71.9389V72.0103V72.0812V72.1516V72.2215V72.2909V72.3598V72.4283V72.4962V72.5636V72.6306V72.6971V72.7631V72.8287V72.8938V72.9584V73.0226V73.0863V73.1496V73.2125V73.2749V73.3368V73.3984V73.4595V73.5202V73.5805V73.6404V73.6998V73.7589V73.8176V73.8758V73.9337V73.9912V74.0483V74.105V74.1614V74.2174V74.273V74.3282V74.3831V74.4376V74.4918V74.5457V74.5992V74.6523V74.7052V74.7577V74.8098V74.8617V74.9132V74.9644V75.0154V75.066V75.1163V75.1663V75.216V75.2654V75.3146V75.3635V75.412V75.4604V75.5084V75.5562V75.6037V75.651V75.698V75.7448V75.7914V75.8377V75.8837V75.9296V75.9752V76.0206V76.0657V76.1107V76.1554V76.2V76.2443V76.2885V76.3324V76.3762V76.4198V76.4632V76.5064V76.5495V76.5923V76.6351V76.6776V76.72V76.7623V76.8044V76.8464V76.8882V76.9299V76.9714V77.0129V77.0542V77.0954V77.1365V77.1774V77.2183V77.2591V77.2997V77.3403V77.3808V77.4212V77.4615V77.5018V77.5419V77.582V77.6221V77.662V77.702V77.7418V77.7817V77.8214V77.8612V77.9009V77.9406V77.9802V78.0198V78.0595V78.099V78.1386V78.1782V78.2178V78.2574V78.2969V78.3365V78.3761V78.4158V78.4554V78.4951V78.5348V78.5745V78.6143V78.6542V78.694V78.734V78.7739V78.814V78.8541V78.8943V78.9345V78.9748V79.0152V79.0557V79.0963V79.137V79.1778V79.2186V79.2596V79.3007V79.3419V79.3832V79.4247V79.4663V79.508V79.5498V79.5918V79.6339V79.6762V79.7186V79.7611V79.8039V79.8468V79.8898V79.9331V79.9765V80.0201V80.0639V80.1078V80.152V80.1963V80.2409V80.2857V80.3306V80.3758V80.4212V80.4669V80.5127V80.5588V80.6051V80.6517V80.6985V80.7455V80.7928V80.8404V80.8882V80.9362V80.9846V81.0332V81.0821V81.1313V81.1807V81.2304V81.2805V81.3308V81.3814V81.4324V81.4836V81.5352V81.5871V81.6393V81.6918V81.7446V81.7978V81.8513V81.9052V81.9594V82.014V82.0689V82.1242V82.1798V82.2358V82.2922V82.3489V82.4061V82.4636V82.5215V82.5798V82.6385V82.6976V82.7571V82.817V82.8773V82.938V82.9992V83.0608V83.1228V83.1852V83.2481V83.3114V83.3752V83.4394V83.5041V83.5692V83.6348V83.7008V83.7674V83.8344V83.9018V83.9698V84.0383V84.1072V84.1766V84.2466V84.317V84.388V84.4594V84.5314V84.6039V84.6769V84.7505V84.8246V84.8992V84.9744V85.0501V85.1263V85.2031V85.2805V85.3584V85.4369V85.516V85.5956V85.6759V85.7567V85.8381V85.92V86.0026V86.0858V86.1696V86.254V86.339V86.4246V86.5108V86.5977V86.6851V86.7733V86.862V86.9514V87.0414V87.1321V87.2235V87.3155V87.4081V87.5014V87.5955V87.6901V87.7855V87.8815V87.9782V88.0756V88.1737V88.2725V88.372V88.4722V88.5731V88.6748V88.7771V88.8802V88.984V89.0885V89.1938V89.2998V89.4066V89.5141V89.6223V89.7314V89.8411V89.9517V90.063V90.1751V90.2879V90.4016V90.516V90.6312V90.7472V90.864V90.9816V91.1001V91.2193V91.3393V91.4602V91.5819V91.7044V91.8277V91.9519V92.0769V92.2028V92.3295V92.4571V92.5855V92.7148V92.8449V92.9759V93.1078V93.2405V93.3742V93.5087V93.6441V93.7804V93.9177V94.0558V94.1948V94.3347V94.4755V94.6173V94.76V94.9036V95.0481V95.1936V95.34V95.4874V95.6357V95.7849V95.9351V96.0863V96.2384V96.3915V96.5456V96.7007V96.8567V97.0137V97.1717V97.3307V97.4907V97.6517V97.8137V97.9767V98.1407V98.3058V98.4718V98.6389V98.807V98.9762V99.1464V99.3176V99.4899V99.6632V99.8376V100.013V100.19V100.367V100.546V100.678C87.1381 98.1942 102 81.6449 102 61.5C102 41.3551 87.1381 24.8058 68 22.3221V22.3276V22.3963V22.465V22.5336V22.6022V22.6707V22.7392V22.8076V22.876V22.9443V23.0125V23.0807V23.1489V23.217V23.2851V23.3531V23.4211V23.489V23.5569V23.6247V23.6925V23.7603V23.828V23.8957V23.9634V24.031V24.0986V24.1661V24.2336V24.3011V24.3686V24.436V24.5034V24.5708V24.6381V24.7055V24.7728V24.8401V24.9073V24.9745V25.0418V25.109V25.1762V25.2433V25.3105V25.3776V25.4447V25.5118V25.579V25.646V25.7131V25.7802V25.8473V25.9143V25.9814V26.0485V26.1155V26.1826V26.2496V26.3167V26.3837V26.4508V26.5179V26.5849V26.652V26.7191V26.7862V26.8533V26.9204V26.9875V27.0547V27.1218V27.189V27.2561V27.3233V27.3906V27.4578V27.525V27.5923V27.6596V27.7269V27.7943V27.8617V27.9291V27.9965V28.0639V28.1314V28.1989V28.2665V28.334V28.4017V28.4693V28.537V28.6047V28.6725V28.7402V28.8081V28.876V28.9439V29.0118V29.0799V29.1479V29.216V29.2842V29.3523V29.4206V29.4889V29.5572V29.6256V29.6941V29.7626V29.8312V29.8998V29.9685V30.0372V30.106V30.1749V30.2438V30.3128V30.3818V30.451V30.5201V30.5894V30.6587V30.7281V30.7976V30.8671V30.9367V31.0064V31.0762V31.146V31.2159V31.2859V31.356V31.4261V31.4963V31.5667V31.6371V31.7075V31.7781V31.8488V31.9195V31.9903V32.0613V32.1323V32.2034V32.2746V32.3459V32.4173V32.4887V32.5603V32.632V32.7038V32.7757V32.8476V32.9197V32.9919V33.0642V33.1366V33.2091V33.2817V33.3545V33.4273V33.5002V33.5733V33.6465V33.7197V33.7931V33.8667V33.9403V34.0141V34.0879V34.1619V34.236V34.3103V34.3846V34.4591V34.5337V34.6085V34.6834V34.7584V34.8335V34.9087V34.9841V35.0597V35.1353V35.2111V35.2871V35.3631V35.4393V35.5157V35.5922V35.6688V35.7456V35.8225V35.8996V35.9768V36.0542V36.1317V36.2093V36.2871V36.3651V36.4432V36.5215V36.5999V36.6785V36.7572V36.8361V36.9151V36.9944V37.0737V37.1533V37.233V37.3128V37.3928V37.473V37.5534V37.6339V37.7146V37.7955V37.8765V37.9577V38.0391V38.1207V38.2024V38.2844V38.3664V38.4487V38.5312V38.6138V38.6966V38.7796V38.8628V38.9462V39.0297V39.1135V39.1974V39.2815V39.3659V39.4504V39.5351V39.6199V39.705V39.7903V39.8758V39.9615V40.0474V40.1334V40.2197V40.3062V40.3929V40.4798V40.5669V40.6542V40.7417V40.8294V40.9173V41.0055V41.0938V41.1824V41.2712V41.3602V41.4494V41.5388V41.6285V41.7183V41.8084V41.8987V41.9893V42.08V42.171V42.2622V42.3536V42.4453V42.5372V42.6293V42.7217V42.8142V42.9071V43.0001V43.0934V43.1869V43.2807V43.3747V43.4689V43.5634V43.6581V43.7531V43.8483V43.9438V44.0394V44.1354V44.2316V44.328V44.4247V44.5217V44.6189V44.7163V44.814V44.912V45.0102V45.1087V45.2074V45.3064V45.4057V45.5052V45.6049V45.705V45.8053V45.9059V46.0067V46.1078V46.2092V46.3109V46.4128V46.515V46.6174V46.7202V46.8232V46.9265V47.0301V47.1339V47.238V47.3425V47.4471V47.5521V47.6574V47.7629V47.8688V47.9749V48.0813V48.188V48.295V48.4023V48.5098V48.6177V48.7259V48.8343V48.9431V49.0521V49.1615V49.2711V49.3811V49.4913V49.6019V49.7127V49.8239V49.9354V50.0472V50.1593V50.2717V50.3844V50.4974V50.6107V50.7244V50.8383V50.9526V51.0672V51.1821V51.2974V51.4129V51.5288V51.645V51.7615V51.8784V51.9955V52.113V52.2309V52.349V52.4675V52.5863V52.7055V52.8249V52.9448V53.0649V53.1854V53.3062V53.4274V53.5489V53.6707V53.7929V53.9154V54.0383V54.1615V54.2851V54.409V54.5332V54.6578V54.7828V54.9081V55.0337V55.1597V55.2861V55.4128V55.5399V55.6673V55.7951V55.9233V56.0518V56.1806V56.3099V56.4395V56.5694V56.6998V56.8305V56.9615V57.093V57.2248V57.3569V57.4895V57.6224V57.7557V57.8894V58.0234V58.1578V58.2926V58.4278V58.5634V58.6993V58.8356V58.9724V59.1095V59.2469V59.3848V59.5231V59.6617V59.8007V59.9402V60.08V60.2202V60.3608V60.5018V60.6432V60.785V60.9272V61.0698V61.2128V61.3562V61.5Z"
                                fill="black" stroke="black" stroke-width="10"/>
                            </svg>
                            </div>
                        </li>
                    </ul>
                    <ul ref={refItemLink} className={styles.list}>
                        <li className={styles.item} key={3}>
                            <div className={styles.backgroundLink}></div>
                            <div ref={refLinesContainer} className={styles.linesContainer}>
                                <div></div><div></div><div></div><div></div>
                            </div>
                            <a
                                onClick={(e) => {handleClickLink(e)}}
                                ref={refLinkContact}
                                data-scroll-to="footer-canvas"
                            >contact me
                            </a>
                        </li>
                    </ul>
                </div>
                <div ref={refIconsContainer} className={styles.iconsContainer}>
                    <a className={styles.iconLink} href="https://github.com/PauSabater/weather_app" target="_blank">
                        {parse(gitHubLogo("var(--c-white-no-change)"))}
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