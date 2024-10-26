import { useState, useEffect } from 'react';
import { FC } from 'react';
import { weatherVariables } from '../../../../entities/weather';
import { ISearchProps } from '../type/props';
import { AutocompleteMenu } from '../../../../features/autocomplete';
import styles from './Search.module.scss';

export const Search: FC<ISearchProps> = (props) => {
    const {
        handleData,
        placeholder,
    } = props;

    const [ value, setValue ] = useState('');
    const [ variables, setVariables ] = useState<string[]>([]);
    const [ suggestions, setSuggestions ] = useState<string[]>([]);

    // Отслеживаем наличие тегов в инпуте
    useEffect(() => {
        const selectedVariables = weatherVariables.filter(variable => value.includes(variable));
        setVariables(selectedVariables);

        // Получаем последнее слово из введенного текста
        const lastWord = value.split(/\s+/).pop();

        // Генерируем предложку
        if (lastWord) {
            // Фильтруем предложку, исключая уже выбранные переменные
            const filteredSuggestions = weatherVariables.filter(variable => 
                variable.startsWith(lastWord) && !variables.includes(variable)
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    }, [value]);

    // При изменении variables кладем их в коллбэк функцию
    useEffect(() => {
        handleData(variables);
    }, [variables]);

    const handleSuggestionClick = (suggestion: string) => {
        // Получаем последние слова, разделенные пробелами
        const words = value.split(/\s+/);

        // Заменяем последнее слово на выбранный тег
        words[words.length - 1] = suggestion;

        // Соединяем слова обратно с пробелами
        setValue(words.join(' '));

        setSuggestions([]); 
    };

    return (
        <div>
            <input 
                className={styles.input}
                type="text" 
                placeholder={placeholder} 
                value={value} 
                onChange={(e) => setValue(e.target.value)}
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