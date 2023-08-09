# meta-resumable-upload-api
Meta's Resumable API with Node.JS

## 1. Clone repo and move to the project directory

## 2. Update your credentials in .env
```
PORT=2002
// META GRAPH API AND IT's VERSION
META_API_URI=https://graph.facebook.com/v14.0
// DEVELOPER APP ID
META_APP_ID=xxxxxxx
// WHATSAPP BUSINESS SYSTEM USER's ACCESS TOKEN 
META_ACCESS_TOKEN=xxxxxxx
// BUSINESS ACCOUNT ID
META_BUSINESS_ACC_ID=xxxxxxx
```

## 3. NPM install
```
npm install
```

## 5. Run
```
node index.js
```

## 6. Upload media using resumable upload api, Use Postman or any API explorer
```
curl --location 'http://localhost:2002/uploadMedia' \
--form 'file=@"/path to media"'
```
# Response:
```
{
    "message": "Uploaded!",
    "body": {
        "h": "4:SU1HLTIwMjMwODA4LVdBMDA1Ny5qcGc=:aW1hZ2UvanBlZw==:ARaRZtSxg-sdfsd fsdfsdfs:e:1691919924:1183230345850902:100083655871696:ARb0Rx-OeipQSkQMkMc"
    }
}
```
# This is a request and response 
![Alt text](image.png)

## 7. Create Template
```
curl --location 'http://localhost:2002/createTemplate' \
--header 'Content-Type: application/json' \
--data '{
  "name": "welcome_to_the_demo",
  "language": "en_US",
  "category": "MARKETING",
  "components": [
    {
      "type": "HEADER",
      "format": "IMAGE",
      "example": {
        "header_handle": [
          "4:SU1HLTIwMjMwODA4LVdBMDA1Ny5qcGc=:aW1hZ2UvanBlZw==:ARaRZtSxg-sdfsd fsdfsdfs:e:1691919924:1183230345850902:100083655871696:ARb0Rx-OeipQSkQMkMc"
        ]
      }
    },
    {
      "type": "BODY",
      "text": "Shop now through the end of August and use code 25OFF to get 25% off of all merchandise."
    }
  ]
}'
```
# Response:
```
{
    "message": "Template Created!",
    "body": {
        "id": "1495664324171758",
        "status": "PENDING",
        "category": "MARKETING"
    }
}
```
# This is a request and response 
![Alt text](image.png)
