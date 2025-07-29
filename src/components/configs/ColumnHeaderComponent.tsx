import { FC } from 'react';

interface IColumnHeaderComponentProps {
    columns: string[];
}

const ColumnHeaderComponent: FC<IColumnHeaderComponentProps> = ({ columns }) => {
    return (
        <div className="grid grid-cols-3 gap-6 py-3 px-6 mb-4 border-b border-[color:var(--color-gray)]">
            {columns.map((column, idx) => {
                return (
                    <div
                        key={column + idx}
                        className="text-sm font-semibold text-[color:var(--color-text)] uppercase tracking-wide"
                    >
                        {column}
                    </div>
                );
            })}
        </div>
    );
};

export default ColumnHeaderComponent;
