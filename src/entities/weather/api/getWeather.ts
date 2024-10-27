export const getWeather = async (variables: string[]) => {
    const lat = 55.751244;
    const long = 37.618423;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=${variables.join(',')}&timezone=Europe/Moscow&past_days=0`;

    const res = fetch(url, {method: 'GET'}).then((res) => {
        if (!res.ok) {
            throw new Error('Network response was not ok');
        }

        return res.json()
    })

    return res;
};