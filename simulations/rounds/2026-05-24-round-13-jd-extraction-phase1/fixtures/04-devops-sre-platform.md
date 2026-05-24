Staff DevOps / Platform Engineer
Austin, TX (hybrid — 2 days on-site)

Who we are
A 1,200-person B2B SaaS in the supply-chain optimization space. Our platform team (12 engineers) owns the multi-tenant K8s footprint that hosts ~80 microservices for our product engineering org. We're hiring a Staff Platform Engineer to take over the GitOps + admission-control surface.

Day-to-day
- Owning the ArgoCD + Argo Rollouts deployment surface (5 prod clusters, 3 staging)
- Defining policy-as-code via Kyverno (we recently migrated off Gatekeeper)
- Maintaining the Crossplane-managed infra footprint (we shifted from raw Terraform last year for the dynamic-tenant slice; static infra stays on TF)
- Cosign + Sigstore signing flow for all images pre-deploy
- Karpenter tuning for cost (we're at ~$1.4M/year on EC2 across 5 clusters)
- Standing up Backstage for service catalog + scaffolding (greenfield, your call on shape)
- On-call rotation (1-in-7, follow-the-sun)

You need
- 7+ years across infra / SRE / platform-engineering (titles vary)
- Deep Kubernetes — you've debugged a CrashLoopBackOff in the etcd layer, not just kubectl-logs
- Terraform AND at least one of (Crossplane / Pulumi)
- Strong GitHub Actions OR GitLab CI experience
- One of: Prometheus, Datadog, Honeycomb at production-instrumentation depth
- AWS at the Landing Zone / Organizations / Identity Center level (not just EC2/S3 button-clicking)

We'd love
- Service mesh experience (we run Linkerd; Istio acceptable)
- Cilium or eBPF familiarity
- Vault for secrets (we use HCP)
- Helm chart authoring (we publish ~30 internal charts)
- Familiarity with cosign / SLSA / SBOM (we're at L2 attestation today, pushing to L3 this fiscal)

Hands-off the keyboard
- We don't write Java here
- No Windows / .NET
- No frontend, mobile, or data-engineering work on this team

Tooling we expect daily
Kubernetes 1.32, ArgoCD, Argo Rollouts, Kyverno, Crossplane, Terraform, Helm, Karpenter, GitHub Actions, Prometheus, Grafana, Linkerd, Cosign, Vault, AWS (EKS / Lambda / DynamoDB / S3 / EventBridge).
