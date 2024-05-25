# llgchessgame

## Add a .env configurations in the root.

Replace INFURA_PROJECT_ID=*****
CONTRACT_ADDRESS=0x4691f60c894d3f16047824004420542e4674e621

By default, the server will run on port 8050. You can access the application at `http://localhost:8050`.

## API Routes

### Get Contract Balance

Endpoint: `/getBalance`

Method: `GET`

Query Parameter:
- `account`: Ethereum address for which to retrieve the balance
