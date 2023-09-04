import {IPropsProjectPost, ProjectPost} from "../../components/ProjectPost/ProjectPost"
import { personalSiteContent } from "../../components/ProjectPost/Content/personalSite"

export function PersonalSiteProject({ props, mode }: { props: IPropsProjectPost, mode: string }) {

    const propss: IPropsProjectPost = {
        indexTitle: "CONTENT",
        wysiwyg: personalSiteContent(),
        imgPath: "personal-site.svg",
        pathNextProject: "projects/weather-app",
        currentPath: "weather-app",
        nextProjects: {
            title: "More projects",
            projects: [{
                title: "/ papernest",
                description: "",
                path: "/projects/papernest",
                img: "papernest.svg"
            },{
                title: "/ weather forecast app",
                description: "",
                path: "/projects/weather-app",
                img: "mountains"
        }]}
    }

    return <ProjectPost props={propss} mode={mode}></ProjectPost>
}

// export function PersonalSiteProject(props: IPropsProjectPost) {
//     return <ProjectPost props={props}></ProjectPost>
// }

