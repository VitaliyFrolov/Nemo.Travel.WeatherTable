import { useState, useCallback } from 'react';

interface IUseAutocompleteProps {
    availableValues: string[];
    variables: string[];
    setValue: React.Dispatch<React.SetStateAction<string>>;
};

export const useAutocomplete = ({ 
    availableValues, 
    variables,
    setValue,
}: IUseAutocompleteProps) => {
  
    const [ suggestions, setSuggestions ] = useState<string[]>([]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const newTag: string = e.target.value;
        const inputParts = newTag.split(/[\s,]+/); 
        const lastInputPart = inputParts.length > 0 ? inputParts[inputParts.length - 1] : ""; 

        if (lastInputPart.length > 0) {
            setSuggestions(
                availableValues.filter(
                variable => 
                    variable.toLowerCase().startsWith(lastInputPart.toLowerCase()) 
                    && !variables.includes(variable) 
                )
            );
        } else {
            setSuggestions([]); 
        }

        setValue(newTag);
    }, [availableValues, variables, setValue]);

    return {
        suggestions,
        handleInputChange
    };
};