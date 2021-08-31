import * as ImpervaConstants from '../constants/imperva_constants'

const initialState = {
    customersList: [],
    loader: true,
    countOfActiveUsers: 0,
    digestedIds: new Map(),
    currentPage: 0,
    customerDetails: [],
}
const impervaReducer = (state = initialState, action) => {
    const newState = Object.assign({}, state)
    switch (action.type) {

        case ImpervaConstants.SET_CUSTOMER_LIST:
            newState.customersList = action.payload;
            return newState

        case ImpervaConstants.SET_DIGESTED_IDS:
            newState.digestedIds = action.payload;
            return newState

        case ImpervaConstants.GET_LOADER:
            newState.loader = action.payload
            return newState

        case ImpervaConstants.CUSTOMER_DETAILS:
            newState.customerDetails = action.payload
            return newState

        case ImpervaConstants.SET_CUSTOMER_DETAILS:
            newState.customerDetails = action.payload
            return newState

        case ImpervaConstants.GET_CURRENT_PAGE:
            newState.currentPage = action.payload
            return newState

        case ImpervaConstants.GET_COUNT_ACTIVE_USERS:
            newState.countOfActiveUsers = action.payload
            return newState

        default:
            return state
    }
}
export default impervaReducer;
