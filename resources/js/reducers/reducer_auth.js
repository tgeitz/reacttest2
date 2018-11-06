export default function (state = {}, action) {
    switch (action.type) {
        case 'register_user':
            return {
                ...state,
                data: action.payload.data
            }

        case 'logout_user':
            return {
                ...state,
                data: action.payload.data
            }
    
        default:
            return state;
    }
}