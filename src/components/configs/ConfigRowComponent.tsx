import React, { useState, useCallback } from 'react';

// Types for different field configurations
interface ConfigField {
    key: string;
    value: string | number | boolean;
    description: string;
    type?:
        | 'text'
        | 'textarea'
        | 'number'
        | 'email'
        | 'password'
        | 'url'
        | 'checkbox'
        | 'select'
        | 'boolean'
        | 'image'
        | 'json'; //TODO: refactor this type at some point
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    options?: Array<{ value: string; label: string }>;
}

interface ConfigRowProps {
    field: ConfigField;
    onFieldChange: (key: string, value: string | number | boolean, objPropName:string) => void;
    className?: string;
    objPropName: string;
}

const ConfigRowComponent: React.FC<ConfigRowProps> = ({ field, onFieldChange, className = '', objPropName }) => {
    const [localValue, setLocalValue] = useState(field.value);

    const handleValueChange = useCallback(
        (value: string | number | boolean) => {
            setLocalValue(value);
            onFieldChange(field.key, value, objPropName);
        },
        [field.key, onFieldChange]
    );

    const formatLabel = (key: string) => {
        // Convert camelCase or snake_case to readable format
        return key
            .replace(/([A-Z])/g, ' $1')
            .replace(/_/g, ' ')
            .replace(/^./, (str) => str.toUpperCase())
            .trim();
    };

    const renderInput = () => {
        const baseClasses =
            'w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors';
        const disabledClasses = field.disabled ? 'opacity-50 cursor-not-allowed' : '';
        const inputClasses = `${baseClasses} ${disabledClasses}`;

        switch (field.type) {
            case 'textarea':
                return (
                    <textarea
                        value={localValue as string}
                        onChange={(e) => handleValueChange(e.target.value)}
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        rows={3}
                        className={inputClasses}
                    />
                );

            case 'number':
                return (
                    <input
                        type="number"
                        value={localValue as number}
                        onChange={(e) => handleValueChange(Number(e.target.value))}
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        className={inputClasses}
                    />
                );

            case 'email':
                return (
                    <input
                        type="email"
                        value={localValue as string}
                        onChange={(e) => handleValueChange(e.target.value)}
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        className={inputClasses}
                    />
                );

            case 'password':
                return (
                    <input
                        type="password"
                        value={localValue as string}
                        onChange={(e) => handleValueChange(e.target.value)}
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        className={inputClasses}
                    />
                );

            case 'url':
                return (
                    <input
                        type="url"
                        value={localValue as string}
                        onChange={(e) => handleValueChange(e.target.value)}
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        className={inputClasses}
                    />
                );

            case 'checkbox':
                return (
                    <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={localValue as boolean}
                            onChange={(e) => handleValueChange(e.target.checked)}
                            disabled={field.disabled}
                            className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <span className="text-sm text-gray-300">
                            {(localValue as boolean) ? 'Enabled' : 'Disabled'}
                        </span>
                    </label>
                );

            case 'select':
                return (
                    <select
                        value={localValue as string}
                        onChange={(e) => handleValueChange(e.target.value)}
                        disabled={field.disabled}
                        className={inputClasses}
                    >
                        {field.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                );

            default: // text
                return (
                    <input
                        type="text"
                        value={localValue as string}
                        onChange={(e) => handleValueChange(e.target.value)}
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        className={inputClasses}
                    />
                );
        }
    };

    return (
        <div
            className={`grid grid-cols-3 gap-6 py-4 px-6 border border-gray-700 rounded-lg bg-gray-800 hover:bg-gray-750 transition-colors ${className}`}
        >
            {/* Label Column */}
            <div className="flex items-center">
                <label className="text-white font-medium text-sm">
                    {formatLabel(field.key)}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                </label>
            </div>

            {/* Input Column */}
            <div className="flex items-center">{renderInput()}</div>

            {/* Description Column */}
            <div className="flex items-center">
                <p className="text-gray-400 text-sm leading-relaxed">{field.description}</p>
            </div>
        </div>
    );
};

export default ConfigRowComponent;
