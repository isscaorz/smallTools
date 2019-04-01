# 代码统计ccode

> 统计代码行数工具

## 运行方法

``` bash
# 其中，要校验的项目文件夹地址可以为空,当为空值时，默认ccode.js所在文件夹为项目根目录，注意，windows环境下，文件夹分隔符为 \\ 
# 命令示例1：node ccode.js 
# 命令示例2：node ccode.js D:\\korDeta\\ProjectWork\\20190213code\\VStori
node ccode.js [要校验的项目地址]
```

## 过滤筛选条件调节

``` bash
Ø filterFolder       // 需要过滤的文件夹
Ø filterFile         // 需要过滤的文件（只需要文件名，不加文件类型后缀）
Ø filterType         // 需要过滤的文件类型（ . 开头的文件类型后缀表示）
Ø onlyTypes          // 只检查此数组内规定的文件类型（前面三个过滤条件依旧生效）
```