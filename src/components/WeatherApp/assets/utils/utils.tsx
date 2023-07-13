import { IApiForecastResponse } from "../interfaces/interfaces"

export function getRoundedTemp(temp: number) {
    return `${Math.round(temp)}°`
}

export function getUniqueValuesFromArray(array: string[]) {

    const arraySingleValues: string[] = []

    for (const value of array) {
        // Substract single values
        if (arraySingleValues.length === 0 || arraySingleValues.filter((val) => val === value).length === 0) {
            arraySingleValues.push(value)
        }  
    }

    return arraySingleValues
}

export function getHighestCountPosition(arrayUniqueItems: string[], arrayToCount: string[]) {
    const arrayCount: number[] = []

    for (const item of arrayUniqueItems) {
        arrayCount.push(arrayToCount.filter((str)=> item === str).length)
    }
    const maxVal: number = Math.max(...arrayCount)
    let count: number = 0

    for (let value of arrayCount) {
        if (value === maxVal) return count
        else count++
    }

    return count
}

export function getDayName(daysAhead: number): string {

    if (daysAhead === 0) return 'Today'

    let nextDay: Date = new Date()
    nextDay.setDate(nextDay.getDate() + daysAhead)

    return nextDay.toLocaleDateString('en', { weekday: 'long' })
}

/**
 * Gets a specific forecast given the date and hour property value
 * @param  {string} displayedDayTime       : The date and hour string
 * @param  {IApiForecastResponse}  apiData    : The data returned from the api response
 * @return {IApiForecastResponse | null}      : The forecast for the specified day and hour, or null if not found
 */
export const getSpecificForecast = (displayedDayTime: string, apiData: IApiForecastResponse[]): IApiForecastResponse | null => {
    for (const forecast of apiData) {
        if (!forecast.dt_txt.includes(displayedDayTime)) continue
        return forecast
    }
    return null
}


export const formatedDayTime = (displayedDayTime: string): string => {
    return displayedDayTime.includes('midnight')
        ? `${displayedDayTime.split(' ')[0]} 00:00:00`
        : displayedDayTime
}