import {IPropsProjectPost, ProjectPost} from "../../components/ProjectPost/ProjectPost"
import {papernestContent} from "../../components/ProjectPost/Content/papernest"


export function PapernestProject({ props, mode }: { props: IPropsProjectPost, mode: string }) {

    return <ProjectPost props={props}></ProjectPost>
}