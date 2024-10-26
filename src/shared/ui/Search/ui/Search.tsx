import { FC, useEffect, useState } from 'react';
import { ISearchProps } from '../type/props';
import { availableValues } from '../../../../entities/weather';
import { AutocompleteMenu, useAutocomplete } from '../../../../features/autocomplete';
import styles from './Search.module.scss';

export const Search: FC<ISearchProps> = (props) => {
    const {
        handleData,
        placeholder,
    } = props;

    const [ value, setValue ] = useState('');
    const [ variables, setVariables ] = useState<string[]>([]);

    const { suggestions, handleInputChange } = useAutocomplete({
        availableValues, 
        variables,
        setValue,
        setVariables,
    });

    useEffect(() => {
        handleData(variables)
    }, [variables]);

    return (
        <div> 
            <input
                className={styles.input}
                value={value}
                onChange={handleInputChange} 
                placeholder={placeholder}
            />
            <AutocompleteMenu suggestions={suggestions} />
        </div>
    );
};