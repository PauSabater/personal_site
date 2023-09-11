import {IPropsProjectPost, ProjectPost} from "../../components/ProjectPost/ProjectPost"

export function PapernestProject({ props, mode }: { props: IPropsProjectPost, mode: string }) {
    return <ProjectPost props={props} mode={mode}></ProjectPost>
}