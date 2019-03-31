import { combineReducers } from 'redux';
import types from './types';

/* State Shape
{
    showAdd: bool,
    showEdit: bool,
    showDelete: bool,
}
*/

const showAddReducer = (state = false, action) => {
  switch (action.type) {
    case types.SHOW_ADD_MODAL:
      return !state;
    case types.CLOSE_ADD_EDIT:
      return false;
    default:
      return state;
  }
};

const showEditReducer = (state = false, action) => {
  switch (action.type) {
    case types.SHOW_EDIT_MODAL:
      return !state;
    case types.CLOSE_ADD_EDIT:
      return false;
    default:
      return state;
  }
};

const showDeleteReducer = (state = false, action) => {
  switch (action.type) {
    case types.SHOW_DELETE_MODAL:
      return !state;
    default:
      return state;
  }
};

export default combineReducers({
  showAdd: showAddReducer,
  showEdit: showEditReducer,
  showDelete: showDeleteReducer
});
