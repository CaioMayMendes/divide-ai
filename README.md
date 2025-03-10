Esse é o Projeto do Divide-Ai uma aplicação integrada com IA para divisão de contas com detecção de voz e IA generativa. 
Feito inteiramente em Next

## Começando:

Crie uma conta no CloudFlare com acesso as Workers IA (É Free):
https://developers.cloudflare.com/workers-ai/

E crie um arquivo .env no seu projeto com as seguintes variveis:
```bash
AI_API_URL_VOICE="https://api.cloudflare.com/client/v4/accounts/ID_DA_SUA_CONTA/ai/run/@cf/openai/whisper"
AI_API_URL_IA="https://api.cloudflare.com/client/v4/accounts/ID_DA_SUA_CONTA/ai/run/@cf/meta/llama-3-8b-instruct"
AI_API_KEY=SUA_API_KEY
```
Preenchendo os campos ID_DA_SUA_CONTA com o id da sua conta e SUA_API_KEY com a API gerada para os Workers IA.

## Inicie o projeto:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abra o link no seu Browser local [http://localhost:3000](http://localhost:3000) para ver o projeto.
