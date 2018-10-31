import _ from 'lodash';

export default function (state = {}, action) {
    switch (action.type) {
        case 'fetch_posts':
            return {
                ...state,
                pagination: action.payload.data,
                data: _.mapKeys(action.payload.data.data, 'id')
            };

        default:
            return state;
    }
}