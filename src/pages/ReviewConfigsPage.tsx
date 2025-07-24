import {IconAbc, IconCalendarBolt, IconMailCode, IconQrcode, IconUserScreen } from "@tabler/icons-react";
import Tabs from "../components/TabComponent";


const tabs = [
    {
        id: 'review',
        label: 'Review Publishing',
        icon: <IconUserScreen />, // optional
        disabled: false,    // optional
        content: <div>PUblishing reviews</div>
    },
    {
        id: 'email',
        label: 'Email Content',
        icon: <IconMailCode />, // optional
        disabled: false,    // optional
        content: <div>Email Content</div>
    },
    {
        id: 'reminder',
        label: 'Reminder Settings',
        icon: <IconCalendarBolt />, // optional
        disabled: false,    // optional
        content: <div>Reminder Settings</div>
    },
    {
        id: 'qr',
        label: 'QR Code',
        icon: <IconQrcode />, // optional
        disabled: false,    // optional
        content: <div>QR Code</div>
    },
    {
        id: 'general',
        label: 'General Settings',
        icon: <IconAbc />, // optional
        disabled: false,    // optional
        content: <div>General Settings</div>
    }
];

const ReviewConfigsPage = () => {
    return (
        <div className={`pt-8 `}>
            <h3 className={`font-bold text-2xl text-[color:var(--color-text)]`}>Review Settings</h3>
            Hello, I'm ReviewConfigsPage!
            <Tabs
                tabs={tabs}
                variant="underline"
                size="md"
                onTabChange={(id) => console.log('Tab changed:', id)}
                defaultTab="review"
            />
        </div>
    );
};

export default ReviewConfigsPage;
