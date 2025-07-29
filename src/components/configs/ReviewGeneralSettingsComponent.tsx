import ConfigRowComponent from './ConfigRowComponent.tsx';
import Loading from '../Loading.tsx';
import { useReviewConfig } from '../../contexts/ReviewConfigContext.tsx';
import HeaderTextComponent from './HeaderTextComponent.tsx';
import ColumnHeaderComponent from './ColumnHeaderComponent.tsx';

const ReviewGeneralSettingsComponent = () => {
    const { reviewConfigs, reviewConfigFormHoook } = useReviewConfig();

    return (
        <div>
            <HeaderTextComponent title="General Settings" subTitle="Configure other types of customization" />
            {/* Column Headers */}
            <ColumnHeaderComponent columns={['Setting', 'Value', 'Description']} />
            {/* Configuration Rows */}
            <div className="space-y-3">
                {reviewConfigs?.general ? (
                    reviewConfigs.general.map((field) => {
                        return (
                            <ConfigRowComponent
                                key={field.key}
                                field={field}
                                onFieldChange={reviewConfigFormHoook.handleFieldChange}
                                objPropName='general'
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

export default ReviewGeneralSettingsComponent;
