import styled from 'styled-components/macro'
export { Title } from '../../assets/styles/Common.styles'

export const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    grid-column: 1/3;
    grid-row-start: 3;
    background-color: rgb(246, 247, 252);
    border-radius: var(--br-r-base);
    padding: var(--pd-inner-component);
`

export const ContainerHoursAndGraph = styled.div`
    position: relative;
    height: 160px;
    overflow-x: auto;
`

export const ContainerHours = styled.div`
    position: absolute;
    min-width: 600px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: var(--mg-sm);
    top: 10px;
    left: 0;
`

export const ContainerGraph = styled.div`
    position: absolute;
    min-width: 600px;
    width: 100%;
    box-sizing: border-box;
    height: 80px;
    bottom: 0;
    left: 0;
    padding-right: calc(clamp(48px, 6.25%, 6.25%) - 15px);
    padding-left: calc(clamp(35px, 6.25%, 6.25%) - 22px);

    & div {
        height: 80px;  
    }
`

export const HourForecastContainer = styled.div`
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    align-items: center;
    height: 70px;
    z-index: 2;

    &:not(:last-child) {
        border-right: var(--br-separator);
    }

    &:before {
        content: '';
        pointer-events: none;
        position: absolute;
        top: 50%;
        left: 0;
        height: 80px;
        border-radius: 5px;
        width: 100%;
        background-color: var(--bg-grey-selected);
        opacity: 0;
        border: var(--br-separator);
        transform: translateY(-50%) translateX(-1px);
        z-index: 1;
        transition: opacity 0.3s;
    }

    &[data-is-selected="true"]:before {
        opacity: 1;
    }

    &[data-is-selected="false"]:hover:before {
        border: none;
        opacity: 0.5;
        transform: translateY(-50%);
    }

    &[data-is-selected="true"] p {
        font-weight: 600; 
    }

    p {
        font-size: var(--fs-sm);
        margin: 0;
    }

    p, svg {
        z-index: 2;
        pointer-events: none;
    }

    svg {
        position: absolute;
        top: 65%;
        left: 50%;
        height: 40px;
        width: 40px;
        transform: translate(-50%, -50%);
    }
`

export const ButtonsWrap = styled.div`
    display: flex;
    flex-grow: column;
    margin-bottom: var(--mg-xs);
`

export const ForecastButton = styled.button`
    cursor: pointer;
    position: relative;
    width: min-content;
    margin: 0 var(--mg-md) var(--mg-md) 0;
    border-radius: none;
    border: none;
    background: none;
    white-space: nowrap;
    font-size: var(-fs-sm);

    &:after {
        content: '';
        position: absolute;
        bottom: -5px;
        border-radius: 2.5px;      
        left: 0;
        width: 100%;
        height: 5px;
        opacity: 0;
        transition: opacity var(--tr-base);
    }

    &[data-type="temp"]:after {
        background-color: var(--c-temp);
    }

    &[data-type="rain"]:after {
        background-color: var(--c-rain);
    }

    &[data-active="true"]:after {
        opacity: 1;
    }
`