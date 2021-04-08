import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import 'moment/locale/zh-cn';
import 'antd/dist/antd.css';
import './index.scss';
import zhCN from 'antd/lib/locale/zh_CN';
import reportWebVitals from './reportWebVitals';
import AppRoute from './AppRoute';
import { ConfigProvider } from 'antd';
import { Provider } from './store';
import { QueryClient, QueryClientProvider } from 'react-query';

ReactDOM.render(
  <QueryClientProvider client={new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retryOnMount: false,
        cacheTime: 1000 * 60,
        staleTime: 0,
        retry: false,
      }
    }
  })}>
    <Provider>
      <ConfigProvider locale={zhCN}>
        <HashRouter>
          <AppRoute />
        </HashRouter>
      </ConfigProvider>
    </Provider>
  </QueryClientProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
