import { IWeatherData } from "../../../entities/weather/type/data";

export interface IWeatherTableProps<T extends IWeatherData> {
   data?: T;
   variables?: string[];
}