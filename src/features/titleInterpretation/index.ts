import { titles } from "../../entities/weather/model/titles";

export const titleInterpretation = (tag: string) => {
    return titles?.[tag];
};