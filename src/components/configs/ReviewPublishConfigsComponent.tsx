import ConfigRowComponent from './ConfigRowComponent.tsx';
import Loading from '../Loading.tsx';
import { useReviewConfig } from '../../contexts/ReviewConfigContext.tsx';
import HeaderTextComponent from './HeaderTextComponent.tsx';
import ColumnHeaderComponent from './ColumnHeaderComponent.tsx';

const ReviewPublishConfigsComponent = () => {
    const { reviewConfigs, reviewConfigFormHoook } = useReviewConfig();

    return (
        <div>
            <HeaderTextComponent title="Publish Configuration" subTitle="Configure your review publishing defaults" />
            {/* Column Headers */}
            <ColumnHeaderComponent columns={['Setting', 'Value', 'Description']} />
            {/* Configuration Rows */}
            <div className="space-y-3">
                {reviewConfigs?.publish ? (
                    reviewConfigs.publish.map((field) => {
                        const fieldWithOptions = {
                            ...field,
                            options: [
                                { value: 'THREESTARS', label: 'Three stars' },
                                { value: 'FOURSTARS', label: 'Four stars' },
                                { value: 'FIVESTARS', label: 'Five stars' },
                            ],
                        };
                        return (
                            <ConfigRowComponent
                                key={field.key}
                                field={fieldWithOptions}
                                onFieldChange={reviewConfigFormHoook.handleFieldChange}
                                objPropName='publish'
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
                    onClick={reviewConfigFormHoook.handleUpdateReviewConfig}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    Save Configuration
                </button>
            </div>
        </div>
    );
};

export default ReviewPublishConfigsComponent;
