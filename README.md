## download-gen-protobufjs

> A tool to download protobuf file from origin git repo and generate JavaScript protobuf code.

- download `protocol buffers` files from remote git repos
- generate JavaScript Protobuf code using `protoc`

### 使用方式

1. `yarn add --dev download-gen-protobufjs`
2. 在`package.json`中，`scripts`中配置如下：

```json
  {
    ...
    "scripts": {
      ...
      "gpc": "gpc"
    }
  }
```

3. 运行`yarn gpc -i`并依据提示进行相关操作

#### _gpc-config.json_

```json
{
  "root": "xx", // 远程protobuf文件存放在本地的目录
  "output": "src/xx", // JavaScript protobuf 文件生成目录
  "url": "direct:https://gitee.com/xx/xx.git#main", // 远程仓库的地址支持gitee/github/gitlab等
  "sourcePath": "cherry/src/main/protobuf" // 需要生成javascript protobuf文件的源目录
}
```

> 注意：url 的书写规则可以参考[dowload-git-repo](https://www.npmjs.com/package/download-git-repo#api)

### 命令

```bash
Usage: gpc [<param>]

  <param>
    将要运行的名称，例如 gpc -i/--init
```

支持的命令如下：

| 命令          | 说明                                                            | 备注               |
| ------------- | --------------------------------------------------------------- | ------------------ |
| -i/--init     | 初始化并拉取远程 git repos，生成 javascript protobuf code       | download，generate |
| -g/--generate | 在存在本地 protobuf 的文件下，直接生成 JavaScript protobuf 文件 | generate           |
