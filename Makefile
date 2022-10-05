process: migrate
	@node -r dotenv/config lib/processor.js


serve:
	@npx squid-graphql-server


migrate:
	@npx squid-typeorm-migration apply


migration:
	@npx squid-typeorm-migration generate


build:
	@npm run build


codegen:
	@npx squid-typeorm-codegen


typegen:
	@bash ./scripts/typegen.sh

explore:
	@npx squid-substrate-metadata-explorer --chain wss://kusama-rpc.polkadot.io --archive https://kusama.archive.subsquid.io/graphql --out ./typegen/versions.json


up:
	@docker-compose up -d


down:
	@docker-compose down


.PHONY: process serve start codegen migration migrate up down typegen
