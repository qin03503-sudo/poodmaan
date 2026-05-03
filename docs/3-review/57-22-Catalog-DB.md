# 2.2 Catalog DB

این مهم‌ترین دیتابیس محتوایی است.

## 2.2.1 creators

```
SQL

```
creators  
- id (uuid, pk)  
- owner_user_id (uuid)  
- display_name  
- slug  
- bio  
- avatar_asset_id  
- cover_asset_id  
- verification_status (enum)  
- payout_account_id (nullable)  
- country_code  
- default_language  
- created_at  
- updated_at
```
```

---

## 2.2.2 podcasts

```
SQL

```
podcasts  
- id (uuid, pk)  
- creator_id (uuid, fk -> creators.id)  
- title  
- slug  
- description  
- language_code  
- category_id  
- cover_asset_id  
- artwork_dominant_color  
- explicit_content (bool)  
- visibility (enum: public, private, unlisted)  
- status (enum: draft, active, suspended, archived)  
- rss_source_url (nullable)  
- publish_strategy (enum: native, rss_imported, hybrid)  
- created_at  
- updated_at
```
```

---

## 2.2.3 podcast\_categories

```
SQL

```
podcast_categories  
- id  
- code  
- name  
- parent_id (nullable)
```
```

---

## 2.2.4 podcast\_tags

```
SQL

```
podcast_tags  
- id  
- code  
- label
```
```

## 2.2.5 podcast\_tag\_relations

```
SQL

```
podcast_tag_relations  
- podcast_id  
- tag_id
```
```

---

## 2.2.6 seasons

```
SQL

```
seasons  
- id (uuid, pk)  
- podcast_id  
- season_number  
- title  
- description  
- created_at  
- updated_at
```
```

---

## 2.2.7 episodes

```
SQL

```
episodes  
- id (uuid, pk)  
- podcast_id (uuid, fk)  
- season_id (uuid, nullable)  
- title  
- slug  
- description  
- episode_number  
- episode_type (enum: full, trailer, bonus)  
- language_code  
- explicit_content (bool)  
- duration_seconds  
- cover_asset_id (nullable)  
- media_asset_id  
- transcript_asset_id (nullable)  
- publish_at  
- published_at  
- status (enum: draft, processing, scheduled, published, blocked, archived)  
- visibility (enum: public, private, unlisted)  
- availability_type (enum: free, premium, subscription, hybrid)  
- playback_policy_id (nullable)  
- search_document_version  
- created_at  
- updated_at
```
```

---

## 2.2.8 episode\_chapters

```
SQL

```
episode_chapters  
- id  
- episode_id  
- start_second  
- end_second  
- title  
- source (enum: manual, ai)  
- confidence_score (nullable)
```
```

---

## 2.2.9 episode\_assets

اگر بخواهیم asset relation را در catalog track کنیم

```
SQL

```
episode_assets  
- id  
- episode_id  
- asset_type (enum: audio, transcript, cover, waveform)  
- asset_id  
- created_at
```
```

---

## 2.2.10 publishing\_jobs

```
SQL

```
publishing_jobs  
- id  
- entity_type (podcast, episode)  
- entity_id  
- requested_by  
- scheduled_for  
- status (pending, approved, blocked, published, failed)  
- moderation_required (bool)  
- failure_reason  
- created_at  
- updated_at
```
```

---

