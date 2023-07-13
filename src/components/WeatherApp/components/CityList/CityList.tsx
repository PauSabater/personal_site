import { useEffect, useRef, useState } from "react";
import { ICitiesData } from "../../assets/interfaces/interfaces"
import * as Styled from "./CityList.styles"

export function CityList({ citiesData, handleListClickSelect }: { citiesData: ICitiesData[], handleListClickSelect: any }) {

    return (
        <Styled.Wrap 
            id="list-cities" 
        >
            {citiesData.map((cityData: ICitiesData, index: number) =>
                <Styled.Item
                    tabIndex={0}
                    key={`id-${cityData}-${index}`}
                    value={cityData.name}
                    data-latitude={cityData.latitude}
                    data-longitude={cityData.longitude}
                    onClick={handleListClickSelect}
                >{`${cityData.name}, ${cityData.country}`}
                </Styled.Item>
            )}
        </Styled.Wrap>
    )
}
