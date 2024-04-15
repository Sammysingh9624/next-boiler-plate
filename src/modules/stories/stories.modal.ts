import { Schema, model } from 'mongoose';
import { BaseModelInterface, baseSchema } from '../../base/baseModal';
import { metaSchema } from '../commonModule/meta.modal';

export interface IContentDetails {
    title?: string;
    coverImage?: string;
    description?: string;
    link?: string;
    styles?: {
        title?: string;
        description?: string;
        logo?: string;
    };
    images?: ImageDetails[];
}
export interface ImageDetails {
    title?: string;
    image?: string;
    description?: string;
    styles?: {
        title?: string;
        image?: string;
        description?: string;
    };
}

const imagesDetailsSchema = new Schema<ImageDetails>({
    title: { type: String },
    image: { type: String },
    description: { type: String },
    styles: {
        title: { type: String },
        image: { type: String },
        description: { type: String },
    },
});
const contentSchema = new Schema<IContentDetails>({
    title: { type: String },
    coverImage: { type: String },
    description: { type: String },
    link: { type: String },
    styles: {
        title: { type: String },
        description: { type: String },
        logo: { type: String },
    },
    images: [imagesDetailsSchema],
});

export interface StoriesInterface extends BaseModelInterface {
    title: string;
    slug?: string;
    coverImage?: string;
    logo?: string;
    content?: IContentDetails[];
}

const storiesSchema = new Schema<StoriesInterface>({
    title: { type: String, required: true },
    slug: { type: String },
    coverImage: { type: String },
    logo: { type: String },
    content: [contentSchema],
})
    .add(baseSchema)
    .add(metaSchema);

storiesSchema.pre('save', function (next) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-').slice(0, 200);
    next();
});

const StoriesModel = model<StoriesInterface>('Stories', storiesSchema);

export default StoriesModel;
