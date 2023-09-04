import {IPropsProjectPost, ProjectPost} from "../../components/ProjectPost/ProjectPost"
import {weatherAppContent} from "../../components/ProjectPost/Content/weatherApp"

export function WeatherAppProject({ props, mode }: { props: IPropsProjectPost, mode: string }) {

    const propss: IPropsProjectPost = {
        indexTitle: "CONTENT",
        wysiwyg: weatherAppContent(),
        imgPath: "mountains",
        pathNextProject: "projects/personal-site",
        currentPath: "personal-site",
        nextProjects: {
            title: "More projects",
            projects: [{
                title: "/ personal site",
                description: "",
                path: "/projects/personal-site",
                img: "personal-site.svg"
            },{
                title: "/ work at papernest",
                description: "",
                path: "/projects/papernest",
                img: "papernest.svg"
        }]}
    }

    return <ProjectPost props={propss} mode={mode}></ProjectPost>
}

// export function WeatherAppProject(props: IPropsProjectPost) {
//     return <ProjectPost props={props}></ProjectPost>
// }