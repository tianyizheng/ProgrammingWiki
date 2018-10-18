# Programming Language Wiki
Serverless function that returns facts about a programming language

## Tell me a language
This is a serverless function built with the serverless framework. It is intended to be deployed to AWS lambda and be triggered with Alexa skill events, such as asking "tell me a language". The function will then find a random entry on Wikipedia's list-of-programming-language page and return its sumary.

### Todo
- [x] Return summary with Wikipedia API
- [x] Deploy to aws Lambda
- [ ] Set-up api endpoint and key
- [x] Integrate with Alexa skill
