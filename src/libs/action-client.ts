import { DEFAULT_SERVER_ERROR_MESSAGE, createSafeActionClient } from "next-safe-action";

class ActionError extends Error {}

export const action = createSafeActionClient({
  handleServerError(e) {
    console.error("Action error:", e.message);

    if (e instanceof ActionError) {
      return e.message;
    }

    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
});
