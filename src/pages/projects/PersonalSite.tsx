import {IPropsProjectPost, ProjectPost} from "../../components/ProjectPost/ProjectPost"
import { personalSiteContent } from "../../components/ProjectPost/Content/personalSite"

export default function PersonalSiteProject({ mode, perfMode }: { mode: string, perfMode: string }) {

    const props: IPropsProjectPost = {
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

    return <ProjectPost props={props} mode={mode} perfMode={perfMode}></ProjectPost>
}

