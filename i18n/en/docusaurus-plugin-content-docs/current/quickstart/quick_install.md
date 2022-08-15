---
title: Quick Installation
sidebar_position: 1
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Pre Reading

1. Estimated time needed: 5 minutes
2. Difficulty level: Easy

### Hardware Prerequisite

| Hardware platform | support |
|--|--|
| x86/64 | :white_check_mark: |
| ARM | :white_check_mark: |

### Operating System Prerequisite

| Operating system | support |
|--|--|
| Linux | :white_check_mark: |
| Mac OS | :white_check_mark: |
| Windows(WSL2) | :white_check_mark: |

## ***Shifu*** Environment Preparation

### 1. Download and install *Docker*

<Tabs groupId="operating-systems">
   <TabItem value="win" label="Windows">

   **1.1. Download and install *Docker***

   [Click here to download the Docker](https://desktop.docker.com/win/main/amd64/Docker%20Desktop%20Installer.exe)
   
   **1.2. Open *Docker*, and keep it running**

   **1.3. Make sure Do icker is running**

   *For `Windows WSL2` users, please open `Ubuntu` or other Linux distribution you have installed in the start menu and execute the following command:*

   ```bash
   sudo docker ps
   ```

   </TabItem>
   <TabItem value="mac" label="macOS">

   **1.1. Install *Docker***

   | Chip | Installer |
   |--|--|
   | M1/M2 | [Click here to download Docker for M1/M2](https://desktop.docker.com/mac/main/arm64/Docker.dmg) |
   | Intel | [Click here to download Docker for Intel](https://desktop.docker.com/mac/main/amd64/Docker.dmg) |

   **1.2. Open *Docker*, and keep it running**

   **1.3. Make sure *Docker* is running**

   Please execute the following command:

   ```bash
   sudo docker ps
   ```

   </TabItem>
   <TabItem value="linux" label="Linux">

   **1.1. Install *Docker***

   [Click here to download the Docker](https://docs.docker.com/engine/install/#server)

   **1.2. Open *Docker*, and keep it running**

   **1.3. Make sure *Docker* is running**

   Please execute the following command:

   ```bash
   sudo docker ps
   ```

   </TabItem>
</Tabs>

If *Docker* runs smoothly, you will get the following output:

![docker_run](images/docker_run.png)

### 2. Install *Shifu*

Please visit [demo.shifu.run](https://demo.shifu.run) to download and install Shifu. (Skip to the second step of the page and after completing its process, return to this page.) After installation is done, *Shifu* will be launched with *Docker* runtime.

### 3. Check whether *Shifu* is started

Use the following command to view the results:

```bash
sudo kubectl get pods -A
```

If all "STATUS" is `Running`, *Shifu* is started:

![Shifu Finished pods](images/shifuFinishPods.png)
