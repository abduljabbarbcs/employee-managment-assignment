import {notifyError} from "./helper";

export function logAndThrow(err, notify = true): never {
  console.error(err.response ? err.response : err);
  if (notify) notifyError(err);

  throw err;
}
