## 用命令下载发行版本

```shell
wsl --list --online

wsl --install -d <DistroName>
wsl --install -d Ubuntu-24.04
```



## 用文件管理器打开当前路径

```
explorer.exe .
```

## wsl ubuntu 默认打开 root

在 WSL (Windows Subsystem for Linux) 中，默认以非 root 用户身份运行。如果你希望每次打开 WSL Ubuntu 时默认以 root 用户身份运行，可以按照以下步骤操作：

1. **打开 WSL**： 首先，打开你的 WSL 终端。

2. **打开 WSL 的配置文件**： 在 WSL 终端中，输入以下命令来编辑配置文件：

   ```bash
   sudo nano /etc/wsl.conf
   ```

   如果 `/etc/wsl.conf` 文件不存在，这个命令会创建一个新的文件。

3. **添加或修改配置**： 在 `wsl.conf` 文件中，添加或确保以下内容存在：

   ```csharp
   [user]
   default=root
   ```

   这里 `[user]` 部分指定了用户配置，而 `default=root` 表示默认用户为 root。

4. **保存并关闭文件**： 如果你使用的是 `nano` 编辑器，可以通过按 `Ctrl+X`，然后按 `Y` 确认保存，最后按 `Enter` 键来保存并退出。

5. **重启 WSL**： 为了使更改生效，需要重启 WSL。在 Windows 命令提示符或 PowerShell 中运行以下命令：

   ```powershell
   wsl --shutdown
   ```

   然后重新启动 WSL。

请注意，以 root 用户身份运行 WSL 并不总是推荐的做法，因为这可能带来安全风险。确保你了解以 root 用户运行的后果，并在需要时才这样做。

## 设置默认为 root 用户方法二

```powershell
# 进入安装的 apps 目录
cd "C:\Program Files\WindowsApps"
# 查找 ubuntu 目录
dir CanonicalGroupLimited*
# 我们需要在这几个文件夹中找到含有：buntu<版本号>.exe文件
# 我的是在 CanonicalGroupLimited.Ubuntu22.04LTS_2204.2.45.0_x64__79rhkp1fndgsc 这个文件夹下面
d----         2023/5/10     22:15                CanonicalGroupLimited.Ubuntu22.04LTS_2204.2.45.0_neutral_~_79rhkp1fndgsc
d----         2023/5/10     22:15                CanonicalGroupLimited.Ubuntu22.04LTS_2204.2.45.0_neutral_split.scale-100_79rhkp1fndgsc
d----         2023/5/10     22:15                CanonicalGroupLimited.Ubuntu22.04LTS_2204.2.45.0_neutral_split.scale-125_79rhkp1fndgsc
d----         2023/5/10     22:15                CanonicalGroupLimited.Ubuntu22.04LTS_2204.2.45.0_neutral_split.scale-150_79rhkp1fndgsc
d----         2023/5/10     22:15                CanonicalGroupLimited.Ubuntu22.04LTS_2204.2.45.0_x64__79rhkp1fndgsc
# 修改为默认 root
.\ubuntu2204.exe config --default-user root
```

## WSL 中获取宿主机 IP

WSL 每次启动的时候都会有不同的 IP 地址，所以并不能直接用静态的方式来设置代理。WSL2 会把 IP 写在 `/etc/resolv.conf` 中，因此可以用这条指令获得宿主机 IP 。

```shell
cat /etc/resolv.conf | grep nameserver | awk '{ print $2 }'
# WSL2 自己的 IP 可以用
hostname -I | awk '{print $1}'
```

## 转移 wsl 系统数据到其他盘

如果你想将WSL里面的数据存储到D盘上，你可以通过导出当前的WSL分发，然后将其导入到D盘上的新位置来实现。以下是整个流程的步骤：

查看当前 ubuntu 所在路径可以尝试以下命令

> 请将 `*Ubuntu*` 替换为您的 WSL 发行版的实际名称，如果您的发行版不是 Ubuntu。如果你不确定包的确切名称，可以留下 `*` 通配符，这将匹配任何可能的包名称。
>
> 这条命令会在当前用户的 `AppData\Local\Packages` 文件夹内递归搜索所有名称中包含 `Ubuntu` 的文件夹，并列出所有找到的 `ext4.vhdx` 文件。运行这个命令之后，你应该能够看到包含 WSL2 文件系统的 `.vhdx` 文件的完整路径。

```powershell
dir $env:LOCALAPPDATA\Packages\*Ubuntu* -Recurse -Filter ext4.vhdx
```

1. **打开 PowerShell**：打开PowerShell作为管理员。

2. **列出当前的WSL分发**：你需要确定你想要移动的WSL分发的名称。

   ```sh
   wsl --list --verbose
   ```

3. **关闭所有的WSL实例**：在进行下一步之前确保所有的WSL实例都已经关闭。

   ```sh
   wsl --shutdown
   ```

4. **导出WSL分发**：将你想要移动的WSL分发导出到一个tar文件。例如，如果你的分发名称是Ubuntu，你可以使用以下命令：

   ```sh
   wsl --export Ubuntu D:\path\to\save\ubuntu.tar
   # 我的命令
   wsl --export Ubuntu-24.04 D:\ubuntu2404.tar
   ```

   把`D:\path\to\save\ubuntu.tar`替换成你想要保存tar文件的实际路径。

5. **注销WSL分发**：这一步会删除当前的WSL分发，所以确保你已经成功导出了分发。

   ```sh
   wsl --unregister Ubuntu
   # 我的命令
   wsl --unregister Ubuntu-24.04
   ```
   
6. **在新位置创建一个文件夹**：在D盘上选择或创建一个新的文件夹来存放你的WSL分发。

   ```sh
   mkdir D:\path\where\you\want\wsl
   # 我的命令
   mkdir D:\data\wsl\ubuntu-24.04
   ```
   
7. **导入WSL分发**：将分发导入到你在D盘上创建的新位置。

   ```sh
   wsl --import Ubuntu D:\path\where\you\want\wsl D:\path\to\save\ubuntu.tar
   # 我的命令
   wsl --import Ubuntu-24.04 D:\data\wsl\ubuntu-24.04 D:\ubuntu2404.tar
   ```
   
   确保替换路径为你实际想要使用的路径。
   
8. **启动新的WSL分发**：一旦导入完成，你就可以启动你的新WSL分发了。

   ```sh
   wsl -d Ubuntu
   # 我的命令
   wsl -d Ubuntu-24.04
   ```
   
9. **设置默认用户**（如果需要）：如果新导入的分发默认用户是root，你需要修改WSL配置文件来更改默认用户。可以在 linux 内编辑`etc\wsl.conf`文件，并添加以下内容：

   ```
   [user]
   default=<你的用户名>
   ```

   替换`<你的用户名>`为你的非root用户的用户名。然后重启WSL。

   ```sh
   wsl --shutdown
   wsl -d Ubuntu
   ```

通过这些步骤，你可以将WSL分发的默认数据存储位置更改到D盘上的指定目录。这样，WSL将使用新的位置来存储和访问所有文件。
