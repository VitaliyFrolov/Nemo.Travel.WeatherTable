import { FC } from 'react';
import styles from './AutocompleteMenu.module.scss';

interface IAutocompleteMenuProps {
    suggestions?: string[];
};

export const AutocompleteMenu: FC<IAutocompleteMenuProps> = ({
    suggestions = [],
}) => {
    return (
        <ul className={styles.list}>
            {suggestions.map(suggestion => (
                <li 
                    key={suggestion}
                    className={styles.item}
                >
                    <button
                        className={styles.button}
                    >
                        {suggestion}
                    </button>
                </li>
            ))}
        </ul>
    );
};