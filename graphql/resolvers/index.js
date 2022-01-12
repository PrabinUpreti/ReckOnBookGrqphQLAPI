import authResolver from "./auth.js";
import bookingResolver from "./booking.js";
import eventResolver from "./events.js";

const rootResolver = {
  ...authResolver,
  ...bookingResolver,
  ...eventResolver,
};
export default rootResolver;
