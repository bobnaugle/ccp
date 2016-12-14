docker build -t gcr.io/$PROJECT_ID/ccp:v1 .

gcloud docker -- push gcr.io/$PROJECT_ID/ccp:v1 
kubectl delete deployments/ccp
kubectl delete services/ccp
kubectl run ccp  --image=gcr.io/$PROJECT_ID/ccp:v1 --port=8081 --image-pull-policy=Always

kubectl expose deployment ccp --type="LoadBalancer" --port=8081

