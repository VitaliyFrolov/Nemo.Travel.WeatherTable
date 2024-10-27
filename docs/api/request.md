# Запрос на API

Пример запроса:
```
https://api.open-meteo.com/v1/forecast?latitude=55.751244&longitude=37.618423&daily=rain_sum,snowfall_sum&timezone=Europe/Moscow&past_days=0
```

- `/api.open-meteo.com/v1/`: адрес, по которому необходимо отправлять запрос к API
- `forecast?latitude=55.751244&longitude=37.618423`: 55.75124 - координата широты, 37.618423: координата долготы.
- `&daily=rain_sum,snowfall_sum`: через "," указаны переменные для получения необходимых данных с внешнего API.

API документация https://open-meteo.com/en/docs