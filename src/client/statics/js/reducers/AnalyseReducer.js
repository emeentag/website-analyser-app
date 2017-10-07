import Actions from '../actions/Actions';

export default function reducer(props = {
  analyseResult: null,
  isAnalysing: false,
  error: false,
  responseStatus: null
}, action) {
  switch (action.type) {
    
    case Actions.ANALYSE_PENDING: {
      return { ...props, analyseResult: null, isAnalysing: true, error:false, responseStatus: null }
    }

    case Actions.ANALYSE_FULFILLED: {
        return { ...props, analyseResult: action.payload.data, isAnalysing: false, error:false, responseStatus: action.payload.status }
    }

    case Actions.ANALYSE_REJECTED: {
        return { ...props, analyseResult: null, isAnalysing: false, error:true, responseStatus: action.payload.response.status }
    }

    default:
      return props;
  }
}