// src/adapters/repositories/schemas/businessSchema.ts

import mongoose, { Document, Schema } from 'mongoose';

export interface IBusinessDocument extends Document {
    name: string;
    description: string;
    // Puedes añadir más campos según sea necesario
}

const businessSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    // Define más campos aquí si es necesario
});

export const BusinessModel = mongoose.model<IBusinessDocument>('Business', businessSchema);
