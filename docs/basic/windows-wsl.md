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
