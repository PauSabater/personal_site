import {IPropsProjectPost, ProjectPost} from "../../components/ProjectPost/ProjectPost"
import {weatherAppContent} from "../../components/ProjectPost/Content/weatherApp"

export function WeatherAppLive() {

    const props: IPropsProjectPost = {
        indexTitle: "CONTENT",
        wysiwyg: weatherAppContent(),
        imgPath: "mountains",
        pathNextProject: "projects/personal-site",
        currentPath: "personal-site"
    }

    return <ProjectPost props={props}></ProjectPost>
}