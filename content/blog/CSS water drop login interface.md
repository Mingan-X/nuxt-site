---
date: 2023-04-24
title: css水滴登录界面
---

# 引言

在今年(2023)云栖大会上，阿里云正式发布千亿级参数大模型通义千问 2.0。据现场介绍，在 10 个权威测评中，通义千问 2.0 综合性能超过 GPT-3.5，正在加速追赶 GPT-4。以下是通义千问在 MMLU、C-Eval、GSM8K、HumanEval、MATH 等 10 个主流 Benchmark 测评集上的表现：

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bb0c2751a7f042a9850318fd56684790~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1792&h=1156&s=104824&e=jpg&b=fcfafa" alt="a88ec4ef05b20cebb665ed98ead603c.jpg" width="70%" />

上图可以看出通义千问 2.0 的得分整体超越 META 的 Llama-2-70B，相比 OpenAI 的 Chat-3.5 是九胜一负，相比 GPT-4 则是四胜六负，与 GPT-4 的差距进一步缩小 (新闻来自[新浪财经](https://t.cj.sina.com.cn/articles/view/1667925927/636a87a7019010tqq))。

**那么问题来了，上图中 Benchmark 测评集分别是什么？侧重点在哪些方面？**

# 基准测评集介绍

## CMMLU

CMMLU 是针对中国背景下的大型语言模型的知识和推理能力的评测，由 MBZUAI、上海交通大学、微软亚洲研究院共同推出，包含 67 个主题，专门用于评估语言模型在中文语境下的知识和推理能力。CMMLU 是一个涵盖自然科学、社会科学、工程和人文学科等多个学科的综合性中国基准。是国内两大权威评测之一。

- 论文：[CMMLU: Measuring massive multitask language understanding in Chinese](https://arxiv.org/abs/2306.09212)
- 数据、代码与最新榜单：https://github.com/haonan-li/CMMLU

<br>

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0ed648644a649e097ec404bc28cf25f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=977&h=593&s=288225&e=png&b=fefefe" alt="image.png" width="70%" />

<br>

## MMLU

MMLU(Massive Multitask Language Understanding，大规模多任务语言理解)是一个由 Hendrycks 等人在《Measuring Massive Multitask Language Understanding》中提出的新基准，旨在通过仅在零样本和少样本设置下评估模型来衡量预训练。

- 官网: https://paperswithcode.com/dataset/mmlu
- 论文： [MEASURING MASSIVE MULTITASK LANGUAGE UNDERSTANDING](https://arxiv.org/abs/2009.03300)
- 大模型排行榜: https://paperswithcode.com/sota/multi-task-language-understanding-on-mmlu

## C-Eva

C-Eval 是由清华大学、上海交通大学和爱丁堡大学合作构建的综合性考试评测集，覆盖 52 个学科，是目前权威的中文 AI 大模型评测榜单之一。是国内两大权威评测之一。C-Eval 是全面的中文基础模型评估套件，涵盖了 52 个不同学科的 13948 个多项选择题，分为四个难度级别。

<img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae4a397ff58e4aed83d54a7b5f071cfc~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3938&h=2033&s=400896&e=png&b=fbf7f7" alt="image.png" width="70%" />

<br/>

- 论文：[C-Eval: A Multi-Level Multi-Discipline Chinese Evaluation Suite for Foundation Models](https://link.zhihu.com/?target=https%3A//arxiv.org/abs/2305.08322)
- 官网：https://cevalbenchmark.com/
- 网址：https://github.com/hkust-nlp/ceval/
- 排行：[浏览](https://github.com/hkust-nlp/ceval/blob/main/README_zh.md#%E6%8E%92%E8%A1%8C%E6%A6%9C)

## GSM8K

GSM8K 是由 OpenAI 发布的大模型数学推理能力评测基准。一个由 8.5K 高质量的语言多样化的小学数学单词问题组成的数据集（其中 7.5K 训练集，1K 测试集）。这些问题都是由人类写手创造的。每个问题需要 2-8 步推理来求解，主要是使用基本的算术运算（`+-/*`)进行一连串的基本计算，以得出最终答案。

GSM8K 是两大知名数学推理基准之一，该项测试在 2021 年 10 月份发布，至今仍然是非常困难的一种测试基准。

> **提出背景**：像 GPT-3 这样的大型语言模型有许多令人印象深刻的技能，包括模仿许多写作风格的能力，以及广泛的事实知识。但 GPT 难以完成需要精确多步骤推理的任务，比如解决小学数学单词问题。为了匹配人类在复杂逻辑领域中的表现，OpenAI 使用验证器在许多解决方案中选择了最好的 GSM8K, 他们收集了新的 GSM8K 数据集来评估其方法，并发布该数据集以促进研究。

- 论文：[Training Verifiers to Solve Math Word Problems](https://openai.com/research/solving-math-word-problems)
- 项目：https://github.com/openai/grade-school-math
- 博客：https://openai.com/research/solving-math-word-problems

## Gaokao-Bench

GAOKAO-bench 是一个以中国中考试题为数据集，评估大型语言模型的语言理解和逻辑推理能力的评估框架,收集了 2010-2022 年全国高考卷的题目, 包含 1781 道选择题、218 道填空题和 812 道解答题。同时评测分为两部分，自动化评测的客观题部分和依赖于专家打分的主观题部分，这两部分结果构成了最终的分数。所有过程的数据和结果都是公开的。

- 官网：https://github.com/OpenLMLab/GAOKAO-Bench
- 论文：[Evaluating the Performance of Large Language Models on GAOKAO Benchmark](https://arxiv.org/abs/2305.12474)

## AGIEval

微软发布的大模型基础能力评测基准，在 2023 年 4 月推出，主要评测大模型在人类认知和解决问题的一般能力，涵盖全球 20 种面向普通人类考生的官方、公共和高标准录取和资格考试，包含中英文数据。因此，该测试更加倾向于人类考试结果，涵盖了中英文。

- 论文：[AGIEval: A Human-Centric Benchmark for Evaluating Foundation Models](https://arxiv.org/pdf/2304.06364.pdf)
- 数据：https://github.com/microsoft/AGIEval

## MATH

MATH 数学领域的推理和解决问题能力测试, 是 UC Berkeley 提出的一个用于评估机器学习模型的数学问题解决能力的数据集。MATH 与 GSM8K 类似，但是包含了 12500 道高中数学竞赛题，每道题都有详细的步骤化解法，可用于教模型生成答案推导和解释。MATH 数据集目前对现有模型仍非常具挑战性。

MATH 是两大知名数学推理基准之一。

- 项目地址：https://github.com/hendrycks/math
- 论文：[Measuring Mathematical Problem Solving With the MATH Dataset](https://arxiv.org/pdf/2103.03874.pdf)

## BBH

BIG bench hard(BBH) 基准，通过选择大语言模型表现出比人类更差性能的具有挑战性的任务，专注于研究大语言模型目前无法解决的任务。BIG-bench Hard 是 BIG-bench 的一个仅包含目前模型表现无法超过人类的任务子集。

> **BIG-bench** 是一个协作基准，旨在从各个方面调查现有的大语言模型。它包括 204 项任务，涵盖了广泛的主题，包括语言学、儿童发展、数学、常识推理、生物学、物理学、社会偏见、软件开发等。通过缩放模型大小，大语言模型甚至可以在 BIG-bench 上 65%的任务中，在少样本设置下的平均人类表现

- 论文：[Challenging BIG-Bench Tasks and Whether Chain-of-Thought Can Solve Them](https://arxiv.org/abs/2210.09261)
- github: https://github.com/suzgunmirac/BIG-Bench-Hard

## HumanEval

它用于测量从文档字符串合成程序的功能正确性。它由 164 个原始编程问题组成，评估语言理解、算法和简单数学，其中一些问题与简单的软件面试问题相当。

- 论文： https://arxiv.org/abs/2107.03374
- github: https://github.com/openai/human-eval

## MBPP

该基准测试由大约 1000 个众包 Python 编程问题组成，旨在由入门级程序员解决，涵盖编程基础知识、标准库功能等。每个问题都由任务描述、代码解决方案和 3 个自动化测试用例组成。主要反映大模型的代码理解和生成任务能力。

- 论文：[Program Synthesis with Large Language Models](https://arxiv.org/pdf/2108.07732v1.pdf)
- github: [https://github.com/.../mbpp](https://github.com/google-research/google-research/tree/master/mbpp)

# 附录

## 榜单

### UC 伯克利主导的「LLM 排位赛」

LMSYS Org 是 UC 伯克利(University of California,Berkeley)的研究人员发起的一个大语言模型版排位赛！顾名思义，就是让一群大语言模型随机进行 battle，并根据它们的 Elo 得分进行排名。

- 官网：https://lmsys.org/projects/
- 大语言模型的在线试用与评测：https://chat.lmsys.org/

该排位赛使用 MT-bench 作为聊天机器人评估基准。

> 创始人之一**盛颖**是之前爆火的、可以在单 GPU 上可以跑 175B 模型推理的系统 FlexGen 的一作，目前已获 8k 星，她是斯坦福大学计算机科学系的博士生。另外两位是 Lianmin Zheng 和 Hao Zhang。

### AlpacaEval

- github: https://github.com/tatsu-lab/alpaca_eval
- 榜单：[Alpaca Eval Leaderboard](https://tatsu-lab.github.io/alpaca_eval/)

### OpenCompass

- 官网：https://opencompass.org.cn
- 榜单：https://opencompass.org.cn/leaderboard-llm

## MT-Bench

MT-Bench 是一个经过精心设计的基准测试，包含 80 个高质量的多轮问题。8 个主要的类别：写作、角色扮演、提取、推理、数学、编程、知识 I（科学技术工程数学）和知识 II（人文社科）。其中，每个类别有 10 个多轮问题，总共 160 个问题。

下图是 LMSYS Org 上的 2023 年榜单上的雷达图:

<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/328fe3c94daf4d0fb1a81b6707ca00be~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1140&h=694&s=59388&e=jpg&b=ffffff" alt="c395968dbbc1df0ccc642d985b1f496.jpg" width="70%" />

项目说明如下：

- Writing - 写作
- Humanities - 人类行业
- Roleplay - 角色扮演
- STEM - 理工科任务
- Reasoning - 推理任务
- Extraction - 提取（蒸馏）
- Math - 数学任务
- Coding - 代码任务

## MathVista

MathVista 由微软发布的全新多模态数学推理基准数据集，同时提供了一份涵盖  **112 页的详细评测报告**，专注于大型多模态模型的数学推理表现。这一基准测试对于目前最先进的模型，如 GPT-4V，来说也是一项挑战，显示了这些模型在多模态数学问题解决方面的局限性。

- 论文：https://arxiv.org/abs/2310.02255
- 项目：https://mathvista.github.io/
- HF 数据集：https://huggingface.co/datasets/AI4Math/MathVista
- 数据可视化：https://mathvista.github.io/#visualization
- Leaderboard：https://mathvista.github.io/#leaderboard

## 评测综述的论文：大型语言模型评估综述

- 论文：[A Survey on Evaluation of Large Language Models](https://arxiv.org/abs/2307.03109)

> 欢迎提供更多的

<br>

[**参考**]

- https://blog.csdn.net/qq_18846849/article/details/127547883
- https://baijiahao.baidu.com/s?id=1782446277193428846&wfr=spider&for=pc
- https://zhuanlan.zhihu.com/p/643086466?utm_id=0
- https://opencompass.org.cn/ability

(可能有遗漏，欢迎补充)
