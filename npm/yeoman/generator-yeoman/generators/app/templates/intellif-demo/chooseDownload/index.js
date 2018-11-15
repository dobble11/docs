import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/zh-cn'; //全局设置时间、日期插件为中文模式
import { LocaleProvider } from 'antd';
import rootStore from './constants/rootStore';
import App from './components/Main';

//全局设置moment中文模式
moment.locale('zh-cn');

let baseName = '';
if (process && process.env && process.env.NODE_ENV === 'production') {
  console.log('生产环境 Router basename: ', process.env.PUBLIC_URL);
  baseName = process.env.PUBLIC_URL;
}

ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
    <Provider store={rootStore}>
      <Router basename={baseName}>
        <div id="wrap">
          <App />
        </div>
      </Router>
    </Provider>
  </LocaleProvider>,
  document.getElementById('app')
);

// registerServiceWorker();
