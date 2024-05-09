import mongoose, { Schema, Document, Model } from 'mongoose';

// Interface for movie document
interface IMovie extends Document {
	name: string;
	type: string;
	score: number;
	created_by: string;
}

// Define movie schema
const movieSchema: Schema<IMovie> = new Schema({
	name: String,
	type: String,
	score: Number,
	created_by: String
});

// Define movie model
const MoviekModel: Model<IMovie> = mongoose.model<IMovie>('Movie', movieSchema);

export default MoviekModel;
