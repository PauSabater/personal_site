import { Fragment } from "react"
import styles from "../ProjectPost.module.scss"
import { TagLabels } from "../Components/TagLabels/TagLabels"
import { ImageArticle } from "../Components/ImageArticle/ImageArticle"
import { Cta } from '../../UI/Cta/Cta'
import { LinkInline } from "../Components/LinkInline/LinkInline"
import { getArrowLinkTemplate } from "../ProjectPost"
import { setPageFadeOutAnimation } from "../../App/App.animations"
import { ReactComponent as Calendar } from '../../../assets/svg/icons/calendar.svg'


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
                    <Calendar></Calendar>
                    <p>July 2023</p>
                </div>
                <p className={styles.intro}>
                    I did this project to start learning React. Yes I know, another weather app? I really did not want to spend much time thinking of projects, and a weather app is a great project due to its different data requests and interactions between components! Despite the fact that there are many tutorials out there about a project like this, I did not follow any and did it all from scratch, using the React documentation instead.
                </p>
                <div className={styles.ctaContainer}>
                    <Cta props={{
                        text: "Check out the code",
                        href: "https://github.com/PauSabater/weather_app",
                        color: "black",
                        isBold: false
                    }}></Cta>
                    <div onClick={() => setPageFadeOutAnimation()}>
                        <Cta props={{
                            text: "Check out the live result",
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
                    Having a good experience with native web components, I wanted to test how React components compared with the former, and their advantages considering they cannot be used outside a React project.
                </p>
            </div>
            <div className={styles.sectionRight}>
                <h2 className={styles.sectionTitle}>A fully js component</h2>
                <div>
                    <p className={styles.paragraphRight}>
                        Reusability is easier when there is no mix of stacks. This is why this component is made only with js. For styling, CSS-in-JS through <LinkInline text={"Styled Components"} href={"https://styled-components.com/"}/> has been used, preventing any styling conflicts between the components. Typescript has been added as well in order to add a safety layer when developing.
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
                        I wanted an interface where the user can find <span>all the information at first sight</span>, without needing to scroll or opening elements. It is a bit inspired by Google's weather widget. However, since it takes more space, there is more information showing at the same time.
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
                    React components are a great and easy tool to encapsulate functionalities into reusable pieces. Main downside is that they will be limited to the React ecosystem, however their quick and easy development and vast ecosystem make them a top valued option.
                </p>
                <div className={styles.ctaContainer}>
                    <Cta props={{
                        text: "Check out the code",
                        href: "https://github.com/PauSabater/weather_app",
                        color: "black",
                        isBold: false
                    }}></Cta>
                    <div onClick={() => setPageFadeOutAnimation()}>
                        <Cta props={{
                            text: "Check out the live result",
                            href: "live-result",
                            color: "black",
                            target: "_self",
                            isBold: false
                        }}></Cta>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
    )
}