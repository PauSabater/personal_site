import { papernestContent } from "../../components/ProjectPost/Content/papernest"
import {IPropsProjectPost, ProjectPost} from "../../components/ProjectPost/ProjectPost"


export default function PapernestProject({ mode }: { mode: string }) {

    const propsPpn: IPropsProjectPost = {
        indexTitle: "CONTENT",
        wysiwyg: papernestContent(),
        imgPath: "papernest.svg",
        pathNextProject: "weather-app",
        currentPath: "papernest",
        nextProjects: {
            title: "More projects",
            projects: [{
                title: "/ personal site",
                description: "",
                path: "/projects/personal-site",
                img: "personal-site.svg"
            },{
                title: "/ weather forecast app",
                description: "",
                path: "/projects/weather-app",
                img: "mountains"
        }]}
    }

    return <ProjectPost props={propsPpn} mode={mode}></ProjectPost>
}