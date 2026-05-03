provider "aws" {
  region = var.aws_region
}

# VPC
module "vpc" {
  source = "./modules/vpc"
  
  cidr_block = var.vpc_cidr
  environment = var.environment
  project_name = var.project_name
}

# EKS Cluster
module "eks" {
  source = "./modules/eks"
  
  cluster_name = "${var.project_name}-${var.environment}"
  vpc_id = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnet_ids
  environment = var.environment
}

# RDS PostgreSQL
module "rds" {
  source = "./modules/rds"
  
  identifier = "${var.project_name}-${var.environment}-postgres"
  engine = "postgres"
  engine_version = "15.4"
  instance_class = var.rds_instance_class
  allocated_storage = var.rds_allocated_storage
  vpc_id = module.vpc.vpc_id
  subnet_ids = module.vpc.database_subnet_ids
  environment = var.environment
}

# ElastiCache Redis
module "redis" {
  source = "./modules/redis"
  
  cluster_id = "${var.project_name}-${var.environment}-redis"
  node_type = var.redis_node_type
  num_cache_nodes = var.redis_num_nodes
  vpc_id = module.vpc.vpc_id
  subnet_ids = module.vpc.database_subnet_ids
  environment = var.environment
}

# MSK Kafka
module "kafka" {
  source = "./modules/kafka"
  
  cluster_name = "${var.project_name}-${var.environment}-kafka"
  kafka_version = "3.5.0"
  number_of_broker_nodes = var.kafka_broker_count
  vpc_id = module.vpc.vpc_id
  subnet_ids = module.vpc.private_subnet_ids
  environment = var.environment
}

# S3 Bucket
module "s3" {
  source = "./modules/s3"
  
  bucket_name = "${var.project_name}-${var.environment}-storage"
  environment = var.environment
}

# CloudFront CDN
module "cloudfront" {
  source = "./modules/cloudfront"
  
  domain_name = module.s3.bucket_domain_name
  environment = var.environment
}

# Prometheus & Grafana (Kubernetes)
module "monitoring" {
  source = "./modules/monitoring"
  
  cluster_endpoint = module.eks.cluster_endpoint
  environment = var.environment
}
