import './index.html'
import dva from 'dva'
import createLogger from 'redux-logger'
import { browserHistory } from 'dva/router'
import AV from 'leancloud-storage'
import * as LC_CONFIG from './constants/adminConfig'
import {message} from 'antd'
import { persistStore, autoRehydrate } from 'redux-persist'

const KM_Dev = {
  appId: LC_CONFIG.LC_DEV_APP_ID,
  appKey: LC_CONFIG.LC_DEV_APP_KEY,
}

const KM_PRO = {
  appId: LC_CONFIG.LC_PRO_APP_ID,
  appKey: LC_CONFIG.LC_PRO_APP_KEY,
}

//AV.setProduction(false)

// 1. Initialize
AV.init(
  KM_Dev
)

const app = dva({
  initialState: {},
  history: browserHistory,
  onAction: createLogger(),
  // extraEnhancers: [autoRehydrate()],
  onError(e) {
    message.error(e.message, 3)
  }
})

// 2. Model
app.model(require('./models/app'))
app.model(require('./models/dashboard'))
app.model(require('./models/users'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')

persistStore(app._store)
