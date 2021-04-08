### 项目配置
通过.env.*文件设置通用配置
.env.development 开发环境
.env.fat 测试环境
.env.production 生产环境

REACT_APP_WEBSITE_NAME 项目名称
REACT_APP_WEB_UUID 项目唯一uuid,自行生成
REACT_APP_API_CONFIG api路径
REACT_APP_PAGE_SIZE 分页数
PUBLIC_URL 打包资源路径

### 目录结构
- assets 公共资源
- config 配置文件
- hooks 公用hooks
- store 状态管理
- utils 工具函数
- views 页面
  - *-interface.ts 模块接口
  - *-routes.ts 模块路由
  - service 模块接口封装

### 计划功能命令行
创建模块路由
1. lumu-cli create route order;
创建常规页面
2. lumu-cli create page order-detail
创建列表页面
3. lumu-cli create list order-list