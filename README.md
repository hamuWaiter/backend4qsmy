# 脚本解释：
* server：服务器启动脚本
* migrate：修改prisma->schema.prisma后快速建表的脚本
* generate：创建ts类型
* start：开发时运行的脚本
* prebuild：删除build缓存

# 启动：
* generate生成ts类型提示（可选：方便操作表）
* start 启动后端

# 注意事项：
* 修改main.ts代码后，需要清理掉之前的dist然后再重新启动后台

# windows下开发配置
jetbrains 设置 编辑器-代码样式-行分割符 修改为 unix 和 macOS /n

关闭lf crlf 自动转换
> git config --global core.autocrlf false

拒绝提交包含混合换行符的文件
> git config --global core.safecrlf true


