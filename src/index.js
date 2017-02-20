import './index.html'
import dva from 'dva'
import createLogger from 'redux-logger';
import AV from 'leancloud-storage'
import * as LC_CONFIG from './constants/adminConfig'
import {message} from 'antd'
import {Map,Record,List} from 'immutable'

const KM_Dev = {
  appId: LC_CONFIG.LC_DEV_APP_ID,
  appKey: LC_CONFIG.LC_DEV_APP_KEY,
}

const KM_PRO = {
  appId: LC_CONFIG.LC_PRO_APP_ID,
  appKey: LC_CONFIG.LC_PRO_APP_KEY,
}

//AV.setProduction(false)
AV.init(
  KM_Dev
)
// 1. Initialize
const app = dva({
    onAction: createLogger(),
    onError(e) {
      message.error(e.message, 3)
    }
  }
)

// 2. Model

app.model(require('./models/app'))
// app.model(require('./models/dashboard'))
// app.model(require('./models/users'))
 app.model(require('./models/BGManager/personManager'))

// 3. Router
app.router(require('./router'))

// 4. Start
app.start('#root')
