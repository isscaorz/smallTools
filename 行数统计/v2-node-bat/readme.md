# 代码统计cocode

> 统计代码行数工具

## 运行方法

``` bash
# 命令示例：node ccode.js ，在弹出的选择器中选择要统计的文件夹
node ccode.js 
```

## 过滤筛选条件调节

``` bash
Ø filterFolder       // 需要过滤的文件夹
Ø filterFile         // 需要过滤的文件（只需要文件名，不加文件类型后缀）
Ø filterType         // 需要过滤的文件类型（ . 开头的文件类型后缀表示）
Ø onlyTypes          // 只检查此数组内规定的文件类型（前面三个过滤条件依旧生效）
```