import { useState, useCallback } from 'react';

interface IUseAutocompleteProps {
    availableValues: string[];
    variables: string[];
    setValue: React.Dispatch<React.SetStateAction<string>>;
    setVariables: React.Dispatch<React.SetStateAction<string[]>>;
    value: string
};

export const useAutocomplete = ({ 
    availableValues, // Массив возможных переменных
    variables, // Переменные существующие в строке
    setValue, // Обновление значение строки
    setVariables, // Обновление значения переменных существующих в строке
    value // Актуальное значение из инпута
}: IUseAutocompleteProps) => {
  
    const [ suggestions, setSuggestions ] = useState<string[]>([]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newTag: string = e.target.value;
        const inputParts = newTag.split(/[\s,]+/); // Разделяем на части по пробелам и запятым
        const lastInputPart = inputParts.length > 0 ? inputParts[inputParts.length - 1] : ""; // Последняя введенная часть

        // Обновляем список предложений только если введено что-то
        if (lastInputPart.length > 0) {
            setSuggestions(
                availableValues.filter(
                    variable => 
                        variable.toLowerCase().startsWith(lastInputPart.toLowerCase()) // Начало значения совпадает
                        && !variables.includes(variable) // Исключаем уже добавленные переменные
                )
        );
        } else {
            setSuggestions([]); // Сбрасываем предложения, если строка пустая
        }

        // Проверяем, есть ли новое значение
        if (availableValues.includes(lastInputPart)) {
            // Если да, то добавляем в variables
            setVariables([...variables, lastInputPart]);
        } else {
            // Если нет, то удаляем из variables
            setVariables(variables.filter(tag => tag !== lastInputPart)); 
        }

        setValue(newTag);
    }, [availableValues, variables]);

    const handleSuggestionClick = useCallback((suggestion: string) => {
        // Получаем текущее значение инпута
        const currentInput = value; 

        // Находим позицию последнего пробела или запятой 
        const lastSeparatorIndex = currentInput.lastIndexOf(' ') + 1; 

        // Добавляем выбранный тег к предыдущему значению 
        const newValue = currentInput.substring(0, lastSeparatorIndex) + suggestion; 

        // Устанавливаем новое значение в инпут
        setValue(newValue); 

        // Добавляем выбранное значение в variables
        setVariables([...variables, suggestion]);

        // Сбрасываем предложения
        setSuggestions([]); 
    }, [variables, value]);

    return {
        suggestions,
        handleInputChange,
        handleSuggestionClick
    };
};