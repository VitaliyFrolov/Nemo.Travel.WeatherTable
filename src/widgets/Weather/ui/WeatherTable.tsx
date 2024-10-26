import { FC } from 'react';
import styles from './WeatherTable.module.scss';
import { Cell } from '../../../shared/ui/Cell';
import { IWeatherTableProps } from '../types/props';

export const WeatherTable: FC<IWeatherTableProps> = (props) => {
    const { 
        data,
        variables = [],
    } = props;

    if (!data || !data.daily) {
        return <div>Нет данных о погоде</div>;
    };

    if (variables.length === 0) {
        return <div>Введите значение</div>
    };

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.cell_title}>date</th>
                    {variables.map((item: string, index) => (
                        <th className={styles.cell_title} key={index}>
                            {item}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data?.daily.time.map((date: any, index: number) => (
                    <tr key={date}> 
                        <Cell>{date}</Cell>
                        {variables.map((variable: string) => (
                            data.daily[variable] && <Cell key={variable}>{data.daily[variable][index]}</Cell>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};