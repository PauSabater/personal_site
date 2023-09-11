import { Fragment } from "react"
import styles from "../ProjectPost.module.scss"
import { TagLabels } from "../Components/TagLabels/TagLabels"
import { ImageArticle } from "../Components/ImageArticle/ImageArticle"
import { Cta } from '../../UI/Cta/Cta'
import { calendar } from "../../../assets/svg/ts/calendar"
import parse from "html-react-parser"
import { LinkInline } from "../Components/LinkInline/LinkInline"
import { getArrowLinkTemplate } from "../ProjectPost"
import { setPageFadeOutAnimation } from "../../App/App.animations"

export const weatherAppContent = (): JSX.Element => { return (
    <Fragment>
        <div className={styles.introArticle} id="intro-article">
            <div className={`${styles.introContainer} intro-container`}>
                <h1>
                    Npm package for a weather app
                </h1>
                <TagLabels tags={['personal side project']} color={"secondary"}></TagLabels>
                <TagLabels tags={['TypeScript', 'React', 'Styled Components', 'Chart.js', 'NPM', 'Rollup']} color={"primary"}></TagLabels>
                <div className={styles.projectDateContainer}>
                    {parse(calendar("var(--c-grey)"))}<p>July 2023</p>
                </div>
                <p className={styles.intro}>
                    I did this project to start learning React. Yes I know, another weather app? I really did not want to spend much time thinking of projects, and a weather app is a great project due to its different data requests and interactions between components! In addition, I always had a thing for weather. Despite that there are many tutorials out there about a project like this, I did not follow any and did all from scratch, using the React documentation instead.
                </p>
                <div className={styles.ctaContainer}>
                    <Cta props={{
                        text: "Visit the repository",
                        href: "https://github.com/PauSabater/weather_app",
                        color: "black",
                        isBold: false
                    }}></Cta>
                    <div onClick={() => setPageFadeOutAnimation()}>
                        <Cta props={{
                            text: "Checkout the live result",
                            href: "live-result",
                            color: "black",
                            target: "_self",
                            isBold: false
                        }}></Cta>
                    </div>
                </div>
            </div>
        </div>
        <div className={styles.articleContent}>
            {getArrowLinkTemplate("/projects/personal-site")}
            <div className={styles.sectionMain}>
                <p className={styles.preTitle}>/ Testing the waters </p>
                <h2 className={styles.sectionTitle}>Leveraging the reusability of react components</h2>
                <p className={styles.mainParagraph}>
                    React components are a great tool to break down complex system into reusable pieces. Altough they will be limited to React ecosystem, their quick development and easy way they can be integrated bring many benefits.
                </p>
            </div>
            <div className={styles.sectionRight}>
                <h2 className={styles.sectionTitle}>A fully js component</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        Reusability is easier when there are less mix of stacks. This is why this component is made only with js. For styling, CSS-in-JS through <LinkInline text={"Styled Components"} href={"https://styled-components.com/"}/> has been used, preventing any styling conflicts between the components. Typescript has been added as well in order to add a safety layer when developing.
                    </p>
                    <p className={styles.paragraphRight}>
                        A fully js component will work better when installed in node modules, so imports to the project will require less complexity.
                    </p>
                </div>
                <ImageArticle
                    imgName={"weather_app_stack.svg"}
                    text={"used stack"}
                ></ImageArticle>
            </div>
            <div className={styles.sectionLeft}>
                <h2 className={styles.sectionTitle}>Components diagram</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        The component has been divided into several subcomponents. Two api calls are made in order to receive the information, one to <LinkInline text={"geodb"} href={"https://rapidapi.com/wirefreethought/api/geodb-cities"}/> to get a list of cities matching the introduced string on the input, and one to <LinkInline text={"openweathermap"} href={"https://openweathermap.org/api"}/> to receive the weather forecast data.
                    </p>
                    <p className={styles.paragraphRight}>
                        In order to share between the different components the data fetched from the forecast api, a <LinkInline text={"hooks pattern"} href={"https://www.patterns.dev/posts/render-props-pattern"}/> has been used in order to save the state of the components. <LinkInline text={"Sharing State Between Components"} href={"https://react.dev/learn/sharing-state-between-components"}/>  has been needed in order to react to the user interactions.
                    </p>
                </div>
                <ImageArticle
                    imgName={"weather_app_diagram.svg"}
                    text={"app diagram"}
                ></ImageArticle>
            </div>
            <div className={styles.sectionRight}>
                <h2 className={styles.sectionTitle}>A simple interface</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        I wanted an interface where the user can find <span>all the information at first sight</span>, without need to scroll or opening elements. It is a bit inspired by Google's weather widget. However, since it takes more space, there is more information showing at the same time.
                    </p>
                </div>
                <ImageArticle
                    imgName={"weather_app_wireframe.svg"}
                    text={"app wireframe"}
                ></ImageArticle>
            </div>
            <div className={styles.sectionMain}>
                <h2 className={styles.sectionTitle}>Conclusion</h2>
                <p className={styles.mainParagraph}>
                    React components are a great tool to break down complex system into reusable pieces. Main downside is that they will be limited to React ecosystem, however their quick development and the easy way in which they can be integrated bring many benefits.
                </p>
            </div>
        </div>
    </Fragment>
    )
}