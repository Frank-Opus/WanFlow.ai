import type { Locale } from '@/lib/i18n';

export const siteContact = {
  email: 'business@wanflow.ai',
  wechat: 'WanFlow-AI',
  responseWindow: '24 hours',
} as const;

const marketingCopyBase = {
  zh: {
    site: {
      title: 'WanFlow | 数据驱动的 AI 运营与交付伙伴',
      description:
        'WanFlow 万物归流为企业提供 AI 数据标注、自动化数据处理、流程自动化、Process as a Service 与模型运营服务。',
      brand: 'WanFlow',
      brandFull: 'WanFlow 万物归流',
      tagline: 'Data-driven AI operations, built for enterprise delivery.',
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
      proofLabel: '可交付的 AI 运营系统',
      proofNote: '从数据标注到模型运营，不止讲方法，更交付执行链。',
      finalPrimary: '发起业务沟通',
      finalSecondary: '查看 BenchmarkOps',
      workbenchNote: '现有内部平台 BenchmarkOps 可作为运营与交付证明层。',
    },
    footer: {
      description:
        'WanFlow 把数据、流程和模型运营拉回同一条执行链，让企业 AI 项目从“能演示”走向“能交付、能扩展、能复盘”。',
      columns: [
        {
          title: '服务范围',
          items: ['AI 数据标注', '自动化数据处理', '流程自动化', 'Process as a Service'],
        },
        {
          title: '业务入口',
          items: ['模型运营服务', '行业数据治理', '人机协同流程', '企业交付支持'],
        },
        {
          title: '联络方式',
          items: ['business@wanflow.ai', 'WeChat: WanFlow-AI', '24 小时内响应工作日咨询'],
        },
      ],
      copyright: 'Copyright 2026 WanFlow.ai. All rights reserved.',
      legal: 'BenchmarkOps 作为内部运营平台持续提供能力证明。',
    },
    home: {
      hero: {
        eyebrow: '企业 AI 运营官网',
        title: '把 AI 项目背后的数据与流程，真正跑成一套可交付系统。',
        statement:
          'WanFlow 万物归流是一家数据驱动型 AI 公司，面向企业提供 AI 数据标注、自动化数据处理、流程自动化、Process as a Service 与模型运营服务。',
        body:
          '我们不是只给建议，而是把执行链真正搭起来、跑起来、交付出去。',
        primary: { label: '预约咨询', href: '/contact' },
        secondary: { label: '查看解决方案', href: '/solutions' },
      },
      supportSignals: [
        { value: '5', label: '核心服务模块', detail: '覆盖数据、流程与模型运营全链路' },
        { value: 'PaaS', label: 'Process as a Service', detail: '把复杂业务流程封装为稳定执行能力' },
        { value: 'Ops', label: 'Model Operations', detail: '支持从数据到运行再到复盘的持续运营' },
      ],
      platformView: {
        eyebrow: '平台 / 系统视角',
        title: '像建设运营系统一样建设 AI 交付，而不是像做一次 demo。',
        body:
          '对企业来说，真正难的不是“模型能不能跑起来”，而是数据如何准备、流程如何协同、人工与自动化如何编排、交付物如何稳定复现。WanFlow 的价值在于把这些环节连成一张可运营的网。',
        bullets: [
          '业务流程梳理与执行链设计',
          '复杂数据处理与结构化治理',
          '人机协同流程与质量控制',
          '面向客户交付与持续优化的模型运营',
        ],
      },
      capabilityModules: {
        eyebrow: '能力模块',
        title: '五个模块，一条执行链。',
        body:
          '官网不把服务拆成彼此孤立的售卖项，而是让客户看到：这些模块如何从同一条数据与流程骨架里协同工作。',
        items: [
          {
            title: 'AI 数据标注',
            body: '围绕业务目标设计标注规范、质检机制与产能节奏，而不是单纯堆人力。',
            outcome: '形成可扩展的数据生产与验收机制。',
          },
          {
            title: '自动化数据处理',
            body: '把清洗、抽取、归一化、结构化等高重复任务沉淀为可复用能力。',
            outcome: '让数据从原料更快进入可用状态。',
          },
          {
            title: '流程自动化',
            body: '把人工审批、任务流转、质检回路与系统动作编排成稳定流程。',
            outcome: '降低跨团队协作摩擦与交付波动。',
          },
          {
            title: 'Process as a Service',
            body: '把企业难以标准化的运营流程产品化，形成可持续外包与协同接口。',
            outcome: '让复杂流程可以被持续执行与放大。',
          },
          {
            title: '模型运营服务',
            body: '围绕模型表现、数据反馈、运行监控和交付证明，建立持续迭代闭环。',
            outcome: '让模型能力成为一项被运营的业务资产。',
          },
        ],
      },
      deliveryFramework: {
        eyebrow: '交付框架',
        title: '从问题梳理，到执行闭环，再到可证明结果。',
        body:
          'WanFlow 的官网叙事不是“功能介绍”，而是“交付结构”。企业买的不只是能力点，而是一套可落地、可扩展、可追踪的运营系统。',
        steps: [
          { step: '01', title: '诊断业务瓶颈', body: '识别数据、流程、角色协作与模型运行中的真正卡点。' },
          { step: '02', title: '设计执行骨架', body: '把任务接口、质检规则、自动化节点和责任边界定义清楚。' },
          { step: '03', title: '跑通交付链路', body: '把数据处理、流程编排、运营动作与交付产物串成真实运行链。' },
          { step: '04', title: '持续运营优化', body: '围绕结果、质量、成本与时效做持续迭代，而不是一次性交付。' },
        ],
      },
      proofLayer: {
        eyebrow: '证明层',
        title: '我们更像一支 AI 运营团队，而不是只交一份方案。',
        body: 'BenchmarkOps 不作为首页主角出现，而是作为中段证明层，说明 WanFlow 如何把内部执行方法真正沉淀为可展示、可复盘、可验证的运营系统。',
        items: [
          {
            title: '数据与流程一体化看问题',
            body: '不把“数据问题”“流程问题”“模型问题”割裂开，而是从执行链角度统一设计。',
          },
          {
            title: '服务不是黑盒外包',
            body: '每个环节都强调规范、质检、节奏、反馈与可复盘性，方便企业长期协作。',
          },
          {
            title: '把内部平台当成证明层',
            body: 'WanFlow 现有内部平台 BenchmarkOps 展示了我们对流程、产物与评测闭环的真实理解。',
          },
        ],
      },
      caseTeaser: {
        eyebrow: '案例预览',
        title: '不是行业故事会，而是匿名化的交付结构样本。',
        items: [
          {
            title: '大模型团队数据治理加速',
            sector: '模型训练与运营',
            challenge: '多来源样本标准不统一，质检回路长，产能不稳定。',
            outcome: '建立统一标注规范与自动化流转，缩短迭代周期。',
          },
          {
            title: '复杂文档处理流程重构',
            sector: '企业数据处理',
            challenge: 'PDF、表格、文本混杂，人工整理成本高。',
            outcome: '搭建自动化抽取与结构化处理链，减少重复人力。',
          },
          {
            title: '运营流程作为服务输出',
            sector: 'Process as a Service',
            challenge: '客户流程复杂、跨角色协作混乱、交付标准难固定。',
            outcome: '把流程变成服务化接口，形成稳定协同机制。',
          },
        ],
      },
      finalCta: {
        eyebrow: '下一步',
        title: '如果你正在搭建企业 AI 执行链，我们可以直接聊真实问题。',
        body: '从数据准备到流程编排，再到模型运营与交付证明，WanFlow 更适合在复杂系统里一起把事情做成。',
      },
    },
    solutions: {
      problemFrame: {
        eyebrow: '解决方案',
        title: '把碎片化 AI 工作流，重组为可运营、可扩展、可交付的企业系统。',
        body:
          'WanFlow 的服务结构不是简单的“人力包 + 工具包”，而是围绕企业 AI 交付的真实运行逻辑，把数据、流程和模型运营放回同一套系统里。',
      },
      architecture: [
        {
          title: 'Data Foundation',
          body: '从采集、标注、质检到结构化治理，先把可用数据地基打稳。',
        },
        {
          title: 'Process Layer',
          body: '把人工步骤、自动化节点、审批与交付节奏编排成标准执行链。',
        },
        {
          title: 'Model Operations',
          body: '围绕模型表现、反馈回路与输出证明，建立持续运营机制。',
        },
      ],
      modules: [
        {
          title: 'AI 数据标注',
          body: '适用于训练数据建设、数据补标、质检返修、多轮标注协同等场景。',
          deliverables: ['标注规范设计', '质检机制', '多角色协同流程', '产能与质量报表'],
          outcomes: ['更稳定的数据产出', '更短的返工链路'],
        },
        {
          title: '自动化数据处理',
          body: '适用于文档抽取、结构化转换、规则清洗、跨格式归一等高重复任务。',
          deliverables: ['抽取流程', '结构化规则', '自动化脚本与节点', '可复用处理组件'],
          outcomes: ['更快的数据就绪速度', '更低的重复操作成本'],
        },
        {
          title: '流程自动化',
          body: '适用于跨团队任务流转、审核回路、异常处理和人机协同运营。',
          deliverables: ['流程编排', '角色职责定义', '状态追踪机制', '异常处理路径'],
          outcomes: ['更低的协作摩擦', '更可控的执行质量'],
        },
        {
          title: 'Process as a Service',
          body: '把难以标准化的企业流程沉淀为可持续服务接口，帮助客户在保持灵活度的同时建立稳定输出。',
          deliverables: ['流程服务蓝图', '服务边界定义', 'SLA 对齐', '运行与复盘机制'],
          outcomes: ['流程可服务化', '交付可规模化'],
        },
        {
          title: '模型运营服务',
          body: '围绕模型上线后的持续表现，处理评测、反馈、数据回流与运营证明问题。',
          deliverables: ['评测闭环', '数据反馈机制', '运行监控', '对内对外交付证明'],
          outcomes: ['模型能力更可持续', '业务方更容易建立信任'],
        },
      ],
      triggers: {
        eyebrow: '典型触发场景',
        title: '企业通常在这些时刻开始需要 WanFlow。',
        items: [
          '数据源多、标准乱，团队越来越依赖人工救火',
          '流程跨部门、跨角色，交付经常卡在衔接与回溯',
          '模型上线了，但没有稳定的运营与反馈闭环',
          '客户要求的不只是结果，而是可检查、可证明的执行过程',
        ],
      },
      delivery: {
        eyebrow: '交付模型',
        title: '从诊断到稳定运行，按系统化节奏推进。',
        steps: [
          { step: 'A', title: '业务诊断', body: '识别流程断点、数据断点与责任断点。' },
          { step: 'B', title: '方案抽象', body: '明确哪些环节适合自动化、哪些环节适合服务化。' },
          { step: 'C', title: '执行上线', body: '把设计好的链路接进日常业务，而不是停留在方案阶段。' },
          { step: 'D', title: '运营迭代', body: '依据时效、质量、成本和结果持续优化。' },
        ],
      },
      finalCta: {
        title: '如果你已经知道问题在流程和数据上，现在就适合开始谈。',
        body: 'WanFlow 更擅长处理“事情明明能做，但系统就是跑不顺”的阶段。',
      },
    },
    cases: {
      intro: {
        eyebrow: '案例',
        title: '看结果，也看执行骨架。',
        body: '以下案例以匿名化方式呈现，重点展示 WanFlow 如何处理真实运营问题，而不是只展示漂亮结论。',
      },
      featured: {
        eyebrow: 'Featured case',
        title: '面向大模型运营团队的多源数据治理重构',
        sector: '模型训练与运营',
        challenge:
          '客户原有数据处理与标注流程由多个团队碎片化维护，样本规范不统一，返修链条长，运营侧无法稳定评估质量。',
        intervention:
          'WanFlow 重新定义了标注规范、质量节点、处理接口与反馈节奏，同时将高重复的整理动作自动化，把人工能力聚焦在判断与复核上。',
        outcome:
          '客户获得了更稳定的数据产出节奏、更短的返工周期，以及可追踪的过程证明，方便内部协同和对外汇报。',
        stats: [
          { value: '统一规范', label: '标注与质检接口', detail: '从分散标准变为统一协议' },
          { value: '缩短链路', label: '返修与回溯时间', detail: '减少人工反复对齐' },
          { value: '可证明', label: '过程与结果', detail: '更容易支持内部复盘与客户沟通' },
        ],
      },
      cards: [
        {
          title: '复杂文档结构化处理',
          sector: '自动化数据处理',
          challenge: '文档来源多、格式差异大、人工录入成本高。',
          action: '搭建自动抽取、归一化与校验链路。',
          outcome: '让数据更快进入后续业务系统。',
        },
        {
          title: '客服与运营流程重编排',
          sector: '流程自动化',
          challenge: '多个角色串联执行，但责任不清、状态不可追踪。',
          action: '重建任务流转、状态节点与异常路径。',
          outcome: '提高流程透明度与交付一致性。',
        },
        {
          title: '模型运营证明层建设',
          sector: '模型运营服务',
          challenge: '模型效果难稳定复盘，对业务方解释成本高。',
          action: '建立评测、记录、产物与沟通一体的证明层。',
          outcome: '让模型讨论从感受转向证据。',
        },
      ],
      proof: {
        eyebrow: '交付物视角',
        title: '客户真正买单的，往往是这些“证明层”。',
        items: [
          {
            title: '流程蓝图',
            body: '把角色、任务、自动化节点与异常路径表达清楚，便于对齐与扩展。',
          },
          {
            title: '运行记录',
            body: '保留关键执行节点和结果摘要，让复盘不依赖口头记忆。',
          },
          {
            title: '交付证据包',
            body: '把结果、说明与必要上下文打包成能对外使用的交付结构。',
          },
        ],
      },
      finalCta: {
        title: '如果你希望案例讨论更贴近你的业务语境，我们可以直接按场景来聊。',
        body: '比起空泛的“AI 转型”，WanFlow 更愿意直接讨论具体执行问题。',
      },
    },
    about: {
      hero: {
        eyebrow: '关于我们',
        title: 'WanFlow 相信，AI 真正落地靠的是运营系统，而不是单点能力。',
        body:
          '我们是一家数据驱动型 AI 公司，长期围绕数据治理、流程执行和模型运营这些“最不性感但最关键”的环节工作。对企业来说，真正的 AI 能力往往不是一个模型，而是一整套能持续运行的协作系统。',
      },
      positioning: {
        eyebrow: '我们的视角',
        title: '从“项目交付”切入，而不是只从“模型能力”切入。',
        paragraphs: [
          '很多企业 AI 项目并不是输在算法，而是输在前后的执行链：数据准备不稳定、人工与系统配合不顺、流程职责不清、结果难以证明。',
          'WanFlow 的工作方式是把这些问题重新拉通。我们把数据、流程、角色、产物和运营指标放在同一张图里思考，确保系统真的能跑，而不是只在方案汇报中看起来合理。',
        ],
      },
      principles: {
        eyebrow: '工作原则',
        title: '我们坚持用运营逻辑建设 AI 业务。',
        items: [
          {
            title: '先看执行链，再看单点工具',
            body: '不先急着上工具，而是先把业务动作、责任边界与反馈路径看清。',
          },
          {
            title: '让复杂流程可追踪',
            body: '复杂不是问题，不可追踪才是问题。系统设计首先要支持复盘与治理。',
          },
          {
            title: '把服务做成长期能力',
            body: 'WanFlow 更关注如何把一次性交付沉淀为可持续协作机制。',
          },
        ],
      },
      collaborationModel: {
        eyebrow: '协作方式',
        title: '从对齐业务目标，到落地执行，再到持续优化。',
        items: [
          { title: '诊断', body: '识别数据、流程与协作问题的根本约束。', },
          { title: '设计', body: '抽象出能长期运行的执行骨架与交付边界。', },
          { title: '运行', body: '把人、流程、系统与产物真正接进业务日常。', },
          { title: '优化', body: '根据结果、时效与质量做持续运营。', },
        ],
      },
      trust: {
        eyebrow: '为什么值得信任',
        title: '我们更接近“运营中的系统建设者”。',
        items: [
          '既理解数据工作，也理解交付节奏',
          '既能做自动化，也知道哪些节点必须保留人工判断',
          '既关注模型表现，也关注客户最终如何感知价值',
        ],
      },
      finalCta: {
        title: '如果你需要的不是空泛叙事，而是一支能把执行链搭起来的团队，我们适合继续聊。',
        body: '欢迎直接带着你的流程问题、交付目标或模型运营难题来找我们。',
      },
    },
    contact: {
      hero: {
        eyebrow: '联系我们',
        title: '把你现在卡住的环节讲给我们听。',
        body:
          '无论你在处理数据标注、复杂文档处理、流程自动化还是模型运营闭环，只要问题已经进入“需要一套真正能跑的系统”阶段，WanFlow 就值得进入对话。',
      },
      form: {
        title: '发起业务沟通',
        body: '填写下面的信息后，我们会按你的业务场景进行初步整理，并在工作日内尽快回复。',
        fields: {
          name: '姓名',
          company: '公司 / 团队',
          email: '工作邮箱',
          interest: '关注方向',
          timeline: '期望节奏',
          message: '你当前的问题',
        },
        interests: [
          'AI 数据标注',
          '自动化数据处理',
          '流程自动化',
          'Process as a Service',
          '模型运营服务',
          '需要一起梳理',
        ],
        timelines: ['尽快开始', '1 个月内', '本季度内', '先交流判断'],
        submit: '提交咨询',
        submitting: '提交中...',
        success: '已收到你的信息。我们会在工作日尽快通过邮箱联系你。',
        error: '提交失败，请稍后重试，或直接发送邮件到 business@wanflow.ai。',
        privacy: '我们只将这些信息用于业务沟通，不会用于无关营销。',
        validation: {
          name: '请填写姓名。',
          company: '请填写公司或团队名称。',
          email: '请填写有效的工作邮箱。',
          message: '请简单描述你的业务问题。',
        },
      },
      side: {
        title: '为什么现在联系 WanFlow',
        reasons: [
          '你已经确认问题不只是工具缺失，而是执行链失衡',
          '你需要一个同时理解数据、流程与模型运营的团队',
          '你希望输出的不只是结果，还有可证明、可复盘的交付结构',
        ],
        responseTitle: '沟通方式',
        responseBody: '你可以通过表单发起，也可以直接邮件联系。对于方向不明确的情况，我们也可以先做一次问题拆解。',
        contactItems: [
          '邮箱：business@wanflow.ai',
          'WeChat：WanFlow-AI',
          '响应：工作日 24 小时内',
        ],
      },
      faq: [
        {
          question: '你们是咨询公司还是执行团队？',
          answer: '更准确地说，我们是能把咨询、流程设计和执行链搭建串起来的运营型团队。',
        },
        {
          question: '没有完整需求，也可以联系吗？',
          answer: '可以。很多项目一开始的问题就不是“需求不完整”，而是“问题还没有被正确抽象”。',
        },
      ],
    },
  },
  en: {
    site: {
      title: 'WanFlow | Data-driven AI operations for enterprise delivery',
      description:
        'WanFlow helps enterprises run AI data labeling, automated data processing, workflow automation, Process as a Service, and model operations services as a working system.',
      brand: 'WanFlow',
      brandFull: 'WanFlow',
      tagline: 'Data-driven AI operations, built for enterprise delivery.',
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
      workbenchCta: 'Open BenchmarkOps',
      language: 'Language',
      zh: '中文',
      en: 'EN',
      metaKicker: 'Data-driven AI operations',
      proofLabel: 'Enterprise-ready AI delivery',
      proofNote: 'From data labeling to model operations, WanFlow builds the execution chain instead of stopping at strategy.',
      finalPrimary: 'Start the conversation',
      finalSecondary: 'See BenchmarkOps',
      workbenchNote: 'The internal BenchmarkOps platform remains available as a proof layer for operations and delivery.',
    },
    footer: {
      description:
        'WanFlow reconnects data, process, and model operations into one execution chain so enterprise AI programs can move from demo-ready to delivery-ready.',
      columns: [
        {
          title: 'Services',
          items: ['AI data labeling', 'Automated data processing', 'Workflow automation', 'Process as a Service'],
        },
        {
          title: 'Business entry points',
          items: ['Model operations services', 'Data governance', 'Human-in-the-loop workflows', 'Enterprise delivery support'],
        },
        {
          title: 'Reach us',
          items: ['business@wanflow.ai', 'WeChat: WanFlow-AI', 'Replies within one business day'],
        },
      ],
      copyright: 'Copyright 2026 WanFlow.ai. All rights reserved.',
      legal: 'BenchmarkOps continues to serve as the internal proof layer behind delivery.',
    },
    home: {
      hero: {
        eyebrow: 'Enterprise AI operations website',
        title: 'Run the data and process layer behind AI like a real operating system.',
        statement:
          'WanFlow is a data-driven AI company serving enterprises with AI data labeling, automated data processing, workflow automation, Process as a Service, and model operations services.',
        body: 'We do not stop at recommendations. We design, run, and deliver the execution chain.',
        primary: { label: 'Book an Ops Review', href: '/contact' },
        secondary: { label: 'Explore Solutions', href: '/solutions' },
      },
      supportSignals: [
        { value: '5', label: 'service modules', detail: 'covering data, process, and model operations' },
        { value: 'PaaS', label: 'Process as a Service', detail: 'turning complex workflows into stable execution capacity' },
        { value: 'Ops', label: 'Model operations', detail: 'from data feedback to operational proof' },
      ],
      platformView: {
        eyebrow: 'Platform / system view',
        title: 'Build AI delivery the way you build an operating system, not a one-off demo.',
        body:
          'For enterprises, the hard part is rarely whether a model can run once. The hard part is how data is prepared, how workflows are coordinated, how humans and automation are orchestrated, and how outputs become reliable deliverables. WanFlow connects those pieces into one working network.',
        bullets: [
          'Workflow design and execution architecture',
          'Complex data processing and structured governance',
          'Human-in-the-loop operations with quality control',
          'Model operations and delivery proof for client-facing teams',
        ],
      },
      capabilityModules: {
        eyebrow: 'Capability modules',
        title: 'Five modules, one execution chain.',
        body:
          'The site does not frame services as isolated line items. It shows how they fit into a shared operating backbone for enterprise AI delivery.',
        items: [
          {
            title: 'AI data labeling',
            body: 'Design labeling specs, quality loops, and production cadence around business outcomes, not raw labor alone.',
            outcome: 'Create scalable and governable data production capacity.',
          },
          {
            title: 'Automated data processing',
            body: 'Turn repetitive cleaning, extraction, normalization, and structuring tasks into reusable execution modules.',
            outcome: 'Move data into usable form faster.',
          },
          {
            title: 'Workflow automation',
            body: 'Connect approvals, routing, quality loops, and system actions into repeatable enterprise workflows.',
            outcome: 'Reduce coordination drag and delivery volatility.',
          },
          {
            title: 'Process as a Service',
            body: 'Package difficult-to-standardize business workflows into stable service interfaces with room for human judgment.',
            outcome: 'Make complex operations continuously executable.',
          },
          {
            title: 'Model operations services',
            body: 'Build the feedback, evaluation, monitoring, and proof layer that keeps model performance tied to the business.',
            outcome: 'Turn model capability into an operated asset.',
          },
        ],
      },
      deliveryFramework: {
        eyebrow: 'Delivery framework',
        title: 'From operational diagnosis to measurable proof.',
        body:
          'WanFlow tells a delivery story, not just a feature story. Enterprises are buying a working system with traceable outputs and operational control.',
        steps: [
          { step: '01', title: 'Diagnose the bottleneck', body: 'Identify the real points of failure across data, process, and team coordination.' },
          { step: '02', title: 'Design the execution spine', body: 'Define interfaces, quality rules, automation points, and ownership boundaries.' },
          { step: '03', title: 'Run the chain', body: 'Connect data handling, workflow orchestration, operating actions, and delivery outputs into a live system.' },
          { step: '04', title: 'Operate and optimize', body: 'Iterate on quality, speed, cost, and outcomes over time instead of treating delivery as one-off.' },
        ],
      },
      proofLayer: {
        eyebrow: 'Proof layer',
        title: 'We work more like an AI operations team than a presentation-only consultancy.',
        body: 'BenchmarkOps appears as supporting evidence rather than the homepage lead, showing how WanFlow turns internal operating methods into an inspectable delivery system.',
        items: [
          {
            title: 'Data and process in one frame',
            body: 'We do not split data problems, workflow problems, and model problems into disconnected workstreams.',
          },
          {
            title: 'Services that stay inspectable',
            body: 'Specs, quality logic, cadence, and feedback loops remain visible so enterprise collaboration stays governable.',
          },
          {
            title: 'Internal platform as proof layer',
            body: 'BenchmarkOps reflects WanFlow’s real understanding of process, artifacts, and benchmark evidence.',
          },
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
            title: 'Process as a Service rollout',
            sector: 'Process as a Service',
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
          title: 'AI data labeling',
          body: 'For data creation, relabeling, quality control, and multi-stage human-in-the-loop workflows.',
          deliverables: ['Labeling specification design', 'Quality loops', 'Role-based coordination', 'Output reporting'],
          outcomes: ['More stable data output', 'Shorter rework cycles'],
        },
        {
          title: 'Automated data processing',
          body: 'For document extraction, structuring, normalization, cleanup, and repeated content operations.',
          deliverables: ['Extraction flows', 'Structuring rules', 'Automation nodes', 'Reusable processing components'],
          outcomes: ['Faster data readiness', 'Lower repetitive effort'],
        },
        {
          title: 'Workflow automation',
          body: 'For cross-team routing, approvals, exception handling, and human-plus-system execution models.',
          deliverables: ['Process orchestration', 'Ownership boundaries', 'Status tracking', 'Exception paths'],
          outcomes: ['Lower coordination drag', 'More predictable execution quality'],
        },
        {
          title: 'Process as a Service',
          body: 'Package difficult enterprise workflows as a stable operational service without losing the flexibility needed for real-world delivery.',
          deliverables: ['Service blueprint', 'Boundary definition', 'SLA alignment', 'Operating and review rhythm'],
          outcomes: ['Serviceable process layer', 'Scalable delivery capacity'],
        },
        {
          title: 'Model operations services',
          body: 'Create the mechanisms needed to monitor, evaluate, improve, and prove model performance over time.',
          deliverables: ['Evaluation loops', 'Feedback channels', 'Operational monitoring', 'Evidence packages'],
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
          sector: 'Automated data processing',
          challenge: 'Mixed documents made manual cleanup expensive and slow.',
          action: 'Built a normalization and extraction chain.',
          outcome: 'Moved inputs into usable structures faster.',
        },
        {
          title: 'Operations workflow redesign',
          sector: 'Workflow automation',
          challenge: 'Cross-role execution lacked ownership clarity and traceability.',
          action: 'Rebuilt routing, status control, and exception paths.',
          outcome: 'Improved transparency and delivery consistency.',
        },
        {
          title: 'Model proof layer buildout',
          sector: 'Model operations services',
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
          'Whether the issue is data labeling, document processing, workflow automation, or model operations, WanFlow is most useful when the business needs a system that can actually run.',
      },
      form: {
        title: 'Start the conversation',
        body: 'Share your operating context and we will reply with an informed follow-up during the business week.',
        fields: {
          name: 'Name',
          company: 'Company / Team',
          email: 'Work email',
          interest: 'What are you looking for?',
          timeline: 'Expected timeline',
          message: 'What is the problem today?',
        },
        interests: [
          'AI data labeling',
          'Automated data processing',
          'Workflow automation',
          'Process as a Service',
          'Model operations services',
          'Need help framing the problem',
        ],
        timelines: ['As soon as possible', 'Within 1 month', 'This quarter', 'Exploratory conversation first'],
        submit: 'Send inquiry',
        submitting: 'Sending...',
        success: 'Your message has been received. We will follow up by email on the next business day.',
        error: 'Submission failed. Please try again or email business@wanflow.ai directly.',
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
        responseBody: 'Use the form or email us directly. If the problem is still fuzzy, we can start with a structured problem-framing conversation.',
        contactItems: [
          'Email: business@wanflow.ai',
          'WeChat: WanFlow-AI',
          'Response: within one business day',
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
  differentiators: T['proofLayer'];
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
  proofLayer: { eyebrow: string; title: string; items: readonly unknown[] };
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
    differentiators: home.proofLayer,
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
