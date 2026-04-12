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
        title: '面向不同行业，把 AI 接成真正能跑的业务链路',
        body:
          'WanFlow 不从抽象技术概念出发，而是从企业最真实的业务卡点出发，把数据、流程、多智能体和人机协同能力接进一条可持续运行的交付链',
      },
      industries: [
        {
          title: '金融与保险',
          summary: '适合审核、客服、风控、理赔等对效率、合规和留痕都有要求的场景',
          problems: ['审核链路长，人工复核压力大', '资料流转分散，状态追踪不清', '客服与风控信息割裂，协同成本高'],
          solutions: ['数据标注与治理', '流程编排与自动化', '企业级多智能体', '人机协同复核机制'],
          outcomes: ['审核效率提升', '流程留痕更完整', '跨团队协同更稳定'],
        },
        {
          title: '制造与供应链',
          summary: '适合订单协同、异常处理、库存流转和跨系统运营协作这类高频场景',
          problems: ['订单、库存、物流信息分散在多个系统', '异常处理依赖人工转述，响应慢', '上下游协同多，标准难统一'],
          solutions: ['流程编排与自动化', '企业级多智能体', '人机协同交付', '模型运营与持续优化'],
          outcomes: ['异常响应更快', '协同链路更清晰', '运营波动更可控'],
        },
        {
          title: '零售与电商',
          summary: '适合多平台运营、内容协同、客服响应和经营分析自动化',
          problems: ['多平台数据分散，日报周报依赖人工拼接', '内容、客服、运营重复劳动多', '活动波峰时响应不够稳定'],
          solutions: ['数据标注与治理', '流程编排与自动化', '企业级多智能体', '模型运营与持续优化'],
          outcomes: ['运营汇总更自动化', '内容与客服协同更顺', '复盘与决策更及时'],
        },
        {
          title: '医疗与医药',
          summary: '适合文档处理、知识治理、内部问答辅助和合规要求较高的流程',
          problems: ['文档格式复杂，人工整理成本高', '知识更新频繁，调用口径难统一', '合规要求高，关键节点必须可追溯'],
          solutions: ['数据标注与治理', '企业级多智能体', '人机协同交付', '模型运营与持续优化'],
          outcomes: ['知识调用更准确', '文档处理更规范', '关键流程更可审计'],
        },
        {
          title: '企业运营与共享服务',
          summary: '适合财务、人事、行政、客服等重复流程多、跨部门协作重的场景',
          problems: ['重复事务多，人工吞吐难提升', '跨部门流转多，责任边界不清', '标准作业和经验难沉淀'],
          solutions: ['流程编排与自动化', '企业级多智能体', '人机协同交付', '模型运营与持续优化'],
          outcomes: ['重复事务处理更快', '流程透明度更高', '组织能力更容易沉淀'],
        },
      ],
      modules: [
        {
          title: '数据标注与治理',
          body: '把标注规范、字段标准、质检机制和数据回流节奏定清楚，让不同业务场景都能建立稳定的数据基础',
          deliverables: ['标注规范与字段标准', '数据质检与返修机制', '治理节奏与产能报表', '面向业务的结构化数据资产'],
          outcomes: ['数据口径更统一', '后续返工更少'],
        },
        {
          title: '流程编排与自动化',
          body: '把审批、流转、异常处理、状态同步和系统动作接进同一套执行链，减少业务断点和重复沟通',
          deliverables: ['流程编排设计', '角色职责边界', '状态追踪与提醒机制', '异常路径与回退规则'],
          outcomes: ['跨团队执行更顺', '交付波动更低'],
        },
        {
          title: '企业级多智能体',
          body: '围绕企业任务设计安全、稳定、可控的多智能体能力，让 AI 真正参与理解、调用、执行和协同',
          deliverables: ['任务与权限边界', '知识与工具接入', '多智能体执行链路', '运行与审计机制'],
          outcomes: ['自动执行能力更强', '企业落地方式更可控'],
        },
        {
          title: '人机协同交付',
          body: '把 AI 的处理效率和人的判断、复核、兜底接成同一套交付机制，让复杂任务既能提效也能守住质量',
          deliverables: ['协同分工设计', '复核与兜底机制', '质量控制节点', '交付运行手册'],
          outcomes: ['效率和质量更平衡', '复杂任务更容易落地'],
        },
        {
          title: '模型运营与持续优化',
          body: '围绕系统上线后的运行效果，持续处理评测、反馈、监控和优化，让交付结果越跑越稳、越用越准',
          deliverables: ['评测闭环', '反馈回流机制', '运行监控', '优化与结果材料'],
          outcomes: ['模型能力更可持续', '业务方更容易建立信任'],
        },
      ],
      finalCta: {
        title: '如果你已经知道问题发生在具体业务链路里，现在就值得开始谈',
        body: '带着行业场景、流程卡点和目标结果来聊，比泛泛而谈 AI 更容易进入真正的解决方案阶段',
      },
    },
    cases: {
      intro: {
        eyebrow: '真实案例',
        title: '真实案例，不只展示结果，也展示怎么落地',
        body: '这些案例做了匿名化处理，重点不是讲品牌故事，而是把客户原始问题、方案组合和交付结果讲清楚',
      },
      featured: {
        eyebrow: '重点案例',
        title: '某消费金融机构的审核与复核链路重构',
        client: '某头部消费金融机构',
        sector: '金融与保险',
        challenge:
          '客户原有的审核、补件和复核流程分散在多个角色之间，口径不统一，状态也难以追踪，导致时效和质量都不稳定',
        solution:
          'WanFlow 将数据规则、流程编排、多智能体辅助处理和人工复核机制组合起来，先统一规则，再重建任务流转与异常回退路径',
        delivery:
          '项目按业务链路拆段上线，先从高频审核节点切入，再把补件、复核和结果记录接进同一套运行机制',
        outcome:
          '最终形成更统一的审核口径、更清晰的状态追踪和更稳定的处理节奏，业务方也更容易复盘和对齐结果',
        proofPoints: ['统一审核规则与质检口径', '建立状态流转与异常回退机制', '保留关键节点记录，便于内部复盘与对外沟通'],
        stats: [
          { value: '统一', label: '审核口径', detail: '多角色按同一规则执行' },
          { value: '缩短', label: '回退链路', detail: '异常处理不再反复兜转' },
          { value: '可追踪', label: '过程记录', detail: '复盘与沟通更有依据' },
        ],
      },
      cards: [
        {
          title: '某制造企业的异常工单协同',
          sector: '制造与供应链',
          client: '某制造企业',
          challenge: '异常工单分散在多个系统和角色之间，升级和回退都依赖人工协调',
          solution: '重建工单分发、状态同步和人工兜底规则，并引入多智能体辅助分类与流转',
          outcome: '异常响应更快，协同链路更清晰',
        },
        {
          title: '某电商品牌的运营自动化与周报生成',
          sector: '零售与电商',
          client: '某零售电商品牌',
          challenge: '多平台经营数据分散，周报依赖人工汇总，运营动作响应慢',
          solution: '建立数据归集、流程编排和智能生成链路，让运营信息自动汇总到统一输出',
          outcome: '周报生产更快，复盘更及时',
        },
        {
          title: '某医药团队的知识治理与问答辅助',
          sector: '医疗与医药',
          client: '某医药服务团队',
          challenge: '知识材料更新频繁，内部查询依赖资深人员，口径难统一',
          solution: '梳理知识结构，建立文档处理、知识接入和人工复核闭环',
          outcome: '知识调用更准确，内部响应更稳定',
        },
        {
          title: '某共享服务中心的多流程协同',
          sector: '企业运营与共享服务',
          client: '某大型企业共享服务中心',
          challenge: '财务、人事和行政流程重复且跨部门流转重，标准动作难沉淀',
          solution: '把标准流程模块化，并引入多智能体执行与人工审核配合',
          outcome: '重复事务处理更快，流程透明度更高',
        },
      ],
      finalCta: {
        title: '如果你想按自己的业务场景来对照案例，我们可以直接展开',
        body: '把你现在卡住的流程、团队协同和目标结果讲清楚，我们更容易给出贴近现实的方案判断',
      },
    },
    about: {
      hero: {
        eyebrow: '关于我们',
        title: 'WanFlow 认为，AI 真正落地靠的是一整套运营系统',
        body:
          '我们长期做的是数据治理、流程执行和模型运营这些不热闹但很关键的事，对企业来说，真正可用的 AI 往往不是一个模型，而是一套能持续运行的协作系统',
      },
      identity: {
        eyebrow: '我们是谁',
        title: '我们不是只讲 AI 的团队，我们更关注它怎么真正跑进企业里',
        paragraphs: [
          'WanFlow 是一家面向企业客户的 AI 运营与交付公司，长期关注数据治理、流程执行、系统协同和模型运营这些最决定结果、却最容易被忽略的环节。尤其在中国市场，很多企业不是不想做 AI，而是缺少一支既理解业务现实、又能把系统真正接起来的团队。',
          '我们不把自己定义成单纯的咨询方，也不把交付理解成一次性项目外包。对我们来说，真正有价值的工作，是把数据标注与治理、流程编排与自动化、企业级多智能体、人机协同交付和模型运营闭环接成一套能长期运行的业务系统，让客户看得见这套系统怎么被搭起来，也能感受到它如何在日常业务里持续发挥作用。',
          '我们相信，企业采用 AI 最终比拼的不是一次演示有多惊艳，而是能不能持续交付、持续优化、持续建立信任。WanFlow 想做的，就是陪客户把这套能力从想法、试点一路接到真实业务里，让 AI 真的成为组织效率和业务增长的一部分。',
        ],
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
        title: 'Turn AI into working business execution for real industries.',
        body:
          'WanFlow does not start from abstract AI architecture. We start from the business links where data, workflow, multi-agent execution, and human review need to work as one system.',
      },
      industries: [
        {
          title: 'Finance & Insurance',
          summary: 'For review, customer service, risk, and claims scenarios that require speed, control, and traceability at the same time.',
          problems: ['Review chains are long and manual rechecks are heavy', 'Document routing is fragmented and status is unclear', 'Service, risk, and compliance teams operate with disconnected context'],
          solutions: ['Data Labeling & Governance', 'Workflow Orchestration & Automation', 'Enterprise Multi-Agent Systems', 'Human review and fallback controls'],
          outcomes: ['Faster review cycles', 'Stronger process traceability', 'More stable cross-team execution'],
        },
        {
          title: 'Manufacturing & Supply Chain',
          summary: 'For order coordination, exception handling, inventory movement, and cross-system operating workflows.',
          problems: ['Order, inventory, and logistics data live across too many systems', 'Exception handling depends on manual escalation', 'Upstream and downstream teams struggle to follow one operating standard'],
          solutions: ['Workflow Orchestration & Automation', 'Enterprise Multi-Agent Systems', 'Human-in-the-Loop Delivery', 'Model Operations & Continuous Optimization'],
          outcomes: ['Faster response to exceptions', 'Clearer collaboration paths', 'More controllable operating variance'],
        },
        {
          title: 'Retail & E-commerce',
          summary: 'For multi-platform operations, content coordination, service response, and reporting automation.',
          problems: ['Operating data is fragmented across channels and tools', 'Content, service, and operations teams repeat too much manual work', 'Peak-period response is unstable and reporting is slow'],
          solutions: ['Data Labeling & Governance', 'Workflow Orchestration & Automation', 'Enterprise Multi-Agent Systems', 'Model Operations & Continuous Optimization'],
          outcomes: ['More automated operating summaries', 'Smoother content and service collaboration', 'Faster reviews and decisions'],
        },
        {
          title: 'Healthcare & Pharma',
          summary: 'For document handling, knowledge governance, internal assistance, and high-compliance process environments.',
          problems: ['Document formats are complex and expensive to process manually', 'Knowledge updates quickly and answer consistency is hard to maintain', 'Key process steps must remain auditable'],
          solutions: ['Data Labeling & Governance', 'Enterprise Multi-Agent Systems', 'Human-in-the-Loop Delivery', 'Model Operations & Continuous Optimization'],
          outcomes: ['More accurate knowledge use', 'Better document discipline', 'More auditable execution'],
        },
        {
          title: 'Enterprise Operations & Shared Services',
          summary: 'For finance, HR, admin, and service workflows with heavy repetition and cross-team coordination.',
          problems: ['High-volume repetitive tasks are still manual', 'Cross-team routing creates unclear ownership', 'Standard operating knowledge is difficult to retain and scale'],
          solutions: ['Workflow Orchestration & Automation', 'Enterprise Multi-Agent Systems', 'Human-in-the-Loop Delivery', 'Model Operations & Continuous Optimization'],
          outcomes: ['Faster repeatable work', 'Greater workflow transparency', 'Stronger institutional operating capability'],
        },
      ],
      modules: [
        {
          title: 'Data Labeling & Governance',
          body: 'Set labeling rules, field standards, quality loops, and data feedback rhythm so different business scenarios can operate from the same reliable foundation.',
          deliverables: ['Labeling rules and data standards', 'Quality and rework loops', 'Governance rhythm and reporting', 'Structured data assets for business use'],
          outcomes: ['More consistent data baselines', 'Less downstream rework'],
        },
        {
          title: 'Workflow Orchestration & Automation',
          body: 'Connect approvals, routing, exception handling, status updates, and system actions into one operating chain with fewer business breaks.',
          deliverables: ['Workflow orchestration design', 'Ownership boundaries', 'State tracking and alerts', 'Exception and rollback paths'],
          outcomes: ['Lower coordination drag', 'More stable execution quality'],
        },
        {
          title: 'Enterprise Multi-Agent Systems',
          body: 'Build safe, stable, and controllable multi-agent execution around enterprise tasks so AI can understand, call tools, and act inside governed boundaries.',
          deliverables: ['Task and permission boundaries', 'Knowledge and tool connections', 'Multi-agent execution design', 'Runtime and audit controls'],
          outcomes: ['Stronger automated execution', 'More controllable enterprise adoption'],
        },
        {
          title: 'Human-in-the-Loop Delivery',
          body: 'Combine AI processing speed with human judgment, review, and fallback handling so complex work can scale without losing control.',
          deliverables: ['Human-AI work split', 'Review and fallback design', 'Quality control nodes', 'Delivery operating playbook'],
          outcomes: ['Better balance of speed and quality', 'Complex work that lands in practice'],
        },
        {
          title: 'Model Operations & Continuous Optimization',
          body: 'Run evaluation, monitoring, feedback, and optimization after launch so the operating result becomes steadier and more useful over time.',
          deliverables: ['Evaluation loops', 'Feedback channels', 'Operational monitoring', 'Optimization and results packages'],
          outcomes: ['Longer-lived model performance', 'Stronger business-side trust'],
        },
      ],
      finalCta: {
        title: 'If the real issue lives inside the business workflow, this is the right time to talk.',
        body: 'Bring the industry context, operating blockage, and target outcome. That is where real solution design starts.',
      },
    },
    cases: {
      intro: {
        eyebrow: 'Real Cases',
        title: 'Real cases should show both the result and how the work actually landed.',
        body: 'These anonymized cases focus on the original problem, the solution combination, and the delivery outcome instead of polished end-state claims alone.',
      },
      featured: {
        eyebrow: 'Featured case',
        title: 'Review and recheck workflow redesign for a consumer finance institution',
        client: 'A leading consumer finance institution',
        sector: 'Finance & Insurance',
        challenge:
          'The client handled review, resubmission, and recheck across multiple roles with inconsistent standards and weak status visibility, which made both speed and quality unstable.',
        solution:
          'WanFlow combined data rules, workflow orchestration, multi-agent assistance, and human review controls so the team could unify standards first and then rebuild routing and exception handling.',
        delivery:
          'The rollout was staged around live business links, starting from high-frequency review nodes and then connecting resubmission, recheck, and result recording into one operating mechanism.',
        outcome:
          'The client gained clearer review standards, stronger status visibility, and a steadier handling rhythm, while managers had a better base for review and communication.',
        proofPoints: ['Unified review rules and quality criteria', 'Status routing with fallback paths', 'Key-node records for internal review and external communication'],
        stats: [
          { value: 'Unified', label: 'review standards', detail: 'multiple roles worked from the same rule set' },
          { value: 'Shorter', label: 'fallback path', detail: 'less circular handling during exceptions' },
          { value: 'Traceable', label: 'process records', detail: 'stronger evidence for review and communication' },
        ],
      },
      cards: [
        {
          title: 'Exception ticket coordination for a manufacturing team',
          sector: 'Manufacturing & Supply Chain',
          client: 'A manufacturing enterprise',
          challenge: 'Exception tickets moved across systems and roles with too much manual escalation.',
          solution: 'Rebuilt dispatch, status synchronization, and human fallback rules with multi-agent support for classification and routing.',
          outcome: 'Faster response to exceptions and clearer collaboration paths.',
        },
        {
          title: 'Operations automation and weekly reporting for an e-commerce brand',
          sector: 'Retail & E-commerce',
          client: 'A retail e-commerce brand',
          challenge: 'Operating data was scattered and weekly reporting depended on manual assembly.',
          solution: 'Built data collection, workflow orchestration, and AI-assisted report generation into one output chain.',
          outcome: 'Faster reporting and more timely business review.',
        },
        {
          title: 'Knowledge governance and assisted answering for a healthcare team',
          sector: 'Healthcare & Pharma',
          client: 'A healthcare service team',
          challenge: 'Knowledge updates were frequent and answer consistency depended too heavily on senior staff.',
          solution: 'Structured knowledge intake, document handling, and human review into one governed response loop.',
          outcome: 'More accurate knowledge use and steadier internal response quality.',
        },
        {
          title: 'Multi-process coordination for a shared services center',
          sector: 'Enterprise Operations & Shared Services',
          client: 'A large enterprise shared services center',
          challenge: 'Finance, HR, and admin workflows were repetitive, cross-team, and hard to standardize.',
          solution: 'Modularized standard flows and combined multi-agent execution with human review.',
          outcome: 'Faster repeatable processing and greater workflow transparency.',
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
        title: 'WanFlow believes AI becomes real when it is operated like a system.',
        body:
          'We are a data-driven AI company focused on the least glamorous but most decisive layers of enterprise AI: data governance, workflow execution, and model operations. In practice, most AI value is created by the system around the model, not by the model alone.',
      },
      identity: {
        eyebrow: 'Who We Are',
        title: 'We are not a team that only talks about AI. We care about how it actually runs inside enterprises.',
        paragraphs: [
          'WanFlow is an enterprise AI operations and delivery company focused on the layers that most often decide whether AI works in practice: data governance, workflow execution, system coordination, and model operations. Especially in the China market, many companies are already interested in AI. What they often lack is a team that understands both business reality and execution systems well enough to connect everything into one working mechanism.',
          'We do not see ourselves as a consultancy that stops at slides, and we do not treat delivery as one-off outsourcing. The work that matters is turning data labeling and governance, workflow orchestration and automation, enterprise multi-agent systems, human-in-the-loop delivery, and model operations into one operating system that can keep running inside the business.',
          'We believe enterprise AI is not judged by how impressive a single demo looks. It is judged by whether the system can keep delivering, keep improving, and keep earning trust over time. That is what WanFlow wants to help clients build from idea, to pilot, to real business operation.',
        ],
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
