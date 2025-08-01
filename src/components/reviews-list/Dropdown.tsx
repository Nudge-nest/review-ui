import { useEffect } from 'react';
import { DropdownProps } from '../../types/review.ts';
import { useState } from 'react';
import { FC } from 'react';

const Dropdown: FC<DropdownProps> = ({ trigger, children, position = 'left', width = '200px' }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = () => setIsOpen(false);
        if (isOpen) {
            document.addEventListener('click', handleClickOutside);
            return () => document.removeEventListener('click', handleClickOutside);
        }
    }, [isOpen]);

    return (
        <div className="relative inline-block">
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
            >
                {trigger}
            </div>
            {isOpen && (
                <div
                    className={`absolute mt-1 bg-[color:var(--color-white)] border border-[color:var(--color-border)] rounded shadow-lg z-50 ${
                        position === 'right' ? 'right-0' : 'left-0'
                    }`}
                    style={{ width }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {children}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
