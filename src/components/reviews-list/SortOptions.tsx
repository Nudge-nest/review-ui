import { FC } from 'react';
import { SortOption, SortOptionsProps } from '../../types/review.ts';
import Dropdown from './Dropdown.tsx';
import { IconArrowsUpDown } from '@tabler/icons-react';

const SortOptions: FC<SortOptionsProps> = ({ currentSort, onSortChange, onAddReview }) => {
    const sortOptions: SortOption[] = [
        { value: 'newest', label: 'Newest First' },
        { value: 'oldest', label: 'Oldest First' },
        { value: 'highest', label: 'Highest Rated' },
        { value: 'lowest', label: 'Lowest Rated' },
        { value: 'most_helpful', label: 'Most Helpful' },
    ];

    return (
        <div className="flex items-center gap-4 px-4">
            <button
                onClick={onAddReview}
                className="px-4 py-2 border border-[color:var(--color-border)] hover:bg-[color:var(--color-main)]
                hover:text-[color:var(--color-white)] transition-colors"
            >
                Add Review
            </button>
            <Dropdown
                trigger={
                    <button
                        className="px-4 py-2 border border-[color:var(--color-border)] hover:bg-[color:var(--color-main)]
                     hover:text-[color:var(--color-white)] transition-colors relative group"
                    >
                        <IconArrowsUpDown size={24} />
                        <span
                            className="absolute -top-8 right-0 bg-[color:var(--color-dark)] text-[color:var(--color-white)]
                         text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                        >
                            Currently sorted by: {sortOptions.find((opt) => opt.value === currentSort)?.label}
                        </span>
                    </button>
                }
                position="right"
                width="180px"
            >
                <div className="py-1">
                    {sortOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => onSortChange(option.value)}
                            className={`w-full text-left px-4 py-2 hover:bg-[color:var(--color-text)] transition-colors 
                            flex items-center justify-between
                ${currentSort === option.value ? 'bg-blue-50 font-semibold' : ''}`}
                        >
                            {option.label}
                            {currentSort === option.value && <span className="text-[color:var(--color-main)]">✓</span>}
                        </button>
                    ))}
                </div>
            </Dropdown>
        </div>
    );
};

export default SortOptions;
