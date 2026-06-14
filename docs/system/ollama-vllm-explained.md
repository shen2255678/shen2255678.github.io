---
title: 用大白話搞懂 Ollama 與 vLLM：它們不是模型，是「跑模型的工具」
date: 2026-06-07
tags:
    - AI
    - LLM
    - 推論部署
    - Ollama
    - vLLM
    - 學習筆記
pin: false
desc: 我一開始以為 Ollama 跟 Gemma 一樣是「免費開源模型」——錯了。這篇把模型、推論引擎、Agent CLI 三件常被搞混的東西分清楚，並用大白話講 Ollama 與 vLLM 怎麼把模型跑起來、KV Cache／PagedAttention 到底在做什麼。一篇自學筆記。
cover: /images/system/ollama-vllm/cover.webp
---

# 用大白話搞懂 Ollama 與 vLLM：它們不是模型，是「跑模型的工具」

> 這是一篇學習筆記。我一開始以為 **Ollama 跟 Gemma 一樣，是一個「免費開源模型」**——
> 結果完全搞錯方向。我把搞錯的地方原汁原味留下來，希望你不會卡在同一個坑。

---

## 一句話：Ollama 與 vLLM 在解決什麼問題

你手上有一個模型（例如 Google 的 **Gemma**、Meta 的 **Llama**、阿里的 **Qwen**）——它其實只是**一坨幾 GB 的權重檔**，本身不會動。

問題來了：**這坨檔案怎麼「跑起來」、變成一個你能對話、能用程式呼叫的服務？**

這就是 **Ollama** 和 **vLLM** 在做的事。它們是**拿來跑模型的工具（推論／部署工具）**——把靜態的模型權重，變成「會回話的服務」。

- **Ollama**：在**你自己電腦**上，一行指令就能跑模型——方便、單人、開發用。
- **vLLM**：在**伺服器的 GPU** 上，扛得住**很多人同時打**——高吞吐、生產用。

記住這句，因為我一開始就是在這裡搞錯的：**它們不是模型，是「拿來跑模型的工具」。**

---

## 最大的誤會：「Ollama 是不是一個模型？」

**不是。** 這是我整篇最想講清楚的一件事。

> 比喻：**Ollama＝播放器（像 VLC），Gemma＝影片檔（像 .mp4）。**
> 你不會說「VLC 是一部電影」。同理，Ollama 不是模型，它是**拿來播放模型的播放器**。

那我「以為它免費開源」錯了嗎？**這部分你沒錯**——Ollama 確實免費、也開源。錯的不是「免費開源」，錯的是把它歸類成「**模型**」。正確的分類是：

| | 它是什麼 | 例子 | 免費嗎 |
|---|---|---|---|
| **模型（權重）** | 真正「會思考」的那坨檔案 | Gemma、Llama、Qwen | 開源權重免費下載 |
| **跑模型的工具（推論／部署）** | 把模型跑起來的軟體 | **Ollama、vLLM** | 免費、開源 |
| **雲端 API（服務）** | 別人幫你跑好、你只管呼叫 | OpenAI、Claude | **要錢**（按 token 計費） |

所以「免費 vs 付費」的真正分界，不是 Ollama vs Gemma——**是「自己跑（Ollama/vLLM + 開源模型，免費）」vs「用雲端（OpenAI/Claude，付費）」。**

---

## 順便澄清：那 `claude` 是什麼？

我一度想打 `ollama launch claude --model gemma4` 這種指令——這其實是把三層東西全攪在一起了。分清楚：

```mermaid
flowchart TD
  subgraph 本地自己跑（免費）
    OL["Ollama / vLLM（工具）"] --> M["Gemma / Llama / Qwen（模型）"]
  end
  subgraph 雲端（付費）
    API["OpenAI / Anthropic API"] --> CM["GPT / Claude（模型，在別人機房）"]
  end
  CLI["claude CLI（一個會用工具的 Agent 程式）"] -.呼叫.-> API
```

- `claude`（Claude Code）是一個 **coding agent 工具**，不是模型本身。
- Ollama 在 2026/1 新增了 `ollama launch` 指令，**可以啟動 Claude Code、Codex 這類工具**，並自動幫你接好模型後端（本地 Ollama 模型或雲端）。
- **但關鍵界線**：`ollama launch claude` 啟動的是 **Claude Code 這個「工具」**，**不是**把 Claude 的「模型權重」下載到本地跑——Claude 模型不開源、跑不了。**launch 的是工具，`run` 的才是模型**（`ollama run gemma4:12b`）。

---

## Ollama 怎麼用（本地、最簡單）

裝好 Ollama 之後，**真正的指令長這樣**：  

```bash
ollama run gemma3          # 下載 + 開對話（第一次會抓權重檔）
ollama run gemma3:4b       # 指定參數量版本（4B＝40 億參數）
ollama serve              # 起一個背景服務（OpenAI 相容，連 http://localhost:11434）
```

**它底層在做什麼？**
- 用一個叫 **llama.cpp** 的引擎，搭配 **GGUF 量化**模型。（想深入「Ollama 與 llama.cpp 是引擎 vs 外殼」的關係 → 看 [Ollama 與 llama.cpp](/system/ollama-vs-llamacpp)）
- **量化（Quantization）= 把模型「壓小」。** 原本每個權重用 16 位元存，壓成 4 位元——檔案變小、**連筆電的 CPU 或小顯卡都跑得動**，代價是犧牲一點點精度。
- 比喻：像把無損音樂壓成 MP3——小很多、耳朵幾乎聽不出差。

**定位**：本地、單人、開發 / demo / 重隱私（資料不出你的電腦）。

---

## vLLM 怎麼用（生產、高併發）

```bash
pip install vllm
vllm serve google/gemma-3-4b-it     # 起一個 OpenAI 相容的 server（連 :8000）
```

- 從 HuggingFace 拉權重，**需要 NVIDIA GPU（CUDA）**。
- 它存在的理由只有一個字：**吞吐量**——讓**一張 GPU 同時服務很多人**。

它靠兩個招式做到（這幾個詞面試常考，用白話記）：

- **Continuous batching（連續批次）**：不等湊滿一車人才發車，**有人來就動態併進去一起算**，GPU 一刻不閒置 → 吞吐高。
- **PagedAttention（分頁注意力）**：把記憶體像**作業系統的「分頁」**一樣切小塊管理，**減少浪費** → 同樣的顯卡能塞更多人同時跑。
- 這兩招省的，都是同一個東西：**KV Cache**。

> **KV Cache 是什麼？** LLM 一次寫一個字，每寫一個新字本來都要「把前面全部重算一遍」。KV Cache 就是**把前面算過的結果存起來、不要重算** → 寫得更快。但它**很吃顯存**——所以 PagedAttention 才要想辦法把它管得更省。

**定位**：生產、線上服務、很多人同時用。

---

## 一張表看懂 Ollama vs vLLM

| | **Ollama** | **vLLM** |
|---|---|---|
| 它是什麼 | 管理外殼（內含 llama.cpp 引擎） | 推論引擎（自帶） |
| 定位 | 本地 / 單人 / 方便 | 生產 / 高併發 |
| 底層 | llama.cpp + GGUF 量化 | PagedAttention + continuous batching |
| 硬體 | CPU / 小 GPU 都行 | 要 NVIDIA GPU（CUDA） |
| 何時用 | 開發、demo、隱私 | 線上服務多人 |
| 免費？ | ✅ 開源免費 | ✅ 開源免費 |

**它們不是對手，是「不同場景的工具」**——就像 SQLite vs PostgreSQL：一個輕便、一個扛量。

### 等等——為什麼一個叫「外殼」、一個叫「引擎」？

這是我自己卡過的點：上面那張表說 Ollama 是「外殼」、vLLM 是「引擎」，但它們用起來明明都一樣（`serve` 開一個 API）？關鍵是——**「會不會自己算數學（引擎）」跟「有沒有下載／管理／API（外殼）」是兩個獨立的軸**：

| | 自己算數學（引擎）？ | 有外殼（下載／管理／API）？ |
|---|---|---|
| **llama.cpp** | ✅ 自己算（純 C++ 一套） | ❌ 很裸，要自己搞 |
| **Ollama** | ❌ **叫 llama.cpp 算** | ✅ 完整外殼 |
| **vLLM** | ✅ **自己算**（自帶引擎 + 自寫 CUDA kernel） | ✅ 自帶 server |

所以：**Ollama 只有外殼、引擎是「借」llama.cpp 的；vLLM 引擎是「自己造」的，外面剛好也包了一層 server。** 「有沒有 API server」跟「是不是引擎」是兩回事——vLLM 用起來像 Ollama，但它骨子裡是引擎。

那 vLLM 為什麼不直接包 llama.cpp 就好？因為**目標不同**：`llama.cpp` 是為了「**筆電 / 小顯卡也能跑**」的省油引擎；vLLM 是為了「**一張 GPU 同時扛超多人**」的高吞吐引擎——為此它得自己發明 PagedAttention、自己刻 CUDA kernel，只能從頭打造自己的引擎。它們是**兩顆為不同賽道造的引擎**，不是誰包誰。

---

## 它們有個共同點：都講「同一種語言」

Ollama 和 vLLM **都提供 OpenAI 相容的 API**。這代表什麼？

你的程式只要會「呼叫 OpenAI 格式的 API」，**換後端只是換一個網址（base_url）和模型名**——程式幾乎不用改。

```
雲端 Qwen ── base_url=dashscope…    model=qwen-plus
本地 Gemma ─ base_url=localhost:11434 model=gemma3:4b   ← Ollama
GPU  Gemma ─ base_url=localhost:8000  model=gemma-3-4b   ← vLLM
```

所以「開發時用本地 Ollama 省錢、上線換 vLLM 扛量、或直接接雲端 API」——對寫程式的人來說，**就是改設定檔的事**。這層抽象本身就很美。

---

## 我一開始搞錯的幾件事

**誤會一：以為 Ollama 是一個模型（像 Gemma）。**
不是。Ollama 是**跑模型的工具**；Gemma 才是模型。播放器 ≠ 影片。

**誤會二：以為「Ollama 要付費 / Gemma 才免費」。**
都免費。開源模型（Gemma/Llama/Qwen）免費下載、Ollama/vLLM 免費開源。**要錢的是雲端 API（OpenAI/Claude）**——因為那是「別人幫你跑、用多少付多少」。

**誤會三：以為「裝好 Ollama 就有 AI 了」。**
不夠。Ollama 只是空播放器，你還要 **`ollama run gemma3` 去拉一個模型**進來，它才有東西可跑。

**誤會四：以為 Ollama 和 vLLM 二選一、是對手。**
不是。**本地單人用 Ollama、生產高併發用 vLLM**——不同場景的工具，常常一個專案兩個都會碰到。

**誤會五：以為「本地跑＝慢＝玩具」。**
不一定。量化後的小模型在筆電上就堪用；vLLM 在 GPU 上更是**生產級**。本地跑還有雲端給不了的好處：**資料不外流、不算 token 錢**。

**誤會六：以為「Ollama 完全碰不到 Claude」。**
其實 Ollama 新增了 `ollama launch claude`——但它是**啟動 Claude Code 這個「工具」**（並幫你接好模型後端），**不是**在本地跑 Claude 的「模型權重」（那不開源）。


---

## 什麼時候用哪個？

- **想在自己電腦上玩玩、或重視隱私 / 不想付錢** → **Ollama**（一行 `ollama run` 就開始）。
- **要讓很多人同時用、追求吞吐與延遲** → **vLLM**（但要有 GPU）。
- **不想自己管機器、要最強模型** → **直接接雲端 API**（OpenAI/Claude，付費）。

懂得「**什麼時候該用本地、什麼時候該用雲端**」，比硬背名詞更值錢。

---

## 結語

把一句話再說一次：**Ollama 和 vLLM 都不是模型，是「把模型跑起來」的工具——Ollama 給本地單人、vLLM 給生產高併發；模型（Gemma/Llama/Qwen）是被它們跑的那坨權重。** 要錢的從來不是工具，是雲端 API。

而這些概念真正從「看過」變成「懂」的那一刻，不是讀文章的時候——是你**親手 `ollama run gemma3`、看著一個跑在自己電腦裡、不連網、不收費的 AI 開始跟你對話**的那一刻。
