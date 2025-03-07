import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema({
  type: { type: String, enum: ['scan', 'buttonClick'], required: true }, // Type of event
  timestamp: { type: Date, default: Date.now }, // Timestamp of the event
});

const EventModel = mongoose.model('Event', eventSchema);

export default EventModel;