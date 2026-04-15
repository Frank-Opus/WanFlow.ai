import type { Locale } from '@/lib/i18n';

export const siteContact = {
  email: 'wanflow@163.com',
  phone: '+86 18307010306',
  wechat: 'FrankXu0303',
  responseWindow: '24 hours',
} as const;

const responseWindowHours = Number.parseInt(siteContact.responseWindow, 10);
const responseWindowLocalized = {
  zh: Number.isFinite(responseWindowHours)
    ? `工作日 ${responseWindowHours} 小时内`
    : `工作日 ${siteContact.responseWindow} 内`,
  en: `within ${siteContact.responseWindow} on business days`,
} as const;

const marketingCopyBase = {
  zh: {
    site: {
      title: 'WanFlow | 企业 AI 运营与交付伙伴',
      description:
        'WanFlow 万物归流帮助企业把数据标注与治理、流程编排与自动化、企业级多智能体、人机协同交付和模型运营闭环真正接进业务里',
      brand: 'WanFlow',
      brandFull: 'WanFlow 万物归流',
      tagline: '把 AI 真正接进业务里',
      location: '中国发起，全球交付',
    },
    nav: [
      { href: '/', label: '首页' },
      { href: '/solutions', label: '行业解决方案' },
      { href: '/cases', label: '真实案例' },
      { href: '/about', label: '关于我们' },
      { href: '/contact', label: '联系我们' },
    ],
    common: {
      skip: '跳转到主要内容',
      primaryCta: '预约咨询',
      secondaryCta: '查看行业解决方案',
      workbenchCta: '查看内部平台',
      language: '语言',
      zh: '中文',
      en: 'EN',
      metaKicker: 'Data-driven AI operations',
      finalPrimary: '发起业务沟通',
      finalSecondary: '查看真实案例',
    },
    footer: {
      companyName: '上海万流归智科技有限公司',
      description:
        'WanFlow 把数据、流程、多智能体和模型运营接到一条线上，让 AI 项目不只看起来能跑，而是真的能交付',
      columns: [
        {
          title: '服务范围',
          items: ['数据标注与治理', '流程编排与自动化', '企业级多智能体', '人机协同交付'],
        },
        {
          title: '业务入口',
          items: ['模型运营与持续优化', '数据治理体系', '人机协同交付', '企业交付支持'],
        },
        {
          title: '联络方式',
          items: [siteContact.email, `电话：${siteContact.phone}`, `WeChat: ${siteContact.wechat}`, `响应：${responseWindowLocalized.zh}`],
        },
      ],
      copyright: 'Copyright 2026 wanflowai.com. All rights reserved.',
      legal: '围绕真实交付场景持续打磨方法与执行能力',
      legalLinks: [
        { href: '/privacy', label: '隐私政策' },
        { href: '/terms', label: '服务条款' },
      ],
    },
    home: {
      hero: {
        eyebrow: '企业 AI 运营与交付',
        title: '让数据、流程和 AI 在业务里真正汇流',
        statement:
          '提供数据标注与治理、流程编排与自动化、企业级多智能体、人机协同交付和模型运营闭环能力，帮助企业实现稳定、安全、可落地的 AI 交付',
        body:
          '我们不只出建议，更把链路搭起来、跑起来、交付出去',
        primary: { label: '预约咨询', href: '/contact' },
        secondary: { label: '查看行业解决方案', href: '/solutions' },
      },
      supportSignals: [
        { value: '5', label: '核心模块', detail: '覆盖从数据到执行再到优化的完整闭环' },
        { value: '多智能体', label: '企业级执行能力', detail: '以安全、稳定、可控的方式参与企业任务执行' },
        { value: '闭环优化', label: '持续评测与迭代', detail: '围绕反馈、评测和结果持续迭代' },
      ],
      platformView: {
        eyebrow: '平台 / 系统视角',
        title: '把 AI 做成能长期运行的业务系统',
        body:
          '真正难的从来不是模型跑一次，而是数据怎么准备、流程怎么衔接、人工和自动化怎么配合、结果怎么稳定复现，WanFlow 做的就是把这些环节接顺',
        bullets: [
          '业务流程梳理与执行链设计',
          '复杂数据处理与结构化治理',
          '人机协同流程与质量控制',
          '面向客户交付与持续优化的模型运营',
        ],
      },
      capabilityModules: {
        eyebrow: '能力模块',
        title: '五个模块，一套持续进化的交付闭环',
        body:
          '这五个模块不是彼此割裂的服务列表，而是同一套交付系统里的关键环节，能够持续运行、持续反馈、持续优化',
        items: [
          {
            title: '数据标注与治理',
            body: '把标注规范、数据标准、质检机制和治理节奏一起定清楚，让数据不只是产出，更能长期可用',
            outcome: '建立稳定的数据基础',
          },
          {
            title: '流程编排与自动化',
            body: '把审批、流转、质检、系统动作和异常处理接进同一套执行流程，减少人为断点',
            outcome: '让跨团队执行更顺、更稳',
          },
          {
            title: '企业级多智能体',
            body: '围绕企业任务构建安全、稳定、可控的多智能体能力，让 AI 能真正参与执行，而不只是提供回答',
            outcome: '把 AI 变成可管理的执行力量',
          },
          {
            title: '人机协同交付',
            body: '把 AI 的执行效率和人的判断、复核、兜底结合起来，让复杂任务可以真实落地',
            outcome: '兼顾效率、质量与交付确定性',
          },
          {
            title: '模型运营与持续优化',
            body: '围绕模型表现、业务反馈、运行监控和效果验证持续迭代，让系统越跑越稳、越用越准',
            outcome: '形成可持续进化的运营闭环',
          },
        ],
      },
      deliveryFramework: {
        eyebrow: '交付框架',
        title: '先把卡点找准，再把事情一段一段做成',
        body:
          '企业来找 WanFlow，不是为了再听一轮概念，而是想把原本跑不顺的环节理清、接上、跑稳',
        steps: [
          { step: '01', title: '先看清卡点', body: '把问题落到具体环节里，看看到底卡在数据、流程衔接，还是运行反馈' },
          { step: '02', title: '再把链路搭好', body: '把该自动化的、该人工兜底的、该留痕复盘的边界一开始就定清楚' },
          { step: '03', title: '接进真实业务', body: '不把方案停在纸面上，而是把流程真正接进日常业务里，边跑边校正' },
          { step: '04', title: '持续往前调', body: '盯住质量、时效和结果，哪里不顺就改哪里，让系统越跑越稳' },
        ],
      },
      caseTeaser: {
        eyebrow: '案例预览',
        title: '不是讲故事，是把交付结构摆出来',
        items: [
          {
            title: '大模型团队数据治理加速',
            sector: '模型训练与运营',
            challenge: '多来源样本标准不一，质检回路长，产能不稳',
            outcome: '统一标注规范和自动化流转，缩短迭代周期',
          },
          {
            title: '复杂文档处理流程重构',
            sector: '企业数据处理',
            challenge: 'PDF、表格、文本混在一起，人工整理成本高',
            outcome: '搭建自动抽取和结构化处理链，减少重复人力',
          },
          {
            title: '运营流程作为服务输出',
            sector: '人机协同交付',
            challenge: '客户流程复杂，跨角色协作混乱，交付标准难固定',
            outcome: '把流程做成服务接口，让协作更稳定',
          },
        ],
      },
      finalCta: {
        eyebrow: '下一步',
        title: '如果你正卡在数据、流程或模型运营上，我们可以直接聊',
        body: '把真实问题摊开说，通常比再听一轮概念更有用',
      },
    },
    solutions: {
      problemFrame: {
        eyebrow: '行业解决方案',
        title: '把 AI、多智能体和业务执行真正接到同一条线上',
        body:
          'WanFlow 不从空泛架构开始，而是从企业每天最容易卡住的审核、协同、排产、复盘这些真实动作切进去。先把数据、流程、角色和边界接稳，再把自研多智能体执行骨架、协同状态机和运营回流机制压进去，让系统在真实业务里长期跑。',
      },
      industries: [
        {
          title: '金融与保险',
          headline: '把审核、补件、风控和复核拉回同一条可审计的执行链',
          summary: '金融业务怕的不是量大，而是量一上来以后审核、补件、客服转述、复核与风控各跑各的。WanFlow 会先用自研审核状态机和证据链留痕骨架，把规则、状态、责任和人工兜底接稳，再让多智能体去接手高频动作。',
          stats: ['审核时效缩短 35%-55%', '补件回合减少 30%-45%', '人工复核负荷下降 25%-40%', '关键节点留痕覆盖提升至 90%+'],
          originalMethod: 'WanFlow 审核状态机 + 证据链留痕骨架',
          technicalTraits: ['规则前置审核骨架', '关键节点证据链留痕', '人工兜底阈值'],
          imageSrc: '/industry-assets/finance/hero.png',
          imageTitle: '金融审核与风控协同主工作台',
          imageHint: '适合放审批流界面、风控任务台、审核状态看板或客服与审核协同流程示意图',
          outcomes: ['高频审核平均处理时长通常能压到原来的 45%-65%', '补件后二次回退比例一般可下降 30% 左右', '客服与审核之间的人工转述量通常可下降 25%-40%', '管理层可以按天看到卡点、回退和风险分布，而不是只靠事后抽查'],
          modules: [
            {
              title: '审核与补件流重构',
              body: '把初审、补件、复核、退回和升级重排成一条状态清楚、能自动推进的审核链，不再让同一份材料来回兜圈。',
              mappedModule: '流程编排与自动化',
              aiCapability: '规则驱动审核 + 多智能体补件推进',
              technicalTrait: 'WanFlow 审核状态机',
              originalMethod: '双轨审核状态机',
              imageSrc: '/industry-assets/finance/review.png',
              imageTitle: '审核状态机与补件流转视图',
              deliverables: ['审核规则库', '补件回路设计', '状态追踪机制'],
              outcome: '高频审核处理时长可缩短 35%-50%，补件回退率可下降 20%-30%',
            },
            {
              title: '客服与业务协同分发',
              body: '让客服入口、业务判断和后续处理走同一条流转链，减少人工转述和错分错转。',
              mappedModule: '企业级多智能体',
              aiCapability: '多入口识别 + Agent 协同分单',
              technicalTrait: 'WanFlow 协同路由台',
              originalMethod: '多入口统一分单链',
              imageSrc: '/industry-assets/finance/routing.png',
              imageTitle: '客服与业务协同分单台',
              deliverables: ['工单分发规则', '知识调用策略', '跨岗协同SOP'],
              outcome: '首轮分发响应速度可提升 2-3 倍，错分错转可下降 20%-35%',
            },
            {
              title: '风险规则与人工复核闭环',
              body: '把智能识别、规则校验和人工兜底接在一起，让风控提效的同时不丢边界。',
              mappedModule: '人机协同交付',
              aiCapability: '智能识别 + 人工复核闸口',
              technicalTrait: 'WanFlow 风险护栏',
              originalMethod: '风险护栏前置链',
              imageSrc: '/industry-assets/finance/risk.png',
              imageTitle: '风险复核与人工兜底节点',
              deliverables: ['规则与权限边界', '人工复核节点', '关键记录沉淀'],
              outcome: '人工复核工作量可下降 25%-40%，重点风险件仍保留人工把关',
            },
          ],
        },
        {
          title: '制造与供应链',
          headline: '让异常、订单、库存和调度回到同一块制造指挥板',
          summary: '制造现场不是缺系统，而是异常出来以后工单、库存、仓储、订单和升级动作各有一套说法。WanFlow 会把自研异常分诊引擎、状态同步链和运营复盘板接起来，让一线、计划、仓储和管理层看的是同一条链。',
          stats: ['异常响应时长缩短 30%-50%', '跨系统跟单人工下降 25%-40%', '升级闭环时长缩短 20%-35%', '库存状态同步准确率提升 20%-30%'],
          originalMethod: 'WanFlow 异常分诊引擎 + 状态同步链',
          technicalTraits: ['异常优先级自动分诊', '跨系统状态同步', '升级路径全链留痕'],
          imageSrc: '/industry-assets/manufacturing/hero.png',
          imageTitle: '制造异常与供应链协同主界面',
          imageHint: '适合放工单看板、异常分流界面、订单到仓配的链路示意图，或产线/仓储的真实场景图',
          outcomes: ['一线异常从发现到分派通常能缩短约 40%', '跨系统状态同步后，人工催办和重复确认会明显减少', '高优先级异常升级链路通常可压缩 20%-35%', '库存、物流和订单不再各说各话，班次内就能看到问题往哪一段堆'],
          modules: [
            {
              title: '异常工单自动分诊',
              body: '设备异常、质量异常、供应异常先自动分级，再推给对的人，而不是靠群里转来转去。',
              mappedModule: '企业级多智能体',
              aiCapability: '异常识别 + Agent 优先级判定',
              technicalTrait: 'WanFlow 异常分诊引擎',
              originalMethod: '先分诊，再接力推进',
              imageSrc: '/industry-assets/manufacturing/triage.png',
              imageTitle: '异常工单智能分诊',
              deliverables: ['异常分类规则', '工单优先级机制', '升级路径设计'],
              outcome: '异常分派首响时间可缩短 30%-45%',
            },
            {
              title: '订单与库存协同流转',
              body: '把订单、库存、物流、仓储之间的状态打通，减少人工确认和重复跟单。',
              mappedModule: '流程编排与自动化',
              aiCapability: '跨系统状态同步 + 自动提醒',
              technicalTrait: 'WanFlow 状态同步链',
              originalMethod: '订单、库存、物流一键对齐',
              imageSrc: '/industry-assets/manufacturing/sync.png',
              imageTitle: '订单与库存联动视图',
              deliverables: ['状态同步流程', '跨系统字段映射', '提醒与回退机制'],
              outcome: '订单库存对账人工可下降 25%-35%',
            },
            {
              title: '供应链运营复盘机制',
              body: '把异常原因、处理动作和恢复结果沉淀下来，后面优化才不靠拍脑袋。',
              mappedModule: '模型运营与持续优化',
              aiCapability: '异常归因 + 反馈回流',
              technicalTrait: 'WanFlow 复盘看板',
              originalMethod: '异常原因自动回流',
              imageSrc: '/industry-assets/manufacturing/review.png',
              imageTitle: '供应链复盘看板',
              deliverables: ['过程记录结构', '复盘面板', '优化反馈回路'],
              outcome: '异常复盘沉淀后同类问题复发率可下降 15%-25%',
            },
          ],
        },
        {
          title: '零售与电商',
          headline: '把经营数据、内容动作和客服响应接成一条会复盘的运营链',
          summary: '电商团队最容易被拖垮的，不是某一场活动，而是每天都在补数字、催协同、追战报。WanFlow 会先把经营口径、内容节奏、客服响应和活动复盘接到同一套运营底盘里，再让 Agent 去承担归集、提醒、生成和追踪。',
          stats: ['周报产出时间缩短 70%-90%', '人工汇总工作量下降 50%-75%', '活动复盘反馈速度提升 2-4 倍', '多平台口径错漏下降 30%+'],
          originalMethod: 'WanFlow 经营数据底座 + 运营回流环',
          technicalTraits: ['多平台口径统一', '内容与客服协同任务流', '活动结果自动回流'],
          imageSrc: '/industry-assets/retail/hero.png',
          imageTitle: '零售经营与复盘协同主界面',
          imageHint: '适合放商品运营面板、内容排期看板、客服协同台、报表仪表盘或活动战报界面',
          outcomes: ['日报周报通常能从半天压缩到 30-60 分钟内', '多平台经营口径统一后，错漏项一般可下降 30% 以上', '活动期间内容与客服协同响应通常可提升 2 倍以上', '复盘反馈可以从次周后移到活动当天或次日'],
          modules: [
            {
              title: '多平台经营数据归集',
              body: '把电商平台、广告平台、客服系统和仓储履约的数据统一到一套口径里，少做重复整理。',
              mappedModule: '数据标注与治理',
              aiCapability: '多平台指标自动归集 + 口径统一',
              technicalTrait: 'WanFlow 数据底座',
              originalMethod: '统一经营口径底盘',
              imageSrc: '/industry-assets/retail/data.png',
              imageTitle: '多平台经营数据底座',
              deliverables: ['数据字段规范', '归集脚本与任务流', '统一报表模板'],
              outcome: '跨平台数据整理工时可下降 50%-70%',
            },
            {
              title: '内容与客服协同执行',
              body: '把内容排期、素材生产、客服问答和活动节奏拉进同一条执行链，活动来了不用临时救火。',
              mappedModule: '人机协同交付',
              aiCapability: '内容排期 + 客服响应协同执行',
              technicalTrait: 'WanFlow 前台协同流',
              originalMethod: '前台协同任务流',
              imageSrc: '/industry-assets/retail/collab.png',
              imageTitle: '内容与客服协同任务流',
              deliverables: ['内容任务编排', '知识素材库', '活动响应SOP'],
              outcome: '内容与客服协同响应可提升 2-3 倍',
            },
            {
              title: '周报与复盘自动化',
              body: '自动聚合关键经营指标、活动结果和异常反馈，让复盘不再拖到下周。',
              mappedModule: '模型运营与持续优化',
              aiCapability: '经营摘要自动生成 + 异常提示',
              technicalTrait: 'WanFlow 复盘回流环',
              originalMethod: '日报周报自动复盘',
              imageSrc: '/industry-assets/retail/review.png',
              imageTitle: '经营复盘与自动摘要视图',
              deliverables: ['日报周报模版', '复盘摘要逻辑', '关键异常提示'],
              outcome: '周报与异常摘要生成时间可缩短 70%-90%',
            },
          ],
        },
        {
          title: '汽车与零部件制造',
          headline: '把异常、排产、缺料和质量波动接成一条真正会跑的制造链',
          summary: '汽车与零部件场景里，真正耗人的不是某个异常，而是异常、排产、物料、质量和供应协同永远不同步。WanFlow 会把自研异常分诊、排产联动和质量回流骨架先接稳，再让多智能体去推动跨班次、跨系统、跨角色的后续动作。',
          stats: ['异常响应时长缩短 30%-50%', '跨系统跟单人工下降 25%-40%', '计划调整闭环时长缩短 20%-35%', '同班次风险暴露提前 1-2 个处理节点'],
          originalMethod: 'WanFlow 异常分诊台 + 排产联动骨架',
          technicalTraits: ['异常优先级自动分级', '排产与物料联动同步', '质量与供应回流闭环'],
          imageSrc: '/industry-assets/automotive/hero.png',
          imageTitle: '汽车制造异常与排产协同主工作台',
          imageHint: '适合放产线异常总览、排产联动界面、物料协同路径或质量追溯相关的制造运营主画面',
          outcomes: ['一线异常从发现到分派通常可缩短约 40%', '排产与缺料联动后，人工催办量一般可下降约 30%', '高优先级调整闭环通常可压缩 20%-35%', '供应与质量波动可在班次内更早被识别和处理'],
          modules: [
            {
              title: '产线异常智能分诊',
              body: '把设备、质量、停线、缺料等异常先做识别与优先级判断，再自动分流到对应团队和处理路径',
              mappedModule: '企业级多智能体',
              aiCapability: '异常识别 + 优先级自动判定',
              technicalTrait: 'WanFlow 异常分诊台',
              originalMethod: '异常先定级，再自动接力',
              imageSrc: '/industry-assets/automotive/triage.png',
              imageTitle: '产线异常智能分诊',
              deliverables: ['异常分类规则', '工单优先级机制', '升级路径设计'],
              outcome: '异常分派首响时间可缩短 30%-45%',
            },
            {
              title: '排产与物料协同联动',
              body: '把排产变化、缺料风险、库存状态和后续动作接成一条联动链，减少人工确认和跨系统反复跟单',
              mappedModule: '流程编排与自动化',
              aiCapability: '跨系统状态同步 + 自动提醒',
              technicalTrait: 'WanFlow 排产联动骨架',
              originalMethod: '计划一变，物料和动作一起变',
              imageSrc: '/industry-assets/automotive/sync.png',
              imageTitle: '排产与物料联动',
              deliverables: ['状态同步流程', '跨系统字段映射', '提醒与回退机制'],
              outcome: '排产与物料协同的人工作业可下降 25%-35%',
            },
            {
              title: '质量与供应复盘优化',
              body: '把异常原因、处理动作、质量波动和供应结果沉淀下来，形成后续优化的运营依据',
              mappedModule: '模型运营与持续优化',
              aiCapability: '异常归因 + 反馈闭环',
              technicalTrait: 'WanFlow 质量回流板',
              originalMethod: '先自动归因，再把改进动作推回现场',
              imageSrc: '/industry-assets/automotive/review.png',
              imageTitle: '质量与供应复盘',
              deliverables: ['过程记录结构', '复盘面板', '优化反馈回路'],
              outcome: '复盘沉淀后同类问题复发率可下降 15%-25%',
            },
          ],
        },
        {
          title: '企业运营与共享服务',
          headline: '让共享服务从人盯人，变成系统自己往前跑',
          summary: '财务、人事、行政、法务、客服这些共享服务，真正拖节奏的不是量，而是入口散、规则碎、回退多、经验留不下来。WanFlow 会先把模板、状态机、任务路由和复盘节奏搭起来，让 Agent 帮你扛掉重复动作，让人只盯关键判断。',
          stats: ['重复流程处理时长缩短 30%-50%', '跨岗催办工作量下降 40%-60%', '标准化覆盖率提升至 70%-90%', 'SLA 准时率提升 15%-25%'],
          originalMethod: 'WanFlow 流程模板库 + 跨岗路由台',
          technicalTraits: ['标准流程模板化', '跨岗状态机协同', '时效与质量双指标复盘'],
          imageSrc: '/industry-assets/shared-services/hero.png',
          imageTitle: '共享服务流程中心',
          imageHint: '服务请求、任务路由、SOP 和复盘看板会在这里统一呈现，让共享服务真正像一套系统在运行。',
          outcomes: ['高频共享流程可以从多次催办改成单链路推进', '跨岗协同里的人工催办和追踪工作量通常可下降约一半', '共享服务标准化覆盖率一般可提升到 70%-90%', '组织经验会沉淀成可复用的流程模板，而不是只留在少数人手里'],
          modules: [
            {
              title: '共享流程标准化',
              body: '把常见服务请求、审批动作和输出结构模块化，先把标准流程固定下来。',
              mappedModule: '流程编排与自动化',
              aiCapability: '请求入口标准化 + 节点自动推进',
              technicalTrait: 'WanFlow 流程模板库',
              originalMethod: '先把重复动作固化成模板',
              imageSrc: '/industry-assets/shared-services/standardize.png',
              imageTitle: '共享流程模板库',
              deliverables: ['标准作业模板', '任务入口设计', '状态与权限规则'],
              outcome: '标准流程复制上线时间可缩短 30%-50%',
            },
            {
              title: '多角色任务协同',
              body: '把提单、处理、审核、回退和完成接成一条明确的跨团队流程，少靠人盯人传话。',
              mappedModule: '人机协同交付',
              aiCapability: '跨岗任务路由 + 自动提醒',
              technicalTrait: 'WanFlow 跨岗路由台',
              originalMethod: '跨岗任务一条链推进',
              imageSrc: '/industry-assets/shared-services/collab.png',
              imageTitle: '跨岗协同工作台',
              deliverables: ['跨岗协同链路', '回退与升级机制', '任务提醒策略'],
              outcome: '跨岗催办和回退沟通量可下降 40%-60%',
            },
            {
              title: '运营复盘与持续优化',
              body: '围绕时效、质量和异常点持续优化，让共享服务越来越像一套系统，而不是一群人硬撑着做。',
              mappedModule: '模型运营与持续优化',
              aiCapability: '时效/质量指标监控 + 改进清单',
              technicalTrait: 'WanFlow 运营复盘账本',
              originalMethod: '时效和质量一起盯',
              imageSrc: '/industry-assets/shared-services/review.png',
              imageTitle: '运营复盘面板',
              deliverables: ['时效指标', '问题归因机制', '持续优化清单'],
              outcome: '流程时效波动可下降 20%-35%',
            },
          ],
        },
      ],
      modules: [
        {
          title: '数据标注与治理',
          body: '把原始数据、字段口径、质检返修和业务反馈接成一条可运营的数据生产线，让模型、流程和智能体都吃同一套干净底座。',
          deliverables: ['数据任务台', '字段口径字典', '双层质检规则', '业务反馈回流节奏'],
          outcomes: ['数据返工率更低', '新场景接入更快'],
        },
        {
          title: '流程编排与自动化',
          body: '不是把流程画成图，而是把审批、流转、异常回退、跨系统动作做成真的能执行的状态机，让每个节点都知道该往哪里走。',
          deliverables: ['流程状态机', '跨系统动作编排', '角色边界设计', '异常回退规则'],
          outcomes: ['跨团队动作不再断点', '节奏、责任、留痕同时在线'],
        },
        {
          title: '企业级多智能体',
          body: '围绕企业真实任务搭建可控的多智能体执行骨架，让识别、判断、调用和协同不再停在聊天框里，而是真正进入业务动作。',
          deliverables: ['角色型智能体设计', '知识与工具接入', '权限与护栏', '执行审计机制'],
          outcomes: ['Agent 真正参与业务动作', '自动化能力可以安全扩展'],
        },
        {
          title: '人机协同交付',
          body: '把人的判断、复核、升级和 AI 的速度接成一套协同机制，让复杂任务既能提效，也能在关键节点守住边界和质量。',
          deliverables: ['人工接管节点', '复核工作台', '升级与兜底机制', '质量闸口设计'],
          outcomes: ['复杂任务也能安全上线', '效率提升不以失控为代价'],
        },
        {
          title: '模型运营与持续优化',
          body: '上线不是结束。WanFlow 会把评测、反馈、异常样本和业务结果拉回到同一个运营闭环里，让系统越跑越准，也越跑越让业务方放心。',
          deliverables: ['评测基线', '反馈回流机制', '异常样本库', '优化节奏看板'],
          outcomes: ['系统具备持续进化能力', '业务方更容易建立信任'],
        },
      ],
      finalCta: {
        title: '如果你已经知道问题不在概念，而在具体业务链路里，现在就值得开始谈',
        body: '带着行业场景、流程卡点和目标结果来聊，我们更容易一起把能落地的第一条链先搭出来。',
      },
    },
    cases: {
      intro: {
        eyebrow: '真实案例',
        title: '来自真实交付项目的匿名案例',
        body: '以下案例均按客户保密要求做匿名处理，只保留业务背景、交付内容与最终结果。',
      },
      cards: [
        {
          title: '某头部消费金融机构的审核与复核链路重构',
          sector: '金融与保险',
          client: '某头部消费金融机构',
          stats: ['审核时效缩短约 42%', '补件回退率下降约 33%', '人工复核负荷下降约 28%'],
          originalMethod: '规则库统一、状态机流转、人工复核闸口并行运行',
          aiCapability: '规则驱动审核与多智能体辅助分发，人工复核兜底',
          technicalTraits: ['规则库与口径统一', '状态机流转与留痕', '人机协同复核'],
          challenge: '审核、补件、复核分散在多个角色和系统里，状态追踪困难，异常回退反复兜转，业务时效和质量长期不稳。',
          solution: '项目把审核规则、任务流转、补件回路和人工复核闸口收进同一条执行链，客服、审核和复核团队在同一套状态视图里协同处理。',
          delivery: '系统上线后覆盖高频审核、补件回退、复核处理和结果留痕四个核心环节，日常处理不再依赖人工追状态。',
          deliverables: ['审核规则库', '状态流转机制', '异常回退路径', '关键节点记录面板'],
          outcome: '上线后，高频审核链路时效缩短约 42%，补件回退率下降约 33%，关键节点状态可以按天追踪。',
          imageSrc: '/industry-assets/finance/hero.png',
          imageTitle: '审核工作台与任务状态面板',
        },
        {
          title: '某离散制造企业的异常工单与库存联动改造',
          sector: '制造与供应链',
          client: '某离散制造企业',
          stats: ['异常首响缩短约 34%', '库存核对人工下降约 29%', '异常闭环时长缩短约 22%'],
          originalMethod: '异常分诊、库存映射、责任到岗在一个工作台里闭环',
          aiCapability: '异常自动分诊与库存状态联动',
          technicalTraits: ['异常优先级识别', '库存字段映射', '责任节点留痕'],
          challenge: '现场异常出来以后，工单、库存和备料信息分散在不同系统里，班组、仓储和计划之间要靠人工核对，响应慢，责任也容易断档。',
          solution: '项目把异常分诊、库存映射、任务分发和升级记录接进同一套协同工作台，一线、仓储和计划岗位使用同一条状态链处理问题。',
          delivery: '系统日常承接高频异常工单、库存核对和升级处理，异常从发现到关闭都能在一处追踪。',
          deliverables: ['异常分类规则', '库存状态映射', '工单优先级机制', '升级处理SOP'],
          outcome: '上线后，异常首响缩短约 34%，库存核对人工下降约 29%，异常闭环时长缩短约 22%。',
          imageSrc: '/industry-assets/manufacturing/hero.png',
          imageTitle: '制造异常协同与库存联动界面',
        },
        {
          title: '某零售电商品牌的运营自动化与周报生成',
          sector: '零售与电商',
          client: '某零售电商品牌',
          stats: ['周报产出时间缩短约 85%', '人工汇总工作量下降约 68%', '活动复盘速度提升约 3 倍'],
          originalMethod: '多平台数据统一入表，日报周报自动生成并带异常提示',
          aiCapability: '数据归集 + 流程编排 + 自动摘要输出',
          technicalTraits: ['多源数据口径统一', '运营动作自动串联', '周报模板化生成'],
          challenge: '多平台经营数据分散，日报周报依赖人工汇总，活动期间运营响应和复盘经常滞后，管理层很难及时看到问题。',
          solution: '项目把平台数据、活动数据、客服反馈和履约指标归到同一套口径里，周报、复盘摘要和异常提醒由系统自动生成。',
          delivery: '业务团队现在可以在统一视图里看经营数据、活动结果和异常波动，不再反复拉表拼报。',
          deliverables: ['统一报表模板', '数据归集任务流', '活动复盘摘要', '异常提醒机制'],
          outcome: '上线后，周报产出时间缩短约 85%，人工汇总工作量下降约 68%，活动复盘从次周后移到活动后 24 小时内。',
          imageTitle: '电商运营仪表盘与周报界面',
        },
        {
          title: '某汽车零部件企业的异常与排产协同重构',
          sector: '汽车与零部件制造',
          client: '某汽车零部件企业',
          stats: ['异常首响缩短约 38%', '计划改动跟进人工下降约 32%', '排产调整闭环缩短约 27%'],
          originalMethod: '异常分诊与排产联动同屏运行，缺料和计划改动同步推进',
          aiCapability: '异常自动分诊与排产物料联动',
          technicalTraits: ['异常分级优先级', '排产与库存状态同步', '升级路径留痕'],
          challenge: '产线异常、缺料波动和排产调整分散在多个系统和岗位之间，计划、仓储与现场经常靠电话和群消息对齐，响应慢，改动也难留痕。',
          solution: '项目把异常分诊、排产联动、物料状态同步和升级规则拉到一套制造协同界面里，多智能体负责分类、提醒和后续推进。',
          delivery: '系统落地后覆盖异常接收、排产调整、缺料协同和升级留痕，计划层和现场使用同一套处理节奏。',
          deliverables: ['异常分类规则', '工单优先级机制', '排产与状态同步', '升级SOP'],
          outcome: '上线后，高频异常首响缩短约 38%，计划改动跟进人工下降约 32%，现场到计划层的调整闭环缩短约 27%。',
          imageSrc: '/industry-assets/automotive/hero.png',
          imageTitle: '汽车制造异常协同与排产联动画面',
        },
        {
          title: '某大型企业共享服务中心的多流程协同',
          sector: '企业运营与共享服务',
          client: '某大型企业共享服务中心',
          stats: ['重复流程处理时长缩短约 37%', '跨岗催办工作量下降约 49%', '标准化覆盖率提升至约 82%'],
          originalMethod: '流程模板、任务入口和跨岗协同工作台统一运行',
          aiCapability: '流程模板化与人机协同执行',
          technicalTraits: ['标准流程模板库', '跨岗协同路由', '持续复盘清单'],
          challenge: '财务、人事和行政流程重复、跨部门流转重，标准动作难沉淀，很多经验只掌握在少数人手里，团队一忙就容易积压。',
          solution: '项目把标准流程拆成模板，把任务入口、权限边界、回退规则和人工审核拉进统一工作台，重复事项由系统按模板推进。',
          delivery: '系统日常承接高频共享流程，跨岗任务可以在同一界面接收、处理、退回和复核。',
          deliverables: ['流程模板库', '任务入口设计', '角色权限边界', '复盘与优化清单'],
          outcome: '上线后，重复流程处理时长缩短约 37%，跨岗催办工作量下降约 49%，共享服务标准化覆盖率提升至约 82%。',
          imageTitle: '共享服务流程中心与协同工作台',
        },
      ],
      finalCta: {
        title: '如果你也在处理类似问题，可以直接拿业务场景来对照',
        body: '把当前卡住的流程、协同关系和目标结果说清楚，我们会更快判断这件事适不适合做、该从哪一段开始接。',
      },
    },
    about: {
      hero: {
        eyebrow: '关于我们',
        title: 'WanFlow 做的，是把 AI 真正接进企业业务里',
        body:
          '我们长期做的是企业 AI 最难落地的那一段硬活：数据怎么准备，流程怎么接顺，多智能体怎么进业务，人又怎么在关键节点把住质量。难的从来不是演示，而是系统上线以后能不能稳定、安全、持续见结果。',
      },
      summary: {
        eyebrow: '公司概览',
        items: [
          '面向中国 B 端企业',
          '数据、流程、多智能体一体化交付',
          '从方案判断到部署上线',
          '重视安全、稳定与可追踪',
        ],
      },
      identity: {
        eyebrow: 'WanFlow',
        title: 'WanFlow 是一家面向企业客户的 AI 运营与交付公司',
        paragraphs: [
          'WanFlow 长期聚焦企业里最难、也最容易被忽略的那一段：数据怎么准备，流程怎么接顺，AI 和人怎么一起把事情做完，系统上线以后又怎么持续跑稳。尤其在中国市场，很多企业不是不愿意做 AI，而是缺一支既懂业务现实、又能把系统真正接起来的团队。',
          '我们不把自己定义成只讲方案的咨询方，也不把交付理解成一次性外包。对我们来说，真正有价值的工作，是把数据标注与治理、流程编排与自动化、企业级多智能体、人机协同交付和模型运营闭环接成一套能长期运行的业务系统，让客户看得到这套系统怎么搭起来，也用得到它在日常业务里的稳定结果。',
          '我们相信，企业做 AI 最终比拼的不是一次演示有多惊艳，而是这套系统能不能持续交付、持续优化、持续建立信任。WanFlow 想做的，就是陪客户把这条链从想法、试点一路接到真实业务里。',
        ],
      },
      positioning: {
        eyebrow: '我们做什么',
        title: '我们更像一支把方案、系统、上线和复盘一起拉通的团队',
        paragraphs: [
          '很多企业 AI 项目不是输在模型上，而是输在前后的执行链上。数据准备不稳，人工和系统配合不顺，流程职责不清，结果也很难证明。',
          'WanFlow 做的，就是把这些环节重新接起来，让数据、流程、角色、产物和运营指标都能落到同一张图里，最后变成一套真正能跑的业务系统。',
        ],
      },
      team: {
        eyebrow: '我们的团队',
        title: '既懂业务现场，也懂系统交付',
        body: '我们更像一支能把业务判断、系统搭建、部署上线和后续复盘一起做完的混成团队。',
        members: [
          {
            name: '创始人兼 CEO',
            role: '业务方向与关键项目推进',
            summary: '美国顶级高校计算机博士，曾在 NeurIPS、ICML、ACL、CVPR 等 AI 顶级会议发表数十篇论文，历任 AI 科技企业首席科学家，并在多家互联网大厂长期深耕大模型、智能决策、多智能体系统与企业级 AI 产品化。',
            imageSrc: '/about/team/ceo.svg',
          },
          {
            name: 'CTO',
            role: '平台架构与多智能体系统',
            summary: '曾任头部科技企业平台架构与算法负责人，主导多智能体编排框架、知识系统和安全治理平台建设，长期负责高可靠、可审计的企业级 AI 底座。',
            imageSrc: '/about/team/cto.svg',
          },
          {
            name: '首席解决方案架构师',
            role: '业务拆解与交付方案设计',
            summary: '具备清华大学交叉信息研究院博士训练与大型企业流程咨询背景，长期负责复杂业务拆解、流程重构与协同方案设计，擅长把抽象目标拆成能上线、能运营、能复盘的执行骨架。',
            imageSrc: '/about/team/solution-architect.svg',
          },
          {
            name: '首席工程师',
            role: '核心系统与数据链路',
            summary: '曾在研究机构与一线工程团队负责核心系统、数据链路与质量机制建设，做过大规模数据管线、评测体系与可观测平台，擅长把系统做稳、做透、做成长期能力。',
            imageSrc: '/about/team/chief-engineer.svg',
          },
          {
            name: '前线部署工程师 FDE',
            role: '现场联调与上线落地',
            summary: '长期负责制造与政企复杂现场的系统部署与集成交付，擅长处理跨系统联调、灰度切换、权限环境与上线波动，能把方案真正顶到现场可用。',
            imageSrc: '/about/team/fde.svg',
          },
          {
            name: '交付运营负责人',
            role: '节奏、质量与复盘',
            summary: '曾任大型企业级项目交付负责人，长期负责交付管理、质量运营与复盘治理，擅长建立里程碑、质量闸口和持续优化闭环，把一次性交付拉成长期能力。',
            imageSrc: '/about/team/delivery-ops.svg',
          },
        ],
      },
      principles: {
        eyebrow: '工作原则',
        title: '我们用运营逻辑来做 AI 业务',
        items: [
          {
            title: '先看执行链，再看单点工具',
            body: '不急着上工具，先把业务动作、责任边界和反馈路径看清',
          },
          {
            title: '让复杂流程可追踪',
            body: '复杂本身不是问题，跑完说不清才是问题',
          },
          {
            title: '把服务做成长期能力',
            body: '我们更关注怎么把一次性交付变成持续协作',
          },
        ],
      },
      collaborationModel: {
        eyebrow: '协作方式',
        title: '从对齐目标，到落地执行，再到持续优化',
        items: [
          { title: '诊断', body: '先找出数据、流程和协作里的真正约束', },
          { title: '设计', body: '把能长期运行的执行骨架和交付边界定下来', },
          { title: '运行', body: '把人、流程、系统和产物真正接进业务日常', },
          { title: '优化', body: '根据结果、时效和质量持续迭代', },
        ],
      },
      trust: {
        eyebrow: '为什么值得信任',
        title: '为什么客户愿意把复杂问题交给我们',
        items: [
          '既懂数据工作，也懂交付节奏',
          '既能做自动化，也知道哪些节点必须有人判断',
          '既关注模型表现，也关注业务方最终怎么感受到价值',
        ],
      },
      finalCta: {
        title: '如果你要的不是一套说法，而是一支能把链路搭起来的团队，我们适合继续聊',
        body: '直接带着你的流程问题、交付目标或模型运营难题来找我们就行',
      },
    },
    contact: {
      hero: {
        eyebrow: '联系我们',
        title: '把你现在卡住的地方直接讲给我们听',
        body:
          '不管你卡在数据标注与治理、流程编排与自动化、企业级多智能体、人机协同交付还是模型运营闭环，只要问题已经到了需要一套真正能跑的系统这一步，WanFlow 都值得进入对话',
      },
      form: {
        title: '发起业务沟通',
        body: `填完下面的信息，我们会先按你的业务场景做一轮整理，并在${responseWindowLocalized.zh}尽快回复`,
        fields: {
          name: '姓名',
          company: '公司 / 团队',
          email: '工作邮箱',
          interest: '关注方向',
          timeline: '期望节奏',
          message: '你当前的问题',
        },
        interests: [
          '数据标注与治理',
          '流程编排与自动化',
          '企业级多智能体',
          '人机协同交付',
          '模型运营与持续优化',
          '需要一起梳理',
        ],
        timelines: ['尽快开始', '1 个月内', '本季度内', '先交流判断'],
        submit: '提交咨询',
        submitting: '提交中...',
        success: `已收到你的信息，我们会在${responseWindowLocalized.zh}通过邮箱联系你`,
        error: `提交失败，请稍后重试，或直接发送邮件到 ${siteContact.email}`,
        privacy: '这些信息只用于业务沟通，不会用于无关营销',
        validation: {
          name: '请填写姓名',
          company: '请填写公司或团队名称',
          email: '请填写有效的工作邮箱',
          message: '请简单描述你的业务问题',
        },
      },
      side: {
        title: '为什么现在联系 WanFlow',
        reasons: [
          '你已经确认问题不只是缺一个工具，而是整条执行链没接顺',
          '你需要一个同时理解数据、流程与模型运营的团队',
          '你希望交付的不只是结果，还有可证明、可复盘的过程',
        ],
        responseTitle: '沟通方式',
        responseBody: '你可以提交表单，也可以直接发邮件或打电话，如果方向还不够清楚，我们可以先一起拆问题',
        contactItems: [
          `邮箱：${siteContact.email}`,
          `电话：${siteContact.phone}`,
          `WeChat：${siteContact.wechat}`,
          `响应：${responseWindowLocalized.zh}`,
        ],
      },
      faq: [
        {
          question: '你们是咨询公司还是执行团队？',
          answer: '更准确地说，我们是能把咨询、流程设计和执行链搭建真正接起来的运营团队',
        },
        {
          question: '没有完整需求，也可以联系吗？',
          answer: '可以，很多项目一开始的问题不是需求不完整，而是问题还没有被看清',
        },
      ],
    },
  },
  en: {
    site: {
      title: 'WanFlow | Enterprise AI Delivery & Operations Partner',
      description:
        'WanFlow helps enterprises connect data labeling and governance, workflow orchestration and automation, enterprise multi-agent systems, human-in-the-loop delivery, and continuous model optimization into one working system.',
      brand: 'WanFlow',
      brandFull: 'WanFlow',
      tagline: 'Bring data, workflows, and AI into real business execution.',
      location: 'Originated in China, delivered globally',
    },
    nav: [
      { href: '/', label: 'Home' },
      { href: '/solutions', label: 'Industry Solutions' },
      { href: '/cases', label: 'Real Cases' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
    common: {
      skip: 'Skip to main content',
      primaryCta: 'Book an Ops Review',
      secondaryCta: 'Explore Industry Solutions',
      workbenchCta: 'Open WanFlow BenchmarkOps',
      language: 'Language',
      zh: '中文',
      en: 'EN',
      metaKicker: 'Data-driven AI operations',
      finalPrimary: 'Start the conversation',
      finalSecondary: 'See Real Cases',
    },
    footer: {
      companyName: 'Shanghai Wanliu Guizhi Technology Co., Ltd.',
      description:
        'WanFlow connects data, workflows, multi-agent systems, and model operations into one execution chain so enterprise AI programs can move from demo-ready to delivery-ready.',
      columns: [
        {
          title: 'Services',
          items: ['Data Labeling & Governance', 'Workflow Orchestration & Automation', 'Enterprise Multi-Agent Systems', 'Human-in-the-Loop Delivery'],
        },
        {
          title: 'Business entry points',
          items: ['Model Operations & Continuous Optimization', 'Data governance systems', 'Human-in-the-loop delivery', 'Enterprise delivery support'],
        },
        {
          title: 'Reach us',
          items: [siteContact.email, `Phone: ${siteContact.phone}`, `WeChat: ${siteContact.wechat}`, 'Replies within one business day'],
        },
      ],
      copyright: 'Copyright 2026 wanflowai.com. All rights reserved.',
      legal: 'WanFlow BenchmarkOps continues to serve as the internal proof layer behind delivery.',
      legalLinks: [
        { href: '/privacy', label: 'Privacy Policy' },
        { href: '/terms', label: 'Terms of Service' },
      ],
    },
    home: {
      hero: {
        eyebrow: 'Enterprise AI operations and delivery',
        title: 'Bring data, workflows, and AI into real business execution.',
        statement:
          'WanFlow helps enterprises connect data labeling and governance, workflow orchestration and automation, enterprise multi-agent systems, human-in-the-loop delivery, and continuous model optimization into one working delivery system.',
        body: 'We do not stop at recommendations. We design, run, and deliver the execution chain.',
        primary: { label: 'Book an Ops Review', href: '/contact' },
        secondary: { label: 'Explore Industry Solutions', href: '/solutions' },
      },
      supportSignals: [
        { value: '5', label: 'Core Modules', detail: 'covering the full loop from data to execution to optimization' },
        { value: 'Multi-Agent', label: 'Managed Execution', detail: 'controlled AI execution inside enterprise workflows' },
        { value: 'Closed Loop', label: 'Continuous Evaluation', detail: 'continuous iteration around feedback, evaluation, and outcomes' },
      ],
      platformView: {
        eyebrow: 'Platform / system view',
        title: 'Turn AI into a business system that can keep running.',
        body:
          'For enterprises, the hard part is rarely whether a model can run once. The hard part is how data is prepared, how workflows are coordinated, how humans and automation are orchestrated, and how outputs become reliable business results. WanFlow connects those pieces into one working system.',
        bullets: [
          'Workflow design and execution architecture',
          'Complex data processing and structured governance',
          'Human-in-the-loop operations with quality control',
          'Model operations and delivery proof for client-facing teams',
        ],
      },
      capabilityModules: {
        eyebrow: 'Capability modules',
        title: 'Five modules, one delivery loop that keeps evolving.',
        body:
          'These modules are not isolated service lines. They work as connected parts of one enterprise delivery system that keeps running, learning, and improving.',
        items: [
          {
            title: 'Data Labeling & Governance',
            body: 'Define labeling standards, quality loops, and governance rhythm together so data becomes a long-term operating asset instead of one-off output.',
            outcome: 'Build a stable data foundation.',
          },
          {
            title: 'Workflow Orchestration & Automation',
            body: 'Connect approvals, routing, quality checks, system actions, and exception handling into one stable operating flow.',
            outcome: 'Make cross-team execution smoother and more reliable.',
          },
          {
            title: 'Enterprise Multi-Agent Systems',
            body: 'Build safe, stable, and controllable multi-agent capabilities around enterprise tasks so AI can participate in execution, not just answer questions.',
            outcome: 'Turn AI into a managed execution force.',
          },
          {
            title: 'Human-in-the-Loop Delivery',
            body: 'Combine AI speed with human judgment, review, and fallback handling so complex work can be delivered in real operating conditions.',
            outcome: 'Balance efficiency, quality, and delivery certainty.',
          },
          {
            title: 'Model Operations & Continuous Optimization',
            body: 'Run evaluation, feedback, monitoring, and result validation over time so the system becomes steadier and more useful as it operates.',
            outcome: 'Create a closed loop that keeps improving.',
          },
        ],
      },
      deliveryFramework: {
        eyebrow: 'Delivery framework',
        title: 'Find the real blockage, then fix the chain step by step.',
        body:
          'Clients do not come to WanFlow for another slide deck. They come when the work should already run, but still breaks under real operating pressure.',
        steps: [
          { step: '01', title: 'Find the blockage', body: 'Pin the problem to a real operating link so everyone knows whether the break is in data, workflow, or feedback.' },
          { step: '02', title: 'Set the boundaries', body: 'Decide early what should be automated, what needs human review, and what must stay traceable.' },
          { step: '03', title: 'Put it into live work', body: 'Move the chain into day-to-day business operations and correct it while it is actually running.' },
          { step: '04', title: 'Keep tuning it', body: 'Watch quality, speed, and outcomes closely, then keep improving the parts that still drag the system down.' },
        ],
      },
      caseTeaser: {
        eyebrow: 'Case teaser',
        title: 'Not brand theatre — anonymized delivery patterns.',
        items: [
          {
            title: 'Data governance for a model ops team',
            sector: 'Model training and operations',
            challenge: 'Multiple data sources, inconsistent specs, unstable quality loops.',
            outcome: 'A unified operating rhythm with clearer quality controls and faster iteration.',
          },
          {
            title: 'Complex document-processing redesign',
            sector: 'Enterprise data processing',
            challenge: 'Mixed PDFs, spreadsheets, and text created expensive manual cleanup.',
            outcome: 'An automated extraction and structuring chain reduced repetitive human work.',
          },
          {
            title: 'Human-in-the-Loop delivery redesign',
            sector: 'Human-in-the-Loop Delivery',
            challenge: 'The client workflow was too complex to stabilize through ad hoc coordination.',
            outcome: 'A service interface and execution model made the process reusable and scalable.',
          },
        ],
      },
      finalCta: {
        eyebrow: 'Next step',
        title: 'If you are building an enterprise AI execution chain, let’s discuss the real bottlenecks.',
        body: 'From data preparation to workflow orchestration and model operations, WanFlow is strongest when the system is too complex for one-off fixes.',
      },
    },
    solutions: {
      problemFrame: {
        eyebrow: 'Industry Solutions',
        title: 'Connect AI, multi-agent execution, and business operations into one working chain.',
        body:
          'WanFlow does not start from abstract architecture. We start from the operating links that block real work: reviews, coordination, scheduling, exception handling, and review loops. We stabilize the data, workflow, roles, and guardrails first, then layer in our multi-agent execution framework, coordination state machine, and operating feedback loops so the system can keep running inside the business.',
      },
      industries: [
        {
          title: 'Finance & Insurance',
          headline: 'Reconnect review, resubmission, risk, and recheck into one auditable operating chain',
          summary: 'The hardest part in finance is not volume. It is what happens when volume arrives and review, resubmission, service handoff, recheck, and risk judgment split apart. WanFlow uses its review state machine and evidence-trace framework to stabilize rules, status, ownership, and human fallback before multi-agent execution takes over the repeated steps.',
          stats: ['Review cycle time down 35%-55%', 'Resubmission loops down 30%-45%', 'Manual review load down 25%-40%', 'Critical-node traceability above 90%'],
          originalMethod: 'WanFlow review state machine + evidence-trace framework',
          technicalTraits: ['Rules-first review spine', 'Evidence traceability at critical nodes', 'Human fallback thresholds'],
          imageSrc: '/industry-assets/finance/hero.png',
          imageTitle: 'Finance review and risk coordination workbench',
          imageHint: 'Good fits include approval-flow UI, review workbench, service-and-review coordination map, or a task-state dashboard.',
          outcomes: ['High-volume review time can drop by roughly 40%', 'Second-pass rework after resubmission can fall by about 30%', 'Critical-node traceability can reach 90%+', 'Management review shifts from sampling to live visibility'],
          modules: [
            {
              title: 'Review and resubmission flow redesign',
              body: 'Rebuild first review, resubmission, recheck, escalation, and return nodes into a state-clear chain so the same case stops bouncing between teams.',
              mappedModule: 'Workflow Orchestration & Automation',
              aiCapability: 'Rules-driven review with multi-agent resubmission handling',
              technicalTrait: 'WanFlow review state machine',
              originalMethod: 'Dual-track review state machine',
              imageSrc: '/industry-assets/finance/review.png',
              imageTitle: 'Review state machine and resubmission flow',
              deliverables: ['Review rules library', 'Resubmission loop design', 'State tracking model'],
              outcome: 'Review turnaround can improve by 35%-50%',
            },
            {
              title: 'Service and business routing',
              body: 'Bring customer-service intake, business judgment, and downstream actions into one governed operating flow.',
              mappedModule: 'Enterprise Multi-Agent Systems',
              aiCapability: 'Multi-entry recognition with agent-assisted routing',
              technicalTrait: 'WanFlow coordination router',
              originalMethod: 'Unified multi-entry routing chain',
              imageSrc: '/industry-assets/finance/routing.png',
              imageTitle: 'Service and business routing console',
              deliverables: ['Routing rules', 'Knowledge-use strategy', 'Cross-role SOP'],
              outcome: 'First-response routing can become 2-3x faster',
            },
            {
              title: 'Risk controls with human fallback',
              body: 'Combine automated screening, rule checks, and human review so the process moves faster without losing control.',
              mappedModule: 'Human-in-the-Loop Delivery',
              aiCapability: 'Smart screening with human review gates',
              technicalTrait: 'WanFlow risk guardrails',
              originalMethod: 'Risk guardrails before fallback',
              imageSrc: '/industry-assets/finance/risk.png',
              imageTitle: 'Risk review and human fallback checkpoint',
              deliverables: ['Rules and permission boundaries', 'Human review nodes', 'Critical records'],
              outcome: 'Manual review load can drop 25%-40% while keeping compliance boundaries intact',
            },
          ],
        },
        {
          title: 'Manufacturing & Supply Chain',
          headline: 'Bring exceptions, orders, inventory, and dispatch back onto one operating board',
          summary: 'Manufacturing teams rarely lack systems. They lack one shared chain after an issue appears. WanFlow connects its exception-triage engine, state-sync backbone, and operations review layer so plant, planning, warehousing, and management all work from the same live picture.',
          stats: ['Exception response down 30%-50%', 'Cross-system chasing down 25%-40%', 'Escalation closure down 20%-35%', 'Inventory-sync accuracy up 20%-30%'],
          originalMethod: 'WanFlow exception-triage engine + state-sync backbone',
          technicalTraits: ['Automated priority triage', 'Cross-system state sync', 'Traceable escalation path'],
          imageSrc: '/industry-assets/manufacturing/hero.png',
          imageTitle: 'Manufacturing exception and supply coordination main view',
          imageHint: 'Good fits include exception boards, warehouse-order linkage screens, or end-to-end supply flow visuals.',
          outcomes: ['Field exceptions can reach the right owner about 40% faster', 'Manual chasing and duplicate confirmation usually drop sharply after state sync is in place', 'Priority escalation loops often compress by 20%-35%', 'Inventory, logistics, and orders become visible in the same shift instead of in different systems'],
          modules: [
            {
              title: 'Exception triage',
              body: 'Detect equipment, quality, supply, and stoppage issues early, then route them by severity and ownership instead of by chat-room escalation.',
              mappedModule: 'Enterprise Multi-Agent Systems',
              aiCapability: 'Exception detection with agent-assisted prioritization',
              technicalTrait: 'WanFlow exception-triage engine',
              originalMethod: 'Triage first, then hand off automatically',
              imageSrc: '/industry-assets/manufacturing/triage.png',
              imageTitle: 'Manufacturing exception triage module',
              deliverables: ['Exception taxonomy', 'Priority model', 'Escalation design'],
              outcome: 'First-response dispatch can improve by 30%-45%',
            },
            {
              title: 'Order and inventory coordination',
              body: 'Connect order status, inventory movement, warehouse steps, and follow-up actions so teams stop chasing updates by hand.',
              mappedModule: 'Workflow Orchestration & Automation',
              aiCapability: 'Cross-system state sync with automatic reminders',
              technicalTrait: 'WanFlow state-sync backbone',
              originalMethod: 'Orders, inventory, and logistics move together',
              imageSrc: '/industry-assets/manufacturing/sync.png',
              imageTitle: 'Order and inventory linkage view',
              deliverables: ['State-sync flows', 'Cross-system field mapping', 'Alerts and rollback rules'],
              outcome: 'Manual reconciliation effort can drop 25%-35%',
            },
            {
              title: 'Supply-chain review loop',
              body: 'Capture root causes, actions, and recovery outcomes so operational improvement comes from evidence instead of memory.',
              mappedModule: 'Model Operations & Continuous Optimization',
              aiCapability: 'Exception attribution with feedback tracking',
              technicalTrait: 'WanFlow review layer',
              originalMethod: 'Push the cause back into the workflow',
              imageSrc: '/industry-assets/manufacturing/review.png',
              imageTitle: 'Supply-chain review dashboard',
              deliverables: ['Process record model', 'Review panel', 'Optimization feedback loop'],
              outcome: 'Repeat-exception rate can fall 15%-25% after review loops are in place',
            },
          ],
        },
        {
          title: 'Retail & E-commerce',
          headline: 'Connect commercial data, content operations, and service response into a reviewable growth loop',
          summary: 'Retail teams rarely get buried by one campaign. They get buried by daily reporting, cross-team follow-up, and delayed review. WanFlow builds a shared operating base for metrics, content rhythm, service response, and post-campaign review, then lets agents handle the repeated collection, reminders, summaries, and follow-through.',
          stats: ['Weekly reporting time down 70%-90%', 'Manual rollup work down 50%-75%', 'Campaign review speed up 2-4x'],
          originalMethod: 'WanFlow operating data base + review feedback loop',
          technicalTraits: ['Unified multi-channel definitions', 'Content-and-service task flow', 'Campaign results fed back automatically'],
          imageSrc: '/industry-assets/retail/hero.png',
          imageTitle: 'Retail operations and review main interface',
          imageHint: 'Good fits include marketplace dashboards, content calendars, service consoles, or weekly business reporting interfaces.',
          outcomes: ['Daily and weekly reporting can move from half a day to under an hour', 'Unified definitions can cut reporting errors by 30%+', 'Frontline content-service response can improve by 2x+', 'Campaign review can move from the following week to same-day or next-day'],
          modules: [
            {
              title: 'Multi-channel data consolidation',
              body: 'Bring marketplace, ads, service, and fulfillment data into one consistent reporting structure.',
              mappedModule: 'Data Labeling & Governance',
              aiCapability: 'Automated multi-channel metric consolidation',
              technicalTrait: 'WanFlow data base',
              originalMethod: 'One operating definition layer',
              imageSrc: '/industry-assets/retail/data.png',
              imageTitle: 'Multi-channel operating data base',
              deliverables: ['Field standardization', 'Collection task flows', 'Unified reporting templates'],
              outcome: 'Cross-platform reporting labor can drop 50%-70%',
            },
            {
              title: 'Content and service execution flow',
              body: 'Connect content scheduling, asset handling, service responses, and campaign rhythm into one managed chain.',
              mappedModule: 'Human-in-the-Loop Delivery',
              aiCapability: 'Coordinated content scheduling with service execution',
              technicalTrait: 'WanFlow frontline coordination flow',
              originalMethod: 'One frontline execution chain',
              imageSrc: '/industry-assets/retail/collab.png',
              imageTitle: 'Content and service coordination flow',
              deliverables: ['Content task orchestration', 'Knowledge asset library', 'Campaign response SOP'],
              outcome: 'Content-service response can improve by 2-3x',
            },
            {
              title: 'Automated reporting and review',
              body: 'Aggregate key metrics, campaign outcomes, and operating anomalies into reusable reporting outputs.',
              mappedModule: 'Model Operations & Continuous Optimization',
              aiCapability: 'Automated business summaries with anomaly prompts',
              technicalTrait: 'WanFlow review feedback loop',
              originalMethod: 'Daily and weekly review automation',
              imageSrc: '/industry-assets/retail/review.png',
              imageTitle: 'Operating review and auto-summary view',
              deliverables: ['Daily and weekly report logic', 'Review summaries', 'Anomaly prompts'],
              outcome: 'Summary generation time can shrink by 70%-90%',
            },
          ],
        },
        {
          title: 'Automotive & Parts Manufacturing',
          headline: 'Turn exceptions, scheduling, shortages, and quality variance into one live manufacturing chain',
          summary: 'In automotive and parts operations, the real drain is not one exception. It is the constant mismatch between exceptions, scheduling, material risk, quality variance, and supplier coordination. WanFlow stabilizes its exception triage, scheduling linkage, and quality feedback framework first, then lets multi-agent execution push cross-shift and cross-system actions forward.',
          stats: ['Exception response down 30%-50%', 'Cross-system chasing down 25%-40%', 'Schedule-adjustment closure down 20%-35%', 'Risk surfaced 1-2 handling steps earlier'],
          originalMethod: 'WanFlow exception triage desk + scheduling linkage framework',
          technicalTraits: ['Automated exception prioritization', 'Scheduling and material sync', 'Quality and supply feedback loop'],
          imageSrc: '/industry-assets/automotive/hero.png',
          imageTitle: 'Automotive exception and scheduling workbench',
          imageHint: 'Good fits include line-exception overviews, scheduling-linkage screens, material coordination views, or quality-traceability visuals.',
          outcomes: ['Field-to-owner dispatch can improve by about 40%', 'Manual chasing after schedule-material linkage can drop by about 30%', 'Priority adjustment loops can shrink by 20%-35%', 'Supply and quality variance becomes visible earlier within the same shift'],
          modules: [
            {
              title: 'Line-exception triage',
              body: 'Detect equipment, quality, stoppage, and shortage issues early, then route them by severity and ownership.',
              mappedModule: 'Enterprise Multi-Agent Systems',
              aiCapability: 'Automated exception detection with priority scoring',
              technicalTrait: 'WanFlow exception triage desk',
              originalMethod: 'Grade the exception first, then hand off automatically',
              imageSrc: '/industry-assets/automotive/triage.png',
              imageTitle: 'Automotive line-exception triage module',
              deliverables: ['Exception taxonomy', 'Priority model', 'Escalation design'],
              outcome: 'First-response dispatch can improve by 30%-45%',
            },
            {
              title: 'Scheduling and material coordination',
              body: 'Connect schedule changes, shortage risk, inventory status, and follow-up actions so teams stop chasing updates manually.',
              mappedModule: 'Workflow Orchestration & Automation',
              aiCapability: 'Cross-system state sync with automated reminders',
              technicalTrait: 'WanFlow scheduling linkage framework',
              originalMethod: 'When the schedule moves, material and follow-up move with it',
              imageSrc: '/industry-assets/automotive/sync.png',
              imageTitle: 'Scheduling and material coordination view',
              deliverables: ['State-sync flows', 'Cross-system field mapping', 'Alerts and rollback rules'],
              outcome: 'Schedule-material coordination effort can drop 25%-35%',
            },
            {
              title: 'Quality and supply review loop',
              body: 'Capture causes, actions, quality variance, and recovery outcomes so operations improve through evidence instead of memory.',
              mappedModule: 'Model Operations & Continuous Optimization',
              aiCapability: 'Exception attribution with feedback tracking',
              technicalTrait: 'WanFlow quality feedback board',
              originalMethod: 'Push the cause back into the workflow',
              imageSrc: '/industry-assets/automotive/review.png',
              imageTitle: 'Quality and supply review dashboard',
              deliverables: ['Process record model', 'Review panel', 'Optimization feedback loop'],
              outcome: 'Repeat-exception rate can fall 15%-25% after review loops are in place',
            },
          ],
        },
        {
          title: 'Enterprise Operations & Shared Services',
          headline: 'Move shared services from people chasing work to systems carrying it forward',
          summary: 'In shared services, the real problem is rarely volume. It is fragmented entry points, inconsistent rules, repeated rollbacks, and know-how that never becomes reusable. WanFlow builds templates, state machines, routing logic, and review rhythm first so agents can absorb repeated work and humans can stay on the critical judgment points.',
          stats: ['Repeat-process time down 30%-50%', 'Follow-up workload down 40%-60%', 'Standardization coverage up to 70%-90%', 'SLA on-time rate up 15%-25%'],
          originalMethod: 'WanFlow template library + cross-role routing desk',
          technicalTraits: ['Standardized process templates', 'Cross-role state-machine coordination', 'Dual-metric review on time and quality'],
          imageSrc: '/industry-assets/shared-services/hero.png',
          imageTitle: 'Shared services flow center',
          imageHint: 'This is where request intake, routing, SOPs, and review can sit in one shared operating view instead of being scattered across teams.',
          outcomes: ['Repeat flows can move from multi-chase handling to one governed chain', 'Cross-role follow-up effort can fall by about half', 'Standardization coverage can rise into the 70%-90% band', 'Institutional knowledge becomes reusable through templates and review dashboards'],
          modules: [
            {
              title: 'Shared-service flow standardization',
              body: 'Modularize common requests, approvals, and outputs so standard operating paths are clear and reusable.',
              mappedModule: 'Workflow Orchestration & Automation',
              aiCapability: 'Standardized entry points with automated node movement',
              technicalTrait: 'WanFlow template library',
              originalMethod: 'Turn repeated actions into reusable templates',
              imageSrc: '/industry-assets/shared-services/standardize.png',
              imageTitle: 'Shared-service template library',
              deliverables: ['Operating templates', 'Request-entry design', 'State and permission rules'],
              outcome: 'New standard flows can launch 30%-50% faster',
            },
            {
              title: 'Multi-role task coordination',
              body: 'Connect submission, handling, review, rollback, and completion across departments through one operating chain.',
              mappedModule: 'Human-in-the-Loop Delivery',
              aiCapability: 'Cross-role routing with automated reminders',
              technicalTrait: 'WanFlow cross-role routing desk',
              originalMethod: 'One chain across roles',
              imageSrc: '/industry-assets/shared-services/collab.png',
              imageTitle: 'Cross-role coordination workbench',
              deliverables: ['Cross-role flow design', 'Rollback and escalation rules', 'Task reminder strategy'],
              outcome: 'Cross-role follow-up volume can drop 40%-60%',
            },
            {
              title: 'Review and continuous improvement',
              body: 'Track time, quality, and recurring exceptions so the center gets stronger as it runs.',
              mappedModule: 'Model Operations & Continuous Optimization',
              aiCapability: 'Cycle-time and quality monitoring with improvement backlog',
              technicalTrait: 'WanFlow operations ledger',
              originalMethod: 'Watch time and quality together',
              imageSrc: '/industry-assets/shared-services/review.png',
              imageTitle: 'Operations review dashboard',
              deliverables: ['Efficiency metrics', 'Issue attribution model', 'Improvement backlog'],
              outcome: 'Cycle-time variance can fall 20%-35%',
            },
          ],
        },
      ],
      modules: [
        {
          title: 'Data Labeling & Governance',
          body: 'Turn raw inputs, field definitions, quality checks, and business feedback into one operating data pipeline so models, workflows, and agents all run from the same clean foundation.',
          deliverables: ['Data workbench', 'Field-definition dictionary', 'Two-layer quality rules', 'Business-feedback loop'],
          outcomes: ['Lower data rework', 'Faster onboarding for new scenarios'],
        },
        {
          title: 'Workflow Orchestration & Automation',
          body: 'This is not about drawing a process map. It is about turning approvals, routing, rollback logic, and cross-system actions into an execution state machine that actually runs.',
          deliverables: ['Workflow state machine', 'Cross-system action design', 'Ownership boundaries', 'Rollback rules'],
          outcomes: ['Fewer broken handoffs', 'Responsibility, rhythm, and traceability stay visible'],
        },
        {
          title: 'Enterprise Multi-Agent Systems',
          body: 'Build a controlled multi-agent execution layer around real enterprise tasks so AI can identify, reason, call tools, and act inside governed operating boundaries.',
          deliverables: ['Role-based agent design', 'Knowledge and tool connections', 'Permission guardrails', 'Execution audit controls'],
          outcomes: ['Agents participate in real business actions', 'Automation can expand safely over time'],
        },
        {
          title: 'Human-in-the-Loop Delivery',
          body: 'Connect human judgment, review, escalation, and AI speed into one delivery mechanism so complex work scales without losing control where it matters.',
          deliverables: ['Human handoff points', 'Review workbench', 'Escalation and fallback design', 'Quality gates'],
          outcomes: ['Complex work launches more safely', 'Speed gains do not come from removing control'],
        },
        {
          title: 'Model Operations & Continuous Optimization',
          body: 'Launch is not the finish line. WanFlow pulls evaluation, feedback, anomaly samples, and business outcomes back into one operating loop so the system keeps getting sharper in production.',
          deliverables: ['Evaluation baseline', 'Feedback channels', 'Exception sample library', 'Optimization rhythm dashboard'],
          outcomes: ['The system keeps evolving after go-live', 'Business teams trust the output more easily'],
        },
      ],
      finalCta: {
        title: 'If the problem is not conceptual but buried in a real business chain, this is the right time to talk.',
        body: 'Bring the industry context, operating blockage, and target outcome. That is where the first workable execution chain can actually begin.',
      },
    },
    cases: {
      intro: {
        eyebrow: 'Real Cases',
        title: 'Real cases should show both the result and how the work actually landed.',
        body: 'These anonymized cases focus on the original problem, the solution combination, and the delivery outcome instead of polished end-state claims alone.',
      },
      cards: [
        {
          title: 'Review and recheck workflow redesign for a consumer finance institution',
          sector: 'Finance & Insurance',
          client: 'A leading consumer finance institution',
          stats: ['Review time down about 42%', 'Resubmission rework down about 33%', 'Manual review load down about 28%'],
          originalMethod: 'Rules-first review with a state-machine workflow',
          aiCapability: 'Rule-driven review orchestration with multi-agent assistance and human fallback',
          technicalTraits: ['Rule library standardization', 'State-machine routing and traceability', 'Human review gates'],
          challenge: 'Review, resubmission, and recheck were split across multiple roles and systems, which made status visibility poor and exception handling circular.',
          solution: 'WanFlow combined review rules, workflow orchestration, multi-agent assistance, and human fallback controls into one governed execution chain.',
          delivery: 'Started with the highest-volume review nodes, then connected resubmission, recheck, and result records step by step.',
          deliverables: ['Review rules library', 'State-routing model', 'Exception rollback path', 'Critical-node dashboard'],
          outcome: 'After rollout, high-volume review time dropped about 42%, resubmission rework dropped about 33%, and key-node status became visible day to day.',
          imageSrc: '/industry-assets/finance/hero.png',
          imageTitle: 'Review workbench and task-state dashboard',
        },
        {
          title: 'Exception and scheduling coordination redesign for an automotive parts manufacturer',
          sector: 'Automotive & Parts Manufacturing',
          client: 'An automotive parts manufacturer',
          stats: ['First response down about 38%', 'Manual chasing down about 31%', 'Schedule-adjustment closure down about 24%'],
          originalMethod: 'Exception triage first, then schedule linkage and escalation',
          aiCapability: 'Automated exception triage with schedule and material linkage',
          technicalTraits: ['Exception tiering and prioritization', 'Schedule and inventory synchronization', 'Traceable escalation paths'],
          challenge: 'Line exceptions, shortage signals, and schedule changes moved across systems and roles with too much manual coordination, slowing down plant response.',
          solution: 'WanFlow rebuilt dispatch, schedule linkage, and human fallback rules with multi-agent support for classification, routing, and follow-up actions.',
          delivery: 'Rolled out around the most common exception categories first, then expanded schedule linkage, state sync, and escalation logic.',
          deliverables: ['Exception taxonomy', 'Priority mechanism', 'Scheduling-state synchronization', 'Escalation SOP'],
          outcome: 'High-frequency incident response improved by about 38%, manual chasing dropped about 31%, and schedule-adjustment closure improved by about 24%.',
          imageSrc: '/industry-assets/automotive/hero.png',
          imageTitle: 'Automotive exception and scheduling coordination view',
        },
        {
          title: 'Operations automation and weekly reporting for an e-commerce brand',
          sector: 'Retail & E-commerce',
          client: 'A retail e-commerce brand',
          stats: ['Reporting time down about 85%', 'Manual rollup work down about 68%', 'Review speed up about 3x'],
          originalMethod: 'Unified data definitions with automated review outputs',
          aiCapability: 'Data consolidation with workflow automation and AI summaries',
          technicalTraits: ['Unified data definitions', 'Automated operating actions', 'Templated weekly reporting'],
          challenge: 'Operating data was scattered across platforms, and campaign reviews depended on slow manual weekly reporting.',
          solution: 'Built one output chain for data consolidation, workflow orchestration, and AI-assisted reporting.',
          delivery: 'Unified reporting definitions first, then connected daily operating data and campaign data into automated summaries and anomaly prompts.',
          deliverables: ['Unified report templates', 'Data collection flow', 'Campaign review summaries', 'Anomaly prompts'],
          outcome: 'Weekly reporting time dropped about 85%, manual rollup work dropped about 68%, and campaign review moved into a 24-hour turnaround.',
          imageTitle: 'E-commerce reporting dashboard and weekly review interface',
        },
        {
          title: 'Knowledge governance and assisted answering for a healthcare team',
          sector: 'Healthcare & Pharma',
          client: 'A healthcare service team',
          stats: ['Document throughput up about 4x', 'Knowledge response down about 52%', 'Expert review pressure down about 26%'],
          originalMethod: 'Governed knowledge ingestion with a human review loop',
          aiCapability: 'Governed knowledge ingestion with assisted answering',
          technicalTraits: ['Knowledge version governance', 'Structured document extraction', 'Human review loop'],
          challenge: 'Knowledge materials changed frequently and answer consistency relied too heavily on a small number of senior specialists.',
          solution: 'Structured knowledge intake, document handling, and human review into one governed assistance loop.',
          delivery: 'Started from the highest-value knowledge materials, then expanded update rhythm, review gates, and answer controls.',
          deliverables: ['Knowledge ingestion policy', 'Structured document outputs', 'Human review loop', 'Version controls'],
          outcome: 'Document handling improved about 4x, knowledge-response time dropped about 52%, and expert review pressure fell about 26% while answer quality became steadier.',
          imageTitle: 'Knowledge search interface and assisted-answering console',
        },
        {
          title: 'Multi-process coordination for a shared services center',
          sector: 'Enterprise Operations & Shared Services',
          client: 'A large enterprise shared services center',
          stats: ['Repeat-process time down about 37%', 'Follow-up workload down about 49%', 'Standardization coverage up to about 82%'],
          originalMethod: 'Template-based operations with a shared cross-role workbench',
          aiCapability: 'Standardized flow templates with human-in-the-loop execution',
          technicalTraits: ['Process template library', 'Cross-role routing', 'Continuous review backlog'],
          challenge: 'Finance, HR, and admin workflows were repetitive, cross-team, and difficult to standardize at scale.',
          solution: 'Modularized standard process flows and combined multi-agent execution with human review inside one workbench.',
          delivery: 'Began with the most repeated service flows, then standardized entries, ownership boundaries, rollback rules, and review routines.',
          deliverables: ['Process template library', 'Task-entry model', 'Role-permission boundaries', 'Improvement backlog'],
          outcome: 'Repeat-process time dropped about 37%, follow-up workload dropped about 49%, and standardized-flow coverage rose to about 82%.',
          imageTitle: 'Shared services center and cross-team workflow console',
        },
      ],
      finalCta: {
        title: 'If you want to compare these cases against your own workflow, let’s speak in scenarios instead of buzzwords.',
        body: 'Bring the process blockage, coordination issue, or delivery goal that matters now. We can map from there.',
      },
    },
    about: {
      hero: {
        eyebrow: 'About',
        title: 'WanFlow brings AI into the operating core of real enterprise work',
        body:
          'We work on the part enterprise AI teams usually struggle to land: getting the data ready, the workflow connected, the multi-agent system into real operations, and the right human checkpoints in place so results stay safe and reliable after launch.',
      },
      summary: {
        eyebrow: 'Company snapshot',
        items: [
          'Built for enterprise teams in China',
          'Data, workflow, and multi-agent delivery in one system',
          'From solution framing to deployment',
          'Security, stability, and traceability by default',
        ],
      },
      identity: {
        eyebrow: 'WanFlow',
        title: 'WanFlow is an enterprise AI operations and delivery company',
        paragraphs: [
          'WanFlow focuses on the part enterprise AI projects usually underestimate: how data gets prepared, how workflows get connected, how people and AI divide the work, and how the system keeps producing reliable outcomes after launch.',
          'We are not a slide-deck consultancy, and we do not treat delivery as one-off outsourcing. Our work is to connect data governance, workflow orchestration, enterprise multi-agent execution, human review, and model operations into one business system that can keep running.',
          'We believe enterprise AI is not won by the best demo. It is won by whether the system can keep delivering, keep improving, and keep earning trust inside day-to-day operations.',
        ],
      },
      positioning: {
        eyebrow: 'What we do',
        title: 'We connect strategy, systems, deployment, and post-launch operations',
        paragraphs: [
          'Many enterprise AI projects do not fail at the model layer. They fail in the execution chain around it: unstable data prep, unclear ownership, weak coordination, and results that are hard to prove.',
          'WanFlow reconnects those links so data, workflows, people, outputs, and operating metrics can run as one managed system.',
        ],
      },
      team: {
        eyebrow: 'Our team',
        title: 'Built for business reality and delivery pressure',
        body: 'The team is built to cover solution judgment, system build, frontline deployment, and post-launch optimization as one continuous operating chain.',
        members: [
          {
            name: 'Founder & CEO',
            role: 'Business direction and critical engagements',
            summary: 'Holds a PhD in Computer Science from a top U.S. university, has published dozens of papers at leading AI conferences including NeurIPS, ICML, ACL, and CVPR, served as Chief Scientist in AI technology organizations, and spent years building large-model systems, intelligent decision platforms, multi-agent frameworks, and enterprise AI products across major internet companies.',
            imageSrc: '/about/team/ceo.svg',
          },
          {
            name: 'CTO',
            role: 'Platform architecture and multi-agent systems',
            summary: 'Previously led platform architecture and applied AI engineering in major technology organizations, covering multi-agent orchestration, knowledge systems, tool integration, and enterprise-grade governance.',
            imageSrc: '/about/team/cto.svg',
          },
          {
            name: 'Lead Solutions Architect',
            role: 'Workflow design and delivery structure',
            summary: 'Combines doctoral training in interdisciplinary information science with enterprise process consulting experience across workflow modeling, process redesign, and delivery architecture, turning abstract goals into systems that can actually launch and keep running.',
            imageSrc: '/about/team/solution-architect.svg',
          },
          {
            name: 'Chief Engineer',
            role: 'Core systems and data pipelines',
            summary: 'Worked across research labs and production engineering teams on core systems, data pipelines, evaluation stacks, and reliability mechanisms, with a focus on observability and long-term operating stability.',
            imageSrc: '/about/team/chief-engineer.svg',
          },
          {
            name: 'Frontline Deployment Engineer',
            role: 'Launch, integration, and go-live support',
            summary: 'Led field deployment and complex enterprise integration across manufacturing and regulated environments, handling rollout coordination, access constraints, gray releases, and go-live stabilization under real operating pressure.',
            imageSrc: '/about/team/fde.svg',
          },
          {
            name: 'Delivery Operations Lead',
            role: 'Cadence, quality, and review loops',
            summary: 'Has served in senior enterprise delivery roles across large-scale programs, leading milestone design, quality gates, review cadence, and post-launch optimization that turns one-off delivery into compounding capability.',
            imageSrc: '/about/team/delivery-ops.svg',
          },
        ],
      },
      principles: {
        eyebrow: 'Principles',
        title: 'We build AI work through an operating lens.',
        items: [
          {
            title: 'Execution chain before tool obsession',
            body: 'We do not rush into tooling before clarifying business actions, ownership, and feedback structure.',
          },
          {
            title: 'Complexity is acceptable; opacity is not',
            body: 'Complicated systems are manageable if they remain traceable and governable.',
          },
          {
            title: 'Services should compound into capability',
            body: 'The goal is not a one-off win. The goal is a stronger operating mechanism over time.',
          },
        ],
      },
      collaborationModel: {
        eyebrow: 'How we work',
        title: 'Align the target, run the chain, improve the system.',
        items: [
          { title: 'Diagnose', body: 'Surface the true constraints across data, process, and operating ownership.' },
          { title: 'Design', body: 'Abstract the execution spine and define what should become system behavior.' },
          { title: 'Run', body: 'Connect people, workflows, systems, and deliverables into live business motion.' },
          { title: 'Improve', body: 'Use results, speed, quality, and cost to refine the system over time.' },
        ],
      },
      trust: {
        eyebrow: 'Why clients trust us',
        title: 'We behave more like system builders inside operations than external decorators around them.',
        items: [
          'We understand data work and delivery cadence at the same time',
          'We automate aggressively without erasing the places where human judgment matters',
          'We care about how the business experiences the output, not just what the model can technically do',
        ],
      },
      finalCta: {
        title: 'If you need a team that can build the execution chain instead of describing it from a distance, let’s talk.',
        body: 'Bring the workflow problem, delivery goal, or model operations challenge directly to WanFlow.',
      },
    },
    contact: {
      hero: {
        eyebrow: 'Contact',
        title: 'Tell us which part of the system is currently stuck.',
        body:
          'Whether the issue is data governance, workflow orchestration, enterprise multi-agent systems, human-in-the-loop delivery, or model operations, WanFlow is most useful when the business needs a system that can actually run.',
      },
      form: {
        title: 'Start the conversation',
        body: `Share your operating context and we will reply ${responseWindowLocalized.en}.`,
        fields: {
          name: 'Name',
          company: 'Company / Team',
          email: 'Work email',
          interest: 'What are you looking for?',
          timeline: 'Expected timeline',
          message: 'What is the problem today?',
        },
        interests: [
          'Data Labeling & Governance',
          'Workflow Orchestration & Automation',
          'Enterprise Multi-Agent Systems',
          'Human-in-the-Loop Delivery',
          'Model Operations & Continuous Optimization',
          'Need help framing the problem',
        ],
        timelines: ['As soon as possible', 'Within 1 month', 'This quarter', 'Exploratory conversation first'],
        submit: 'Send inquiry',
        submitting: 'Sending...',
        success: `Your message has been received. We will follow up by email ${responseWindowLocalized.en}.`,
        error: `Submission failed. Please try again or email ${siteContact.email} directly.`,
        privacy: 'We only use this information for business follow-up.',
        validation: {
          name: 'Please enter your name.',
          company: 'Please enter your company or team.',
          email: 'Please enter a valid work email.',
          message: 'Please describe the current business problem.',
        },
      },
      side: {
        title: 'When contacting WanFlow makes sense',
        reasons: [
          'You already know the issue is larger than a missing tool',
          'You need a team that understands data, process, and model operations together',
          'You need outcomes with proof, traceability, and delivery structure',
        ],
        responseTitle: 'Ways to reach us',
        responseBody: 'Use the form, email, or call us directly. If the problem is still fuzzy, we can start with a structured problem-framing conversation.',
        contactItems: [
          `Email: ${siteContact.email}`,
          `Phone: ${siteContact.phone}`,
          `WeChat: ${siteContact.wechat}`,
          `Response: ${responseWindowLocalized.en}`,
        ],
      },
      faq: [
        {
          question: 'Are you a consulting firm or an execution team?',
          answer: 'More accurately, WanFlow is an operations-minded team that can connect strategy, workflow design, and execution-chain buildout.',
        },
        {
          question: 'Can we reach out before the scope is fully defined?',
          answer: 'Yes. Many projects first need the problem framed correctly before the execution path becomes obvious.',
        },
      ],
    },
  },
} as const;

type MarketingLocaleBase = (typeof marketingCopyBase)[keyof typeof marketingCopyBase];

type MarketingHomeBase = MarketingLocaleBase['home'];
type MarketingSolutionsBase = MarketingLocaleBase['solutions'];
type MarketingCasesBase = MarketingLocaleBase['cases'];
type MarketingAboutBase = MarketingLocaleBase['about'];

type MarketingHomeWithLegacy<T extends MarketingHomeBase> = T & {
  metrics: T['supportSignals'];
  spotlight: {
    label: T['platformView']['eyebrow'];
    title: T['platformView']['title'];
    body: T['platformView']['body'];
    bullets: T['platformView']['bullets'];
  };
  services: T['capabilityModules'];
  process: T['deliveryFramework'];
  casesTeaser: T['caseTeaser'];
};

type MarketingSolutionsWithLegacy<T extends MarketingSolutionsBase> = T & {
  hero: T['problemFrame'];
};

type MarketingCasesWithLegacy<T extends MarketingCasesBase> = T & {
  hero: T['intro'];
};

type MarketingAboutWithLegacy<T extends MarketingAboutBase> = T & {
  story: T['positioning'];
  model: T['collaborationModel'];
};

type MarketingLocaleWithLegacy<T extends MarketingLocaleBase> = Omit<T, 'home' | 'solutions' | 'cases' | 'about'> & {
  home: MarketingHomeWithLegacy<T['home']>;
  solutions: MarketingSolutionsWithLegacy<T['solutions']>;
  cases: MarketingCasesWithLegacy<T['cases']>;
  about: MarketingAboutWithLegacy<T['about']>;
};

function withLegacyHome<T extends {
  supportSignals: readonly unknown[];
  platformView: { eyebrow: string; title: string; body: string; bullets: readonly string[] };
  capabilityModules: { eyebrow: string; title: string; body: string; items: readonly unknown[] };
  deliveryFramework: { eyebrow: string; title: string; body: string; steps: readonly unknown[] };
  caseTeaser: { eyebrow: string; title: string; items: readonly unknown[] };
}>(home: T): MarketingHomeWithLegacy<T & MarketingHomeBase> {
  return {
    ...home,
    metrics: home.supportSignals,
    spotlight: {
      label: home.platformView.eyebrow,
      title: home.platformView.title,
      body: home.platformView.body,
      bullets: home.platformView.bullets,
    },
    services: home.capabilityModules,
    process: home.deliveryFramework,
    casesTeaser: home.caseTeaser,
  } as MarketingHomeWithLegacy<T & MarketingHomeBase>;
}

function withLegacySolutions<T extends { problemFrame: { eyebrow: string; title: string; body: string } }>(
  solutions: T,
): MarketingSolutionsWithLegacy<T & MarketingSolutionsBase> {
  return {
    ...solutions,
    hero: solutions.problemFrame,
  } as MarketingSolutionsWithLegacy<T & MarketingSolutionsBase>;
}

function withLegacyCases<T extends { intro: { eyebrow: string; title: string; body: string } }>(
  cases: T,
): MarketingCasesWithLegacy<T & MarketingCasesBase> {
  return {
    ...cases,
    hero: cases.intro,
  } as MarketingCasesWithLegacy<T & MarketingCasesBase>;
}

function withLegacyAbout<T extends {
  positioning: { eyebrow: string; title: string; paragraphs: readonly string[] };
  collaborationModel: { eyebrow: string; title: string; items: readonly unknown[] };
}>(about: T): MarketingAboutWithLegacy<T & MarketingAboutBase> {
  return {
    ...about,
    story: about.positioning,
    model: about.collaborationModel,
  } as MarketingAboutWithLegacy<T & MarketingAboutBase>;
}

function withLegacyLocale<T extends MarketingLocaleBase>(copy: T): MarketingLocaleWithLegacy<T> {
  return {
    ...copy,
    home: withLegacyHome(copy.home),
    solutions: withLegacySolutions(copy.solutions),
    cases: withLegacyCases(copy.cases),
    about: withLegacyAbout(copy.about),
  } as MarketingLocaleWithLegacy<T>;
}

export const marketingCopy = {
  zh: withLegacyLocale(marketingCopyBase.zh),
  en: withLegacyLocale(marketingCopyBase.en),
} as const satisfies Record<Locale, MarketingLocaleWithLegacy<MarketingLocaleBase>>;

export function getMarketingCopy(locale: Locale) {
  return marketingCopy[locale];
}

export type MarketingCopy = ReturnType<typeof getMarketingCopy>;
