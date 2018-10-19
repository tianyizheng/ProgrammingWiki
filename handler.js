"use strict";
var summary = require("./index.js");
const stopIntents = [
  "AMAZON.NoIntent",
  "AMAZON.StopIntent",
  "AMAZON.CancelIntent"
];

const onStart = () => {
  console.log("Session Started");
};

const onLaunch = () => {
  return buildResponse(
    "Welcome. I can tell you about a random programming language. Just ask tell me a language",
    "welcome",
    "I can tell you about a random programming language. Just ask tell me a language",
    false
  );
};

const onIntent = async event => {
  var intentName = event.request.intent.name;
  if (stopIntents.includes(intentName)) {
    return buildResponse("Okay. Bye!", "Bye bye", "bye", true);
  } else if (intentName == "languageSummary") {
    let result = await summary();
    var name = result[0] + ". ";
    var abstract = result[1];
    return buildResponse(
      "I can tell you about " + name + abstract,
      name,
      abstract,
      false
    );
  } else if (intentName == "AMAZON.HelpIntent") {
    return buildResponse(
      "You can say: tell me about a language.",
      "You can say",
      "tell me about a language.",
      false
    );
  } else if (intentName == "AMAZON.FallbackIntent") {
    return buildResponse(
      "Sorry I can't help you with that.",
      "Sorry",
      "I can't help you with that.",
      false
    );
  } else {
    return buildResponse(
      "Sorry I can't help you with that.",
      "Sorry",
      "I can't help you with that.",
      false
    );
  }
};

const onEnd = function() {
  console.log("Session Ended");
};

const buildResponse = function(
  output_speech,
  card_title,
  card_content,
  reprompt,
  end
) {
  return {
    version: "1.0",
    response: {
      outputSpeech: {
        type: "PlainText",
        text: output_speech
      },
      card: {
        type: "Simple",
        title: card_title,
        content: card_content
      },
      shouldEndSession: end
    }
  };
};

module.exports.hello = async (event, context, callback) => {
  if (event.session.new) {
    onStart();
  }
  var intent = event.request.type;
  if (intent == "LaunchRequest") {
    callback(null, onLaunch());
  } else if (intent == "IntentRequest") {
    callback(null, await onIntent(event));
  } else if (intent == "SessionEndedRequest") {
    callback(null, onEnd());
  }
};
