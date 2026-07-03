# Android - 问题

1. MaterialCardView 设置边框颜色不生效

   ```kotlin
   // 直接设置不行的
   mCardVipType?.strokeColor = R.color.common_color_vip_stroke_selected
   // 需要这样设置
   mCardVipType.strokeColor = ContextCompat.getColor(
     this@VipActivity,
     R.color.common_color_vip_stroke_selected
   )
   ```

2. recycleview + StaggeredGridLayoutManager 实现瀑布流 放在 viewpaer2 里面，滑动列表，瀑布流列表高度重新排列。

   看问题：[https://stackoverflow.com/questions/65539771/recyclerview-with-staggeredgridlayoutmanager-in-viewpager-arranges-items-automa](https://stackoverflow.com/questions/65539771/recyclerview-with-staggeredgridlayoutmanager-in-viewpager-arranges-items-automa)

   他用的 viewpager 我用的 viewpager2，用 viewpaer 整个 recycleview 都重新渲染。。。

   无解。

3. `ClickableSpan` 造成内存泄漏?

   实现 `NoCopySpan` 接口，然后对 textview 设置 `android:importantForAccessibility="no"` 属性，否则应用会崩溃

4. 微信支付 `支付验证签名失败` code 为 `-2` 这个过程能调起微信了，说明 sdk 这边处理没有问题。微信返回字段有个`package`为保留字段，无法直接用过 key 名，让后端改为 `wxpayPackage`，随后签名验证失败，实际上这个字段可以写死。

5. Installation did not succeed. The application could not be installed: INSTALL_FAILED_USER_RESTRICTED

   > RESTRICTED 意为限制；
   >
   > “Installation via USB is disabled”说明 usb 不可用。

   解决方法: 打开手机中的“设置”->“开发者选项” ，勾选“usb 调试”和“usb 安装”，都允许。

   有时会遇到无法勾选“usb 安装”，这时，查看一下手机是否有 sim 卡，如果没有，插入 sim 卡，可能就好了。

   重新安装，就可以了。如果已经是打开的重新打开关闭一下。
