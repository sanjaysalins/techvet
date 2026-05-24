Senior Backend Engineer — Trading Systems
Lugano, Switzerland (hybrid, 3 days on-site)

About the role
Our trading-systems team owns the order-routing platform behind a multi-asset retail brokerage. We process ~12k orders/sec at peak, settle on T+1, and answer to FINMA. We're hiring a Senior Backend Engineer to own a critical slice of the venue-routing service. You'll work alongside two staff engineers and report to the platform lead.

What you'll be doing
- Owning the venue-router service from spec through prod (Java 21 + Spring Boot 3, ~120k LoC)
- Designing the schema for the order-state store (PostgreSQL 16, sharded by symbol)
- Tuning the in-memory hot path that fronts Redis for risk checks
- Defining retention + WAL archiving with our DBA team
- Carrying pager rotation (PagerDuty, 1-in-6, business-hours-only for first 90 days)

Required
- 6+ years writing production JVM services (Java preferred; Kotlin acceptable for the right candidate)
- Strong Spring Boot or Quarkus background — DI, transactional boundaries, async listeners
- Deep PostgreSQL: schema design, index choice, EXPLAIN ANALYZE in your hands
- Comfortable with AWS (we run on EKS + RDS + MSK Kafka)
- Familiarity with REST AND gRPC service patterns
- Experience reviewing a production incident timeline and writing the post-mortem

Nice to have
- Trading or low-latency systems background
- gRPC streaming over Envoy
- Familiarity with FIX / FAST market-data protocols (not deal-breaker)
- Experience with Flink for analytics joins
- OpenTelemetry instrumentation

Tech we use day-to-day
Java 21, Spring Boot 3, Maven, PostgreSQL 16, Redis 7, Kafka 3.7, gRPC, Envoy, EKS, Terraform, GitHub Actions, Grafana, Prometheus.

Out of scope for this role
Frontend, mobile, ML — we don't ship any of those from this team.
