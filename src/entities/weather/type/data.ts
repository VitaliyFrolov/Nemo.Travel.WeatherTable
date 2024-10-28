export interface IDailyWeather {
    time: string[];
    [key: string]: number[] | string[] | undefined;
}

export interface IWeatherData {
    daily: IDailyWeather;
    daily_units: IDailyWeather;
}