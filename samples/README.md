# Samples 目录说明

## 目录约定

- `samples/reference/`
  - 存放参考输入、原始素材、示例导出和人工整理样例
  - 这些文件用于演示平台支持的输入类型和交付格式
- `samples/generated/`
  - 存放 smoke、LaTeX 编译、校准结果等历史生成产物
  - 这些文件不属于运行时主入口，但可用于回归验证和演示

## 当前约束

- 项目根目录不再直接堆放样例或中间产物
- 平台运行时数据仍以 `platform-data/` 为准
- `examples/qf3_item.json` 作为当前 smoke 的标准示例入口

## 历史数据说明

- `platform-data/` 与 `runs/` 下保留的是历史运行快照
- 其中个别文件仍带有旧机器绝对路径，作为历史 provenance 保留，不作为当前目录结构依据
