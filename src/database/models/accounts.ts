import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for account document
interface IAccount extends Document {
	username: string;
	fullName: string;
	email: string;
	password: string;
}

// Define account schema
const accountSchema: Schema<IAccount> = new Schema({
	username: String,
	fullName: String,
	email: String,
	password: String
});

// Define account model
const AccountModel: Model<IAccount> = mongoose.model<IAccount>('Account', accountSchema);

export default AccountModel;
