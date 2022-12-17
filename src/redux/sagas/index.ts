import LoginModuleSaga from '../../pages/Login/login.saga'
import { all, fork } from 'redux-saga/effects'
import UserModuleSaga from '../../pages/Users/users.saga'
import FundModuleSaga from '../../pages/Funds/funds.saga'
import QozbModuleSaga from '../../pages/QOZBS/qozbs.saga'
import InvestorModuleSaga from '../../pages/Investors/investors.saga'
import CapzoneIdModuleSaga from '../../pages/CapzoneIds/capzoneIds.saga'

export default function* rootSaga(): Generator {
	yield all([
		fork(LoginModuleSaga),
		fork(UserModuleSaga),
		fork(FundModuleSaga),
		fork(QozbModuleSaga),
		fork(InvestorModuleSaga),
		fork(CapzoneIdModuleSaga),
	])
}
