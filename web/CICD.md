**背景：**多功能同时开发时会造成 develop 分支的拥挤导致，各个功能最后只能统一上线，这与我们现在所提倡的敏捷开发，小步迭代格格不入。

**需求：**如何实现多分支环境部署？

### CICD

- 续集成使项目变得更加自动化，充分减少程序员的手动操作，并且在产品快速迭代的同时提高代码质量。如对功能 feature-A 的开发在 feature-A.dev.shanyue.tech 类似的三级域名进行测试。

- docker
- jenkins
- GitLab

https://github.com/charlesWise/blog-file/blob/master/frontend-engineering/deploy.md

```
下面介绍GitLab CI/CD：
提交代码到 GitLab 后，满足指定条件后会触发 pipeline 进行自动化构建、发布。
依赖下载，build 代码，发布到服务器这三个过程。
GitLab CI/CD 的 pipeline 具体流程和操作在 .gitlab-ci.yml 文件中申明，触发 pipeline 后，由 GitLab Runner 根据 .gitlab-ci.yml 文件运行，运行结束后将返回至 GitLab 系统。
GitLab Runner 是 CI 的执行环境，负责执行 gitlab-ci.yml 文件，并将结果返回给 GitLab 系统。

团队有新项目需要接入 GitLab CI/CD，首先申请 GitLab 项目，再让 GitLab 系统维护者帮忙配置 Runner，编写 .gitlab-ci.yml 文件，触发构建即可看 CI/CD 情况。

1. 新建 GitLab 项目

2. 配置 GitLab Runner

3. .gitlab-ci.yml 文件
```
