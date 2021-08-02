import { types } from "../types/types"

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                uId: action.payload.uId,
                name: action.payload.displayName
            };
        case types.logout:
            return {};
        default:
            return state;
    }
}