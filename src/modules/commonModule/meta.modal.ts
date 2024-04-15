// baseModel.ts

import { Document, Schema } from 'mongoose';

export interface MetaDataInterface extends Document {
    metaData: {
        title?: string;
        description?: string;
        keywords?: string;
        image?: string;
        canonicalUrl?: string;
    };
}

export const metaSchema = new Schema<MetaDataInterface>({
    metaData: {
        title: { type: String },
        description: { type: String },
        keywords: { type: String },
        image: { type: String },
        canonicalUrl: { type: String },
    },
});

// Common methods or middleware can be added to the schema
