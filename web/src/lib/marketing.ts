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
      { href: '/solutions', label: '解决方案' },
      { href: '/cases', label: '案例' },
      { href: '/about', label: '关于我们' },
      { href: '/contact', label: '联系我们' },
    ],
    common: {
      skip: '跳转到主要内容',
      primaryCta: '预约咨询',
      secondaryCta: '查看解决方案',
      workbenchCta: '查看内部平台',
      language: '语言',
      zh: '中文',
      en: 'EN',
      metaKicker: 'Data-driven AI operations',
      finalPrimary: '发起业务沟通',
      finalSecondary: '查看案例',
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
        secondary: { label: '查看解决方案', href: '/solutions' },
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
        eyebrow: '解决方案',
        title: '把零散的 AI 工作重新接成一套能跑的系统',
        body:
          'WanFlow 不是简单的人力补位，也不是只给工具，我们更关注怎么把数据、流程和模型运营一起接进业务里',
      },
      architecture: [
        {
          title: 'Data Foundation',
          body: '先把采集、标注、质检和结构化治理做扎实，数据地基才稳',
        },
        {
          title: 'Process Layer',
          body: '把人工步骤、自动化节点、审批和交付节奏接成一条执行链',
        },
        {
          title: 'Model Operations',
          body: '围绕模型表现、反馈回路和结果证明做持续运营',
        },
      ],
      modules: [
        {
          title: '数据标注与治理',
          body: '适合训练数据建设、数据补标、质检返修和治理规则持续收敛这类需要长期稳定标准的场景',
          deliverables: ['标注规范设计', '数据标准定义', '质检与返修机制', '治理节奏与产能报表'],
          outcomes: ['数据基础更稳', '后续返工更少'],
        },
        {
          title: '流程编排与自动化',
          body: '适合跨团队流转、审批回路、异常处理和系统动作编排这类需要稳定执行节奏的任务',
          deliverables: ['流程编排设计', '角色职责边界', '状态追踪机制', '异常处理路径'],
          outcomes: ['跨团队执行更顺', '交付波动更低'],
        },
        {
          title: '企业级多智能体',
          body: '围绕企业场景设计可控的多智能体执行能力，让任务理解、知识调用和动作执行进入同一套系统',
          deliverables: ['任务与权限边界', '知识与工具接入', '执行链路设计', '运行与审计机制'],
          outcomes: ['自动执行能力更强', '企业落地方式更可控'],
        },
        {
          title: '人机协同交付',
          body: '适合那些不能完全自动化、但又必须规模化交付的复杂任务，把 AI 效率和人工判断接成可运行的体系',
          deliverables: ['协同分工设计', '复核与兜底机制', '质量控制节点', '交付运行手册'],
          outcomes: ['效率和质量更平衡', '复杂任务更容易落地'],
        },
        {
          title: '模型运营与持续优化',
          body: '围绕模型上线后的表现，持续处理评测、反馈、数据回流和效果验证，让系统形成长期运营闭环',
          deliverables: ['评测闭环', '反馈回流机制', '运行监控', '优化与证明材料'],
          outcomes: ['模型能力更可持续', '业务方更容易建立信任'],
        },
      ],
      triggers: {
        eyebrow: '典型触发场景',
        title: '企业通常在这些时候来找 WanFlow',
        items: [
          '数据源多、标准乱，团队越来越依赖人工救火',
          '流程跨部门、跨角色，交付经常卡在衔接与回溯',
          '模型上线了，但没有稳定的运营与反馈闭环',
          '客户要求的不只是结果，而是可检查、可证明的执行过程',
        ],
      },
      delivery: {
        eyebrow: '交付模型',
        title: '从看清问题，到接进业务，再到持续优化',
        steps: [
          { step: 'A', title: '业务诊断', body: '先看流程断点、数据断点和责任断点' },
          { step: 'B', title: '方案抽象', body: '分清哪些环节该自动化，哪些环节该服务化' },
          { step: 'C', title: '执行上线', body: '把设计好的链路真正接进日常业务' },
          { step: 'D', title: '运营迭代', body: '按时效、质量、成本和结果持续迭代' },
        ],
      },
      finalCta: {
        title: '如果你已经知道问题卡在流程和数据上，现在就值得开始谈',
        body: '我们更擅长处理那种事情能做，但系统总跑不顺的阶段',
      },
    },
    cases: {
      intro: {
        eyebrow: '案例',
        title: '看结果，也看这件事是怎么跑起来的',
        body: '这些案例做了匿名化处理，重点不是讲漂亮故事，而是把真实运营问题和处理方式讲清楚',
      },
      featured: {
        eyebrow: 'Featured case',
        title: '面向大模型运营团队的多源数据治理重构',
        sector: '模型训练与运营',
        challenge:
          '客户原有的数据处理和标注流程分散在多个团队，样本规范不统一，返修链条长，运营侧也很难稳定评估质量',
        intervention:
          'WanFlow 重新梳理了标注规范、质量节点、处理接口和反馈节奏，把高重复整理动作交给自动化，把人工能力留给判断和复核',
        outcome:
          '最后拿到的是更稳定的数据节奏、更短的返工周期，以及可以拿出来对齐和汇报的过程证明',
        stats: [
          { value: '统一规范', label: '标注与质检接口', detail: '从分散标准变为统一协议' },
          { value: '缩短链路', label: '返修与回溯时间', detail: '减少人工反复对齐' },
          { value: '可证明', label: '过程与结果', detail: '更容易支持内部复盘与客户沟通' },
        ],
      },
      cards: [
        {
          title: '复杂文档结构化处理',
          sector: '数据标注与治理',
          challenge: '文档来源多、格式差异大、人工录入成本高',
          action: '搭建自动抽取、归一化和校验链路',
          outcome: '让数据更快进入后续业务系统',
        },
        {
          title: '客服与运营流程重编排',
          sector: '流程编排与自动化',
          challenge: '多个角色串联执行，但责任不清，状态也不可追踪',
          action: '重建任务流转、状态节点和异常路径',
          outcome: '提高流程透明度和交付一致性',
        },
        {
          title: '模型运营证明层建设',
          sector: '模型运营与持续优化',
          challenge: '模型效果难稳定复盘，对业务方解释成本高',
          action: '建立评测、记录、产物和沟通一体的证明层',
          outcome: '让模型讨论从感受转向证据',
        },
      ],
      proof: {
        eyebrow: '交付物视角',
        title: '客户真正看重的，往往是这些能拿出来证明的东西',
        items: [
          {
            title: '流程蓝图',
            body: '把角色、任务、自动化节点和异常路径讲清楚，便于对齐和扩展',
          },
          {
            title: '运行记录',
            body: '保留关键执行节点和结果摘要，让复盘不再靠口头记忆',
          },
          {
            title: '交付证据包',
            body: '把结果、说明和必要上下文整理成能对外使用的交付结构',
          },
        ],
      },
      finalCta: {
        title: '如果你想按自己的业务场景来聊案例，我们可以直接展开',
        body: '与其泛泛聊 AI 转型，不如直接聊你现在这条链路卡在哪',
      },
    },
    about: {
      hero: {
        eyebrow: '关于我们',
        title: 'WanFlow 认为，AI 真正落地靠的是一整套运营系统',
        body:
          '我们长期做的是数据治理、流程执行和模型运营这些不热闹但很关键的事，对企业来说，真正可用的 AI 往往不是一个模型，而是一套能持续运行的协作系统',
      },
      positioning: {
        eyebrow: '我们的视角',
        title: '我们先看交付怎么跑，再看模型怎么用',
        paragraphs: [
          '很多企业 AI 项目不是输在算法上，而是输在前后的执行链上，数据准备不稳，人工和系统配合不顺，流程职责不清，结果也很难证明',
          'WanFlow 做的，就是把这些环节重新接起来，把数据、流程、角色、产物和运营指标放到一张图里，看系统能不能真正跑顺',
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
      { href: '/solutions', label: 'Solutions' },
      { href: '/cases', label: 'Cases' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
    common: {
      skip: 'Skip to main content',
      primaryCta: 'Book an Ops Review',
      secondaryCta: 'Explore Solutions',
      workbenchCta: 'Open WanFlow BenchmarkOps',
      language: 'Language',
      zh: '中文',
      en: 'EN',
      metaKicker: 'Data-driven AI operations',
      finalPrimary: 'Start the conversation',
      finalSecondary: 'See Cases',
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
        secondary: { label: 'Explore Solutions', href: '/solutions' },
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
        eyebrow: 'Solutions',
        title: 'Rebuild fragmented AI workflows into an enterprise operating system.',
        body:
          'WanFlow is not selling an isolated labor layer or a software layer. We connect data, process, and model operations into a working delivery system.',
      },
      architecture: [
        {
          title: 'Data Foundation',
          body: 'Build the intake, labeling, quality, and structuring foundation before downstream operations collapse under bad inputs.',
        },
        {
          title: 'Process Layer',
          body: 'Map people, automation, approvals, handoffs, and exceptions into a controlled workflow.',
        },
        {
          title: 'Model Operations',
          body: 'Operate the evaluation, feedback, monitoring, and proof layer that keeps AI tied to business outcomes.',
        },
      ],
      modules: [
        {
          title: 'Data Labeling & Governance',
          body: 'For training-data buildout, relabeling, quality control, and governance standards that need to stay stable over time.',
          deliverables: ['Labeling specification design', 'Data standards', 'Quality and rework loops', 'Governance and output reporting'],
          outcomes: ['More stable data foundations', 'Less downstream rework'],
        },
        {
          title: 'Workflow Orchestration & Automation',
          body: 'For cross-team routing, approvals, exception handling, and system actions that need a reliable operating cadence.',
          deliverables: ['Workflow orchestration design', 'Ownership boundaries', 'State tracking', 'Exception paths'],
          outcomes: ['Lower coordination drag', 'More stable execution quality'],
        },
        {
          title: 'Enterprise Multi-Agent Systems',
          body: 'For enterprise scenarios that require controllable multi-agent execution across task understanding, knowledge access, and action handling.',
          deliverables: ['Task and permission boundaries', 'Knowledge and tool connections', 'Execution-chain design', 'Runtime and audit controls'],
          outcomes: ['Stronger automated execution', 'More controllable enterprise adoption'],
        },
        {
          title: 'Human-in-the-Loop Delivery',
          body: 'For work that cannot be fully automated but still needs to scale through a disciplined blend of AI execution and human review.',
          deliverables: ['Human-AI work split', 'Review and fallback design', 'Quality control nodes', 'Delivery operating playbook'],
          outcomes: ['Better balance of speed and quality', 'Complex work that lands in practice'],
        },
        {
          title: 'Model Operations & Continuous Optimization',
          body: 'Create the mechanisms needed to evaluate, monitor, improve, and prove model performance as an ongoing operating loop.',
          deliverables: ['Evaluation loops', 'Feedback channels', 'Operational monitoring', 'Optimization and evidence packages'],
          outcomes: ['Longer-lived model performance', 'Stronger business-side trust'],
        },
      ],
      triggers: {
        eyebrow: 'When to call WanFlow',
        title: 'Most teams start needing us at these moments.',
        items: [
          'Data sources multiply and operating standards drift apart',
          'Processes span too many teams and too much manual coordination',
          'Models are live, but there is no durable operational feedback loop',
          'The client needs proof, not just results',
        ],
      },
      delivery: {
        eyebrow: 'Delivery sequence',
        title: 'Move from diagnosis to stable execution in a controlled rhythm.',
        steps: [
          { step: 'A', title: 'Diagnosis', body: 'Find the real constraints across data, process, and operational ownership.' },
          { step: 'B', title: 'Abstraction', body: 'Separate what should be automated, what should remain human, and what should become a service layer.' },
          { step: 'C', title: 'Launch', body: 'Connect the workflow to day-to-day business execution instead of leaving it in a slide deck.' },
          { step: 'D', title: 'Operate', body: 'Iterate on quality, speed, and cost with the system already in motion.' },
        ],
      },
      finalCta: {
        title: 'If you already know the problem lives in data and process, this is the right time to talk.',
        body: 'WanFlow is strongest when the system can technically run, but cannot yet run smoothly as a business operation.',
      },
    },
    cases: {
      intro: {
        eyebrow: 'Cases',
        title: 'See the outcome, but also the execution spine behind it.',
        body: 'These anonymized cases focus on how WanFlow solves operational AI problems instead of presenting only polished end-state claims.',
      },
      featured: {
        eyebrow: 'Featured case',
        title: 'Multi-source data governance redesign for a model operations team',
        sector: 'Model training and operations',
        challenge:
          'The client managed fragmented data processing and labeling workflows across multiple teams. Standards drifted, rework cycles were long, and operations had no stable way to judge quality.',
        intervention:
          'WanFlow redefined labeling specs, quality gates, processing interfaces, and feedback rhythm while automating the repetitive coordination work and preserving human judgment where it mattered.',
        outcome:
          'The team gained a more stable output cadence, shorter rework cycles, and clearer operational proof for both internal alignment and external communication.',
        stats: [
          { value: 'Unified', label: 'specification layer', detail: 'one shared contract replaced fragmented rules' },
          { value: 'Shorter', label: 'rework path', detail: 'less time spent chasing inconsistencies' },
          { value: 'Traceable', label: 'delivery proof', detail: 'easier internal review and client communication' },
        ],
      },
      cards: [
        {
          title: 'Complex document structuring',
          sector: 'Data Labeling & Governance',
          challenge: 'Mixed documents made manual cleanup expensive and slow.',
          action: 'Built a normalization and extraction chain.',
          outcome: 'Moved inputs into usable structures faster.',
        },
        {
          title: 'Operations workflow redesign',
          sector: 'Workflow Orchestration & Automation',
          challenge: 'Cross-role execution lacked ownership clarity and traceability.',
          action: 'Rebuilt routing, status control, and exception paths.',
          outcome: 'Improved transparency and delivery consistency.',
        },
        {
          title: 'Model proof layer buildout',
          sector: 'Model Operations & Continuous Optimization',
          challenge: 'Model performance was hard to explain and hard to revisit with evidence.',
          action: 'Created an evaluation, recording, artifact, and communication layer.',
          outcome: 'Turned model discussion from intuition into evidence.',
        },
      ],
      proof: {
        eyebrow: 'Delivery artifacts',
        title: 'These proof layers are often what clients really buy.',
        items: [
          {
            title: 'Workflow blueprint',
            body: 'Make roles, tasks, automation points, and exception paths explicit enough to align and scale.',
          },
          {
            title: 'Run records',
            body: 'Keep key execution states and result summaries so reviews do not rely on memory or ad hoc screenshots.',
          },
          {
            title: 'Evidence package',
            body: 'Package outcomes, reasoning, and execution context into something usable for external delivery.',
          },
        ],
      },
      finalCta: {
        title: 'If you want the case discussion framed around your workflow, let’s speak in scenarios rather than buzzwords.',
        body: 'WanFlow would rather talk about a specific execution problem than repeat generic “AI transformation” language.',
      },
    },
    about: {
      hero: {
        eyebrow: 'About',
        title: 'WanFlow believes AI becomes real when it is operated like a system.',
        body:
          'We are a data-driven AI company focused on the least glamorous but most decisive layers of enterprise AI: data governance, workflow execution, and model operations. In practice, most AI value is created by the system around the model, not by the model alone.',
      },
      positioning: {
        eyebrow: 'How we see the problem',
        title: 'We start from delivery, not from model spectacle.',
        paragraphs: [
          'Most enterprise AI programs do not fail because the model is impossible. They fail because data preparation is unstable, human and system work does not connect cleanly, ownership is vague, and results cannot be proven when the pressure rises.',
          'WanFlow reconnects those layers. We think in terms of data, process, roles, artifacts, and operating metrics on the same map so the system can actually run in production conditions.',
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
