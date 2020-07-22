import { message } from 'antd';
import queryString from 'query-string';
import wretch, { WretcherError } from 'wretch';

// env
const { REACT_APP_API_FUN, REACT_APP_API_POAP, REACT_APP_POAP_APP } = process.env;

type Params = {
  [key: string]: string | number | boolean | undefined;
};

// Endpoints
export const endpoints = {
  poap: {
    events: `${REACT_APP_API_POAP}/events`,
    scan: (address: string) => `${REACT_APP_API_POAP}/actions/scan/${address}`,
    webScan: (address: string) => `${REACT_APP_POAP_APP}/scan/${address}`,
  },
  fun: {
    raffles: {
      all: `${REACT_APP_API_FUN}/api/v1/raffles/`,
      detail: (id: number) => `${REACT_APP_API_FUN}/api/v1/raffles/${id}/`,
      images: `${REACT_APP_API_FUN}/api/v1/raffles/text-editor-image/`,
      join: `${REACT_APP_API_FUN}/api/v1/participants/signup_address/`,
    },
    prizes: {
      all: `${REACT_APP_API_FUN}/api/v1/prizes/`,
      detail: (id: number) => `${REACT_APP_API_FUN}/api/v1/prizes/${id}/`,
    },
    results: {
      all: `${REACT_APP_API_FUN}/api/v1/results/`,
      detail: (id: number) => `${REACT_APP_API_FUN}/api/v1/results/${id}/`,
    },
    participants: {
      all: (params: Params) => `${REACT_APP_API_FUN}/api/v1/participants/?${queryString.stringify(params)}`,
      detail: (id: number) => `${REACT_APP_API_FUN}/api/v1/participants/${id}/`,
    },
  },
};

// Handlers
const handleHttpError = (errorCode: number) => (error: WretcherError) => {
  try {
    const errorMessage = error?.message;

    if (error) {
      const parsedMessage = JSON.parse(errorMessage);

      for (const key in parsedMessage) {
        const value: string | string[] = parsedMessage[key];

        if (Array.isArray(value)) {
          value.forEach((valueString) => message.error(valueString));
        } else if (typeof value === 'string') {
          message.error(value);
        }
      }
    }
  } catch (error) {
    console.error(`Fetch error on ${errorCode} code parsing`, error);
  }

  throw error;
};

const handleGenericError = () => (error: WretcherError) => {
  message.error('An error ocurred');
  throw error;
};

const handleWrongToken = () => (error: WretcherError) => {
  message.error('Invalid token');
};

// Custom fetch
export const api = () => {
  return wretch()
    .catcher(401, handleWrongToken())
    .catcher(404, handleGenericError())
    .catcher(405, handleHttpError(405))
    .catcher(400, handleHttpError(400));
};
