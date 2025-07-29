import ConfigRowComponent from './ConfigRowComponent.tsx';
import Loading from '../Loading.tsx';
import { useReviewConfig } from '../../contexts/ReviewConfigContext.tsx';
import HeaderTextComponent from './HeaderTextComponent.tsx';
import ColumnHeaderComponent from './ColumnHeaderComponent.tsx';

const ReviewEmailReminderComponent = () => {
    const { reviewConfigs, reviewConfigFormHoook } = useReviewConfig();

    return (
        <div>
            <HeaderTextComponent title="Email Reminders" subTitle="Configure reminders to send to your customers" />
            {/* Column Headers */}
            <ColumnHeaderComponent columns={['Setting', 'Value', 'Description']} />
            {/* Configuration Rows */}
            <div className="space-y-3">
                {reviewConfigs?.remindersFrequency ? (
                    reviewConfigs.remindersFrequency.map((field) => {
                        let fieldWithOptions;
                        if (field.key === 'remindersPeriod') {
                            fieldWithOptions = {
                                ...field,
                                options: [
                                    { value: 'BIWEEKLY', label: 'Two times in a week' },
                                    { value: 'WEEKLY', label: 'Once every week' },
                                    { value: 'BIMONTHLY', label: 'Twice in a month' },
                                    { value: 'MONTHLY', label: 'Once every month' },
                                ],
                            };
                        } else {
                            fieldWithOptions = { ...field };
                        }
                        return (
                            <ConfigRowComponent
                                key={field.key}
                                field={fieldWithOptions}
                                onFieldChange={reviewConfigFormHoook.handleFieldChange}
                                objPropName='remindersFrequency'
                            />
                        );
                    })
                ) : (
                    <Loading />
                )}
            </div>
            <div className="space-y-3">
                {reviewConfigs?.reminderEmailContent ? (
                    reviewConfigs.reminderEmailContent.map((field) => {
                        return (
                            <ConfigRowComponent
                                key={field.key}
                                field={field}
                                onFieldChange={reviewConfigFormHoook.handleFieldChange}
                                objPropName='reminderEmailContent'
                            />
                        );
                    })
                ) : (
                    <Loading />
                )}
            </div>
            {/* Save Button */}
            <div className="mt-8 flex justify-end">
                <button
                    onClick={() => {
                        console.log('Saving configuration:');
                        // Here you would typically send the data to your API
                    }}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    Save Configuration
                </button>
            </div>
        </div>
    );
};

export default ReviewEmailReminderComponent;
