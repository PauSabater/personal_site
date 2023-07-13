import { useState } from "react"
import * as Styled from './BannerSelectedWeather.styles'
import { getWeatherIcon } from "../../assets/utils/svg"
import React from "react"
import { formatedDayTime, getSpecificForecast } from "../../assets/utils/utils"
import { IApiForecastResponse } from "../../assets/interfaces/interfaces"


export function BannerSelectedWeather({apiData, city, displayedDayTime, displayedDayName}: {
        apiData: IApiForecastResponse[], 
        city: string,
        displayedDayTime: string,
        displayedDayName: string
    }){

    //https://iconscout.com/lotties/weather

    // The forecast for the selected day and hour
    const [selectedForecast, setSelectedForecast] = useState<IApiForecastResponse | null>(null)

    // The hour displayed
    const [displayedHour, setDisplayedHour] = useState<string>("now")

    // Updates selected forecast state when the date and hour to dispay change
    React.useEffect(() => {
        if (apiData.length > 0) {
            const hour: string = displayedDayTime.includes('midnight') 
                ? '00:00h' 
                : `${displayedDayTime.split(' ')[1].split(":")[0]}:00h`

            const dayTime: string = formatedDayTime(displayedDayTime)
            setSelectedForecast(getSpecificForecast(dayTime, apiData))
            setDisplayedHour(hour)
        }
    }, [displayedDayTime])

    // Restarts hour to "now" on data update
    React.useEffect(() => {
        if (apiData.length > 0) {
            setDisplayedHour("now")
        }
    }, [apiData])




    if (selectedForecast !== null) {
        return (
            <Styled.Container>
                <Styled.CurrentWeatherIcon>
                    {getWeatherIcon(selectedForecast.weather[0].icon)}
                </Styled.CurrentWeatherIcon>
                <Styled.CurrentCity>
                    {city}
                </Styled.CurrentCity>
                <Styled.Hour>
                    {`${displayedDayName} - ${displayedHour}`}
                </Styled.Hour>
                <Styled.CurrentTemperature>
                    {`${Math.round(selectedForecast.main.temp_max)}°`}
                </Styled.CurrentTemperature>
            </Styled.Container>
            ) 

    } else return null
}