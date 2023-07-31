import {IPropsProjectPost, ProjectPost} from "../../components/ProjectPost/ProjectPost"
import {papernestContent} from "../../components/ProjectPost/Content/papernest"


export function PapernestProject({ props }: { props: IPropsProjectPost }) {

    return (
        <div>
            <ProjectPost props={props}></ProjectPost>
        </div>
    )
}