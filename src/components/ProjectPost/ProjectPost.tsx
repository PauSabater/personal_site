import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react"
import { TagLabels } from "./Components/TagLabels/TagLabels"
import { Callout } from "./Components/Callout/Callout"
import { ImageArticle } from "./Components/ImageArticle/ImageArticle"
import styles from "./ProjectPost.module.scss"
// import gsap from "gsap"
// import ScrollTrigger from "gsap/ScrollTrigger"

// gsap.registerPlugin(ScrollTrigger)

export function ProjectPost({ imgPath }: { imgPath: string}) {

    const refArticleContainer = useRef(null)
    const refIndexContainer = useRef(null)


    console.log("HELLO IN PROJECT")

    const [titles, setTitles] = useState<NodeListOf<Element> | null>(null)

    useEffect(() => {
        const elArticleContainer: HTMLElement | null = refArticleContainer.current
        const elIndexContainer: HTMLElement | null = refIndexContainer.current
        if (elArticleContainer === null || elIndexContainer === null) return

        const elsHeading: NodeListOf<Element> = (elArticleContainer as HTMLElement).querySelectorAll("h2, h3")
        setTitles(elsHeading)


        const observer = new IntersectionObserver((entries)=> observerCallback(entries),
            {
                root: null,
                rootMargin: "0px 0px -50% 0px",
                threshold: 1
            });

        const observerCallback = (entries: any) => {
            entries.forEach((entry: any) => {
                if (entry.isIntersecting) {
                    console.log(entry.target.innerHTML);
                    const attr: string = entry.target.getAttribute("data-title-target")
                    const elListItem = (elIndexContainer as HTMLElement).querySelector(`[data-title="${attr}"]`)
                    console.log("attr is ", attr)
                    console.log("heyyy list content is")
                    elListItem?.classList.add("highlighted")
                    console.log(elListItem)
                }
            })
        }

        Array.from(elsHeading).forEach((heading)=> observer.observe(heading))



    }, [refArticleContainer])

    return (
        <div>
            <div className={styles.containerImage}>
                <div className={styles.container}>
                    <img className={styles.image} src={imgPath}></img>
                </div>
            </div>

            <div className={styles.articleContainer}>

                <div className={styles.indexContainer}>
                    <div ref={refIndexContainer}>
                        <li className={styles.itemFirst}>CONTENT</li>
                        <ul>{titles ? Array.from(titles as NodeListOf<Element>).map((title) => {
                            title.setAttribute('data-title-target', title.innerHTML.toLowerCase().replaceAll(' ', '-'))
                            return title.nodeName === 'H2'
                                ? <li
                                    className={`${styles.itemFirst}`}
                                    data-title={title.innerHTML.toLowerCase().replaceAll(' ', '-')}>{title.innerHTML}</li>
                                : <li
                                    className={styles.itemSecond}
                                    data-title={title.innerHTML.toLowerCase().replaceAll(' ', '-')}>{title.innerHTML}</li>
                            }
                        ): ''}
                        </ul>
                    </div>
                </div>

                <div ref={refArticleContainer} className={styles.article}>
                    <h1>
                        Frontend developer at papernest
                    </h1>
                    <TagLabels tags={['Typescript', 'LITElement', 'Django', 'PHP', 'Wordpress', 'SEO', 'Performance']}></TagLabels>
                    <p className={styles.intro}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </p>
                    <h2>Homogeineise a messy</h2>
                    <p>
                        As most of startups, papernest needed during its first years a rapid growth, which means a lot of development during a short period of time with limited resourses. That typicaly translates into product that is functional, but lacks the refinement of.
                    </p>
                    <h3>Reduce duplications</h3>
                    <p>
                        On the front side, there were many features duplicated for each project with just a few variations. That led to a tedious process each time a new feature was developed or had to be modified, easily leading to bugs and with not enough time for testing.
                    </p>
                    <p>
                        I was in charge of developing most of the frontend refactors. Some of the most important features were stored in a common repository and imported to every project, improving this way the scalability and testability of the features.
                    </p>
                    <h3>A reusable library of web components</h3>
                    <p>
                        When having a wide range of platforms, web components are a great idea to share features through any project. Many features linked to monolothic projects were refactored to web components, multipliying their potential to be used anywhere. These components were stored in a new repository for which I was the lead developer, and was exported to an npm Github package and a cdn. They could even be used on no-code pages !
                    </p>
                    <Callout
                        text={"Despite having some drawbacks, depending on the project I am convinced that choosing web components can be a better option than frameworks like React. Its portability, lightness, flexibility and stability on the future cannot be matched."}
                    ></Callout>
                    <h3>A common design system</h3>
                    <p>
                        Having the same themes under different stacks and projects, without sharing the same css, led to painful development processes. I was in charge of developing a new design system and refactoring the legacy code and properly documenting it. This long task resulted in a much smoother experience when developing new tasks.
                    </p>
                    <Callout
                        text={"This task resulted in having to modify many thousands of lines of css. The fact of enjoying it ! "}
                    ></Callout>
                    <h3>Deploying a Storybook</h3>
                    <p>
                        Deploying a <a href="https://storybook.js.org/" target="_blank">Storybook</a> to document all the new components and design system was the natural next step. Unlike tooks like <a href="https://www.figma.com/" target="_blank">Figma</a> or <a href="https://www.notion.so/" target="_blank">Notion</a>, Storybook is based on the project code, so it is possible to interact with it and it will update at the same time of the code. It is also a great tool for testing.
                    </p>
                    <p>
                        This documentation was specially visual with the design system, where any inconsistency could be quickly spotted. In addition, tokens could be copied from the doc, so development process could be sped up.
                    </p>
                    <ImageArticle
                        imgName={"storybook.png"}
                        text={"Colors documented on the Storybook."}
                    ></ImageArticle>
                    <ImageArticle
                        imgName={"storybook-2.png"}
                        text={"Typography on the Storybook."}
                    ></ImageArticle>
                    <p>
                        A great feature of Storybook is the hability to connect its interface with the component properties through controls. These allow changing any component properties through its interface, seeing the result in real time. As web components are native, the generated code could be copied and used anywhere afterwards.
                    </p>
                    <ImageArticle
                        imgName={"storybook-3.png"}
                        text={"A component with properties documented and enabled to be interacted with."}
                    ></ImageArticle>
                    <h2>Development of new features</h2>
                    <p>
                        During my period on papernest I had also had the pleasure to develop multiple new features.
                    </p>
                    <h3>Energy offers comparator</h3>
                        <p>
                            This feature allows the display of energy offers based on a form that requires user information like appartment surface, heating type and location and consumtion. This was a challenging task due to the multiple private and public apis to consume and the non static wording the data had to be combined with. The user management was also challenging, as this feature could be added on any site and was not integrated in a specific app. I see though that the feature is not working right now due to a wrong response from an internal api!
                        </p>
                        <ImageArticle
                            imgName={"feature-1.png"}
                            text={"A component with properties documented and enabled to be interacted with."}
                        ></ImageArticle>
                    <h3>Filtered list</h3>
                        <p>
                            <a href="https://www.fournisseur-energie.com/comparateur/estimation/" target="_blank">This feature</a> allows the display of energy offers based on a form that requires user information like appartment surface, heating type and location and consumtion. This was a challenging task due to the multiple private and public apis to consume and the non static wording the data had to be combined with. The user management was also challenging, as this feature could be added on any site and was not integrated in a specific app.
                        </p>
                        <ImageArticle
                            imgName={"feature-2.png"}
                            text={"A component with properties documented and enabled to be interacted with."}
                        ></ImageArticle>
                    <h3>Web callbacks form</h3>
                        <p>
                            An important role of SEO pages is to allow the users to request information to the company through a callback component. This was a challenging task, as it had to be deployed anywhere, be configurable and process crud operations on internal apis. This component had several subcomponents to be optionally included, such as a calendar to schedule the calls. Web components were used to build this feature.
                        </p>
                        <ImageArticle
                            imgName={"feature-3.png"}
                            text={"A component with properties documented and enabled to be interacted with."}
                        ></ImageArticle>
                    <h3>Cookies feature</h3>
                        <p>
                            Having multiple domains, developing a multiple cookies system was a challenging task as it had to be a cross-browser and cross-domain. In addition, any site could personalise the cookies workings. The cookies choises were stored in an external database, which returns the cookie if it already exists.
                        </p>
                        <ImageArticle
                            imgName={"feature-3.png"}
                            text={"A component with properties documented and enabled to be interacted with."}
                        ></ImageArticle>
                    <h2>Conclusion</h2>
                        <p>
                            Looking back, I am amazed at the amount of work and features I worked with. It was indeed a great first professional experience in the field. Being surrouded by a great team and colleagues, the environment was ideal to learn and develop my skills. I learned a lot and had a great time. Unfortunately, I had to move to Berlin for personal reasons and that was incompatible with my position. Had not been for that matter, I would gladly have kept working for this company.
                        </p>
                </div>
                <div></div>
            </div>
        </div>
    )
}

//https://www.fournisseur-energie.com/fournisseurs-electricite/

//https://www.fournisseur-energie.com/comparateur/estimation/