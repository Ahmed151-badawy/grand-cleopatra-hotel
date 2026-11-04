# Cleopatra AI — Setup & Configuration Guide
**Grand Cleopatra Hotel, Luxor, Egypt**

---

## 1. Prerequisites & Philosophy

Cleopatra AI is designed for **zero subscription cost** and **absolute privacy**:
- No external paid API keys (no OpenAI, Anthropic, or proprietary cloud billing required).
- Zero downtime guarantee: Works immediately out-of-the-box using the built-in Grounded Fallback Engine even before local AI models are downloaded.

---

## 2. Environment Variables

Create `.env.local` in the project root (copied from `.env.example`):

```bash
# Cleopatra AI Subsystem Configuration
AI_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=qwen2.5:3b
OLLAMA_EMBED_MODEL=multilingual-e5-small
AI_REQUEST_TIMEOUT_MS=8000
AI_CIRCUIT_BREAKER_COOLDOWN_MS=30000
```

### Configuration Parameters
| Variable | Default Value | Description |
| :--- | :--- | :--- |
| `AI_PROVIDER` | `ollama` | Primary provider (`ollama` or `fallback`). |
| `OLLAMA_BASE_URL` | `http://localhost:11434` | Endpoint where the local Ollama daemon listens. Never expose this directly to the public internet. |
| `OLLAMA_MODEL` | `qwen2.5:3b` | Target generative causal LLM model (Qwen 2.5 3B). |
| `OLLAMA_EMBED_MODEL` | `multilingual-e5-small` | Dedicated multilingual embedding model (do not use generative models for embeddings). |
| `AI_REQUEST_TIMEOUT_MS` | `8000` | AbortController timeout threshold in milliseconds. |
| `AI_CIRCUIT_BREAKER_COOLDOWN_MS` | `30000` | Duration to keep the circuit open after a daemon connection error. |

---

## 3. Local Model Setup (Optional for Full LLM Generation)

If you wish to run the local open-source LLM rather than purely the Grounded Fallback Engine:

1. **Install Ollama**:
   Download and install Ollama from [https://ollama.com](https://ollama.com).

2. **Start the Ollama Daemon**:
   ```bash
   ollama serve
   ```

3. **Pull the Tested Lightweight Models**:
   ```bash
   # Generative language model (Qwen 2.5 3B Instruct)
   ollama pull qwen2.5:3b

   # Multilingual embedding model
   ollama pull multilingual-e5-small
   ```

4. **Verify Connectivity**:
   ```bash
   curl http://localhost:11434/api/tags
   ```

---

## 4. Running the Automated Test Suites

The project features 30 automated tests across two test suites:

```bash
# Run Phase 2 & Phase 3 Tests (Retrieval, Providers, Benchmark, Grounding)
npm run test:ai

# Run Phase 4 & Phase 5 Tests (Concierge Engine, Memory, Planner Engine)
npm run test:ai:phases

# Run All Tests Sequentially
npm run test:ai:all
```

---

## 5. Production Deployment Notes

1. **Zero Downtime Guarantee**:
   In production (Vercel, Netlify, Docker, or Node.js VPS), if no local Ollama daemon is provisioned, the application cleanly routes to the Grounded Fallback Engine. Every response is guaranteed 100% verified against official hotel records.
2. **Rate Limiting & Memory Scaling**:
   The built-in sliding window rate limiter and conversation memory use fast in-memory stores. For distributed multi-instance deployments (e.g. Kubernetes, serverless edge functions), plug a Redis store into `setRateLimiterStore(redisStore)`.
3. **No Client Bundling**:
   All AI configuration is strictly isolated on the server. No `NEXT_PUBLIC_` variables are used for AI provider internals.

