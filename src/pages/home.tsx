import { Suspense, useLayoutEffect } from "react";
import { TextBanner } from "../components/TextBanner/TextBanner";
import { TopBanner } from "../components/TopBanner/TopBanner";
import { WorkBanner } from "../components/WorkBanner/WorkBanner";
import { SkillsBanner } from "../components/SkillsBanner/SkillsBanner";
import { MethodSection } from "../components/MethodSection/MethodSection";
import { FootBanner } from "../components/FootBanner/FootBanner";
import styles from "./pages.module.scss"
import {texts} from "../assets/ts/texts/texts"


export function Home({mode}: {mode: string}) {

    const textsPage = texts.home

    useLayoutEffect(()=> {
        window.scrollTo(0,0)
        document.getElementById("page-content")?.classList.add("page-loaded")
    }, [])

    return (
        <div id="page-home">
            <TopBanner props={textsPage.topBanner} mode={mode}/>
            <TextBanner texts={textsPage.intro} mode={mode}/>
            <WorkBanner props={textsPage.workBanner} mode={mode}/>
            <Suspense>
            <div className={styles.containerSecondHalf} id={"homepage-second-half"}>
                <SkillsBanner texts={textsPage.skillsBanner} mode={mode}/>
                <MethodSection props={textsPage.methodSectionTexts} mode={mode}/>
                <FootBanner />
            </div>
            </Suspense>
        </div>
    )
}