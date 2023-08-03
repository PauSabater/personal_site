import { Fragment } from "react";
import { texts } from "../assets/ts/texts/texts"
import { TextBanner } from "../components/TextBanner/TextBanner";
import { TopBanner } from "../components/TopBanner/TopBanner";
import { WorkBanner } from "../components/WorkBanner/WorkBanner";
import { Header } from "../components/Header/Header"
import { SkillsBanner } from "../components/SkillsBanner/SkillsBanner";
import { MethodSection } from "../components/MethodSection/MethodSection";
import { FootBanner } from "../components/FootBanner/FootBanner";
import styles from "./pages.module.scss"


export function Home() {

    return (
        <div>
            <TopBanner props={texts.topBanner}/>
            <TextBanner texts={texts.intro}/>
            <WorkBanner props={texts.workBanner}/>
            <div className={styles.containerSecondHalf}>
                <SkillsBanner texts={texts.skillsBanner}/>
                <MethodSection props={texts.methodSectionTexts}/>
                <FootBanner />
            </div>
        </div>
    )
}