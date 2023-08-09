import {IPropsProjectPost, ProjectPost} from "../../components/ProjectPost/ProjectPost"
import {papernestContent} from "../../components/ProjectPost/Content/papernest"


export function PapernestProject({ props }: { props: IPropsProjectPost }) {

    return <ProjectPost props={props}></ProjectPost>
}