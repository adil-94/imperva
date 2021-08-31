import * as impervaConstants from '../constants/imperva_constants'

export const getLoader = (payload) => {
  return {
    type: impervaConstants.GET_LOADER,
    payload
  };
};
export const getCurrentPage = (payload) => {
  return {
    type: impervaConstants.GET_CURRENT_PAGE,
    payload
  };
};
export const getCustomerList = (payload) => {
  return {
    type: impervaConstants.CUSTOMER_LIST,
    payload
  };
};
export const setCustomerList = (payload) => {
  return {
    type: impervaConstants.SET_CUSTOMER_LIST,
    payload
  };
};
export const getDigestedIds = (payload) => {
  return {
    type: impervaConstants.GET_DIGESTED_IDS,
    payload
  };
};
export const getCustomerDetails = (payload) => {
  return {
    type: impervaConstants.CUSTOMER_DETAILS,
    payload
  };
};
export const getActiveUersCount = (payload) => {
  return {
    type: impervaConstants.GET_COUNT_ACTIVE_USERS,
    payload
  };
};
