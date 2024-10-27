import { IWeatherData } from "../../../../entities/weather";

export interface IWeatherTableProps<T extends IWeatherData> {
   data?: T;
   variables?: string[];
}