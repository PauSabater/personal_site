import { Fragment } from "react"
import styles from "../ProjectPost.module.scss"
import { TagLabels } from "../Components/TagLabels/TagLabels"
import { ImageArticle } from "../Components/ImageArticle/ImageArticle"
import { Cta } from '../../UI/Cta/Cta'
import { calendar } from "../../../assets/svg/ts/calendar"
import parse from "html-react-parser"
import { LinkInline } from "../Components/LinkInline/LinkInline"
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
                    A developer's portfolio is quite a unique way to showcase one's skills, something built from scratch that can be used and inspected. I did not want a simple site with a list of skills and experience, but rather something more <span>engaging and fun</span>.
                </p>
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
                <h2 className={styles.sectionTitle}>Shaping the pages</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        On the homepage I used <span>storytelling</span> to give an introduction of who I am, skills and how I work in a light and short way. To do so, information should be revealed on scroll in a visual way. A <span>visual effect on the middle</span> would differentiate half a page with a light mode, and a second with a dark mode in order to add a visual change.
                    </p>
                    <p className={styles.paragraphRight}>
                        On the projects pages, I tried to add <span>two columns</span>, exchanging big titles, some highlighted text, images and schemas. A Z pattern has been used hoping to make it more <span>visually dynamic</span>. Maybe at the cost of some readability. The article would be preceded with a fullwidth image representing the project, optionally with some animations and surprises.
                    </p>
                </div>
                <ImageArticle
                    imgName={"personal_site_homepage_wireframe.svg"}
                    maxHeight={400}
                    hasMediumMargin={true}
                ></ImageArticle>
            </div>
            <div className={styles.sectionRight}>
                <h2 className={styles.sectionTitle}>Looking for an image</h2>
                    <div>
                        <p className={styles.paragraphRight}>
                            Some <span>design system</span> was needed to give <span>consistency</span> to the site, and it had to be related to myself. I always found myself enjoying the early stages of product conception and refinement. I decided to play with elements that relate to ideas and conception, such as a grid to sketch on, pencils, sketches and shapes. Also light, which can give two same objects a totally different aspect. Both grids and light relate to my previous professional experiences.                             A logo has been created as well. I am not good with logos, but I have tried it to be linked to the theme of the site. The colors used are yellow, which relates to light, and two shades of purple, which relate to fun.
                        </p>
                        <p className={styles.paragraphRight}>
                            All right, <span>grids, sketches, light and fun</span>, we have a theme, let's work on it !
                        </p>
                    </div>
                    <ImageArticle
                        imgName={"personal_site_design_system.svg"}
                        maxHeight={450}
                        hasMediumMargin={true}
                    ></ImageArticle>
            </div>

            <div className={styles.sectionLeft}>
                <h2 className={styles.sectionTitle}>Some bits of fun</h2>
                    <div>
                        <p className={styles.paragraphRight}>
                            The page suddenly turning into a 3d scene, an image scaling fullwidth, transitions... I tried to add some surprises through the page, with the intention to showcase some skills, keep the user engaged with the content, and have some fun myself developing the page as well. This parts should be related to the theme of the page in order to keep some consistency.
                        </p>
                    </div>
                    <ImageArticle
                        imgName={"personal_site_shapes.svg"}
                    ></ImageArticle>
            </div>

            <div className={styles.sectionMain}>
                <p className={styles.preTitle}>/ Coding the ideas </p>
                <h2 className={styles.sectionTitle}>Development of the project</h2>
                <p className={styles.mainParagraph}>
                    Choosing the right stack came from the requirements of the page. I wanted a smooth experience (no flash between pages !). Since there are no SEO requirenments and it is a small simple site, I opted for a <span>single page application</span> as a design pattern.
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
            <div className={styles.sectionLeft}>
                <h2 className={styles.sectionTitle}>An eye on performance</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        When dealing with a lot of animations, it is easy to have janky result, as browsers can require lots of resources as a result of repainting and reflows. That is why most animations on this site are limited to <span>opacity and transforms</span> to avoid rerenderings and keep most work at the <span>GPU</span>. In addition, some Threejs scenes are lazyly loaded, and the render frames are executed only when the scene is in view. Sadly, some scenes cool effects have been abandoned to keep frame rate good, since maintaining a good browsing experience is more important.
                    </p>
                </div>
                <ImageArticle
                    imgName={"personal_site_speed.svg"}
                    maxHeight={100}
                ></ImageArticle>
            </div>
            <div className={styles.sectionMainRight}>
                <h2 className={styles.sectionTitle}>Conclusion</h2>
                <p className={styles.mainParagraph}>
                    Depeloping a page from scratch from design to coding is quite a challenge and a lot of work, and even more if the purpose is to make the site stand out. I hope I have achieved it, that is up to you to say. In any case I have learned and had lots of fun developing it !
                </p>
            </div>
            <div className={styles.sectionLeft}>
                <h2 className={styles.sectionTitle}>References</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        As with any project, some references for inspiration have been used:
                        <br/><LinkInline text={"Mountains illustration: "} href={"https://www.vecteezy.com/vector-art/5565275-silhouette-landscape-with-fog-forest-pine-trees-purple-mountains-illustration-of-view-mist-and-sunset-good-for-wallpaper-background-banner-cover-poster"}/> This illustration has been redrawn from the original.
                        <br/><LinkInline text={"Rain effect: "} href={"https://codepen.io/josetxu/pen/gOKJKKx"}/> This codepen has been adapted. I chose a css effect which requires less resources than a high resolution video. in order to use less re, as opposed to a video one.
                        <br/><LinkInline text={"Threejs scenes: "} href={"https://docs.pmnd.rs/react-three-fiber/getting-started/examples"}/> Some examples from the library has been used as inspiration and starting point, although they have ended up being quite different.
                        <br/><LinkInline text={"Content structure: "} href={"https://bepatrickdavid.com/"}/> This portfolio has been used as a starting point to structure the content of the pages.
                    </p>
                </div>
            </div>
        </div>
    </Fragment>
    )
}