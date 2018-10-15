
export const pageServicePath =
  process.env.NODE_ENV === 'development' ? "http://localhost:8088/gen" : "./";

export const isDev =
  process.env.NODE_ENV === 'development' ? true : false;

export const isMultiPage = false;


