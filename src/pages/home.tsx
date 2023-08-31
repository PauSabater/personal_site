import { Suspense, useLayoutEffect } from "react";
import { TextBanner } from "../components/TextBanner/TextBanner";
import { TopBanner } from "../components/TopBanner/TopBanner";
import { WorkBanner } from "../components/WorkBanner/WorkBanner";
import { SkillsBanner } from "../components/SkillsBanner/SkillsBanner";
import { MethodSection } from "../components/MethodSection/MethodSection";
import { FootBanner } from "../components/FootBanner/FootBanner";
import styles from "./pages.module.scss"


export function Home({mode, props}: {mode: string, props: any}) {

    useLayoutEffect(()=> {
        window.scrollTo(0,0)
        document.getElementById("page-content")?.classList.add("page-loaded")
    }, [])

    return (
        <div id="page-home">
            <TopBanner props={props.topBanner} mode={mode}/>
            <TextBanner texts={props.intro} mode={mode}/>
            <WorkBanner props={props.workBanner} mode={mode}/>
            <Suspense>
            <div className={styles.containerSecondHalf}>
                <SkillsBanner texts={props.skillsBanner} mode={mode}/>
                <MethodSection props={props.methodSectionTexts} mode={mode}/>
                <FootBanner />
            </div>
            </Suspense>
        </div>
    )
}