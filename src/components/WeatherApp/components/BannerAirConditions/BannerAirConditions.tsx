import { useState } from "react"

import * as Styled from './BannerAirConditions.styles'
import React from "react"
import { formatedDayTime, getSpecificForecast } from "../../assets/utils/utils"
import { IApiForecastResponse } from "../../assets/interfaces/interfaces"



export function BannerAirConditions({apiData, displayedDayTime}: {
        apiData: IApiForecastResponse[], 
        displayedDayTime: string
    }) {

    // The forecast for the selected day and hour
    const [selectedForecast, setSelectedForecast] = useState<IApiForecastResponse | null>(null)

    // Updates selected forecast state when the date and hour to dispay change
    React.useEffect(() => {
        const dayTime: string = formatedDayTime(displayedDayTime)
        setSelectedForecast(getSpecificForecast(dayTime, apiData))
    }, [displayedDayTime])

    // const [isInputInitialised, setIsInputInitialised] = useState<boolean>(false)

    //https://iconscout.com/lotties/weather

    if (selectedForecast !== null) {
        return (
            <Styled.Container>
                <Styled.Title>AIR CONDITIONS</Styled.Title>
                <p>Feels like: {`${Math.round(selectedForecast.main.feels_like)}°`}</p>
                <p>Humidity: {`${selectedForecast.main.humidity}%`}</p>
                <p>Wind: {`${Math.round(selectedForecast.wind.gust)}km/h`}</p>
            </Styled.Container>
        )

    } else return null
}