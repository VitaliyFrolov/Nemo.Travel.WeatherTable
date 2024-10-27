export interface IDailyWeather {
    time: string[];
    rain_sum?: number[];
    snowfall_sum?: number[];
    weathercode?: number[];
    temperature_2m_max?: number[];
    temperature_2m_min?: number[];
    apparent_temperature_max?: number[];
    apparent_temperature_min?: number[];
    sunrise?: number[];
    sunset?: number[];
    precipitation_sum?: number[];
    showers_sum?: number[];
    precipitation_hours?: number[];
    windspeed_10m_max?: number[];
    windgusts_10m_max?: number[];
    winddirection_10m_dominant?: number[];
    shortwave_radiation_sum?: number[];
    et0_fao_evapotranspiration?: number[];

    [key: string]: number[] | string[] | undefined;
}

export interface IWeatherData {
    daily: IDailyWeather;
}