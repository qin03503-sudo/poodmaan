# 10\. قوانین Go Programming

## 10.1 Context همه‌جا اجباری

هر function که IO دارد:

```
Go

```
func (r*Repository) GetEpisode(ctxcontext.Context, idEpisodeID) (*Episode, error)
```
```

ممنوع:

```
Go

```
funcGetEpisode(idstring) (*Episode, error)
```
```

---

## 10.2 Timeout پیش‌فرض برای همه outbound callها

```
```
DB query timeout  
Redis timeout  
gRPC timeout  
Kafka publish timeout  
HTTP provider timeout
```
```

هیچ call خارجی نباید بدون timeout باشد.

---

## 10.3 Interface را سمت consumer تعریف کن

در Go، interface را جایی تعریف کن که استفاده می‌شود، نه جایی که implementation است.

درست:

```
Go

```
// application/usecase  
typeEntitlementCheckerinterface {  
    CanPlay(ctxcontext.Context, userID, episodeIDstring) (bool, error)  
}
```
```

ممنوع:

```
Go

```
// shared package  
typeUniversalEntitlementClientinterface { ... }
```
```

---

## 10.4 Errorها باید typed باشند

```
Go

```
varErrEpisodeNotFound=errors.New("episode not found")
```
```

یا بهتر:

```
Go

```
typeAppErrorstruct {  
    Code    string  
    Message string  
    Cause   error  
}
```
```

برای mapping:

```
```
DOMAIN_NOT_FOUND → gRPC NotFound → HTTP 404  
ENTITLEMENT_REQUIRED → gRPC PermissionDenied → HTTP 403  
VALIDATION_FAILED → gRPC InvalidArgument → HTTP 400
```
```

---

## 10.5 Goroutine بدون lifecycle ممنوع

ممنوع:

```
Go

```
gofunc() {  
for {  
      ...  
   }  
}()
```
```

درست:

```
Go

```
g, ctx:=errgroup.WithContext(ctx)  
g.Go(func() error {  
returnworker.Run(ctx)  
})  
returng.Wait()
```
```

---

## 10.6 Validation در لایه ورودی، invariant در domain

Validation:

```
```
email format  
limit <= 100  
required field
```
```

Domain invariant:

```
```
episode cannot be published before media is ready  
premium episode needs entitlement policy  
subscription cannot be active without valid period
```
```

Validation در handler است.  
Invariant در domain است.

---

