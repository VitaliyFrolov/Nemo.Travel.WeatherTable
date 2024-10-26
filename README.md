# Тестовое задание react + typescript

Это приложение получает данные о погоде в Москве за последнюю неделю с сайта https://open-meteo.com/
и отображает их в таблице в формате

| date   | rain_sum | snowfall_sum | etc | etc |
|--------|----------|--------------|-----|-----|
| string | int      | int          | int | int |

в нем есть как логические так и "стилистические ошибки которые нужно исправить"
доступные варианты переменных:

**weathercode, temperature_2m_max, temperature_2m_min, apparent_temperature_max, apparent_temperature_min, sunrise, sunset, precipitation_sum, rain_sum,
showers_sum, snowfall_sum, precipitation_hours, windspeed_10m_max, windgusts_10m_max, winddirection_10m_dominant, shortwave_radiation_sum, et0_fao_evapotranspiration**

## Логические ошибки
### 1.
```
useEffect(() => {
    fetch(`https://api.open-meteo.com/v1/forecast?latitude=${props.lat}&longitude=${props.long}&daily=${props.variables.join(',')}&timezone=Europe/Moscow&past_days=0`, {method: 'GET'}).then(resp => {
        setWeather(resp.json())
    })
}, [props.variables])
```
В файле "Weather.tsx" при обработке запроса первый .then() с resp.json() нам гарантирует, что json() вызывается после того, как fetch вернет ответ.
Второй же .then() мы можем использовать для получения данных после парсинга JSON, и только после этого мы можем передать значение в стейт.
Так же стоит обратить на обработку ошибок при помощи .catch().
Хорошей практикой является вынесение логики связанной с запросом из компонента, например в папку с названием api.
Это сделает наш код полее декларативным.

### 2. 
```
<input type="text" onInput={e => {
    variables.push((e.target as HTMLInputElement).value)
}}/>
```
В файле "App.tsx" при попытке реализовать контролируемый инпут, конструкция
` e => {variables.push((e.target as HTMLInputElement).value)}` приводит к мутации стейта.
Для изменения стейта без мутации необходимо использовать setVariables().
Так же хорошей практикой является реализация отдельной функции для изменения стейта включающюю в себя setVariables(). Это позволит нам работать с данными перед обновлением стейта.
Далее необходимо заменить "onInpu" на "onChange", это сделает поведение более предсказуемым.
А для более предсказуемого и удобного поведения компонента необходимо его контроллировать.

### 3.
Отсутствме ключей для элементов списка


## Другие ошибки
### 1. 
В файле Weather.tsx присутствует директива
`/* tslint:disable */`, которая отключает typescript linter в данном файле. А так же `@ts-nocheck` отключает проверку типов для всего файла.
Следовательно мы лишаем себя всех плюсов строгой типизации и можем обходить как аннатацию типов, так и встроенный линтер языка, что в свою очередь приводит к ошибкам.

### 2.
В файле App.tsx необходимо убрать лишние импорты, а именно:
- React
-  './App.css'