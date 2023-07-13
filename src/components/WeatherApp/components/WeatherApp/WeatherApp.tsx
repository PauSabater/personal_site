import { useRef, useState } from "react"
import { IApiForecastResponse, ICitiesData, IWeatherAppTexts } from "../../assets/interfaces/interfaces"
import { BannerSelectedWeather } from "../BannerSelectedWeather/BannerSelectedWeather"
import { CityFinder } from "../CityFinder/CityFinder"
import * as Styled from "./WeatherApp.styles"
import { BannerForecastHours } from "../BannerForecastHours/BannerForecastHours"
import { BannerAirConditions } from "../BannerAirConditions/BannerAirConditions"
import { BannerForecastDays } from "../BannerForecastDays/BannerForecastDays"
import "./main.css"

export function WeatherApp({ texts }: { texts: IWeatherAppTexts }) {

    // State for the cities api response
    const [cityApiData, setCityApiData] = useState<ICitiesData>(
        {
            country: "",
            name: "",
            latitude: "",
            longitude: ""
        }
    )
    
    // State for the Forecast Weather api response
    const [forecastApiData, setForecastApiData] = useState<IApiForecastResponse[] | null>(null)

    // The displayed day and time on the API format
    const [displayedDayTime, setDisplayedDayTime] = useState<string>("")

    // The displayed day name
    const [displayedDayName, setDisplayedDayName] = useState<string>("TODAY")


    /**
     * Updates the resunt from the Cities Api
     * @param  {ICitiesData} cityData  : The data received from the api
     */
    const updateCityApiResult = (cityData: ICitiesData): void => {
        setCityApiData(cityData)
        makeWeatherApiRequest(cityData.latitude, cityData.longitude)
    }

    /**
     * Updates selected day and time to display on selected conditions
     * @param  {string} selectedDayTime  : The selected day and hour string
     */
    const handleClickHour = (selectedDayTime: string): void => {
        setDisplayedDayTime(selectedDayTime)
    }

    /**
     * Updates the displayed day after click on day forecast container
     * @param  {Event} e       : The event passed on click
     */
    const handleClickDay = (e: Event): void => {
        const elTarget: HTMLElement = e.target as HTMLElement
        if (elTarget !== null) {
            setDisplayedDayTime(elTarget.getAttribute("data-day-time") || "")
            setDisplayedDayName(elTarget.getAttribute("data-dayname") || "")
        }
    }

    const makeWeatherApiRequest = async (latitude: string, longitude: string)=> {

        const options = {
            method: 'GET',
            "Content-Type": "application/json",
        }

        try {
            let urls = [
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=22701db4524b58c1f26b55888022c05b`,
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=22701db4524b58c1f26b55888022c05b`
            ]
              
            // map every url to the promise of the fetch
            const requests = urls.map(url => fetch(url))
            const responses: Response[] = await Promise.all(requests)
            const currentWeatherResponse =  await JSON.parse(await responses[0].text())
            const forecastWeatherResponse =  await JSON.parse(await responses[1].text())

            // Saves the forecast returned data:
            setForecastApiData(forecastWeatherResponse.list)
            // Set the current day as today as first render:
            setDisplayedDayTime(forecastWeatherResponse.list[0].dt_txt)

        } catch (error) {
            console.error(error)
        }
    }
    
    return (
        <Styled.WrapMain>
            <div className="container-parent-webb-app">
                <div className="container-child-webb-app">
                    <CityFinder 
                        cityFinderTexts={texts.cityFinderTexts}
                        updateCityApiResult={updateCityApiResult}              
                    ></CityFinder>
                    <Styled.WrapFirstColumn>
                        {forecastApiData ? 
                            <Styled.WrapCurrentConditions>
                                <BannerSelectedWeather
                                    apiData={forecastApiData}
                                    displayedDayTime={displayedDayTime}
                                    displayedDayName={displayedDayName}
                                    city={cityApiData.name}
                                ></BannerSelectedWeather>
                                <BannerAirConditions 
                                    apiData={forecastApiData}
                                    displayedDayTime={displayedDayTime}
                                ></BannerAirConditions>
                                <BannerForecastHours
                                    apiData={forecastApiData}
                                    displayedDayTime={displayedDayTime}
                                    displayedDayName={displayedDayName}
                                    handleClickHour={handleClickHour}
                                ></BannerForecastHours>
                            </Styled.WrapCurrentConditions>
                            : ""
                        }
                    </Styled.WrapFirstColumn>
                    {forecastApiData ? 
                        <Styled.WrapBannerForecastNextDays>
                            <BannerForecastDays
                                apiData={forecastApiData}
                                handleClickDay={handleClickDay}
                            ></BannerForecastDays>
                        </Styled.WrapBannerForecastNextDays>
                        : ""
                    }
                </div>
            </div>
        </Styled.WrapMain>
    )
}