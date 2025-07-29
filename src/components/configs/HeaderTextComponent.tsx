import { FC } from 'react';
import { useReviewConfig } from '../../contexts/ReviewConfigContext.tsx';

interface IHeaderTextComponentProps {
    title?: string;
    subTitle?: string;
}

export const HeaderTextComponent: FC<IHeaderTextComponentProps> = ({ title, subTitle }) => {
    const { reviewConfigFormHoook } = useReviewConfig();
    return (
        <div>
            <div>
                <h3 className={`font-bold pb-2 text-2xl text-[color:var(--color-text)]`}>{title ? title : ''}</h3>
                <p className={`font-normal pb-2 text-base text-[color:var(--color-text)]`}>
                    {subTitle ? subTitle : ''}
                </p>
            </div>
            {/* Save Button */}
            <div className="mt-8 flex justify-end">
                <button
                    onClick={reviewConfigFormHoook.handleUpdateReviewConfig}
                    className="px-6 py-3 cursor-pointer bg-[color:var(--color-main)] hover:bg-[color:var(--color-main)]
                    text-[color:var(--color-text)] font-medium rounded-lg transition-colors focus:outline-none focus:none"
                >
                    Save Configuration
                </button>
            </div>
        </div>
    );
};

export default HeaderTextComponent;
