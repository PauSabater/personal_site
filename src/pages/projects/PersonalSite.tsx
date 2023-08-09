import {IPropsProjectPost, ProjectPost} from "../../components/ProjectPost/ProjectPost"
import {papernestContent} from "../../components/ProjectPost/Content/papernest"

export function WeatherAppProject() {

    const props: IPropsProjectPost = {
        indexTitle: "CONTENT",
        wysiwyg: papernestContent(),
        imgPath: "svg/papernest.svg",
        pathNextProject: "projects/weather-app",
        currentPath: "weather-app"
    }

    return <ProjectPost props={props}></ProjectPost>
}