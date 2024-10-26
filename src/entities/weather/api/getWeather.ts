export const getWeather = async (variables: string[]) => {
    const lat = 55.751244;
    const long = 37.618423;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=${variables.join(',')}&timezone=Europe/Moscow&past_days=0`

    return fetch(url, {method: 'GET'}).then((res) => res.json());
};