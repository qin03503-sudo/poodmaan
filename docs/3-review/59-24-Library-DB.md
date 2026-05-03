# 2.4 Library DB

## 2.4.1 user\_followed\_podcasts

```
SQL

```
user_followed_podcasts  
- user_id  
- podcast_id  
- followed_at  
PRIMARYKEY(user_id, podcast_id)
```
```

---

## 2.4.2 user\_saved\_episodes

```
SQL

```
user_saved_episodes  
- user_id  
- episode_id  
- saved_at  
PRIMARYKEY(user_id, episode_id)
```
```

---

## 2.4.3 user\_episode\_history

```
SQL

```
user_episode_history  
- id  
- user_id  
- episode_id  
- first_played_at  
- last_played_at  
- completed_at (nullable)  
- play_count  
- total_listened_seconds
```
```

---

## 2.4.4 playback\_resume\_positions

این جدول cold persistence است، hot path در Redis است.

```
SQL

```
playback_resume_positions  
- user_id  
- episode_id  
- last_position_seconds  
- updated_at  
- playback_session_id  
PRIMARYKEY(user_id, episode_id)
```
```

---

## 2.4.5 playlists

```
SQL

```
playlists  
- id  
- user_id  
- name  
- description  
- visibility (private, public, unlisted)  
- created_at  
- updated_at
```
```

---

## 2.4.6 playlist\_items

```
SQL

```
playlist_items  
- id  
- playlist_id  
- episode_id  
- sort_order  
- added_at  
- added_by
```
```

---

## 2.4.7 user\_reactions

```
SQL

```
user_reactions  
- user_id  
- entity_type (podcast, episode, clip)  
- entity_id  
- reaction_type (like, dislike, love)  
- created_at  
PRIMARYKEY(user_id, entity_type, entity_id)
```
```

---

## 2.4.8 user\_queue\_state

اگر queue را persistence بخواهیم

```
SQL

```
user_queue_state  
- user_id  
- queue_version  
- items_jsonb  
- updated_at
```
```

---

