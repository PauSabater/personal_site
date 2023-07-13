import { ReactComponent as SunnySvg } from "../../assets/svg/weather/sunny.svg"
import { ReactComponent as SunnyCloudy } from "../../assets/svg/weather/sunnyCloudy.svg"
import { ReactComponent as ScateredClouds } from "../../assets/svg/weather/scateredClouds.svg"
import { ReactComponent as BrokenClouds } from "../../assets/svg/weather/brokenClouds.svg"
import { ReactComponent as RainShowers } from "../../assets/svg/weather/rainShowers.svg"
import { ReactComponent as Rain } from "../../assets/svg/weather/rain.svg"
import { ReactComponent as Thunderstorm } from "../../assets/svg/weather/thunderstorm.svg"
import { ReactComponent as Snow } from "../../assets/svg/weather/snow.svg"
import { ReactComponent as Mist } from "../../assets/svg/weather/mist.svg"


export function getWeatherIcon(icon: string) {

    switch (icon.slice(0, 2)) {
        case '01':
            return <SunnySvg></SunnySvg>
        case '02':
            return <SunnyCloudy></SunnyCloudy>
        case '03':
            return <ScateredClouds></ScateredClouds>
        case '04':
            return <BrokenClouds></BrokenClouds>
        case '09':
            return <RainShowers></RainShowers>
        case '10':
            return <Rain></Rain>
        case '11':
            return <Thunderstorm></Thunderstorm>
        case '13':
            return <Snow></Snow>
        case '50':
            return <Mist></Mist>
    }
}