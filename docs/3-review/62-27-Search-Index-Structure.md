# 2.7 Search Index Structure

اگر OpenSearch/Elastic استفاده شود، documentها معمولاً denormalized هستند.

## index: podcasts

```
JSON

```
{  
  "id": "podcast_uuid",  
  "title": "Podcast title",  
  "description": "....",  
  "creator_name": "....",  
  "language_code": "fa",  
  "category": "technology",  
  "tags": ["ai", "startup"],  
  "followers_count": 12345,  
  "episode_count": 210,  
  "published": true,  
  "explicit_content": false,  
  "dominant_color": "#112233",  
  "updated_at": "..."  
}
```
```

## index: episodes

```
JSON

```
{  
  "id": "episode_uuid",  
  "podcast_id": "....",  
  "podcast_title": "...",  
  "creator_id": "...",  
  "creator_name": "...",  
  "title": "...",  
  "description": "...",  
  "duration_seconds": 3200,  
  "availability_type": "premium",  
  "language_code": "fa",  
  "published_at": "...",  
  "chapters": [...],  
  "keywords": [...],  
  "transcript_text": "...",  
  "visibility": "public"  
}
```
```

---

