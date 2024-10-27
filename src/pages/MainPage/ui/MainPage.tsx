import { useEffect, useState } from 'react';
import { Container } from '../../../shared/ui/Container';
import { Search } from '../../../shared/ui/Search';
import { WeatherTable } from '../../../shared/ui/WeatherTable';
import { getWeather, WeatherData } from '../../../entities/weather';

const MainPage = () => {
    const [ weather, setWeather ] = useState<WeatherData>();
    const [ variables, setVariables ] = useState<string[]>([]);

    // Получаем данные из инпута
    const handleVariables = (variables: string[]) => {
        setVariables(variables);
    };

    // Реализовываем запрос на API
    useEffect(() => {
        getWeather(variables)
            .then((data) => setWeather(data))
            .catch(error => new Error("Ошибка при получении данных:", error));
    }, [variables]);

    return (
        <Container>
            <Search
                handleVariables={handleVariables}
                placeholder='Поиск...'
            />
            <WeatherTable
                data={weather}
                variables={variables}
            />
        </Container>
    );
};

export default MainPage;