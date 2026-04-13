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
        title: '按行业看，WanFlow 能把哪些业务真正做顺',
        body:
          '我们不先讲复杂技术概念，而是先看企业最常见的业务问题，再看 WanFlow 怎么把流程接顺、把结果做出来',
      },
      industries: [
        {
          title: '金融与保险',
          headline: '让审核与风控链路可以被追踪和复盘',
          summary: '围绕审核、补件、客服、风控、合规等高频业务环节，帮助团队把“人盯人”的处理链改成可控、可追踪、可优化的业务系统',
          stats: ['审核时效缩短 35%-55%', '补件回合减少 30%-45%', '人工复核负荷下降 25%-40%'],
          originalMethod: '规则库先行，审核、补件与复核按统一口径编排',
          technicalTraits: ['规则驱动审核节点', '状态留痕与审计', '人机协同兜底'],
          imageSrc: '/industry-assets/finance/hero.png',
          imageTitle: '建议图片：风控审核台或流程指挥大屏',
          imageHint: '适合放审批流界面、风控任务台、审核状态看板或客服与审核协同流程示意图',
          outcomes: ['高频审核平均处理时长可缩短约 40%', '补件后的二次回退率可下降约 30%', '关键节点留痕覆盖率可提升至 90%+', '管理复盘从事后抽查变成日常可视化'],
          modules: [
            {
              title: '审核与补件流重构',
              body: '把初审、补件、复核、退回、升级这些节点重新编排，减少重复回退和口径漂移',
              mappedModule: '流程编排与自动化',
              aiCapability: '规则驱动的审批流与状态追踪自动化',
              technicalTrait: '状态机式节点编排',
              originalMethod: '双轨审核闭环',
              imageSrc: '/industry-assets/finance/review.png',
              imageTitle: '建议图片：审核节点编排或状态流转图',
              deliverables: ['审核规则库', '补件回路设计', '状态追踪机制'],
              outcome: '高频审核处理时长可缩短 35%-50%',
            },
            {
              title: '客服与业务协同分发',
              body: '让客服入口、业务判断和后续处理进入同一条流转链，不再靠人工转述',
              mappedModule: '企业级多智能体',
              aiCapability: '多入口工单识别与自动分发',
              technicalTrait: '多角色路由与知识调用',
              originalMethod: '多入口统一分发',
              imageSrc: '/industry-assets/finance/routing.png',
              imageTitle: '建议图片：客服工单分发台',
              deliverables: ['工单分发规则', '知识调用策略', '跨岗协同SOP'],
              outcome: '首轮分发响应速度可提升 2-3 倍',
            },
            {
              title: '风险规则与人工复核闭环',
              body: '把智能识别、规则校验和人工兜底组合起来，让风控执行既提效也能守住边界',
              mappedModule: '人机协同交付',
              aiCapability: '规则校验与人工复核联动',
              technicalTrait: '风险规则与复核边界',
              originalMethod: '规则前置加人工兜底',
              imageSrc: '/industry-assets/finance/risk.png',
              imageTitle: '建议图片：风控复核节点台',
              deliverables: ['规则与权限边界', '人工复核节点', '关键记录沉淀'],
              outcome: '人工复核工作量可下降 25%-40%，同时保留合规边界',
            },
          ],
        },
        {
          title: '制造与供应链',
          headline: '让异常工单从现场到决策可视化',
          summary: '围绕订单、排产、库存、物流、异常工单等关键运营环节，提升跨系统协同效率和现场异常响应速度',
          stats: ['异常响应时长缩短 30%-50%', '跨系统跟单人工下降 25%-40%', '升级闭环时长缩短 20%-35%'],
          originalMethod: '异常分级先行，现场、系统、管理三端同链路响应',
          technicalTraits: ['异常分级与优先级', '跨系统状态同步', '升级路径可追踪'],
          imageTitle: '建议图片：工厂运营看板或供应链流程图',
          imageHint: '适合放工单看板、异常分流界面、订单到仓配的链路示意图，或产线/仓储的真实场景图',
          outcomes: ['一线异常从发现到分派可缩短约 40%', '跨系统状态同步后人工催办量可下降约 30%', '高优先级异常升级链路可压缩 20%-35%', '运营波动可在班次内被更早识别和干预'],
          modules: [
            {
              title: '异常工单自动分诊',
              body: '把设备异常、质量异常、供应异常等工单先做分类和优先级判断，再流转到对应团队',
              mappedModule: '企业级多智能体',
              aiCapability: '异常识别与优先级自动判定',
              technicalTrait: '规则与模型混合分诊',
              originalMethod: '异常优先级分诊',
              imageTitle: '建议图片：异常工单分诊看板',
              deliverables: ['异常分类规则', '工单优先级机制', '升级路径设计'],
              outcome: '异常分派首响时间可缩短 30%-45%',
            },
            {
              title: '订单与库存协同流转',
              body: '打通订单、库存、物流、仓储之间的状态同步，减少人工确认和重复跟单',
              mappedModule: '流程编排与自动化',
              aiCapability: '跨系统状态同步与自动提醒',
              technicalTrait: '多系统字段映射',
              originalMethod: '订单库存双向对账链',
              imageTitle: '建议图片：订单-库存状态联动图',
              deliverables: ['状态同步流程', '跨系统字段映射', '提醒与回退机制'],
              outcome: '订单库存对账人工可下降 25%-35%',
            },
            {
              title: '供应链运营复盘机制',
              body: '把异常原因、处理动作和恢复结果沉淀下来，形成后续优化的运营依据',
              mappedModule: '模型运营与持续优化',
              aiCapability: '异常归因与反馈闭环',
              technicalTrait: '运营数据留痕与复盘面板',
              originalMethod: '异常归因复盘板',
              imageTitle: '建议图片：供应链复盘面板',
              deliverables: ['过程记录结构', '复盘面板', '优化反馈回路'],
              outcome: '异常复盘沉淀后同类问题复发率可下降 15%-25%',
            },
          ],
        },
        {
          title: '零售与电商',
          headline: '把分散经营动作拉成一条可复制链路',
          summary: '围绕多平台经营、内容生产、客服协同、日报周报和活动复盘等高频动作，提升运营吞吐和经营反馈速度',
          stats: ['周报产出时间缩短 70%-90%', '人工汇总工作量下降 50%-75%', '活动复盘反馈速度提升 2-4 倍'],
          originalMethod: '经营数据先归一，内容、客服和复盘同节奏联动',
          technicalTraits: ['多源数据归集', '流程自动编排', '复盘输出模板化'],
          imageTitle: '建议图片：多平台运营后台或经营分析面板',
          imageHint: '适合放商品运营面板、内容排期看板、客服协同台、报表仪表盘或活动战报界面',
          outcomes: ['日报周报可从半天压缩到 30-60 分钟内', '多平台经营口径统一后错漏项可下降 30%+', '活动期间内容与客服协同响应可提升 2 倍以上', '复盘反馈可从次周后移到活动当天或次日'],
          modules: [
            {
              title: '多平台经营数据归集',
              body: '把电商平台、广告平台、客服系统和仓储履约的数据统一到一套输出口径里',
              mappedModule: '数据标注与治理',
              aiCapability: '多平台指标自动归集与口径统一',
              technicalTrait: '字段标准化与治理节奏',
              originalMethod: '统一经营口径底座',
              imageTitle: '建议图片：多平台数据归集视图',
              deliverables: ['数据字段规范', '归集脚本与任务流', '统一报表模板'],
              outcome: '跨平台数据整理工时可下降 50%-70%',
            },
            {
              title: '内容与客服协同执行',
              body: '把内容排期、素材生产、客服问答和活动节奏拉进同一条执行链，减少重复劳动',
              mappedModule: '人机协同交付',
              aiCapability: '内容排期与客服答复协同执行',
              technicalTrait: '内容任务编排与知识调用',
              originalMethod: '前台协同任务流',
              imageTitle: '建议图片：内容-客服协同看板',
              deliverables: ['内容任务编排', '知识素材库', '活动响应SOP'],
              outcome: '内容与客服协同响应可提升 2-3 倍',
            },
            {
              title: '周报与复盘自动化',
              body: '自动聚合关键经营指标、活动结果和异常反馈，形成可复盘的业务输出',
              mappedModule: '模型运营与持续优化',
              aiCapability: '经营摘要自动生成与异常提示',
              technicalTrait: '指标聚合与复盘模板',
              originalMethod: '日报周报自动复盘',
              imageTitle: '建议图片：周报自动生成界面',
              deliverables: ['日报周报模版', '复盘摘要逻辑', '关键异常提示'],
              outcome: '周报与异常摘要生成时间可缩短 70%-90%',
            },
          ],
        },
        {
          title: '医疗与医药',
          headline: '把高要求文档与知识流程做成可审计链路',
          summary: '围绕文档解析、知识治理、内部问答辅助和合规流程执行，帮助高要求场景建立准确、稳定、可审计的 AI 支撑体系',
          stats: ['文档处理效率提升 3-5 倍', '知识查询响应缩短 40%-60%', '人工复核压力下降 20%-35%'],
          originalMethod: '受控知识底座加关键节点人工复核',
          technicalTraits: ['受控抽取与校验', '知识版本治理', '人机协同审核'],
          imageTitle: '建议图片：医学知识库界面或文档解析流程图',
          imageHint: '适合放知识库检索界面、文档抽取前后对比、合规审批流示意图或内部辅助问答台',
          outcomes: ['复杂文档结构化处理可从小时级压缩到分钟级', '内部知识调用响应时长可缩短约一半', '关键节点审计记录可做到全链路留痕', '专家复核压力可下降 20%-35% 且边界更清楚'],
          modules: [
            {
              title: '文档解析与结构化治理',
              body: '针对 PDF、表单、扫描件、报告等复杂文档做抽取、归一和字段治理',
              mappedModule: '数据标注与治理',
              aiCapability: '复杂文档抽取与字段校验',
              technicalTrait: '受控抽取与结构化输出',
              originalMethod: '字段规则先行抽取',
              imageTitle: '建议图片：文档抽取前后对比',
              deliverables: ['文档字段规则', '抽取与校验链路', '结构化数据输出'],
              outcome: '文档抽取与录入效率可提升 3-5 倍',
            },
            {
              title: '知识更新与问答辅助',
              body: '把不断更新的知识材料纳入统一治理，并通过受控方式提供内部问答支持',
              mappedModule: '企业级多智能体',
              aiCapability: '受控知识接入与内部问答辅助',
              technicalTrait: '版本治理与检索控制',
              originalMethod: '版本化知识接入',
              imageTitle: '建议图片：知识库检索或问答台',
              deliverables: ['知识接入策略', '版本与口径管理', '人工审核闭环'],
              outcome: '内部知识查询平均响应可缩短 40%-60%',
            },
            {
              title: '合规节点的人机协同',
              body: '关键判断节点保留人工复核，把自动化和人工责任边界划清楚',
              mappedModule: '人机协同交付',
              aiCapability: '关键节点人工复核与审计记录',
              technicalTrait: '合规审计与责任边界',
              originalMethod: '关键节点双签复核',
              imageTitle: '建议图片：合规审批流',
              deliverables: ['复核规则', '审计记录', '异常处理机制'],
              outcome: '关键节点人工复核压力可下降 20%-30%',
            },
          ],
        },
        {
          title: '企业运营与共享服务',
          headline: '共享服务从人驱动变成流程驱动',
          summary: '围绕财务、人事、行政、客服、法务等共享服务链路，提升重复流程处理效率并沉淀标准作业能力',
          stats: ['重复流程处理时长缩短 30%-50%', '跨岗催办工作量下降 40%-60%', '标准化覆盖率提升至 70%-90%'],
          originalMethod: '标准流程模板化，跨岗任务按状态驱动',
          technicalTraits: ['标准流程模板化', '跨岗协同节点清晰', '持续复盘机制'],
          imageTitle: '建议图片：共享服务流程中心或协同工作台',
          imageHint: '适合放流程中心首页、任务流转工作台、服务请求池、SOP 图谱或跨部门协同面板',
          outcomes: ['高频共享流程可从多次催办改为单链路推进', '跨岗协同中的人工催办和追踪工作量可下降约一半', '共享服务标准化覆盖率可提升到 70%-90%', '组织经验可沉淀成可复制的流程模板与面板'],
          modules: [
            {
              title: '共享流程标准化',
              body: '把常见的服务请求、审批动作和输出结构模块化，先把标准流程固定下来',
              mappedModule: '流程编排与自动化',
              aiCapability: '请求入口与审批节点标准化',
              technicalTrait: '流程模板化与权限规则',
              originalMethod: '共享流程模板库',
              imageTitle: '建议图片：共享流程模板库',
              deliverables: ['标准作业模板', '任务入口设计', '状态与权限规则'],
              outcome: '标准流程复制上线时间可缩短 30%-50%',
            },
            {
              title: '多角色任务协同',
              body: '把提单、处理、审核、回退和完成这些动作接成一条明确的跨团队流程',
              mappedModule: '人机协同交付',
              aiCapability: '跨岗任务路由与自动提醒',
              technicalTrait: '协同节点与回退机制',
              originalMethod: '跨岗任务回退闭环',
              imageTitle: '建议图片：跨岗协同工作台',
              deliverables: ['跨岗协同链路', '回退与升级机制', '任务提醒策略'],
              outcome: '跨岗催办和回退沟通量可下降 40%-60%',
            },
            {
              title: '运营复盘与持续优化',
              body: '围绕时效、质量和异常点持续优化，让共享服务越来越像一套系统而不是一群人顶着做',
              mappedModule: '模型运营与持续优化',
              aiCapability: '时效/质量指标监控与改进清单',
              technicalTrait: '复盘指标体系',
              originalMethod: '时效质量双指标运营',
              imageTitle: '建议图片：运营复盘面板',
              deliverables: ['时效指标', '问题归因机制', '持续优化清单'],
              outcome: '流程时效波动可下降 20%-35%',
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
        title: '看真实业务问题，WanFlow 是怎么一步步做出来的',
        body: '这些案例做了匿名化处理，重点不是讲品牌名，而是讲清楚原来卡在哪里、后来怎么改、最后结果怎么样',
      },
      cards: [
        {
          title: '某头部消费金融机构的审核与复核链路重构',
          sector: '金融与保险',
          client: '某头部消费金融机构',
          stats: ['审核时效缩短约 42%', '补件回退率下降约 33%', '人工复核负荷下降约 28%'],
          originalMethod: '规则库先行加状态机审核',
          aiCapability: '规则驱动审核与多智能体辅助分发，人工复核兜底',
          technicalTraits: ['规则库与口径统一', '状态机流转与留痕', '人机协同复核'],
          challenge: '审核、补件、复核分散在多个角色和系统里，状态追踪困难，异常回退反复兜转，业务时效和质量都不稳定',
          solution: '将审核规则、流程编排、多智能体辅助处理和人工复核机制组合起来，先统一口径，再重建任务流转与异常回退路径',
          delivery: '按真实业务链路分段上线，先覆盖高频审核节点，再逐步接入补件、复核和结果记录',
          deliverables: ['审核规则库', '状态流转机制', '异常回退路径', '关键节点记录面板'],
          outcome: '上线后高频审核链路时效缩短约 42%，补件回退率下降约 33%，关键节点状态实现日常可追踪',
          imageTitle: '建议图片：审核工作台或任务状态面板',
        },
        {
          title: '某制造企业的异常工单协同',
          sector: '制造与供应链',
          client: '某制造企业',
          stats: ['异常首响缩短约 38%', '跨系统对账人工下降约 31%', '升级闭环缩短约 24%'],
          originalMethod: '异常分诊加升级路径前置',
          aiCapability: '异常自动分诊与跨系统状态同步',
          technicalTraits: ['异常分级优先级', '跨系统字段映射', '升级路径留痕'],
          challenge: '异常工单分散在多个系统和角色之间，升级和回退依赖人工协调，导致现场响应慢、责任难追踪',
          solution: '重建工单分发、状态同步和人工兜底规则，并引入多智能体辅助分类与流转',
          delivery: '先从高频异常类型切入，逐步补全跨系统状态同步和人工升级路径',
          deliverables: ['异常分类规则', '工单优先级机制', '跨系统状态同步', '升级SOP'],
          outcome: '高频异常首响缩短约 38%，跨系统对账人工下降约 31%，现场到管理的升级闭环缩短约 24%',
          imageTitle: '建议图片：异常工单看板或工厂协同界面',
        },
        {
          title: '某零售电商品牌的运营自动化与周报生成',
          sector: '零售与电商',
          client: '某零售电商品牌',
          stats: ['周报产出时间缩短约 85%', '人工汇总工作量下降约 68%', '活动复盘速度提升约 3 倍'],
          originalMethod: '统一数据口径加自动复盘输出',
          aiCapability: '数据归集 + 流程编排 + 自动摘要输出',
          technicalTraits: ['多源数据口径统一', '运营动作自动串联', '周报模板化生成'],
          challenge: '多平台经营数据分散，日报周报依赖人工汇总，活动期间运营响应和复盘速度都跟不上',
          solution: '建立数据归集、流程编排和智能生成链路，让平台数据、活动动作和复盘摘要自动汇总到统一输出',
          delivery: '先统一报表口径，再接入日常经营数据和活动数据，最后形成自动周报与异常提醒',
          deliverables: ['统一报表模板', '数据归集任务流', '活动复盘摘要', '异常提醒机制'],
          outcome: '周报产出时间缩短约 85%，人工汇总工作量下降约 68%，活动复盘从次周后移到活动后 24 小时内',
          imageTitle: '建议图片：电商运营仪表盘或周报界面',
        },
        {
          title: '某医药服务团队的知识治理与问答辅助',
          sector: '医疗与医药',
          client: '某医药服务团队',
          stats: ['文档处理效率提升约 4 倍', '知识查询响应缩短约 52%', '专家复核压力下降约 26%'],
          originalMethod: '受控知识接入加人工审核闭环',
          aiCapability: '受控知识接入与问答辅助',
          technicalTraits: ['知识版本治理', '文档结构化抽取', '人工复核闭环'],
          challenge: '知识材料更新频繁，内部查询高度依赖资深人员，口径不一致时容易影响一线响应',
          solution: '梳理知识结构，建立文档处理、知识接入和人工复核闭环，让问答辅助建立在受控知识之上',
          delivery: '先处理核心知识材料，再扩展到日常更新和重点问题场景，最后加入人工审核与版本控制',
          deliverables: ['知识接入策略', '文档结构化输出', '人工复核闭环', '版本与口径管理'],
          outcome: '文档处理效率提升约 4 倍，知识查询响应缩短约 52%，专家复核压力下降约 26%，关键口径更加稳定',
          imageTitle: '建议图片：知识库检索页或问答辅助台',
        },
        {
          title: '某大型企业共享服务中心的多流程协同',
          sector: '企业运营与共享服务',
          client: '某大型企业共享服务中心',
          stats: ['重复流程处理时长缩短约 37%', '跨岗催办工作量下降约 49%', '标准化覆盖率提升至约 82%'],
          originalMethod: '流程模板化加跨岗协同工作台',
          aiCapability: '流程模板化与人机协同执行',
          technicalTraits: ['标准流程模板库', '跨岗协同路由', '持续复盘清单'],
          challenge: '财务、人事和行政流程重复且跨部门流转重，标准动作难沉淀，很多经验只掌握在少数人手里',
          solution: '把标准流程模块化，并引入多智能体执行与人工审核配合，把重复任务和跨岗协同拉进统一工作台',
          delivery: '从高频共享流程入手，逐步标准化任务入口、角色边界、回退规则和复盘机制',
          deliverables: ['流程模板库', '任务入口设计', '角色权限边界', '复盘与优化清单'],
          outcome: '重复流程处理时长缩短约 37%，跨岗催办工作量下降约 49%，共享服务标准化覆盖率提升至约 82%',
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
          headline: 'Make review and risk chains traceable and reviewable',
          summary: 'For review, resubmission, service, risk, and compliance chains where speed, control, and traceability all matter at once.',
          stats: ['Review cycle time down 35%-55%', 'Resubmission loops down 30%-45%', 'Manual review load down 25%-40%'],
          originalMethod: 'Rules-first execution across review, resubmission, and recheck',
          technicalTraits: ['Rule-driven review nodes', 'State traceability and audit logs', 'Human-in-the-loop fallback'],
          imageSrc: '/industry-assets/finance/hero.png',
          imageTitle: 'Suggested image: risk review console or approval operations board',
          imageHint: 'Good fits include approval-flow UI, review workbench, service-and-review coordination map, or a task-state dashboard.',
          outcomes: ['High-volume review time can drop by roughly 40%', 'Second-pass rework after resubmission can fall by about 30%', 'Critical-node traceability can reach 90%+', 'Management review shifts from sampling to live visibility'],
          modules: [
            {
              title: 'Review and resubmission flow redesign',
              body: 'Rebuild first review, resubmission, recheck, escalation, and return nodes so the operating chain stops bouncing between people.',
              mappedModule: 'Workflow Orchestration & Automation',
              aiCapability: 'Rule-driven review flow with automated state tracking',
              technicalTrait: 'State-machine node orchestration',
              originalMethod: 'Dual-track review loop',
              imageSrc: '/industry-assets/finance/review.png',
              imageTitle: 'Suggested image: review flow map or state transition view',
              deliverables: ['Review rules library', 'Resubmission loop design', 'State tracking model'],
              outcome: 'Review turnaround can improve by 35%-50%',
            },
            {
              title: 'Service and business routing',
              body: 'Bring customer-service intake, business judgment, and downstream actions into one governed operating flow.',
              mappedModule: 'Enterprise Multi-Agent Systems',
              aiCapability: 'Multi-entry ticket recognition and automated routing',
              technicalTrait: 'Cross-role routing with knowledge usage',
              originalMethod: 'Unified multi-entry routing',
              imageSrc: '/industry-assets/finance/routing.png',
              imageTitle: 'Suggested image: service ticket routing console',
              deliverables: ['Routing rules', 'Knowledge-use strategy', 'Cross-role SOP'],
              outcome: 'First-response routing can become 2-3x faster',
            },
            {
              title: 'Risk controls with human fallback',
              body: 'Combine automated screening, rule checks, and human review so the process moves faster without losing control.',
              mappedModule: 'Human-in-the-Loop Delivery',
              aiCapability: 'Rule checks coupled with human review gates',
              technicalTrait: 'Risk-rule boundaries and review guardrails',
              originalMethod: 'Rules-first control with human fallback',
              imageSrc: '/industry-assets/finance/risk.png',
              imageTitle: 'Suggested image: risk review checkpoint view',
              deliverables: ['Rules and permission boundaries', 'Human review nodes', 'Critical records'],
              outcome: 'Manual review load can drop 25%-40% while keeping compliance boundaries intact',
            },
          ],
        },
        {
          title: 'Manufacturing & Supply Chain',
          headline: 'Make exception handling visible from floor to decision',
          summary: 'For order coordination, inventory movement, exception handling, and cross-system operating work under real supply-chain pressure.',
          stats: ['Exception response down 30%-50%', 'Cross-system chasing down 25%-40%', 'Escalation closure down 20%-35%'],
          originalMethod: 'Priority-led exception handling across floor, system, and management',
          technicalTraits: ['Exception tiering and prioritization', 'Cross-system state synchronization', 'Traceable escalation paths'],
          imageTitle: 'Suggested image: operations cockpit or supply-chain process map',
          imageHint: 'Good fits include exception-ticket boards, warehouse/production dashboards, order-to-fulfillment maps, or real factory visuals.',
          outcomes: ['Field-to-owner dispatch can improve by about 40%', 'Manual chasing after status sync can drop by about 30%', 'Priority escalation loops can shrink by 20%-35%', 'Operational variance becomes visible earlier within the same shift'],
          modules: [
            {
              title: 'Exception ticket triage',
              body: 'Classify equipment, quality, and supply exceptions early, then route them by severity and ownership.',
              mappedModule: 'Enterprise Multi-Agent Systems',
              aiCapability: 'Automated exception identification and prioritization',
              technicalTrait: 'Rule-and-model hybrid triage',
              originalMethod: 'Priority-based exception triage',
              imageTitle: 'Suggested image: exception triage board',
              deliverables: ['Exception taxonomy', 'Priority model', 'Escalation design'],
              outcome: 'First-response dispatch can improve by 30%-45%',
            },
            {
              title: 'Order and inventory synchronization',
              body: 'Connect order, inventory, warehouse, and logistics status so teams stop chasing updates manually.',
              mappedModule: 'Workflow Orchestration & Automation',
              aiCapability: 'Cross-system state sync with automated alerts',
              technicalTrait: 'Multi-system field mapping',
              originalMethod: 'Bidirectional order-inventory sync chain',
              imageTitle: 'Suggested image: order-inventory state map',
              deliverables: ['State-sync flows', 'Cross-system field mapping', 'Alerts and rollback rules'],
              outcome: 'Order-inventory reconciliation effort can drop 25%-35%',
            },
            {
              title: 'Supply-chain review loop',
              body: 'Capture causes, actions, and recovery outcomes so operations can improve through evidence instead of memory.',
              mappedModule: 'Model Operations & Continuous Optimization',
              aiCapability: 'Exception attribution with feedback loop tracking',
              technicalTrait: 'Operational audit trails and review panels',
              originalMethod: 'Exception attribution review board',
              imageTitle: 'Suggested image: supply-chain review dashboard',
              deliverables: ['Process record model', 'Review panel', 'Optimization feedback loop'],
              outcome: 'Repeat-exception rate can fall 15%-25% after review loops are in place',
            },
          ],
        },
        {
          title: 'Retail & E-commerce',
          headline: 'Turn scattered operating actions into a repeatable chain',
          summary: 'For multi-platform growth, content operations, service coordination, and automated business reporting.',
          stats: ['Weekly reporting time down 70%-90%', 'Manual rollup work down 50%-75%', 'Campaign review speed up 2-4x'],
          originalMethod: 'Unified business metrics with synchronized execution and review',
          technicalTraits: ['Multi-source data consolidation', 'Workflow automation', 'Templatized reporting outputs'],
          imageTitle: 'Suggested image: multi-channel operations dashboard',
          imageHint: 'Good fits include marketplace dashboards, content calendars, service consoles, or weekly business reporting interfaces.',
          outcomes: ['Daily and weekly reporting can move from half a day to under an hour', 'Unified definitions can cut reporting errors by 30%+', 'Frontline content-service response can improve by 2x+', 'Campaign review can move from the following week to same-day or next-day'],
          modules: [
            {
              title: 'Multi-channel data consolidation',
              body: 'Bring marketplace, ads, service, and fulfillment data into one consistent reporting structure.',
              mappedModule: 'Data Labeling & Governance',
              aiCapability: 'Automated multi-platform metric consolidation',
              technicalTrait: 'Field standardization and governance rhythm',
              originalMethod: 'Unified operating data foundation',
              imageTitle: 'Suggested image: multi-channel data consolidation view',
              deliverables: ['Field standardization', 'Collection task flows', 'Unified reporting templates'],
              outcome: 'Cross-platform reporting labor can drop 50%-70%',
            },
            {
              title: 'Content and service execution flow',
              body: 'Connect content scheduling, asset handling, service responses, and campaign rhythm into one managed chain.',
              mappedModule: 'Human-in-the-Loop Delivery',
              aiCapability: 'Coordinated content scheduling and service responses',
              technicalTrait: 'Task orchestration with knowledge reuse',
              originalMethod: 'Frontline coordination task flow',
              imageTitle: 'Suggested image: content-service coordination board',
              deliverables: ['Content task orchestration', 'Knowledge asset library', 'Campaign response SOP'],
              outcome: 'Content-service response can improve by 2-3x',
            },
            {
              title: 'Automated reporting and review',
              body: 'Aggregate key metrics, campaign outcomes, and operating anomalies into reusable reporting outputs.',
              mappedModule: 'Model Operations & Continuous Optimization',
              aiCapability: 'Automated business summaries with anomaly prompts',
              technicalTrait: 'Metric aggregation and reporting templates',
              originalMethod: 'Automated daily and weekly review loop',
              imageTitle: 'Suggested image: automated weekly report view',
              deliverables: ['Daily and weekly report logic', 'Review summaries', 'Anomaly prompts'],
              outcome: 'Summary generation time can shrink by 70%-90%',
            },
          ],
        },
        {
          title: 'Healthcare & Pharma',
          headline: 'Build auditable document and knowledge workflows',
          summary: 'For document handling, knowledge governance, assisted response, and highly controlled process environments.',
          stats: ['Document throughput up 3-5x', 'Knowledge response down 40%-60%', 'Expert review pressure down 20%-35%'],
          originalMethod: 'Controlled knowledge base with human review on critical steps',
          technicalTraits: ['Controlled extraction and validation', 'Knowledge version governance', 'Human-in-the-loop review'],
          imageTitle: 'Suggested image: medical knowledge workspace or parsing workflow',
          imageHint: 'Good fits include knowledge-search UI, before/after extraction views, controlled-response consoles, or compliance review flows.',
          outcomes: ['Complex document handling can move from hours to minutes', 'Internal knowledge-response time can be cut by roughly half', 'Critical-step auditability becomes full-chain and searchable', 'Expert review pressure can fall 20%-35% with clearer accountability'],
          modules: [
            {
              title: 'Document parsing and structuring',
              body: 'Extract and normalize fields from PDFs, scans, forms, and reports before they enter downstream work.',
              mappedModule: 'Data Labeling & Governance',
              aiCapability: 'Complex document extraction with field validation',
              technicalTrait: 'Controlled extraction with structured output',
              originalMethod: 'Field-rules-first extraction',
              imageTitle: 'Suggested image: before/after document extraction',
              deliverables: ['Document field rules', 'Parsing and validation chain', 'Structured output model'],
              outcome: 'Document extraction throughput can improve 3-5x',
            },
            {
              title: 'Knowledge updates and assisted answering',
              body: 'Govern frequently changing materials and expose them through a controlled internal assistance layer.',
              mappedModule: 'Enterprise Multi-Agent Systems',
              aiCapability: 'Governed knowledge ingestion with internal assistance',
              technicalTrait: 'Version governance and controlled retrieval',
              originalMethod: 'Versioned knowledge ingestion',
              imageTitle: 'Suggested image: knowledge search or assisted-answering console',
              deliverables: ['Knowledge ingestion policy', 'Version management', 'Human review loop'],
              outcome: 'Knowledge-query response can improve by 40%-60%',
            },
            {
              title: 'Human-AI controls on compliance steps',
              body: 'Keep critical judgment with humans while letting automation handle preparation and routing.',
              mappedModule: 'Human-in-the-Loop Delivery',
              aiCapability: 'Human review gates with audit records',
              technicalTrait: 'Compliance audit boundaries and accountability',
              originalMethod: 'Dual-signoff review at critical checkpoints',
              imageTitle: 'Suggested image: compliance approval flow',
              deliverables: ['Review rules', 'Audit records', 'Exception handling design'],
              outcome: 'Manual review effort at critical checkpoints can fall 20%-30%',
            },
          ],
        },
        {
          title: 'Enterprise Operations & Shared Services',
          headline: 'Shift shared services from people-driven to process-driven',
          summary: 'For finance, HR, admin, service, and shared-services flows with repeated work and heavy cross-team routing.',
          stats: ['Repeat-process time down 30%-50%', 'Follow-up workload down 40%-60%', 'Standardization coverage up to 70%-90%'],
          originalMethod: 'Template-driven flows with state-based cross-role execution',
          technicalTraits: ['Standardized process templates', 'Clear cross-role nodes', 'Continuous review loops'],
          imageTitle: 'Suggested image: shared services flow center',
          imageHint: 'Good fits include service-request pools, task-routing centers, SOP maps, or cross-team coordination boards.',
          outcomes: ['Repeat flows can move from multi-chase handling to one governed chain', 'Cross-role follow-up effort can fall by about half', 'Standardization coverage can rise into the 70%-90% band', 'Institutional knowledge becomes reusable through templates and review dashboards'],
          modules: [
            {
              title: 'Shared-service flow standardization',
              body: 'Modularize common requests, approvals, and outputs so standard operating paths are clear and reusable.',
              mappedModule: 'Workflow Orchestration & Automation',
              aiCapability: 'Standardized request entry and approval nodes',
              technicalTrait: 'Process templates with permission rules',
              originalMethod: 'Shared-service template library',
              imageTitle: 'Suggested image: shared-service template library',
              deliverables: ['Operating templates', 'Request-entry design', 'State and permission rules'],
              outcome: 'New standard flows can launch 30%-50% faster',
            },
            {
              title: 'Multi-role task coordination',
              body: 'Connect submission, handling, review, rollback, and completion across departments through one operating chain.',
              mappedModule: 'Human-in-the-Loop Delivery',
              aiCapability: 'Cross-role routing with automated reminders',
              technicalTrait: 'Coordination nodes with rollback paths',
              originalMethod: 'Cross-role rollback loop',
              imageTitle: 'Suggested image: cross-role coordination workbench',
              deliverables: ['Cross-role flow design', 'Rollback and escalation rules', 'Task reminder strategy'],
              outcome: 'Cross-role follow-up volume can drop 40%-60%',
            },
            {
              title: 'Review and continuous improvement',
              body: 'Track time, quality, and recurring exceptions so the center gets stronger as it runs.',
              mappedModule: 'Model Operations & Continuous Optimization',
              aiCapability: 'Cycle-time and quality monitoring with improvement backlog',
              technicalTrait: 'Review metrics framework',
              originalMethod: 'Dual-metric operations review',
              imageTitle: 'Suggested image: operations review dashboard',
              deliverables: ['Efficiency metrics', 'Issue attribution model', 'Improvement backlog'],
              outcome: 'Cycle-time variance can fall 20%-35%',
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
          stats: ['Review time down about 42%', 'Resubmission rework down about 33%', 'Manual review load down about 28%'],
          originalMethod: 'Rules-first review with a state-machine workflow',
          aiCapability: 'Rule-driven review orchestration with multi-agent assistance and human fallback',
          technicalTraits: ['Rule library standardization', 'State-machine routing and traceability', 'Human review gates'],
          challenge: 'Review, resubmission, and recheck were split across multiple roles and systems, which made status visibility poor and exception handling circular.',
          solution: 'WanFlow combined review rules, workflow orchestration, multi-agent assistance, and human fallback controls into one governed execution chain.',
          delivery: 'Started with the highest-volume review nodes, then connected resubmission, recheck, and result records step by step.',
          deliverables: ['Review rules library', 'State-routing model', 'Exception rollback path', 'Critical-node dashboard'],
          outcome: 'After rollout, high-volume review time dropped about 42%, resubmission rework dropped about 33%, and key-node status became visible day to day.',
          imageTitle: 'Suggested image: review workbench or task-state dashboard',
        },
        {
          title: 'Exception ticket coordination for a manufacturing team',
          sector: 'Manufacturing & Supply Chain',
          client: 'A manufacturing enterprise',
          stats: ['First response down about 38%', 'Manual reconciliation down about 31%', 'Escalation closure down about 24%'],
          originalMethod: 'Exception triage with escalation paths defined upfront',
          aiCapability: 'Automated exception triage with cross-system state sync',
          technicalTraits: ['Exception tiering and prioritization', 'Cross-system field mapping', 'Traceable escalation paths'],
          challenge: 'Exception tickets moved across systems and roles with too much manual escalation, slowing down field response.',
          solution: 'Rebuilt dispatch, state synchronization, and human fallback rules with multi-agent support for classification and routing.',
          delivery: 'Rolled out around the most common exception categories first, then expanded cross-system sync and escalation logic.',
          deliverables: ['Exception taxonomy', 'Priority mechanism', 'Cross-system synchronization', 'Escalation SOP'],
          outcome: 'High-frequency incident response improved by about 38%, manual reconciliation dropped about 31%, and escalation closure improved by about 24%.',
          imageTitle: 'Suggested image: exception board or manufacturing coordination console',
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
          imageTitle: 'Suggested image: e-commerce reporting dashboard or weekly review interface',
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
          imageTitle: 'Suggested image: knowledge search interface or assisted-answering console',
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
