import { GET_POST_LIST } from "../action/action_constant/action_constant";
const initialState = [];
export default function postReducer(state = initialState, action) {

  switch (action.type) {
    case GET_POST_LIST:
      return {
        getPostDetails: action.Payload
      };

    default:
      return { ...state };
  }
}
