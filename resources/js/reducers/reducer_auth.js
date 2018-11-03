export default function (state = {}, action) {
    switch (action.type) {
        case 'register_user':
            return {
                ...state,
                data
            }
    
        default:
            return state;
    }
}