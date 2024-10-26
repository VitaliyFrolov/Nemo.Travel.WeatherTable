import { FC } from 'react';
import styles from './AutocompleteMenu.module.scss';

interface IAutocompleteMenuProps {
    suggestions?: string[];
    handleSuggestionClick: (suggestion: string) => void;
};

export const AutocompleteMenu: FC<IAutocompleteMenuProps> = ({
    suggestions = [],
    handleSuggestionClick,
}) => {
    return (
        <ul className={styles.list}>
            {suggestions.map(suggestion => (
                <li key={suggestion} className={styles.item}>
                    <button 
                        className={styles.button}
                        onClick={() => handleSuggestionClick(suggestion)}
                    >
                        {suggestion}
                    </button>
                </li>
            ))}
        </ul>
    );
};