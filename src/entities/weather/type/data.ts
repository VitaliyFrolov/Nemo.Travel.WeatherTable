export type WeatherData = {
    daily: {
        time: string[];
        rain_sum?: number[];
        snowfall_sum?: number[]; 
    }
};