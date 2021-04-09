### 项目环境配置
通过.env.*文件设置通用配置
.env.development 开发环境
.env.fat 测试环境
.env.production 生产环境

REACT_APP_WEBSITE_NAME 项目名称
REACT_APP_WEB_UUID 项目唯一uuid,自行生成
REACT_APP_API_CONFIG api路径
PUBLIC_URL 打包资源路径

### 项目配置
目录 src/config/config.ts
- PAGE_SIZE 分页条数
- HOT_LINE 技术服务热线
- FOOTER_TEXT 底部文言

### 目录结构
- assets 公共资源
- config 配置文件
- hooks 公用hooks
- service API服务
- store 状态管理
- utils 工具函数
- views 页面

### 计划功能命令行
创建页面
1. lumu-cli create;
初始化项目
2. lumu-cli init