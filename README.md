# Meta's Resumable Upload API
Meta's Resumable API with Node.JS

## 1. Clone the repo and move it to the project directory

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

## 6. Upload media using resumable upload API
Use Postman or any API explorer, Select your media file for upload
```
curl --location 'http://localhost:2002/uploadMedia' \
--form 'file=@"/path to media"'
```
#### Response:
```
{
    "message": "Uploaded!",
    "body": {
        "h": "4:SU1HLTIwMjMwODA4LVdBMDA1Ny5qcGc=:aW1hZ2UvanBlZw==:ARaRZtSxg-sdfsd fsdfsdfs:e:1691919924:1183230345850902:100083655871696:ARb0Rx-OeipQSkQMkMc"
    }
}
```
#### This is a request and response 
![259396102-b6c518a5-3245-4bd5-9363-f3af318e6804](https://github.com/turivishal/meta-resumable-upload-api/assets/10988772/312fb5bf-9060-4e97-8d09-eb7c2eda3fe4)

## 7. Create Template
Put the uploaded media code in `header_handle` from the above API's response
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
#### Response:
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
#### This is a request and response 
![259397683-c36d9cce-9fc8-4840-bcfc-b13287ed33dd](https://github.com/turivishal/meta-resumable-upload-api/assets/10988772/e4d95e61-89d5-4c8b-a4d9-e369dca62169)
