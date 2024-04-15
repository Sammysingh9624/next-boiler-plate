// baseModel.ts

import { Document, Schema } from 'mongoose';

export interface BaseModelInterface extends Document {
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date | null; // Optional for soft deletes
    // Add other common fields if needed
}

export const baseSchema = new Schema<BaseModelInterface>({
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date, default: null }, // Optional for soft deletes
    // Define other common fields here
});

// Common methods or middleware can be added to the schema
