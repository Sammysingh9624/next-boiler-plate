import { Schema, model } from 'mongoose';
import { BaseModelInterface } from '../../base/baseModal';

export interface UserInterface extends BaseModelInterface {
    // Define user-specific fields here
    username: string;
    email: string;
    // Add other user-specific fields if needed
}

const userSchema = new Schema<UserInterface>({
    username: String,
    email: String,
    // Define other user-specific fields here
});

// Add methods or middleware specific to the user model if needed

const UserModel = model<UserInterface>('User', userSchema);

export default UserModel;
