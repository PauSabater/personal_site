import styled from 'styled-components'

export const Input = styled.input`
    font-size: var(--fs-base);
    height: var(--input-height);
    border-radius: calc(var(--input-height)/2);
    padding: 0px var(--pd-md) 0px 70px;
    border: none;
    z-index: 10;
    box-shadow: var(--input-bs);

    &:focus, &:hover {
        border: none;
        box-shadow: var(--input-bs-focus);
    }

    &[aria-expanded="true"] {
        border-radius: calc(var(--input-height)/2) calc(var(--input-height)/2) 0 0;
    }
`

export const Wrap = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
`

export const IconWrap = styled.div`
    position: absolute;
    left: var(--pd-md);
    height: var(--input-height);
    z-index: 20;

    svg {
        fill: var(--c-border);
        position: absolute;
        height: 30px;
        top: 50%;
        transform: translateY(-50%);
    }
`