import { Fragment } from "react"
import styles from "../ProjectPost.module.scss"
import { TagLabels } from "../Components/TagLabels/TagLabels"
import { ImageArticle } from "../Components/ImageArticle/ImageArticle"
import { LinkInline } from "../Components/LinkInline/LinkInline"
import { getArrowLinkTemplate } from "../ProjectPost"
import { ReactComponent as Calendar } from '../../../assets/svg/icons/calendar.svg'


export const papernestContent = (): JSX.Element => { return (
    <Fragment>
        <div className={styles.introArticle} id="intro-article">
            <div className={`${styles.introContainer} intro-container`}>
                <h1>
                    Frontend developer at papernest
                </h1>
                <TagLabels tags={['professional experience']} color={"secondary"}></TagLabels>
                <TagLabels tags={['TypeScript', 'LITElement', 'Performance', 'Webpack', 'Django', 'PHP', 'Wordpress', 'SEO']} color={"primary"}></TagLabels>
                <div className={styles.projectDateContainer}>
                    <Calendar></Calendar>
                    <p>March 2021 - April 2023</p>
                </div>
                <p className={styles.intro}>
                    <LinkInline text={"papernest"} href={"https://papernest.com/"}/> is a french <span>tech startup</span> with a worforce of around 1000 employees, which automates the moving process of telecom contracts, energy contracts or even its home insurance through partnerships with its suppliers. I had the pleasure to work for them as a <span>frontend developer</span>. Having the tech department strongly integrated <span>good coding practises</span>, this period was very benefitial for me to grow professionally.
                </p>
            </div>
        </div>
        <div className={styles.articleContent}>
            {getArrowLinkTemplate("/projects/weather-app")}
            <div className={styles.sectionMain}>
                <p className={styles.preTitle}>/ A long epic </p>
                <h2 className={styles.sectionTitle}>Refactoring and optimising a range of projects</h2>
                <p className={styles.mainParagraph}>
                    As most of startups, papernest needed during its first years a <span>rapid growth</span>, which means a lot of development during a short period of time with limited resourses. I entered the company in a period of consolidation, which meant more resources for <span>optimising and improving</span> the existing product.
                </p>
                <div>
                    <p className={styles.paragraphRight}>
                        On the front side, there were many duplicated features for each project with just a few variations. That led to a tedious process each time a new feature was developed or had to be modified, easily leading to bugs and with not enough time for testing.
                    </p>
                    <p className={styles.paragraphRight}>
                        I was in charge of developing most of the <span>frontend refactors</span>. Some of the most important features were stored in a common repository and imported to every project, improving this way the <span>scalability and testability</span> of the features.
                    </p>
                </div>
            </div>
            <div className={styles.sectionRight}>
                <h2 className={styles.sectionTitle}>A library of reusable web components</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        When having a wide range of platforms, web components are a great idea to share features through any project. Many features linked to monolothic projects were <span>refactored to web components</span> through the framework <LinkInline text={"LITElement"} href={"https://lit.dev/"}/>, multipliying their potential to be used anywhere. These components were stored in a new repository for which I was the lead developer, and was exported to an <span>npm Github package</span> and a cdn. They could even be used on no-code pages !
                    </p>
                </div>
                <ImageArticle
                    imgName={"components_diagram.svg"}
                    text={"components diagram"}
                    column={1}
                    maxHeight={400}
                    hasMargin={true}
                ></ImageArticle>
            </div>
            <div className={styles.sectionLeft}>
                <h2 className={styles.sectionTitle}>A first common design system</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        Having the same themes under different stacks and projects, without sharing the same css and guidelines, led to painful development processes. I was in charge of developing a <span>first design system</span> and refactoring the legacy code and properly documenting it. This long task resulted in a <span>much smoother experience</span> when developing new tasks.
                    </p>
                </div>
                <ImageArticle
                    imgName={"design_system_diagram.svg"}
                    text={"design system diagram"}
                    column={1}
                    maxHeight={400}
                    hasMargin={true}
                ></ImageArticle>
            </div>
            <div className={styles.sectionRight}>
                <h2 className={styles.sectionTitle}>Deploying a Storybook</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        Deploying a <LinkInline text={"Storybook"} href={"https://storybook.js.org/"}/> to document all the new components and design system was the natural next step. Unlike tooks like <LinkInline text={"Figma"} href={"https://www.figma.com/"}/> or <LinkInline text={"Notion"} href={"https://www.notion.so/"}/>, Storybook is based on the project code, so it is possible to interact with the component's properties and generate the corresponding code. This fact makes possible to integrate a code playground for devs to test the component behaviour, as well as integrating automated tests.
                    </p>
                </div>
                <ImageArticle
                    imgName={"storybook.png"}
                    applyFilter={false}
                    text={"Image of design system colors on the company Storybook"}
                ></ImageArticle>
            </div>
            <div className={styles.sectionMain}>
                <p className={styles.preTitle}>/ Smaller tasks </p>
                <h2 className={styles.sectionTitle}>Development of new features</h2>
                <p className={styles.mainParagraph}>
                    During my period on papernest I had also had the pleasure to develop multiple new features. Some of them are explained here, although I also worked on many other smalled tasks.
                </p>
            </div>
            <div className={styles.sectionRight}>
                <h2 className={styles.sectionTitle}>Energy offers comparator</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        This feature allows the display of <span>energy offers based on a form</span> that requires user information like appartment surface, heating type and location and consumtion. This was a challenging task due to the <span>multiple private and public apis</span> to consume and the non static wording the data had to be combined with. The <span>user management</span> was also challenging, as this feature could be added on any site and was not integrated in a specific app.
                    </p>
                    <p className={styles.paragraphRight}>
                        The feature is currently not working due to an error from an api response, however, not linked to my work !
                    </p>
                </div>
                <ImageArticle
                    imgName={"feature_comparator.png"}
                    column={1}
                    applyFilter={false}
                    text={"Form for the comparator feature"}
                ></ImageArticle>
            </div>
            <div className={styles.sectionLeft}>
                <h2 className={styles.sectionTitle}>Filtered List</h2>
                <div>
                    <p className={styles.paragraphRight}>
                         <LinkInline text={"This component "} href={"https://www.fournisseur-energie.com/fournisseurs-electricite/"}/> allows the creation of lists of cards that can be filtered through different lists of inputs. Everything is customisable and a Wordpress custom backoffice interface was developed to allow redactors to create their own lists, use key variables linked to a database and even prefilter it through url params.
                    </p>
                </div>
                <ImageArticle
                    imgName={"feature_filtered_list.png"}
                    column={1}
                    applyFilter={false}
                    text={"Filtered list feature"}
                ></ImageArticle>
            </div>
            <div className={styles.sectionRight}>
                <h2 className={styles.sectionTitle}>Web callback form</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        An important role of SEO pages is to allow the users to request information to the company through a <span>callback component</span>. This was a challenging task, as it had to be deployed anywhere, be configurable and process CRUD operations on internal apis. <span>Security</span> was also important, for which google recaptcha was integrated. This component had several subcomponents to be optionally included, such as a calendar to schedule the calls. Web components were used to build this feature.
                    </p>
                </div>
                <ImageArticle
                    imgName={"feature_callback.png"}
                    column={1}
                    applyFilter={false}
                    text={"Web callback feature"}
                ></ImageArticle>
            </div>
            <div className={styles.sectionLeft}>
                <h2 className={styles.sectionTitle}>Company brand page</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        The company's <LinkInline text={"brand page"} href={"https://www.papernest.com/"}/> was redesigned and remade from scratch in order to be fully customisable. A Wordpress custom interface was developed in order to allow the redactors to create their own pages and be able to use a list of customisable components that could be arranged on any order.
                    </p>
                </div>
                <ImageArticle
                    imgName={"feature_papernest-brand.png"}
                    column={1}
                    applyFilter={false}
                    text={"Papernest brand page"}
                ></ImageArticle>
            </div>
            <div className={styles.sectionRight}>
                <h2 className={styles.sectionTitle}>Cookies feature</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        Having multiple domains, developing a multiple cookies system was a challenging task as it had to be <span>cross-browser</span> and <span>cross-domain</span>. In addition, any site could personalise the cookies workings. The cookies choises were stored in an external database through a Flask API, which returns the cookie if it already exists.
                    </p>
                </div>
                <ImageArticle
                    imgName={"feature_cookies.png"}
                    column={1}
                    applyFilter={false}
                    text={"Cookies feature"}
                ></ImageArticle>
            </div>
            <div className={styles.sectionMain}>
                <h2 className={styles.sectionTitle}>Conclusion</h2>
                <p className={styles.mainParagraph}>
                    Looking back, I am amazed at the amount of work and features I worked with. It was indeed a <span>great first professional experience</span> in the field. Being surrouded by a great team and colleagues, the environment was ideal to <span>learn and grow</span> my skills. I learned a lot and had a great time!
                </p>
            </div>
        </div>
    </Fragment>
    )
}