// https://rapidapi.com/wirefreethought/api/geodb-cities

import { ChangeEvent, useState, useCallback, useRef } from "react"
import { InputText } from "../InputText/InputText"
import { CityList } from "../CityList/CityList"
import throttle from "lodash.throttle"
import * as Styled from "./CityFinder.styles"
import { ICitiesData, ICityFinder } from "../../assets/interfaces/interfaces"


export function CityFinder({cityFinderTexts, updateCityApiResult}: {cityFinderTexts: ICityFinder, updateCityApiResult: any}) {

    const [citiesData, setCitiesData] = useState<ICitiesData[]>(
        [{
            country: "",
            name: "",
            latitude: "",
            longitude: ""
        }]
    )
    const elementListRef = useRef(null)
    const elementInputRef = useRef(null)
    
    const [inputText, setInputText] = useState<string>('')
    const [isListOpen, setIsListOpen] = useState<boolean>(false)
    const [isTypingAllowed, setIsTypingAllowed] = useState<boolean>(true)

    // Store function in order to prevent it executing on each re-render
    const throttleFn = useCallback(throttle((city: string)=> makeApiRequestT(city), 1500), [])

    /**
     * Gets the api call from the corresponding value
     * @param  {string} city [The string to look for results]
     */
    const makeApiRequestT = async (city: string) => {

        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=300&namePrefix=${city}&limit=10`
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '60f20fea36msh9ea679c018f38e9p112174jsn978aab31be00',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        }

        try {
            const response: Response = await fetch(url, options)
            const result = await response.text()
            const results: any = JSON.parse(result)
            
            // Set cities value in case the result is higher than 0
            if (results.hasOwnProperty('data') && results.data.length > 0) {
                const citiesList: ICitiesData[] = []

                for (const cityData of results.data) {
                    // Exclude results that do not start with the city name, without counting the spaces
                    if (!cityData.name.startsWith(city.trim())) continue
                    // Exclude already existing results from the same country
                    if (citiesList.filter((city) => 
                        city.name === cityData.name && city.country === cityData.country).length > 0) {
                            continue
                    } 

                    const cityItem: string = `${cityData.name}, ${cityData.country}`
                    citiesList.push({
                        country: cityData.country,
                        name: cityData.name,
                        latitude: cityData.latitude,
                        longitude: cityData.longitude
                    })
                }

                setCitiesData(citiesList)
            }
        } catch (error) {
            console.error(error)
        }
    }

    /**
     * Gets the value from the input change
     * @param  {[ChangeEvent<HTMLInputElement>]} event [The event passed on change]
     */
    const handleInputChangeEvent = (event: ChangeEvent<HTMLInputElement>): void => {
        const value = event.target.value
        
        if (value.length > 2) {
            throttleFn(value)
            setInputText(value)
            setIsListOpen(true)
            setInputText(value)

        } else if (value.length === 0) {
            setCitiesData([])
            setIsListOpen(false)
        }
    }

    /**
     * Gets the value from the input change and sets the corresponding states
     * @param  {ChangeEvent<HTMLInputElement>} event [The event passed on change]
     * @return {type}      [description]
     */
    const handleListClickSelect = (event: ChangeEvent<HTMLInputElement>) => {
        setIsListOpen(false)
        setInputText(event.target.innerHTML)
        // This function will allow overriding the input value
        setIsTypingAllowed(false)

        updateCityApiResult({
            latitude: event.target.getAttribute("data-latitude") || "",
            longitude: event.target.getAttribute("data-longitude") || "",
            name: event.target.innerHTML || "",
        })
    }

    /**
     * Sets the actions when input is focused
     */
    const handleInputFocusEvent = () => {
        // This value will make the attribute value from the input not be overwriten
        setIsTypingAllowed(true)
        setIsListOpen(true)
    }

    /**
     * Detects if click is outside current component, if so closes the list
     * @param  {Event} e     [The event passed on click]
     */
    const handleClickOutside = (e: MouseEvent) => {
        const currentListEl: HTMLElement | null = elementListRef.current
        const currentInputEl: HTMLElement | null = elementInputRef.current

        if (isListOpen 
            && currentListEl && !(currentListEl as HTMLElement).contains(e.target as HTMLElement)
            && currentInputEl && !(currentInputEl as HTMLElement).contains(e.target as HTMLElement)
        ) {
            setIsListOpen(false)
        }
    }

    // Add listener to detect click outside of list
    document.addEventListener('mousedown', handleClickOutside)

    return (
        <Styled.Container>
            <Styled.Wrap
                ref={elementInputRef}
            >
                <InputText
                    handleInputChangeEvent={handleInputChangeEvent}
                    placeholder={cityFinderTexts.placeholder}
                    name={cityFinderTexts.name}
                    handleInputFocusEvent={handleInputFocusEvent}
                    textSelected={inputText}
                    allowTyping={isTypingAllowed}
                    isExpanded={isListOpen}
                ></InputText>
            </Styled.Wrap>
            <Styled.Wrap 
                ref={elementListRef}>
                { citiesData.length > 1 && isListOpen && inputText.length > 2 
                    ? <CityList
                        citiesData={citiesData}
                        handleListClickSelect={handleListClickSelect}
                    ></CityList>
                    : '' 
                }
            </Styled.Wrap>
        </Styled.Container>
    )
}