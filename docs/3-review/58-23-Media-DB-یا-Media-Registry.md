# 2.3 Media DB یا Media Registry

این بخش بهتر است از Catalog جدا باشد چون asset lifecycle و processing state مستقل است.

## 2.3.1 media\_assets

```
SQL

```
media_assets  
- id (uuid, pk)  
- owner_type (creator, podcast, episode, system)  
- owner_id  
- asset_kind (audio, image, transcript, waveform, clip, export)  
- storage_bucket  
- storage_key  
- mime_type  
- file_size_bytes  
- checksum_sha256  
- duration_seconds (nullable)  
- width (nullable)  
- height (nullable)  
- processing_status (uploaded, queued, processing, ready, failed, quarantined)  
- created_at  
- updated_at
```
```

---

## 2.3.2 media\_processing\_jobs

```
SQL

```
media_processing_jobs  
- id  
- asset_id  
- job_type (faststart, cover_optimize, waveform, transcription, metadata_extract)  
- status (pending, running, completed, failed)  
- worker_id  
- input_payload (jsonb)  
- output_payload (jsonb)  
- error_message  
- attempts  
- created_at  
- updated_at
```
```

---

## 2.3.3 upload\_sessions

```
SQL

```
upload_sessions  
- id  
- creator_id  
- upload_type (episode_audio, cover_image, transcript, import)  
- target_owner_type  
- target_owner_id  
- expected_mime_type  
- multipart_upload_id  
- status (initiated, uploading, completed, failed, aborted)  
- expires_at  
- created_at
```
```

---

