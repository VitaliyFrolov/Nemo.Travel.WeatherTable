import { useState } from 'react';

interface IUseAutocompleteProps {
    availableValues: string[];
    variables: string[];
    setValue: React.Dispatch<React.SetStateAction<string>>;
    setVariables: React.Dispatch<React.SetStateAction<string[]>>;
};

export const useAutocomplete = ({ 
    availableValues, 
    variables,
    setValue, 
    setVariables
}: IUseAutocompleteProps) => {
    
    const [ suggestions, setSuggestions ] = useState<string[]>([]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTag: string = e.target.value;

        // Обновляем список предложений только если введено что-то
        if (newTag.length > 0) {
            setSuggestions(
                availableValues.filter(
                    variable => variable.toLowerCase().startsWith(newTag.toLowerCase()) 
                )
            );
        } else {
            setSuggestions([]); // Сбрасываем предложения, если строка пустая
        }

        // Проверяем, есть ли новое значение
        if (availableValues.includes(newTag)) {
            // Если да, то добавляем в variables
            setVariables([...variables, newTag]);
        } else {
            // Если нет, то удаляем из variables
            setVariables(variables.filter(tag => tag !== newTag)); 
        }

        setValue(newTag);
    };

    return {
        suggestions,
        handleInputChange
    };
};