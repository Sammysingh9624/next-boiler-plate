import { Schema, model } from 'mongoose';
import { BaseModelInterface, baseSchema } from '../../base/baseModal';

export interface InformationDetail {
    image: string;
    title: string;
    description: string;
}
export enum INFO_TYPE {
    Waterfall = 'waterfall',
    Block = 'block',
}
export interface ServiceInterface extends BaseModelInterface {
    header: {
        slug: string;
        title: string;
        subtitle: string;
        headerImage: string;
    };
    preview: {
        title?: string;
        description: string;
    }[];
    information?: {
        title: string;
        type: INFO_TYPE;
        details: InformationDetail[];
    };
}
const informationDetailSchema = new Schema<InformationDetail>({
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
});

const serviceSchema = new Schema<ServiceInterface>({
    header: {
        slug: { type: String, required: true },
        title: { type: String, required: true },
        subtitle: { type: String, required: true },
        headerImage: { type: String, required: true },
    },
    preview: [
        {
            title: { type: String },
            description: { type: String, required: true },
        },
    ],
    information: {
        title: { type: String, required: true },
        type: { type: String, enum: INFO_TYPE, required: true, default: INFO_TYPE.Waterfall },
        details: [informationDetailSchema],
    },
}).add(baseSchema);

// Add methods or middleware specific to the user model if needed

const ServiceModel = model<ServiceInterface>('Service', serviceSchema);

export default ServiceModel;
