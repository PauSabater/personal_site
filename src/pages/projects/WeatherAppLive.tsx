import {IPropsProjectPost, ProjectPost} from "../../components/ProjectPost/ProjectPost"
import {weatherAppContent} from "../../components/ProjectPost/Content/weatherApp"

export function WeatherAppLive() {

    const props: IPropsProjectPost = {
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
                title: "/ weather forecast app",
                description: "",
                path: "/projects/weather-app",
                img: "mountains"
        }]}
    }

    return <ProjectPost props={props}></ProjectPost>
}