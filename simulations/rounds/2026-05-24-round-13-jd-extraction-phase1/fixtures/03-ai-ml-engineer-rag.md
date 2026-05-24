AI / ML Engineer — RAG & Agent Systems
Toronto, Canada (or fully remote, ±4h ET)

About the team
We're a 9-person AI engineering team inside a 600-person legal-tech company. We ship two flagship features: a retrieval-augmented Q&A over case law (Pinecone-backed, 4M docs indexed) and a multi-step agent that drafts contract redlines (LangGraph, ~30 LoB ops/day). We're hiring an experienced AI engineer to take over the retrieval side end-to-end.

The role
- Own the embedding pipeline (currently OpenAI text-embedding-3-large; evaluating bge-large-en self-hosted)
- Tune retrieval (hybrid BM25 + dense; we use Pinecone but are open to Qdrant)
- Write the evals (currently Braintrust; growing into LangFuse for trace inspection)
- Co-design the agent flow with the engineer who owns LangGraph
- Set up the offline eval harness (we use pytest + an internal harness; happy to migrate to a real evals platform)

Must have
- 3+ years in production ML or AI engineering (not just notebooks)
- Strong Python — pydantic, async, dataclasses, type-driven
- Shipped a RAG pipeline against ≥500k docs in production
- Comfortable picking a vector DB (Pinecone / Weaviate / Qdrant / pgvector — we want your opinion)
- LangChain OR LlamaIndex experience (we use LangChain today; happy to hear the case for the other)
- Familiarity with at least one of: PyTorch, HuggingFace transformers, scikit-learn

Strongly preferred
- Eval-driven ML development (Braintrust / LangFuse / Pydantic-AI / DSPy)
- Pydantic-AI or DSPy if you've built agents in either
- Cost-aware prompt engineering — we burn $80k/month on inference, your work moves that number
- Some background in NumPy / pandas for data prep

Not relevant
- PyTorch model training from scratch (we don't train)
- TensorFlow / Keras (we don't use these)
- Mobile ML / edge inference

Stack we use day-to-day
Python 3.12, FastAPI, LangChain (Python), LangGraph, Pinecone, OpenAI + Anthropic APIs, Braintrust, pytest, GitHub Actions, Docker, Kubernetes (managed), AWS (Bedrock, S3, RDS Postgres).
