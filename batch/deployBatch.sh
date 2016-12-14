
PROJECT_ID=valiant-metric-152315
gcloud docker -- push gcr.io/$PROJECT_ID/ccp-batch:v2

kubectl delete deployments/ccp-batch
kubectl delete services/ccp-batch
kubectl run ccp-batch  --image=gcr.io/$PROJECT_ID/ccp-batch:v2 --port=8080

kubectl expose deployment ccp-batch --type="LoadBalancer" --port=8080
