# 14\. ساختار `infra/terraform`

```
```
infra/terraform/  
├── modules/  
│   ├── vpc/  
│   │   ├── main.tf  
│   │   ├── variables.tf  
│   │   ├── outputs.tf  
│   │   └── README.md  
│   │  
│   ├── eks/  
│   ├── rds-postgres/  
│   ├── redis/  
│   ├── kafka/  
│   ├── s3/  
│   ├── cloudfront/  
│   ├── waf/  
│   ├── route53/  
│   ├── observability/  
│   ├── secrets-manager/  
│   └── iam/  
│  
├── environments/  
│   ├── dev/  
│   │   ├── main.tf  
│   │   ├── backend.tf  
│   │   ├── providers.tf  
│   │   ├── variables.tf  
│   │   └── terraform.tfvars  
│   │  
│   ├── staging/  
│   └── prod/  
│  
└── README.md
```
```

## قانون مهم

-   `modules/` reusable باشد.
    
-   `environments/` فقط wiring و config محیطی باشد.
    
-   secret در tfvars نباشد.
    
-   state remote باشد.
    
-   production و staging از یک module یکسان استفاده کنند.
    

---

