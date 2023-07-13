export interface ICitiesData {
    country: string,
    name: string,
    latitude: string, 
    longitude: string
}

export interface ICurrentWeatherApiData {
    description: string,
    temp: string,
    feelsLike: string,
    tempMin: string,
    tempMax: string,
    icon: string,
    humidity: string,
    wind: string,
    windAngle: string
}

export interface IWeatherAppTexts {
    cityFinderTexts: {
        placeholder: string,
        label: string, 
        name: string
    }
}

export interface ICityFinder {
    placeholder: string, 
    label: string, 
    name: string
}

export interface IApiForecastResponse {
    dt: number,
    main: {
        temp: number,
        feels_like: number,
        temp_min: number,
        temp_max: number,
        pressure: number,
        sea_level: number,
        grnd_level: number,
        humidity: number,
        temp_kf: number
    },
    weather: [
        {
            id: number,
            main: string,
            description: string,
            icon: string
        }
    ],
    clouds: {
        all: number
    },
    wind: {
        speed: number,
        deg: number,
        gust: number
    },
    visibility: number,
    pop: number,
    rain?: {
        "3h": number
    },
    sys: {
        pod: string
    },
    dt_txt: string
}