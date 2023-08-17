import { Fragment } from "react"
import styles from "../ProjectPost.module.scss"
import { TagLabels } from "../Components/TagLabels/TagLabels"
import { Callout } from "../Components/Callout/Callout"
import { ImageArticle } from "../Components/ImageArticle/ImageArticle"
import { Cta, ICtaProps } from '../../UI/Cta/Cta'
import { calendar } from "../../../assets/svg/ts/calendar"
import parse from "html-react-parser"
import { LinkInline } from "../Components/LinkInline/LinkInline"
import { arrowFilled } from "../../../assets/svg/ts/arrowFilled"
import { Link } from "react-router-dom"
import { getArrowLinkTemplate } from "../ProjectPost"

export const personalSiteContent = (): JSX.Element => { return (
    <Fragment>
        <div className={styles.introArticle} id="intro-article">
            <div className={`${styles.introContainer} intro-container`}>
                <h1>
                    Personal site
                </h1>
                <TagLabels tags={['personal side project']} color={"secondary"}></TagLabels>
                <TagLabels tags={['TypeScript', 'React', 'React Three Fiber', 'GSAP', 'CSS Modules', 'SCSS']} color={"primary"}></TagLabels>
                <div className={styles.projectDateContainer}>
                    {parse(calendar("var(--c-grey)"))}<p>July / August 2023</p>
                </div>
                <p className={styles.intro}>
                    This is a site to <span>present my work and myself</span>. Having quited my job to <span>move to Berlin</span>, I found myself in a situation where I did not have anything to showcase my abilities. Having changed careers, my experience was not very long either to catch attention. Despite having been told that I have good skills, when in a new place that does not matter as you have to start from scratch. This site aims to showcase my capabilities in a transparent way, and remain as a <span>personal playground</span> to learn and have fun !
                </p>
                <div className={styles.ctaContainer}>
                    <Cta props={{
                        text: "Visit the repository",
                        href: "https://github.com/PauSabater/weather_app",
                        color: "black",
                        isBold: false
                    }}></Cta>
                </div>
            </div>
        </div>
        <div className={styles.articleContent}>
            {getArrowLinkTemplate("/projects/papernest")}
            <div className={styles.sectionMain}>
                <p className={styles.preTitle}>/ Looking for a personal brand </p>
                <h2 className={styles.sectionTitle}>A playground and, a personal brand ?</h2>
                <p className={styles.mainParagraph}>
                    A developer's portfolio is quite a unique way to showcase your skills, something built from scratch that can be used and inspected. I did not want a simple site with a list of skills and experience, but rather something more <span>engaging and fun</span>.
                </p>
                <div>
                    <p className={styles.paragraphRight}>
                        So how to get there? Some kind of <span>image was needed</span>. I always found myself enjoying the early stages of product conception and refinement. Something that relates to this could be a grid to sketch on, pencils, dirty charcoal brushes, where ideas can come from. Also light, which can give two same objects a totally different aspect. Both grids and light relate to my previous professional experiences.
                    </p>
                    <p className={styles.paragraphRight}>
                        All right, <span>grids, sketches, light and fun</span>, we have a theme, let's work on it !
                    </p>
                </div>
            </div>
            <div className={styles.sectionRight}>
                <h2 className={styles.sectionTitle}>Organising the site</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        In order to not have too much information at once, I prefered to have a homepage with <span>just a few main facts</span>, and then a more expanded layer of information with my projects. The projects pages should be used to get to know how I work and think. A third layer with the deployed projects when possible would be added too. And finally, the links to the repositories so the code can be visited.
                    </p>
                </div>
                <ImageArticle
                    imgName={"personal_site_pages_diagram.svg"}
                ></ImageArticle>
            </div>
            <div className={styles.sectionLeft}>
                <h2 className={styles.sectionTitle}>Shaping the pages: <br /> the homepage</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        I tried to use a <span>storytelling</span> style to give an introduction of who I am, skills and how I work in a light, short and visual way. To do so, information should be revealed on scroll in a visual way. The flow has been added this way: top banner with main concept, short intruction, work presentation, visual effect intermission, skills, how I work and contact with final effect. A <span>visual effect on the middle</span> would differentiate half a page with a light mode, and a second with a dark mode in order to add a visual change. I like how background changes can modify the user attention !
                    </p>
                </div>
                <ImageArticle
                    imgName={"personal_site_homepage_wireframe.svg"}
                    maxHeight={475}
                    hasMargin={true}
                ></ImageArticle>
            </div>
            <div className={styles.sectionRight}>
                <h2 className={styles.sectionTitle}>The project article</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        Here each project characteristics would be described. I started with a classic article post lineal pattern, however I found it a bit rigid. So I tried to add <span>two columns</span>, exchanging big titles, some highlighted text, images and schemas, in a Z pattern hoping to make it more <span>visually dynamic</span>. Maybe at the cost of some readability, but this is not a dissertation ! (I still hope I am not writing too much!).
                    </p>
                    <p className={styles.paragraphRight}>
                        The article would be preceded with a fullwidth image representing the project, optionally with some animations and surprises, followed by a short introduction and key features.
                    </p>
                </div>
                <ImageArticle
                    imgName={"personal_site_article_wireframe.svg"}
                    maxHeight={375}
                    hasMargin={true}
                ></ImageArticle>
            </div>
            <div className={styles.sectionMain}>
                <p className={styles.preTitle}>/ Coding the ideas </p>
                <h2 className={styles.sectionTitle}>Development of the project</h2>
                <p className={styles.mainParagraph}>
                    Choosing the right stack came from the requirements of the page. I wanted a smooth experience (no flash between pages please!). Since there are no SEO requirenments and it is a small simple site, I opted for a <span>single page application</span> as a design pattern.
                </p>
                <p className={styles.paragraphRight}>
                    To facilitate the development of the SPA, I used <LinkInline text={"React"} href={"https://react.dev/"}/>. Given the small size of the page I would have prefered something lighter like <LinkInline text={"Svelte"} href={"https://svelte.dev/"}/> or <LinkInline text={"LIT"} href={"https://lit.dev/"}/>, however, I wanted to use <LinkInline text={"React Three Fiber"} href={"https://docs.pmnd.rs/react-three-fiber/getting-started/introduction"}/> to facilitate the use of <LinkInline text={"Threejs"} href={"https://threejs.org/."}/> scenes. Animations are orchestrated with <LinkInline text={"GSAP"} href={"https://greensock.com/gsap/GSAP"}/>. Finally, <LinkInline text={"TypeScript"} href={"https://www.typescriptlang.org/"}/> and <LinkInline text={"SASS"} href={"https://sass-lang.com/"}/> have been used to give a better development experience. Overall, I am very happy with the chosen combination !
                </p>
            </div>
            <div className={styles.sectionRight}>
                <h2 className={styles.sectionTitle}>Choosing the stack</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        To facilitate the development of the SPA, I used <LinkInline text={"React"} href={"https://react.dev/"}/>. Given the small size of the page I would have prefered something lighter like <LinkInline text={"Svelte"} href={"https://svelte.dev/"}/> or <LinkInline text={"LIT"} href={"https://lit.dev/"}/>, however, I wanted to use <LinkInline text={"React Three Fiber"} href={"https://docs.pmnd.rs/react-three-fiber/getting-started/introduction"}/> to facilitate the use of <LinkInline text={"Threejs"} href={"https://threejs.org/."}/> scenes. Animations are orchestrated with <LinkInline text={"GSAP"} href={"https://greensock.com/gsap/GSAP"}/>. Finally, <LinkInline text={"TypeScript"} href={"https://www.typescriptlang.org/"}/> and <LinkInline text={"SASS"} href={"https://sass-lang.com/"}/> have been used to give a better development experience. Overall, I am very happy with the chosen combination !
                    </p>
                </div>
                <ImageArticle
                    imgName={"personal_site_stack.svg"}
                    maxHeight={100}
                ></ImageArticle>
            </div>
            <div className={styles.sectionRight}>
                <h2 className={styles.sectionTitle}>Organising the project</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        This feature allows the display of <span>energy offers based on a form</span> that requires user information like appartment surface, heating type and location and consumtion. This was a challenging task due to the <span>multiple private and public apis</span> to consume and the non static wording the data had to be combined with. The <span>user management</span> was also challenging, as this feature could be added on any site and was not integrated in a specific app.
                    </p>
                    <p className={styles.paragraphRight}>
                        The feature is currently not working due to an error from an api response, however, not linked to my work !
                    </p>
                </div>
            </div>
            <div className={styles.sectionLeft}>
                <h2 className={styles.sectionTitle}>Filtered List</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        <LinkInline text={"This feature"} href={"https://www.fournisseur-energie.com/comparateur/estimation/"}/> allows the display of energy offers based on a form that requires user information like appartment surface, heating type and location and consumtion. This was a challenging task due to the <span>multiple private and public apis</span> to consume and the non static wording the data had to be combined with. The user management was also challenging, as this feature could be added on any site and was not integrated in a specific app.
                    </p>
                    <p className={styles.paragraphRight}>
                        The feature is currently not working due to an error from an api response, however, not linked to my work !
                    </p>
                </div>
            </div>
            <div className={styles.sectionRight}>
                <h2 className={styles.sectionTitle}>Web callback form</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        An important role of SEO pages is to allow the users to request information to the company through a <span>callback component</span>. This was a challenging task, as it had to be deployed anywhere, be configurable and process CRUD operations on internal apis. <span>Security</span> was also important, for which google recaptcha was integrated. This component had several subcomponents to be optionally included, such as a calendar to schedule the calls. Web components were used to build this feature.
                    </p>
                </div>
            </div>
            <div className={styles.sectionLeft}>
                <h2 className={styles.sectionTitle}>Cookies feature</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        Having multiple domains, developing a multiple cookies system was a challenging task as it had to be <span>cross-browser</span> and <span>cross-domain</span>. In addition, any site could personalise the cookies workings. The cookies choises were stored in an external database through a Flask API, which returns the cookie if it already exists.
                    </p>
                </div>
            </div>
            <div className={styles.sectionRight}>
                <h2 className={styles.sectionTitle}>Conclusion</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        Looking back, I am amazed at the amount of work and features I worked with. It was indeed a <span>great first professional experience</span> in the field. Being surrouded by a great team and colleagues, the environment was ideal to <span>learn and grow</span> my skills. I learned a lot and had a great time. However, life moves on and I had to move to Berlin for personal reasons, which was incompatible with my position. Had not been for that matter, I would gladly have kept working at papernest !
                    </p>
                </div>
            </div>
        </div>
    </Fragment>
    )
}