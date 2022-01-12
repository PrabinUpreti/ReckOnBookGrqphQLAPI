import Event from "../../models/events.js";
import { transformEvent } from "./merge.js";
import User from "../../models/users.js";

const eventResolver = {
  events: async () => {
    try {
      const events = await Event.find();
      const event = events.map((event) => {
        return transformEvent(event);
      });
      return event;
    } catch (err) {
      throw err;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }

    const event = new Event({
      title: args.eventInput.title,
      description: args.eventInput.description,
      price: args.eventInput.price,
      date: new Date(args.eventInput.date),
      creator: req.userId,
    });
    let createdEvent;
    try {
      const result = await event.save();
      createdEvent = transformEvent(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error("User doesnot exist");
      }
      creator.createdEvents.push(event);
      await creator.save();
      return createdEvent;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
export default eventResolver;
