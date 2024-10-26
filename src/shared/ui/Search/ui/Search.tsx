import { useState, useEffect } from 'react';
import { FC } from 'react';
import { ISearchProps } from '../type/props';
import { availableValues, useValidVariables } from '../../../../entities/weather';
import { AutocompleteMenu, useAutocomplete } from '../../../../features/autocomplete'; 
import styles from './Search.module.scss';

export const Search: FC<ISearchProps> = (props) => {
    const {
        handleData,
        placeholder,
    } = props;

    const [ value, setValue ] = useState('');
    const [ variables, setVariables ] = useState<string[]>([]);
    console.log(variables);

    // Получаем функции для управления предложениями
    const { suggestions, handleInputChange } = useAutocomplete({
        availableValues, 
        variables,
        setValue,
    });

    // Получаем функции для управления переменными
    const { handleSuggestionClick } = useValidVariables({
        availableValues, 
        variables,
        setValue, 
        setVariables,
        value
    });

    useEffect(() => {
        handleData(variables)
    }, [variables, handleData]);

    return (
        <div>
            <input 
                className={styles.input}
                type="text" 
                placeholder={placeholder} 
                value={value} 
                onChange={handleInputChange}
            />
            {suggestions.length > 0 && (
                <AutocompleteMenu
                    suggestions={suggestions}
                    handleSuggestionClick={handleSuggestionClick}
                />
            )}
        </div>
    );
};