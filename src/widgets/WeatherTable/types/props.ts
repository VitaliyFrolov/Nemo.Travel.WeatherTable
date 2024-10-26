import { WeatherData } from "../../../entities/weather";

export interface IWeatherTableProps {
   data?: WeatherData | null;
   variables?: string[];
};