import { Fragment, Suspense } from "react";
import { texts } from "../assets/ts/texts/texts"
import { TextBanner } from "../components/TextBanner/TextBanner";
import { TopBanner } from "../components/TopBanner/TopBanner";
import { WorkBanner } from "../components/WorkBanner/WorkBanner";
import { Header } from "../components/Header/Header"
import { SkillsBanner } from "../components/SkillsBanner/SkillsBanner";
import { MethodSection } from "../components/MethodSection/MethodSection";
import { FootBanner } from "../components/FootBanner/FootBanner";
import styles from "./pages.module.scss"
import { GridBg } from "../components/Grid/Grid";


export function Home() {

    return (
        <div id="page-home">
            <TopBanner props={texts.topBanner}/>
            {/* <GridBg> */}
                <TextBanner texts={texts.intro}/>
                <WorkBanner props={texts.workBanner}/>
            {/* </GridBg> */}
            <Suspense>
            <div className={styles.containerSecondHalf}>
                <SkillsBanner texts={texts.skillsBanner}/>
                <MethodSection props={texts.methodSectionTexts}/>
                <FootBanner />
            </div>
            </Suspense>
        </div>
    )
}