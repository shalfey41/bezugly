import { isDev } from "./env";

export const canShowPost = (data = {}) => {
  if (isDev()) {
    return true;
  }

  if (!data.hasOwnProperty('draft')) {
    return true;
  }

  return !data.draft;
};
