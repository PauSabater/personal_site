import React from "react"
import { NavLink } from "react-router-dom"
import { ProjectPost } from "../components/ProjectPost/ProjectPost"
import img from "../assets/svg/full-mountains.svg"

export function Project() {

    return (
        <div>
            <ProjectPost imgPath={img}></ProjectPost>
        </div>
    )
}