import styled from 'styled-components/macro'

export const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: var(--row-first-height);
    width: 100%;
    height: 100%;

    p {
        color: var(--fc-global);
    }
`

export const CurrentTemperature = styled.p`
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: var(--fs-2xl);
    font-weight: var(--fw-bold);
    margin-bottom: var(--mg-sm);
`

export const Hour = styled.p`
    font-size: var(--fs-base);
    margin: 0;
    color: var(--fc-light);
`

export const CurrentCity = styled.p`
    font-size: var(--fs-xl);
    margin: var(--mg-sm) 0;
    font-weight: var(--fw-bold);
    margin-bottom: var(--mg-sm);
`

export const CurrentWeatherIcon = styled.div`
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;

    svg {
        position: absolute;
        right: 40px;
        top: 50%;
        height: 130px;
        width: 130px;
        transform: translateY(-50%);
    }
`