---
title: 安装指南
sidebar_position: 0
---

# 安装指南

## 平台支持

***Shifu*** 支持常见的硬件平台和操作系统。

### 硬件要求

| 硬件平台 | 支持情况 |
| --- | --- |
| `x86/64` | :white_check_mark: |
| `ARM` | :white_check_mark: |

### 操作系统要求

| 操作系统 | 支持情况 |
| --- | --- |
| `Linux` | :white_check_mark: |
| `macOS` | :white_check_mark: |
| `Windows(WSL2)` | :white_check_mark: |

## 安装方式

### 本地测试

1. ***Shifu*** 基于 `Docker` 的虚拟化容器技术，在电脑上安装 ***Shifu*** 需要您先安装 `Docker Desktop`。请查看 [安装 Docker Desktop](./install-docker.md)。
2. 安装好 `Docker Desktop` 后
    - 如果您不太熟悉命令行和 `Kubernetes`，我们为您提供了一键式安装的Demo，请查看 [本地Demo](./local-demo.md) 来安装和试用 ***Shifu***。
    - 如果您对命令行和 `Kubernetes` 较熟悉，我们为您提供了命令行的安装方式，请查看 [本地kind测试](./local-kind.md) 来安装和试用 ***Shifu***。

### 生产环境部署

请查看 [生产环境安装](./production.md) 来将 ***Shifu*** 安装到您的 Kubernetes集群 中。
