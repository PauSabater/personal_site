import { keyframes } from 'styled-components'
import styled from 'styled-components/macro'
import { colors } from '../../assets/styles/Common.styles'

export const WrapMain = styled.div`
    // Colors:
    --c-rain: ${colors.rain};
    --c-rain-light: ${colors.rainLight};
    --c-temp: ${colors.temp};
    --c-temp-light: ${colors.tempLight};
    --c-wind: ${colors.wind};
    --c-wind-light: ${colors.windLight};
`

export const WrapFirstColumn = styled.div`
    display: flex;
    flex-direction: column; 
    grid-column-start: 1;
`

export const WrapCurrentConditions = styled.div`
    display: grid;
    grid-template-columns: 70% 30%;
    row-gap: var(--pd-xs); 
`

export const WrapBannerForecastNextDays = styled.div`
`