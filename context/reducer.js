import { saveState } from "./browser-storage";
import { CHANGE_LANG } from "./type";

export default function reducer(state, action) {
  switch (action.type) {
    case CHANGE_LANG:
      saveState("lang", action.payload);
      return {
        ...state,
        lang: action.payload,
      };
    default:
      return state;
  }
}
