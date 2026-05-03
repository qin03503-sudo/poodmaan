# 8\. مثال واقعی: `billing-service`

Billing باید نسبت به بقیه سرویس‌ها سخت‌گیرانه‌تر باشد؛ چون correctness مالی مهم‌تر از سرعت است.

```
```
services/billing-service/  
├── cmd/  
│   ├── server/  
│   ├── worker/  
│   └── migrate/  
│  
├── internal/  
│   ├── domain/  
│   │   ├── entity/  
│   │   │   ├── subscription.go  
│   │   │   ├── payment_transaction.go  
│   │   │   ├── invoice.go  
│   │   │   ├── entitlement_grant.go  
│   │   │   └── ledger_entry.go  
│   │   │  
│   │   ├── valueobject/  
│   │   │   ├── money.go  
│   │   │   ├── currency.go  
│   │   │   ├── subscription_status.go  
│   │   │   └── payment_status.go  
│   │   │  
│   │   ├── policy/  
│   │   │   ├── subscription_policy.go  
│   │   │   ├── refund_policy.go  
│   │   │   ├── entitlement_policy.go  
│   │   │   └── reconciliation_policy.go  
│   │   │  
│   │   └── event/  
│   │       ├── payment_succeeded.go  
│   │       ├── payment_failed.go  
│   │       ├── subscription_changed.go  
│   │       └── entitlement_changed.go  
│   │  
│   ├── application/  
│   │   ├── command/  
│   │   │   ├── create_checkout_session.go  
│   │   │   ├── handle_payment_webhook.go  
│   │   │   ├── cancel_subscription.go  
│   │   │   ├── refund_payment.go  
│   │   │   └── reconcile_payment.go  
│   │   │  
│   │   ├── query/  
│   │   │   ├── get_subscription.go  
│   │   │   ├── list_invoices.go  
│   │   │   └── get_entitlements.go  
│   │   │  
│   │   └── handler/  
│   │  
│   ├── ports/  
│   │   ├── outbound/  
│   │   │   ├── payment_provider.go  
│   │   │   ├── subscription_repository.go  
│   │   │   ├── ledger_repository.go  
│   │   │   ├── entitlement_publisher.go  
│   │   │   └── idempotency_store.go  
│   │   └── inbound/  
│   │  
│   ├── adapters/  
│   │   ├── inbound/  
│   │   │   ├── grpc/  
│   │   │   ├── http/  
│   │   │   └── kafka/  
│   │   │  
│   │   └── outbound/  
│   │       ├── postgres/  
│   │       ├── kafka/  
│   │       ├── redis/  
│   │       └── external/  
│   │           ├── stripe/  
│   │           ├── paypal/  
│   │           ├── apple_iap/  
│   │           └── google_play/  
│   │  
│   └── observability/  
│  
├── migrations/  
├── test/  
│   ├── unit/  
│   ├── integration/  
│   ├── contract/  
│   └── payment-provider-fixtures/  
└── go.mod
```
```

---

