import {IPropsProjectPost, ProjectPost} from "../../components/ProjectPost/ProjectPost"
import {weatherAppContent} from "../../components/ProjectPost/Content/weatherApp"

export function WeatherAppProject() {

    const props: IPropsProjectPost = {
        indexTitle: "CONTENT",
        wysiwyg: weatherAppContent(),
        imgPath: "mountains",
        pathNextProject: "projects/personal-site",
        currentPath: "personal-site"
    }

    return (
        <div>
            <ProjectPost props={props}></ProjectPost>
        </div>
    )
}