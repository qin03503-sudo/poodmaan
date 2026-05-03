# 2.5 Billing DB

این دیتابیس باید بسیار دقیق و audit-friendly باشد.

## 2.5.1 subscription\_plans

```
SQL

```
subscription_plans  
- id  
- code  
- name  
- billing_cycle (monthly, yearly)  
- price_amount  
- currency  
- access_scope (platform_premium, creator_membership)  
- status  
- created_at
```
```

---

## 2.5.2 user\_subscriptions

```
SQL

```
user_subscriptions  
- id  
- user_id  
- plan_id  
- provider (stripe, paypal, apple_iap, google_play)  
- provider_subscription_id  
- status (trialing, active, past_due, canceled, expired, paused)  
- started_at  
- current_period_start  
- current_period_end  
- canceled_at  
- trial_ends_at  
- created_at  
- updated_at
```
```

---

## 2.5.3 one\_time\_purchases

```
SQL

```
one_time_purchases  
- id  
- user_id  
- entity_type (episode, podcast)  
- entity_id  
- price_amount  
- currency  
- provider  
- provider_payment_id  
- status  
- purchased_at
```
```

---

## 2.5.4 payment\_transactions

```
SQL

```
payment_transactions  
- id  
- user_id  
- provider  
- provider_payment_id  
- transaction_type (charge, refund, dispute, renewal, adjustment)  
- amount  
- currency  
- status  
- raw_payload_jsonb  
- occurred_at  
- created_at
```
```

---

## 2.5.5 entitlements

این یکی از مهم‌ترین جداول است.

```
SQL

```
entitlements  
- id  
- user_id  
- entitlement_type (platform_premium, creator_subscription, episode_access, podcast_access, gift_access, promo_access)  
- source_type (subscription, purchase, promotion, manual_grant, bundle)  
- source_id  
- target_entity_type (global, creator, podcast, episode)  
- target_entity_id (nullable)  
- starts_at  
- ends_at (nullable)  
- status (active, expired, revoked, pending)  
- created_at  
- updated_at
```
```

---

## 2.5.6 creator\_payout\_statements

```
SQL

```
creator_payout_statements  
- id  
- creator_id  
- period_start  
- period_end  
- gross_amount  
- net_amount  
- currency  
- status (draft, finalized, paid, disputed)  
- generated_at  
- paid_at
```
```

---

## 2.5.7 creator\_payout\_items

```
SQL

```
creator_payout_items  
- id  
- statement_id  
- revenue_type (subscription_share, ad_share, one_time_purchase_share)  
- reference_entity_type  
- reference_entity_id  
- amount  
- quantity  
- metadata_jsonb
```
```

---

## 2.5.8 financial\_ledger\_entries

برای correctness واقعی

```
SQL

```
financial_ledger_entries  
- id  
- account_type (platform_revenue, creator_payable, tax_liability, refund_reserve, user_receivable)  
- account_ref_id  
- direction (debit, credit)  
- amount  
- currency  
- reference_type  
- reference_id  
- occurred_at  
- created_at
```
```

---

