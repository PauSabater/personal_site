import { keyframes } from 'styled-components'
import styled from 'styled-components/macro'

export const appear = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`

export const Wrap = styled.ul`
    position: absolute;
    display: flex;
    flex-direction: column;
    top: 0;
    left: 0;
    width: 100%;
    margin: 0;
    margin-top: calc(var(--mg-between-components) * -1);
    padding: 10px 0 20px;
    font-size: var(--fs-base);
    box-shadow: var(--input-bs-focus);
    border-radius: 0 0 calc(var(--input-height)/2) calc(var(--input-height)/2);
    z-index: 1;
    background-color: var(--bg-main);
`

export const Item = styled.li`
    font-size: var(--fs-base);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding: var(--pd-sm) var(--pd-sm) var(--pd-sm) 70px;
    transition: background var(--tr-base);
    animation: ${appear} 0.3s;

    &:hover {
        background: var(--bg-grey-hover);
        font-weight: bold;
    }
`