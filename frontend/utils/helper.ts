import { notify } from 'react-notify-toast';
import pathOr from 'ramda/es/pathOr';

export const extractErrorMessage = (error: unknown): string => {
  return pathOr('Error', ['response', 'body', 'message'], error);
};

export const notifyError = error => {
  const message = error.response
    ? `${
        error.response.body.errors === undefined
          ? ''
          : 'Error: ' + JSON.stringify(error.response.body.errors)
      } Message: ${error.response.body.message}`
    : error.toString();
  notify.show(message, 'error');
};

export const notifySuccess = message => {
  if (message) notify.show(message.toString(), 'success');
};



