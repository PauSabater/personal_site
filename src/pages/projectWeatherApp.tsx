import {IPropsProjectPost, ProjectPost} from "../components/ProjectPost/ProjectPost"
import {papernestContent} from "../components/ProjectPost/Content/papernest"

export function Project() {

    const props: IPropsProjectPost = {
        indexTitle: "CONTENT",
        wysiwyg: papernestContent(),
        imgPath: "svg/papernest.svg"
    }

    return (
        <div>
            <ProjectPost props={props}></ProjectPost>
        </div>
    )
}