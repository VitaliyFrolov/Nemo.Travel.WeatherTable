import { FC } from 'react';
import styles from './Cell.module.scss';
import { ICellProps } from '../type/props';

export const Cell: FC<ICellProps> = (props) => {
    const {
       children,
    } = props

    return (
        <td className={styles.cell}>
           {children}
        </td>
    );
};