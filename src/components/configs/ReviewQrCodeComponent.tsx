import ConfigRowComponent from './ConfigRowComponent.tsx';
import Loading from '../Loading.tsx';
import { useReviewConfig } from '../../contexts/ReviewConfigContext.tsx';
import HeaderTextComponent from './HeaderTextComponent.tsx';
import ColumnHeaderComponent from './ColumnHeaderComponent.tsx';

const ReviewQrCodeComponent = () => {
    const { reviewConfigs, reviewConfigFormHoook } = useReviewConfig();

    return (
        <div>
            <HeaderTextComponent title="QR Code" subTitle="Configure QR code for live store reviews" />
            {/* Column Headers */}
            <ColumnHeaderComponent columns={['Setting', 'Value', 'Description']} />
            {/* Configuration Rows */}
            <div className="space-y-3">
                {reviewConfigs?.qrCode ? (
                    reviewConfigs.qrCode.map((field) => {
                        return (
                            <ConfigRowComponent
                                key={field.key}
                                field={field}
                                onFieldChange={reviewConfigFormHoook.handleFieldChange}
                                objPropName="qrCode"
                            />
                        );
                    })
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
};

export default ReviewQrCodeComponent;
