import { FC } from 'react';
import styles from './WeatherTable.module.scss';
import { IWeatherTableProps } from '../types/props';
import { IWeatherData } from '../../../../entities/weather';

export const WeatherTable: FC<IWeatherTableProps<IWeatherData>> = (props) => {
    const { 
        data,
        variables = [],
    } = props;

    if (!data || !data.daily) {
        return <div>Нет данных о погоде</div>;
    }

    if (variables.length === 0) {
        return <div>Введите значение</div>;
    }

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.cell_title}>date</th>
                    {variables.map((item) => (
                        <th className={styles.cell_title} key={item}>
                            {item}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.daily.time.map((date: string, index: number) => (
                    <tr key={date}> 
                        <td className={styles.cell}>{date}</td>
                        {variables.map((variable) => (
                            <td 
                                className={styles.cell}
                                key={variable}
                            >
                                {`${data.daily[variable]?.[index]} ${data.daily_units[variable]}`}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};