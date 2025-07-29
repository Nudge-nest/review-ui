import { FC } from 'react';

interface IHeaderTextComponentProps {
    title?: string;
    subTitle?: string;
}

export const HeaderTextComponent: FC<IHeaderTextComponentProps> = ({ title, subTitle }) => {
    return (
        <>
            <h3 className={`font-bold text-2xl text-[color:var(--color-text)]`}>{title ? title : ''}</h3>
            <p>{subTitle ? subTitle : ''}</p>
        </>
    );
};

export default HeaderTextComponent;
