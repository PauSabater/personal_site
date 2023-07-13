import { useState } from "react"
import styled from 'styled-components/macro'
import * as Styled from "./InputWeather.styles"

interface IInputText { 
    handleInputChangeEvent: any, 
    placeholder: string, 
    label: string, 
    name: string, 
    handleInputFocusEvent: any, 
    textSelected: string,
    allowTyping: boolean
}

export function IconWeather({ }: { }) {


    // const [isInputInitialised, setIsInputInitialised] = useState<boolean>(false)

    return (
        <Styled.Wrap>
        </Styled.Wrap>
    )
}