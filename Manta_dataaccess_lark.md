# Manta Data Access 产品需求文档

## 1. 产品概述
Data Access 模块旨在为管理员提供对分布式能源（DER）接入节点的全面监控和管理能力。通过该模块，用户可以查看不同类型的接入节点（Cloud, SCADA, Edge）的实时状态、设备遥测数据以及关联的公司信息。

## 2. 核心功能架构
### 2.1 功能结构图
- **Dashboard（概览页）**
  - 节点类型筛选（All, Cloud, SCADA, Edge）
  - 节点卡片列表展示
- **Detail View（详情页）**
  - 基础信息面板（System Type, Manufacturer, Country, Last Sync）
  - 多维数据展示（Company, Inverters, Batteries）
  - 关联公司管理（新增/查看/删除）
  - 设备实时数据监控

## 3. 详细功能需求

### 3.1 Dashboard（概览页）
#### 3.1.1 筛选与导航
- **功能描述**：允许用户根据节点类型筛选展示的接入节点。
- **交互逻辑**：
  - 顶部提供四个筛选按钮：`All`, `Cloud`, `SCADA`, `Edge`。
  - 默认选中 `All`。
  - 点击按钮后，下方列表即时过滤显示对应类型的节点。
  - 按钮状态：选中状态高亮（绿色背景，白色文字），未选中状态灰色。

#### 3.1.2 节点卡片展示
- **功能描述**：以卡片形式展示每个接入节点的关键摘要信息。
- **UI展示要素**：
  - **图标与厂商**：根据 Vendor 或 Type 显示对应图标（如 Sungrow, Huawei, MANTA 等）。
  - **节点名称**：显示 `name` 字段。
  - **国家/地区**：显示 `country` 字段。
  - **逆变器状态 (Inverters)**：
    - 显示总数、在线数（绿点标识）、离线数（灰点标识）。
  - **电池状态 (Batteries)**：
    - 显示总数、在线数（绿点标识）、离线数（灰点标识）。
- **交互逻辑**：
  - Hover 效果：鼠标悬停时卡片边框变绿，右上角背景图标透明度增加。
  - 点击事件：点击卡片任意区域，跳转至该节点的详情页（Detail View）。
- **空状态**：若当前筛选无数据，显示 "No access points found" 及图标提示。

### 3.2 Detail View（详情页）
#### 3.2.1 头部导航与基础信息
- **功能描述**：展示当前节点的全局属性。
- **UI展示要素**：
  - **返回按钮**：点击返回 Dashboard。
  - **标题区**：节点名称 + 节点类型标签（Type）。
  - **Info Panel（信息面板）**：
    - **System Type**：显示节点类型（如 EDGE, CLOUD）。
    - **Manufacturer**：显示厂商信息（vendor），若无则显示 Unknown。
    - **Country**：显示所属国家。
    - **Last Sync**：显示最后同步时间（格式：YYYY/MM/DD HH:MM）。

#### 3.2.2 详情内容标签页 (Tabs)
提供三个标签页切换查看不同维度的数据：`Company`, `Inverters`, `Batteries`。

---

#### 3.2.3 Company Tab（关联公司）
- **功能描述**：管理该节点关联的公司列表。
- **操作栏**：
  - **搜索框**：支持按公司名、行业、国家、ABN、地址模糊搜索。
  - **Add 按钮**：点击打开 "Add Company Drawer"（关联新公司）。
- **列表展示字段**：
  - **Company Name**：公司名称。
  - **Industry**：所属行业。
  - **Country**：所属国家。
  - **Status**：状态标签（Active-绿色, Inactive-灰色, Pending-黄色）。
  - **ABN/VAT**：注册税号。
  - **Actions**：删除按钮（解除关联）。
- **交互逻辑**：
  - 列表支持滚动。
  - 删除操作需二次确认（弹窗提示）。

#### 3.2.4 Inverters Tab（逆变器数据）
- **功能描述**：展示该节点下所有逆变器的实时遥测数据。
- **操作栏**：
  - **搜索框**：支持按 SN、Model、Owner 搜索。
- **列表展示字段**：
  - **SN**：设备序列号（等宽字体）。
  - **Model**：设备型号。
  - **Status**：在线/离线状态标签。
  - **Owner**：归属用户。
  - **VPP**：所属虚拟电厂。
  - **NMI, DNSP, Retailer**：电力相关信息。
  - **遥测数据**：Voltage (V), Current (A), Frequency (Hz), Temp (°C), Power (kW)。
    - *注：Power 字段加粗显示，数据实时性较高。*

#### 3.2.5 Batteries Tab（电池数据）
- **功能描述**：展示该节点下所有电池储能设备的实时遥测数据。
- **操作栏**：
  - **搜索框**：支持按 SN、Model、Owner 搜索。
- **列表展示字段**：
  - **SN**：设备序列号。
  - **Model**：设备型号。
  - **Status**：在线/离线状态标签。
  - **Owner**：归属用户。
  - **VPP**：所属虚拟电厂。
  - **NMI, DNSP, Retailer**：电力相关信息。
  - **遥测数据**：Voltage (V), Current (A), SOC (%), Temp (°C), Power (kW)。

## 4. 数据逻辑与模型
### 4.1 Access Node 模型
| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| id | Number | 唯一标识 |
| name | String | 节点名称 |
| type | String | 枚举：EDGE, CLOUD, SCADA |
| status | String | online / offline |
| vendor | String | 设备厂商（如 Sungrow, SMA） |
| country | String | 国家代码/名称 |
| inverters | Number | 逆变器总数 |
| invertersOnline | Number | 在线逆变器数 |
| batteries | Number | 电池总数 |
| batteriesOnline | Number | 在线电池数 |
| company | String | 关联的主公司名称（用于初始化关联） |

### 4.2 关联逻辑
- **Company 关联**：通过 `renderCompanyTable` 实现，当前通过模拟数据过滤展示。
- **Device 生成**：通过 `generateDevices` 函数根据节点配置的 `inverters` 和 `batteries` 数量动态生成模拟设备数据（SN, Model, Telemetry）。

## 5. 交互细节补充
- **响应式设计**：
  - Dashboard 网格布局在不同屏幕尺寸下自适应（Mobile: 1列, Tablet: 2列, Desktop: 3列）。
  - Drawer 和 Modal 在移动端全屏展示，桌面端居中或侧边滑出。
- **动画效果**：
  - 页面切换使用 `hidden` 类切换可见性，部分组件（如 Modal）使用 `animate-slide-in-right` 动画。
  - 卡片 Hover 有轻微的边框颜色变化和透明度过渡。
