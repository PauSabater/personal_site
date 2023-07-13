import React from 'react';
import { texts } from "../../assets/ts/texts/texts"
import './App.css'
import '../../assets/scss/variables.scss'
import '../../assets/scss/classes.scss'
import '../../assets/scss/fonts.scss'

//import
import { TextBanner } from '../TextBanner/TextBanner'
import { TopBanner } from '../TopBanner/TopBanner'
import { Header } from '../Header/Header'
import { WorkBanner } from '../WorkBanner/WorkBanner'
import { Project } from '../../pages/project'

import { Routes, Route } from 'react-router-dom'
import { Home } from '../../pages/home'

const routes = [
    {path: '/project', name: 'Project', Component: Project},
    {path: '/', name: 'Home', Component: Home}
]


function App() {

    return (
        <div className="main">
            <Header links={ texts.header.links }></Header>
            <Routes>
                {routes.map((route) =>
                    <Route
                        path={route.path}
                        element={<route.Component/>}
                    >
                    </Route>
                )}
            </Routes>
        </div>
    )
}

export default App
