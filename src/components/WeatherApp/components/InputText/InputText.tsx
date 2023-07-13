import { useState } from "react"

import * as Styled from "./InputText.styles"
import { ReactComponent as SearchIcon } from "../../assets/svg/icons/search.svg"

interface IInputText { 
    handleInputChangeEvent: any, 
    placeholder: string, 
    name: string, 
    handleInputFocusEvent: any, 
    textSelected: string,
    allowTyping: boolean,
    isExpanded: boolean
}

export function InputText({ 
        handleInputChangeEvent, 
        placeholder, 
        name, 
        handleInputFocusEvent, 
        textSelected,
        allowTyping,
        isExpanded
    }: IInputText) {

    return (
        <Styled.Wrap>
            <Styled.IconWrap>
                <SearchIcon></SearchIcon>
            </Styled.IconWrap>
            <Styled.Input 
                onChange={handleInputChangeEvent}
                onFocus={handleInputFocusEvent}
                type="text" 
                id={`f-${name}`}
                name={name}
                placeholder={placeholder}
                aria-expanded={isExpanded}
                aria-controls="list-cities"
                {...(
                    textSelected && allowTyping === false && { value: textSelected })
                }
            ></Styled.Input>
        </Styled.Wrap>
    )
}