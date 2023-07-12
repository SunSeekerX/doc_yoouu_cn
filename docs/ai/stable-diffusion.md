# stable-diffusion

[stable-diffusion-webui - github](https://github.com/AUTOMATIC1111/stable-diffusion-webui)

## Linux 部署

平台

autodl

[https://www.autodl.com/home](https://www.autodl.com/home)

克隆项目

```shell
git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
```

### 检查必要依赖

```shell
# 建一个名称为py36的conda环境,指定python版本为3.10.6
conda create -n py36 python=3.10.6
# 激活conda环境，不行退出重新登录
conda activate py36
# 验证安装是否成功
python --version
```

> # Required Dependencies
>
> 1. Python 3.10.6 and Git:
>
>    - Windows: download and run installers for Python 3.10.6 ([webpage](https://www.python.org/downloads/release/python-3106/), [exe](https://www.python.org/ftp/python/3.10.6/python-3.10.6-amd64.exe), or [win7 version](https://github.com/adang1345/PythonWin7/raw/master/3.10.6/python-3.10.6-amd64-full.exe)) and git ([webpage](https://git-scm.com/download/win))
>    - Linux (Debian-based): `sudo apt install wget git python3 python3-venv`
>    - Linux (Red Hat-based): `sudo dnf install wget git python3`
>    - Linux (Arch-based): `sudo pacman -S wget git python3`
>
> 2. Code from this repository:
>
>    - preferred way: using git:
>
>      ```
>      git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
>      ```
>
>      - This way is referred because it lets you update by just running `git pull`.
>      - Those commands can be used from command line window that opens after you right click in Explorer and select "Git Bash here".
>
>    - alternative way: use the "Code" (green button) -> "Download ZIP" option on the main page of the repo.
>
>      - You still need to install git even if you choose this.
>      - To update, you'll have to download zip again and replace files.

### 启动

启动

```shell
python launch.py --disable-safe-unpickle --port=6006 --deepdanbooru

bash webui.sh -f

# 后台运行
nohup bash webui.sh -f &
```

### 下载模型

```
https://civitai.com/api/download/models/82446
```
