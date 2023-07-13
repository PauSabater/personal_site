import { useState } from "react"
import * as Styled from './BannerForecastDays.styles'
import { getDayName, getHighestCountPosition, getRoundedTemp, getUniqueValuesFromArray } from "../../assets/utils/utils"
import { getWeatherIcon } from "../../assets/utils/svg"
import { IApiForecastResponse } from "../../assets/interfaces/interfaces"
import React from "react"


export function BannerForecastDays({apiData, handleClickDay}: {
        apiData: IApiForecastResponse[], 
        handleClickDay: Function
    }) {

    // const [isInputInitialised, setIsInputInitialised] = useState<boolean>(false)

    //https://iconscout.com/lotties/weather


    // State to be used on initial selection
    const initialForecastState = {
        "0": true,
        "1": false,
        "2": false,
        "3": false,
        "4": false
    }

    // State to be used when reseting the selection state
    const resetForecastState = {
        ...initialForecastState,
        "0": false,
    }

    // Restarts day selection on data update
    React.useEffect(() => {
        setForecastState(initialForecastState)
    }, [apiData])

    // Keeps the selected elements state
    const [forecastState , setForecastState] = useState<any>(initialForecastState)

    /**
     * Updates the state for the selected date on element click
     * @param  {React.MouseEvent<HTMLLabelElement, MouseEvent>} e     [The event passed on click]
     */
    const updateSelectedState = (elTarget: HTMLElement)=> {
        if (elTarget !== null) {
            setForecastState({
                ...resetForecastState,
                [elTarget.getAttribute("data-day") as string]: true
            })
        }  
    }

    /**
     * Gets the most repeated string in an array of strings
     * @param  {string} day   : The day to look for the item
     * @param  {string} item  : The name of the item property
     * @return {string}       : The most common string on the array
     */
    const getMostCommonItem = (day: string, item: "description" | "icon"): string => {
        const arrayAllItems: string[] = []

        for (const forecast of apiData) {
            if (forecast.dt_txt.includes(day)) {
                arrayAllItems.push(forecast.weather[0][item])
            }
        }

        const arrayUniqueItems: string[] = getUniqueValuesFromArray(arrayAllItems)
        // Get the most common position from the array
        return arrayUniqueItems[getHighestCountPosition(arrayUniqueItems, arrayAllItems)]
    }

    /**
     * Gets the max and the min temperature for a given day
     * @param  {string} day   : The day to look for the item
     * @param  {any} apiData  : The api date
     * @return {string}       : Max and min temp string
     */
    const getMaxMinTemp = (day: string, apiData: any) => {
        const arrayTemp: number[] = []

        for (const forecast of apiData) {
            if (forecast.dt_txt.includes(day)) arrayTemp.push(forecast.main.temp_max)
        }

        return getRoundedTemp(Math.max(...arrayTemp)) + ' / ' + getRoundedTemp(Math.min(...arrayTemp))
    }

    /**
     * Handles actions when an event of type click or enter key presse is triggered
     * @param  {React.KeyboardEvent<HTMLLabelElement> | React.MouseEvent<HTMLLabelElement, MouseEvent>} e   : The event
     */
    const handleSelectEvent = (e: React.KeyboardEvent<HTMLLIElement> | React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        updateSelectedState(e.target as HTMLElement)
        handleClickDay(e)
    }

    if (apiData !== null && apiData.length > 0) {
        return (
            <Styled.Container>
                <Styled.Title>5 DAY FORECAST</Styled.Title>
    
                {apiData.map((forecast: IApiForecastResponse, index: number) =>
                    Number.isInteger(index / 8) ? 
                        <Styled.ContainerSingleDay
                            onClick={(e) => handleSelectEvent(e)}
                            onKeyDown={(e) => {if (e.key === 'Enter') handleSelectEvent(e)}}
                            tabIndex={0}
                            data-day-time={index === 0 ? forecast.dt_txt : `${forecast.dt_txt.split(' ')[0]} midnight` }
                            data-dayname={getDayName(index / 8)}
                            data-day={index}
                            data-is-open={forecastState[index] ? 'true' : 'false'}
                        >
                            <p>{getDayName(index / 8)}</p>
                            {getWeatherIcon(
                                getMostCommonItem(forecast.dt_txt.split(' ')[0], 'icon')
                            )}
                            <p>{getMostCommonItem(forecast.dt_txt.split(' ')[0], 'description')}</p>
                            <p>{getMaxMinTemp(forecast.dt_txt.split(' ')[0], apiData)}</p>
                        </Styled.ContainerSingleDay>
                        : ''
                    ) 
                }
            </Styled.Container>
        )

    } else return null
}