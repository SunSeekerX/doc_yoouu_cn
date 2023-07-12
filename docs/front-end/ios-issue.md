# Ios - 问题

1. Uni-app 添加新的库依赖 sdk 包找不到 `.framework` 的问题

   可以去 `apple sdk 里面找`，问题为编译到模拟器正常，编译到真机报下面的错误

   ```
   error build: Undefined symbol: _OBJC_CLASS_$_MTKView
   ```

## 完美修改项目名

### 1.修改工程名字

打开工程 点击工程名称 回车 直接修改

![img](https://static.yoouu.cn/imgs/doc/front-end/ios/SouthEast.png)

此时会弹出一个对话框，点击 Rename

![img](https://static.yoouu.cn/imgs/doc/front-end/ios/SouthEast-20220917130547926.png)

### 2. 修改 scheme 名称

![img](https://static.yoouu.cn/imgs/doc/front-end/ios/SouthEast-20220917130615698.png)

弹出对话框 会车直接修改 修改完成之后 点击 Close

![img](https://static.yoouu.cn/imgs/doc/front-end/ios/SouthEast-20220917130638915.png)

### 3.修改目录名称

点击工程内需要修改名字的目录 回车直接修改

![img](https://static.yoouu.cn/imgs/doc/front-end/ios/SouthEast-20220917130820602.png)

点击 Find 选择 查找替换

![img](https://static.yoouu.cn/imgs/doc/front-end/ios/SouthEast-20220917130839907.png)

点击全部替换

![img](https://static.yoouu.cn/imgs/doc/front-end/ios/SouthEast-20220917130859173.png)

部分替换不了的 手动点进去修改

![img](https://static.yoouu.cn/imgs/doc/front-end/ios/SouthEast-20220917130914340.png)

### 4.修改实体文件夹名称

在文件夹内 将对应的文件夹回车直接修改

![img](https://static.yoouu.cn/imgs/doc/front-end/ios/SouthEast-20220917131000048.png)

### 5.修改.xcodeproj 右键显示包内容

![img](https://static.yoouu.cn/imgs/doc/front-end/ios/SouthEast-20220917131057710.png)

双击打开.pbxproj 文件

![img](https://static.yoouu.cn/imgs/doc/front-end/ios/SouthEast-20220917131118418.png)

查找替换全部

![img](https://static.yoouu.cn/imgs/doc/front-end/ios/SouthEast-20220917131206417.png)

### 6.如果有 pod (无 pod 忽略)

删除原来的 pod 对应的三项

![img](https://static.yoouu.cn/imgs/doc/front-end/ios/SouthEast-20220917131238030.png)

重新 pod install （注意 不要用 pod install --verbose --no-repo-update ）

### 7.修改 target 名称

选中 target 名称按回车就能修改。

### 8.总结

1. 修改完成搜索原来的名称应该是没有结果的，建议用 `vscode` 搜索项目下所有的文件，比如我的关键词是 `HBuilder`
2. 全局替换习惯用 `vscode` 会比较方便和直观一点
3. 全局替换应该要在 `xcode` 内修改好其他可以直接修改名字的地方之后进行
