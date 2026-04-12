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
          summary: '围绕审核、补件、客服、风控、合规等高频业务环节，帮助团队把“人盯人”的处理链改成可控、可追踪、可优化的业务系统',
          imageTitle: '建议图片：风控审核台或流程指挥大屏',
          imageHint: '适合放审批流界面、风控任务台、审核状态看板或客服与审核协同流程示意图',
          outcomes: ['审核口径统一', '补件与复核链路更短', '状态留痕更完整', '管理层更容易复盘'],
          modules: [
            {
              title: '审核与补件流重构',
              body: '把初审、补件、复核、退回、升级这些节点重新编排，减少重复回退和口径漂移',
              deliverables: ['审核规则库', '补件回路设计', '状态追踪机制'],
              outcome: '高频审核任务更稳定',
            },
            {
              title: '客服与业务协同分发',
              body: '让客服入口、业务判断和后续处理进入同一条流转链，不再靠人工转述',
              deliverables: ['工单分发规则', '知识调用策略', '跨岗协同SOP'],
              outcome: '客户响应更快，内部协同更清楚',
            },
            {
              title: '风险规则与人工复核闭环',
              body: '把智能识别、规则校验和人工兜底组合起来，让风控执行既提效也能守住边界',
              deliverables: ['规则与权限边界', '人工复核节点', '关键记录沉淀'],
              outcome: '效率、质量与合规更平衡',
            },
          ],
        },
        {
          title: '制造与供应链',
          summary: '围绕订单、排产、库存、物流、异常工单等关键运营环节，提升跨系统协同效率和现场异常响应速度',
          imageTitle: '建议图片：工厂运营看板或供应链流程图',
          imageHint: '适合放工单看板、异常分流界面、订单到仓配的链路示意图，或产线/仓储的真实场景图',
          outcomes: ['异常升级更快', '订单协同更顺', '跨系统状态更清晰', '运营波动更可控'],
          modules: [
            {
              title: '异常工单自动分诊',
              body: '把设备异常、质量异常、供应异常等工单先做分类和优先级判断，再流转到对应团队',
              deliverables: ['异常分类规则', '工单优先级机制', '升级路径设计'],
              outcome: '现场问题响应更快',
            },
            {
              title: '订单与库存协同流转',
              body: '打通订单、库存、物流、仓储之间的状态同步，减少人工确认和重复跟单',
              deliverables: ['状态同步流程', '跨系统字段映射', '提醒与回退机制'],
              outcome: '协同摩擦明显下降',
            },
            {
              title: '供应链运营复盘机制',
              body: '把异常原因、处理动作和恢复结果沉淀下来，形成后续优化的运营依据',
              deliverables: ['过程记录结构', '复盘面板', '优化反馈回路'],
              outcome: '供应链运行更可持续优化',
            },
          ],
        },
        {
          title: '零售与电商',
          summary: '围绕多平台经营、内容生产、客服协同、日报周报和活动复盘等高频动作，提升运营吞吐和经营反馈速度',
          imageTitle: '建议图片：多平台运营后台或经营分析面板',
          imageHint: '适合放商品运营面板、内容排期看板、客服协同台、报表仪表盘或活动战报界面',
          outcomes: ['多平台信息更集中', '周报日报更快产出', '内容与客服协同更顺', '活动复盘更及时'],
          modules: [
            {
              title: '多平台经营数据归集',
              body: '把电商平台、广告平台、客服系统和仓储履约的数据统一到一套输出口径里',
              deliverables: ['数据字段规范', '归集脚本与任务流', '统一报表模板'],
              outcome: '经营数据不再分散',
            },
            {
              title: '内容与客服协同执行',
              body: '把内容排期、素材生产、客服问答和活动节奏拉进同一条执行链，减少重复劳动',
              deliverables: ['内容任务编排', '知识素材库', '活动响应SOP'],
              outcome: '前台运营响应更稳定',
            },
            {
              title: '周报与复盘自动化',
              body: '自动聚合关键经营指标、活动结果和异常反馈，形成可复盘的业务输出',
              deliverables: ['日报周报模版', '复盘摘要逻辑', '关键异常提示'],
              outcome: '经营决策更及时',
            },
          ],
        },
        {
          title: '医疗与医药',
          summary: '围绕文档解析、知识治理、内部问答辅助和合规流程执行，帮助高要求场景建立准确、稳定、可审计的 AI 支撑体系',
          imageTitle: '建议图片：医学知识库界面或文档解析流程图',
          imageHint: '适合放知识库检索界面、文档抽取前后对比、合规审批流示意图或内部辅助问答台',
          outcomes: ['文档结构化更规范', '知识调用更准确', '关键步骤更可审计', '人工复核压力更可控'],
          modules: [
            {
              title: '文档解析与结构化治理',
              body: '针对 PDF、表单、扫描件、报告等复杂文档做抽取、归一和字段治理',
              deliverables: ['文档字段规则', '抽取与校验链路', '结构化数据输出'],
              outcome: '文档进入业务系统更顺',
            },
            {
              title: '知识更新与问答辅助',
              body: '把不断更新的知识材料纳入统一治理，并通过受控方式提供内部问答支持',
              deliverables: ['知识接入策略', '版本与口径管理', '人工审核闭环'],
              outcome: '知识使用更一致',
            },
            {
              title: '合规节点的人机协同',
              body: '关键判断节点保留人工复核，把自动化和人工责任边界划清楚',
              deliverables: ['复核规则', '审计记录', '异常处理机制'],
              outcome: '合规风险更可控',
            },
          ],
        },
        {
          title: '企业运营与共享服务',
          summary: '围绕财务、人事、行政、客服、法务等共享服务链路，提升重复流程处理效率并沉淀标准作业能力',
          imageTitle: '建议图片：共享服务流程中心或协同工作台',
          imageHint: '适合放流程中心首页、任务流转工作台、服务请求池、SOP 图谱或跨部门协同面板',
          outcomes: ['重复事务处理更快', '责任边界更清楚', '流程透明度更高', '组织经验更容易沉淀'],
          modules: [
            {
              title: '共享流程标准化',
              body: '把常见的服务请求、审批动作和输出结构模块化，先把标准流程固定下来',
              deliverables: ['标准作业模板', '任务入口设计', '状态与权限规则'],
              outcome: '流程更容易复制和扩展',
            },
            {
              title: '多角色任务协同',
              body: '把提单、处理、审核、回退和完成这些动作接成一条明确的跨团队流程',
              deliverables: ['跨岗协同链路', '回退与升级机制', '任务提醒策略'],
              outcome: '协同成本更低',
            },
            {
              title: '运营复盘与持续优化',
              body: '围绕时效、质量和异常点持续优化，让共享服务越来越像一套系统而不是一群人顶着做',
              deliverables: ['时效指标', '问题归因机制', '持续优化清单'],
              outcome: '共享服务中心更稳定',
            },
          ],
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
      cards: [
        {
          title: '某头部消费金融机构的审核与复核链路重构',
          sector: '金融与保险',
          client: '某头部消费金融机构',
          challenge: '审核、补件、复核分散在多个角色和系统里，状态追踪困难，异常回退反复兜转，业务时效和质量都不稳定',
          solution: '将审核规则、流程编排、多智能体辅助处理和人工复核机制组合起来，先统一口径，再重建任务流转与异常回退路径',
          delivery: '按真实业务链路分段上线，先覆盖高频审核节点，再逐步接入补件、复核和结果记录',
          deliverables: ['审核规则库', '状态流转机制', '异常回退路径', '关键节点记录面板'],
          outcome: '审核口径更统一，状态更可追踪，整体处理节奏更稳',
          imageTitle: '建议图片：审核工作台或任务状态面板',
        },
        {
          title: '某制造企业的异常工单协同',
          sector: '制造与供应链',
          client: '某制造企业',
          challenge: '异常工单分散在多个系统和角色之间，升级和回退依赖人工协调，导致现场响应慢、责任难追踪',
          solution: '重建工单分发、状态同步和人工兜底规则，并引入多智能体辅助分类与流转',
          delivery: '先从高频异常类型切入，逐步补全跨系统状态同步和人工升级路径',
          deliverables: ['异常分类规则', '工单优先级机制', '跨系统状态同步', '升级SOP'],
          outcome: '异常响应更快，现场协同更顺，管理视角更清楚',
          imageTitle: '建议图片：异常工单看板或工厂协同界面',
        },
        {
          title: '某零售电商品牌的运营自动化与周报生成',
          sector: '零售与电商',
          client: '某零售电商品牌',
          challenge: '多平台经营数据分散，日报周报依赖人工汇总，活动期间运营响应和复盘速度都跟不上',
          solution: '建立数据归集、流程编排和智能生成链路，让平台数据、活动动作和复盘摘要自动汇总到统一输出',
          delivery: '先统一报表口径，再接入日常经营数据和活动数据，最后形成自动周报与异常提醒',
          deliverables: ['统一报表模板', '数据归集任务流', '活动复盘摘要', '异常提醒机制'],
          outcome: '周报产出更快，活动复盘更及时，经营动作更有依据',
          imageTitle: '建议图片：电商运营仪表盘或周报界面',
        },
        {
          title: '某医药服务团队的知识治理与问答辅助',
          sector: '医疗与医药',
          client: '某医药服务团队',
          challenge: '知识材料更新频繁，内部查询高度依赖资深人员，口径不一致时容易影响一线响应',
          solution: '梳理知识结构，建立文档处理、知识接入和人工复核闭环，让问答辅助建立在受控知识之上',
          delivery: '先处理核心知识材料，再扩展到日常更新和重点问题场景，最后加入人工审核与版本控制',
          deliverables: ['知识接入策略', '文档结构化输出', '人工复核闭环', '版本与口径管理'],
          outcome: '知识调用更准确，内部响应更稳定，关键口径更统一',
          imageTitle: '建议图片：知识库检索页或问答辅助台',
        },
        {
          title: '某大型企业共享服务中心的多流程协同',
          sector: '企业运营与共享服务',
          client: '某大型企业共享服务中心',
          challenge: '财务、人事和行政流程重复且跨部门流转重，标准动作难沉淀，很多经验只掌握在少数人手里',
          solution: '把标准流程模块化，并引入多智能体执行与人工审核配合，把重复任务和跨岗协同拉进统一工作台',
          delivery: '从高频共享流程入手，逐步标准化任务入口、角色边界、回退规则和复盘机制',
          deliverables: ['流程模板库', '任务入口设计', '角色权限边界', '复盘与优化清单'],
          outcome: '重复事务处理更快，流程透明度更高，共享服务更容易规模化',
          imageTitle: '建议图片：共享服务流程中心或协同工作台',
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
          summary: 'For review, resubmission, service, risk, and compliance chains where speed, control, and traceability all matter at once.',
          imageTitle: 'Suggested image: risk review console or approval operations board',
          imageHint: 'Good fits include approval-flow UI, review workbench, service-and-review coordination map, or a task-state dashboard.',
          outcomes: ['More unified review standards', 'Shorter resubmission and recheck loops', 'Clearer process traceability', 'Stronger management visibility'],
          modules: [
            {
              title: 'Review and resubmission flow redesign',
              body: 'Rebuild first review, resubmission, recheck, escalation, and return nodes so the operating chain stops bouncing between people.',
              deliverables: ['Review rules library', 'Resubmission loop design', 'State tracking model'],
              outcome: 'High-volume review work becomes steadier',
            },
            {
              title: 'Service and business routing',
              body: 'Bring customer-service intake, business judgment, and downstream actions into one governed operating flow.',
              deliverables: ['Routing rules', 'Knowledge-use strategy', 'Cross-role SOP'],
              outcome: 'Faster client response and clearer internal coordination',
            },
            {
              title: 'Risk controls with human fallback',
              body: 'Combine automated screening, rule checks, and human review so the process moves faster without losing control.',
              deliverables: ['Rules and permission boundaries', 'Human review nodes', 'Critical records'],
              outcome: 'Efficiency, quality, and compliance stay balanced',
            },
          ],
        },
        {
          title: 'Manufacturing & Supply Chain',
          summary: 'For order coordination, inventory movement, exception handling, and cross-system operating work under real supply-chain pressure.',
          imageTitle: 'Suggested image: operations cockpit or supply-chain process map',
          imageHint: 'Good fits include exception-ticket boards, warehouse/production dashboards, order-to-fulfillment maps, or real factory visuals.',
          outcomes: ['Faster exception escalation', 'Clearer order coordination', 'Better cross-system visibility', 'More controllable operating variance'],
          modules: [
            {
              title: 'Exception ticket triage',
              body: 'Classify equipment, quality, and supply exceptions early, then route them by severity and ownership.',
              deliverables: ['Exception taxonomy', 'Priority model', 'Escalation design'],
              outcome: 'Faster reaction to field problems',
            },
            {
              title: 'Order and inventory synchronization',
              body: 'Connect order, inventory, warehouse, and logistics status so teams stop chasing updates manually.',
              deliverables: ['State-sync flows', 'Cross-system field mapping', 'Alerts and rollback rules'],
              outcome: 'Less friction across operational teams',
            },
            {
              title: 'Supply-chain review loop',
              body: 'Capture causes, actions, and recovery outcomes so operations can improve through evidence instead of memory.',
              deliverables: ['Process record model', 'Review panel', 'Optimization feedback loop'],
              outcome: 'A more learnable operating system over time',
            },
          ],
        },
        {
          title: 'Retail & E-commerce',
          summary: 'For multi-platform growth, content operations, service coordination, and automated business reporting.',
          imageTitle: 'Suggested image: multi-channel operations dashboard',
          imageHint: 'Good fits include marketplace dashboards, content calendars, service consoles, or weekly business reporting interfaces.',
          outcomes: ['More centralized operating data', 'Faster daily and weekly reporting', 'Smoother content-service collaboration', 'Timelier campaign review'],
          modules: [
            {
              title: 'Multi-channel data consolidation',
              body: 'Bring marketplace, ads, service, and fulfillment data into one consistent reporting structure.',
              deliverables: ['Field standardization', 'Collection task flows', 'Unified reporting templates'],
              outcome: 'Business data stops fragmenting by tool',
            },
            {
              title: 'Content and service execution flow',
              body: 'Connect content scheduling, asset handling, service responses, and campaign rhythm into one managed chain.',
              deliverables: ['Content task orchestration', 'Knowledge asset library', 'Campaign response SOP'],
              outcome: 'Frontline execution becomes steadier',
            },
            {
              title: 'Automated reporting and review',
              body: 'Aggregate key metrics, campaign outcomes, and operating anomalies into reusable reporting outputs.',
              deliverables: ['Daily and weekly report logic', 'Review summaries', 'Anomaly prompts'],
              outcome: 'Faster decisions with better operating context',
            },
          ],
        },
        {
          title: 'Healthcare & Pharma',
          summary: 'For document handling, knowledge governance, assisted response, and highly controlled process environments.',
          imageTitle: 'Suggested image: medical knowledge workspace or parsing workflow',
          imageHint: 'Good fits include knowledge-search UI, before/after extraction views, controlled-response consoles, or compliance review flows.',
          outcomes: ['Cleaner document structuring', 'More accurate knowledge use', 'More auditable critical steps', 'Lower review pressure on experts'],
          modules: [
            {
              title: 'Document parsing and structuring',
              body: 'Extract and normalize fields from PDFs, scans, forms, and reports before they enter downstream work.',
              deliverables: ['Document field rules', 'Parsing and validation chain', 'Structured output model'],
              outcome: 'Documents move into operations more cleanly',
            },
            {
              title: 'Knowledge updates and assisted answering',
              body: 'Govern frequently changing materials and expose them through a controlled internal assistance layer.',
              deliverables: ['Knowledge ingestion policy', 'Version management', 'Human review loop'],
              outcome: 'Answer quality stays more consistent',
            },
            {
              title: 'Human-AI controls on compliance steps',
              body: 'Keep critical judgment with humans while letting automation handle preparation and routing.',
              deliverables: ['Review rules', 'Audit records', 'Exception handling design'],
              outcome: 'Compliance risk stays under tighter control',
            },
          ],
        },
        {
          title: 'Enterprise Operations & Shared Services',
          summary: 'For finance, HR, admin, service, and shared-services flows with repeated work and heavy cross-team routing.',
          imageTitle: 'Suggested image: shared services flow center',
          imageHint: 'Good fits include service-request pools, task-routing centers, SOP maps, or cross-team coordination boards.',
          outcomes: ['Faster repeatable processing', 'Clearer responsibility boundaries', 'More transparent workflows', 'Stronger institutional memory'],
          modules: [
            {
              title: 'Shared-service flow standardization',
              body: 'Modularize common requests, approvals, and outputs so standard operating paths are clear and reusable.',
              deliverables: ['Operating templates', 'Request-entry design', 'State and permission rules'],
              outcome: 'Flows become easier to scale',
            },
            {
              title: 'Multi-role task coordination',
              body: 'Connect submission, handling, review, rollback, and completion across departments through one operating chain.',
              deliverables: ['Cross-role flow design', 'Rollback and escalation rules', 'Task reminder strategy'],
              outcome: 'Less coordination drag between teams',
            },
            {
              title: 'Review and continuous improvement',
              body: 'Track time, quality, and recurring exceptions so the center gets stronger as it runs.',
              deliverables: ['Efficiency metrics', 'Issue attribution model', 'Improvement backlog'],
              outcome: 'A more stable shared-services system',
            },
          ],
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
      cards: [
        {
          title: 'Review and recheck workflow redesign for a consumer finance institution',
          sector: 'Finance & Insurance',
          client: 'A leading consumer finance institution',
          challenge: 'Review, resubmission, and recheck were split across multiple roles and systems, which made status visibility poor and exception handling circular.',
          solution: 'WanFlow combined review rules, workflow orchestration, multi-agent assistance, and human fallback controls into one governed execution chain.',
          delivery: 'Started with the highest-volume review nodes, then connected resubmission, recheck, and result records step by step.',
          deliverables: ['Review rules library', 'State-routing model', 'Exception rollback path', 'Critical-node dashboard'],
          outcome: 'Stronger review consistency, clearer status visibility, and steadier operating rhythm.',
          imageTitle: 'Suggested image: review workbench or task-state dashboard',
        },
        {
          title: 'Exception ticket coordination for a manufacturing team',
          sector: 'Manufacturing & Supply Chain',
          client: 'A manufacturing enterprise',
          challenge: 'Exception tickets moved across systems and roles with too much manual escalation, slowing down field response.',
          solution: 'Rebuilt dispatch, state synchronization, and human fallback rules with multi-agent support for classification and routing.',
          delivery: 'Rolled out around the most common exception categories first, then expanded cross-system sync and escalation logic.',
          deliverables: ['Exception taxonomy', 'Priority mechanism', 'Cross-system synchronization', 'Escalation SOP'],
          outcome: 'Faster response to incidents, smoother field coordination, and clearer management visibility.',
          imageTitle: 'Suggested image: exception board or manufacturing coordination console',
        },
        {
          title: 'Operations automation and weekly reporting for an e-commerce brand',
          sector: 'Retail & E-commerce',
          client: 'A retail e-commerce brand',
          challenge: 'Operating data was scattered across platforms, and campaign reviews depended on slow manual weekly reporting.',
          solution: 'Built one output chain for data consolidation, workflow orchestration, and AI-assisted reporting.',
          delivery: 'Unified reporting definitions first, then connected daily operating data and campaign data into automated summaries and anomaly prompts.',
          deliverables: ['Unified report templates', 'Data collection flow', 'Campaign review summaries', 'Anomaly prompts'],
          outcome: 'Faster reporting, more timely campaign review, and stronger business context for decisions.',
          imageTitle: 'Suggested image: e-commerce reporting dashboard or weekly review interface',
        },
        {
          title: 'Knowledge governance and assisted answering for a healthcare team',
          sector: 'Healthcare & Pharma',
          client: 'A healthcare service team',
          challenge: 'Knowledge materials changed frequently and answer consistency relied too heavily on a small number of senior specialists.',
          solution: 'Structured knowledge intake, document handling, and human review into one governed assistance loop.',
          delivery: 'Started from the highest-value knowledge materials, then expanded update rhythm, review gates, and answer controls.',
          deliverables: ['Knowledge ingestion policy', 'Structured document outputs', 'Human review loop', 'Version controls'],
          outcome: 'More accurate knowledge use, steadier internal response quality, and less dependence on ad hoc expert memory.',
          imageTitle: 'Suggested image: knowledge search interface or assisted-answering console',
        },
        {
          title: 'Multi-process coordination for a shared services center',
          sector: 'Enterprise Operations & Shared Services',
          client: 'A large enterprise shared services center',
          challenge: 'Finance, HR, and admin workflows were repetitive, cross-team, and difficult to standardize at scale.',
          solution: 'Modularized standard process flows and combined multi-agent execution with human review inside one workbench.',
          delivery: 'Began with the most repeated service flows, then standardized entries, ownership boundaries, rollback rules, and review routines.',
          deliverables: ['Process template library', 'Task-entry model', 'Role-permission boundaries', 'Improvement backlog'],
          outcome: 'Faster repeatable processing, greater workflow transparency, and a more scalable shared-services mechanism.',
          imageTitle: 'Suggested image: shared services center or cross-team workflow console',
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
