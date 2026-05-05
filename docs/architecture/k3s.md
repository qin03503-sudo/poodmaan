# Running Poodmaan On k3s

This is a minimal local k3s setup for Phase 0. It runs the same services as `docker-compose.yml`: PostgreSQL, MinIO, Creator Studio, and the listener web app.

The manifests are in `k8s/` and are intentionally simple for learning Kubernetes.

## What You Get

- Namespace: `poodmaan`
- PostgreSQL with a PVC
- MinIO with a PVC
- Creator Studio on `studio.poodmaan.local`
- Listener web app on `web.poodmaan.local`
- Listener web app direct NodePort on `http://localhost:30080`
- Creator Studio direct NodePort on `http://localhost:30081`
- MinIO API on `http://localhost:30900`
- MinIO console on `http://localhost:30901`

## 1. Stop Docker Compose

```bash
docker compose down
```

This stops the old compose containers so ports do not conflict.

If your machine uses the old standalone compose command, use `docker-compose down` instead.

## 2. Check k3s

```bash
sudo k3s kubectl get nodes
```

If this works, Kubernetes is ready.

If the service is installed but stopped:

```bash
sudo systemctl start k3s
```

On SELinux systems, if k3s fails with `Permission denied` for `/usr/local/bin/k3s`, check the label:

```bash
ls -Z /usr/local/bin/k3s
```

If it shows `user_tmp_t`, relabel the binary and start k3s again:

```bash
sudo chcon -t bin_t /usr/local/bin/k3s
sudo systemctl start k3s
```

For shorter commands in your shell, you can run:

```bash
alias kubectl='sudo k3s kubectl'
```

## 3. Build The Local Image

k3s uses containerd, not the normal Docker image store. Build the image, save it, then import it into k3s:

```bash
docker build -t poodmaan:dev .
docker save poodmaan:dev | sudo k3s ctr images import -
```

The Kubernetes manifests use `imagePullPolicy: Never`, so k3s will use this local image and will not try to pull it from Docker Hub.

If your k3s node cannot pull required public images, import them too:

```bash
docker pull rancher/mirrored-pause:3.6
docker pull rancher/mirrored-library-busybox:1.37.0
docker pull postgres:15-alpine
docker pull minio/minio:latest
docker save rancher/mirrored-pause:3.6 rancher/mirrored-library-busybox:1.37.0 postgres:15-alpine minio/minio:latest | sudo k3s ctr images import -
```

## 4. Start The App

```bash
sudo k3s kubectl apply -k k8s
```

Watch pods starting:

```bash
sudo k3s kubectl get pods -n poodmaan -w
```

When the pods show `Running`, check services and ingress:

```bash
sudo k3s kubectl get svc -n poodmaan
sudo k3s kubectl get ingress -n poodmaan
```

## 5. Add Local Hostnames

k3s usually includes Traefik ingress by default. Add these names to your local hosts file:

```bash
sudo sh -c 'printf "127.0.0.1 web.poodmaan.local studio.poodmaan.local\n" >> /etc/hosts'
```

Open:

- Listener app direct: `http://localhost:30080`
- Creator Studio direct: `http://localhost:30081`
- Creator API health direct: `http://localhost:30081/api/health`
- Listener app: `http://web.poodmaan.local`
- Creator Studio: `http://studio.poodmaan.local`
- Creator API health: `http://studio.poodmaan.local/api/health`
- MinIO console: `http://localhost:30901` with `minioadmin` / `minioadmin`

If the `.local` ingress URLs do not open, use the direct NodePort URLs above. Some k3s installs expose Traefik on a random NodePort instead of binding directly to local port 80.

## Useful Commands

See all resources:

```bash
sudo k3s kubectl get all -n poodmaan
```

Read logs:

```bash
sudo k3s kubectl logs -n poodmaan deploy/web -f
sudo k3s kubectl logs -n poodmaan deploy/creator-studio -f
sudo k3s kubectl logs -n poodmaan deploy/postgres -f
sudo k3s kubectl logs -n poodmaan deploy/minio -f
```

Restart app pods after importing a new image:

```bash
sudo k3s kubectl rollout restart deployment/web deployment/creator-studio -n poodmaan
```

Open services without ingress:

```bash
sudo k3s kubectl port-forward -n poodmaan svc/web 3000:3000
sudo k3s kubectl port-forward -n poodmaan svc/creator-studio 3001:3001
```

Then open `http://localhost:3000` and `http://localhost:3001`.

## Updating Code

This minimal setup bakes source code into the image. After code changes, rebuild and restart:

```bash
docker build -t poodmaan:dev .
docker save poodmaan:dev | sudo k3s ctr images import -
sudo k3s kubectl rollout restart deployment/web deployment/creator-studio -n poodmaan
```

## Reset Everything

Delete all app resources:

```bash
sudo k3s kubectl delete -k k8s
```

Delete stored PostgreSQL and MinIO data too:

```bash
sudo k3s kubectl delete pvc -n poodmaan postgres-data minio-data
```

## About nginx Ingress

The included `k8s/ingress.yaml` works with the default k3s Traefik ingress. This is the simplest option for a beginner.

If you specifically want nginx ingress, install k3s without Traefik or disable Traefik first, then install the nginx ingress controller and add `ingressClassName: nginx` to `k8s/ingress.yaml`.

For now, Traefik keeps the setup smaller and avoids replacing parts of your existing k3s installation.
