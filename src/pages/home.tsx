import { Fragment } from "react";
import { texts } from "../assets/ts/texts/texts"
import { TextBanner } from "../components/TextBanner/TextBanner";
import { TopBanner } from "../components/TopBanner/TopBanner";
import { WorkBanner } from "../components/WorkBanner/WorkBanner";
import { Header } from "../components/Header/Header"

export function Home() {

    return (
        <div>
            <TopBanner title={ texts.topBanner.title } lines={ texts.topBanner.lines }></TopBanner>
            <TextBanner texts={ texts.intro }></TextBanner>
            <WorkBanner props={ texts.workBanner }></WorkBanner>
        </div>
    )
}