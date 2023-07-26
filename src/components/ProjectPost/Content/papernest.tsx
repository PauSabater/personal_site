import { Fragment } from "react"
import styles from "../ProjectPost.module.scss"
import { TagLabels } from "../Components/TagLabels/TagLabels"
import { Callout } from "../Components/Callout/Callout"
import { ImageArticle } from "../Components/ImageArticle/ImageArticle"


export const papernestContent = (): JSX.Element => { return (
    <Fragment>
        <div className={`${styles.article} article-container`}>
            <h1>
                Frontend developer at papernest
            </h1>
            <TagLabels tags={['TypeScript', 'LITElement', 'Django', 'PHP', 'Wordpress', 'SEO', 'Performance']}></TagLabels>
            <p className={styles.intro}>
                <a href="https://papernest.com/" target="_blank">papernest</a> is a french startup with a worforce of around 1000 employees, which automates the moving process of telecom contracts, energy contracts or even its home insurance through partnerships with its suppliers. I had the pleasure to work for them as a frontend developer. Having the tech department strongly integrated good coding practises, this period was very benefitial for me to grow professionally.
            </p>
            <h2>Refactoring a range of projects</h2>
            <p>
                As most of startups, papernest needed during its first years a <span>rapid growth</span>, which means a lot of development during a short period of time with limited resourses. I entered the company in a period of consolidation, which meant more resources for <span>optimising and improving</span> the existing product.
            </p>
            <h3>Reduce duplications</h3>
            <p>
                On the front side, there were many duplicated features for each project with just a few variations. That led to a tedious process each time a new feature was developed or had to be modified, easily leading to bugs and with not enough time for testing.
            </p>
            <p>
                I was in charge of developing most of the <span>frontend refactors</span>. Some of the most important features were stored in a common repository and imported to every project, improving this way the <span>scalability and testability</span> of the features.
            </p>
            <h3>A reusable library of web components</h3>
            <p>
                When having a wide range of platforms, web components are a great idea to share features through any project. Many features linked to monolothic projects were <span>refactored to web components</span> through the framework <a href="https://lit.dev/" target="_blank">LITElement</a>, multipliying their potential to be used anywhere. These components were stored in a new repository for which I was the lead developer, and was exported to an <span>npm Github package</span> and a cdn. They could even be used on no-code pages !
            </p>
            <Callout
                text={"Despite having some drawbacks, I am convinced that, depending on the project, web components portability, lightness, flexibility and future-proof stability cannot be matched."}
            ></Callout>
            <h3>A common design system</h3>
            <p>
                Having the same themes under different stacks and projects, without sharing the same css, led to painful development processes. I was in charge of developing a <span>first design system</span> and refactoring the legacy code and properly documenting it. This long task resulted in a <span>much smoother experience</span> when developing new tasks.
            </p>
            <Callout
                text={"This task resulted in having to modify many thousands of lines of css. The fact of enjoying it ! "}
            ></Callout>
            <h3>Deploying a Storybook</h3>
            <p>
                Deploying a <a href="https://storybook.js.org/" target="_blank">Storybook</a> to document all the new components and design system was the natural next step. Unlike tooks like <a href="https://www.figma.com/" target="_blank">Figma</a> or <a href="https://www.notion.so/" target="_blank">Notion</a>, Storybook is based on the project code, so it is possible to interact with it and it will update at the same time of the code. It is also a great tool for testing.
            </p>
            <p>
                This documentation was specially visual with the design system, where <span>any inconsistency could be quickly spotted</span>. In addition, tokens could be copied from the doc, so development process could be sped up.
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
                A great feature of Storybook is the hability to connect its interface with the component properties through controls. These allow changing any component properties through its interface, seeing the result in real time. As web components are native, the generated html code could be copied and <span>used anywhere</span> afterwards.
            </p>
            <ImageArticle
                imgName={"storybook-3.png"}
                text={"A component with properties documented and enabled to be interacted with."}
            ></ImageArticle>
            <h2>Development of new features</h2>
            <p>
                During my period on papernest I had also had the pleasure to develop multiple new features. Some of them are explained here, although I also worked on many other smalled tasks.
            </p>
            <h3>Energy offers comparator</h3>
                <p>
                    This feature allows the display of <span>energy offers based on a form</span> that requires user information like appartment surface, heating type and location and consumtion. This was a challenging task due to the <span>multiple private and public apis</span> to consume and the non static wording the data had to be combined with. The <span>user management</span> was also challenging, as this feature could be added on any site and was not integrated in a specific app.
                </p>
                <p>
                    The feature is currently not working due to an error from an api response, however, not linked to my work !
                </p>
                <ImageArticle
                    imgName={"feature-1.png"}
                    text={"A component with properties documented and enabled to be interacted with."}
                ></ImageArticle>
            <h3>Filtered list</h3>
                <p>
                    <a href="https://www.fournisseur-energie.com/comparateur/estimation/" target="_blank">This feature</a> allows the display of energy offers based on a form that requires user information like appartment surface, heating type and location and consumtion. This was a challenging task due to the <span>multiple private and public apis</span> to consume and the non static wording the data had to be combined with. The user management was also challenging, as this feature could be added on any site and was not integrated in a specific app.
                </p>
                <ImageArticle
                    imgName={"feature-2.png"}
                    text={"A component with properties documented and enabled to be interacted with."}
                ></ImageArticle>
            <h3>Web callbacks form</h3>
                <p>
                    An important role of SEO pages is to allow the users to request information to the company through a <span>callback component</span>. This was a challenging task, as it had to be deployed anywhere, be configurable and process CRUD operations on internal apis. <span>Security</span> was also important, for which google recaptcha was integrated. This component had several subcomponents to be optionally included, such as a calendar to schedule the calls. Web components were used to build this feature.
                </p>
                <ImageArticle
                    imgName={"feature-3.png"}
                    text={"A component with properties documented and enabled to be interacted with."}
                ></ImageArticle>
            <h3>Cookies feature</h3>
                <p>
                    Having multiple domains, developing a multiple cookies system was a challenging task as it had to be <span>cross-browser</span> and <span>cross-domain</span>. In addition, any site could personalise the cookies workings. The cookies choises were stored in an external database through a Flask API, which returns the cookie if it already exists.
                </p>
                <ImageArticle
                    imgName={"feature-3.png"}
                    text={"A component with properties documented and enabled to be interacted with."}
                ></ImageArticle>
            <h2>Conclusion</h2>
                <p>
                    Looking back, I am amazed at the amount of work and features I worked with. It was indeed a <span>great first professional experience</span> in the field. Being surrouded by a great team and colleagues, the environment was ideal to <span>learn and grow</span> my skills. I learned a lot and had a great time. However, life moves on and I had to move to Berlin for personal reasons, which was incompatible with my position. Had not been for that matter, I would gladly have kept working at papernest !
                </p>
        </div>
    </Fragment>
    )
}