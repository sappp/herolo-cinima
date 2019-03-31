import types from './types'


const toggleShowDelete = () => ({
  type: types.SHOW_DELETE_MODAL
});

const toggleShowAdd = () => ({
  type: types.SHOW_ADD_MODAL
});

const toggleShowEdit = () => ({
  type: types.SHOW_EDIT_MODAL
});

const closeAddEdit = () => ({
  type: types.CLOSE_ADD_EDIT
});

export {
  toggleShowDelete,
  toggleShowAdd,
  toggleShowEdit,
  closeAddEdit
};
