import styled from 'styled-components/macro'
export { Title } from '../../assets/styles/Common.styles'

export const Container = styled.ul`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: var(--pd-inner-component);
    margin: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(246, 247, 252);
    border-radius: var(--br-r-base);


    svg {
        height: 20px;
        width: 20px;
        align-self: center;
    } 
`

export const ContainerSingleDay = styled.li`
    cursor: pointer;
    position: relative;
    display: grid;
    grid-template-columns: 1fr 0.5fr 1.5fr 1fr;
    flex-grow: 1;
    height: 80px;

    &:not(:last-child) {
        border-bottom: var(--br-separator);
    }

    &:before {
        content: '';
        pointer-events: none;
        position: absolute;
        top: 0;
        left: 50%;
        height: 100%;
        width: calc(100% + 20px);
        border-radius: 10px;
        border: var(--br-separator);
        background-color: var(--bg-grey-selected);
        z-index: 1;
        opacity: 0;
        transition: opacity 0.3s;
        transform: translateX(-50%) translateY(-1px);
    }

    &[data-is-open="true"]:before {
        opacity: 1;
    }

    &[data-is-open="true"] p {
        font-weight: 600;
    }

    &[data-is-open="false"]:hover:before {
        border: none;
        opacity: 0.5;
        transform: translateX(-50%);
    }

    & p, svg {
        z-index: 2;
        pointer-events: none;
    }

    & p {
        align-self: center;
        padding-left: var(--pd-sm);
    }
`