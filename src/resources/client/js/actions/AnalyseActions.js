import Actions from '../actions/Actions';

export function doSearch(searchPromise) {
  return function (dispatch) {
    dispatch({
      type: Actions.DO_ANALYSE,
      payload: searchPromise
    })
  }
}