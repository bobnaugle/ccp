docker build -t gcr.io/$PROJECT_ID/ccp-batch:v1 .
docker run  --name ccp-batch gcr.io/$PROJECT_ID/ccp-batch:v1
