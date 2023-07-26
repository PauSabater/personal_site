import { Fragment } from "react";
import { texts } from "../assets/ts/texts/texts"
import { TextBanner } from "../components/TextBanner/TextBanner";
import { TopBanner } from "../components/TopBanner/TopBanner";
import { WorkBanner } from "../components/WorkBanner/WorkBanner";
import { Header } from "../components/Header/Header"
import { SkillsBanner } from "../components/SkillsBanner/SkillsBanner";
import { MethodSection } from "../components/MethodSection/MethodSection";

export function Home() {

    return (
        <div>
            <TopBanner title={texts.topBanner.title} lines={texts.topBanner.lines}/>
            <TextBanner texts={texts.intro}/>
            <WorkBanner props={texts.workBanner}/>
            <SkillsBanner texts={texts.skillsBanner}/>
            <MethodSection props={texts.methodSectionTexts}/>
        </div>
    )
}