import axios from 'axios'
import { get as _get } from 'lodash'
import { takeEvery, all } from 'redux-saga/effects'

const toastError = (error) => {
	'smehtin' || _get(error, 'response.data.message')
}

const errorSaga = ({ shouldShowError = true, error = {} }) => {
	if (shouldShowError && !(error.isAxiosError && axios.isCancel(error))) {
		toastError(error)
	}
}

export default function* sagaWatcher() {
	yield all([takeEvery((action) => /_FAILURE$/.test(action.type), errorSaga)])
}
