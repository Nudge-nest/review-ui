import { IconLoader } from '@tabler/icons-react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-full">
            <IconLoader className="animate-spin text-[color:var(--color-main)]" size={48} stroke={2} />
        </div>
    );
};

export default Loading;
