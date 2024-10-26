import { useCallback } from 'react';

interface IUseValidVariablesProps {
    availableValues: string[];
    variables: string[];
    setValue: React.Dispatch<React.SetStateAction<string>>;
    setVariables: React.Dispatch<React.SetStateAction<string[]>>;
    value: string;
};

export const useValidVariables = ({
    availableValues,
    variables,
    setValue,
    setVariables,
    value
}: IUseValidVariablesProps) => {
    const handleSuggestionClick = useCallback((suggestion: string) => {
        const currentInput = value; 

        const lastSeparatorIndex = currentInput.lastIndexOf(' ') + 1; 

        if (lastSeparatorIndex > 0) {
          const newValue = currentInput.substring(0, lastSeparatorIndex) + suggestion + ' '; 
          setValue(newValue);
          setVariables([...variables, suggestion]);
        } else {
          setValue(suggestion + ' '); 
          setVariables([...variables, suggestion]);
        }
    }, [variables, value, setVariables]); 
    
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newTag: string = e.target.value;
        const inputParts = newTag.split(/[\s,]+/); 
        const lastInputPart = inputParts.length > 0 ? inputParts[inputParts.length - 1] : ""; 

        // Проверяем, есть ли новое значение
        if (availableValues.includes(lastInputPart)) {
            // Если да, то добавляем в variables, если там еще нет
            if (!variables.includes(lastInputPart)) {
              setVariables([...variables, lastInputPart]);
            }
        } else {
            // Если нет, то удаляем из variables
            setVariables(variables.filter(tag => tag !== lastInputPart)); 
        }

        setValue(newTag);
    }, [availableValues, variables]);

    return {
        handleSuggestionClick,
        handleInputChange
    };
};