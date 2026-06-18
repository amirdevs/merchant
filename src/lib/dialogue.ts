import type { Character, Kingdom, Marketplace } from "../data/types";
import type { NpcRelation } from "./reputation";
import { compactBiasText, routeLedger } from "./travel";

export type DialogueAction =
  | "who"
  | "preference"
  | "custom"
  | "relationship"
  | "market-demand"
  | "market-discounts"
  | "route-gossip"
  | "local-law"
  | "risk"
  | "stock"
  | "haggle"
  | "ask-price"
  | "ask-offer"
  | "barter"
  | "goodbye"
  | "topics-personal"
  | "topics-trade"
  | "topics-world"
  | "topics-work"
  | "back"
  | "secret";

export type DialogueNodeId = "root" | "personal" | "trade" | "world" | "work";
export type DialogueEffect = "accept-local-quest";

export type DialogueChoice = {
  id: DialogueAction;
  label: string;
  reply: string;
  tone?: "friendly" | "business" | "warning" | "gossip";
  nextNode?: DialogueNodeId;
  effect?: DialogueEffect;
};

export type DialogueContext = {
  market?: Marketplace;
  markets?: Marketplace[];
  kingdom?: Kingdom;
  relation?: NpcRelation | null;
  day?: number;
};

export function customerIntro(character: Character) {
  return character.dialogue?.who || `${character.name} is ready to trade.`;
}

export function customerPreference(character: Character) {
  return character.dialogue?.preference || "No stated preference.";
}

export function customerPrompt(character: Character) {
  return character.dialogue?.customQuestion || "What are you looking for?";
}

export function customerReply(character: Character) {
  return character.dialogue?.customReply || customerPreference(character);
}

function strongestBias(character: Character, direction: "like" | "dislike") {
  const matches = (character.bias || [])
    .filter((bias) => direction === "like" ? bias.percent > 0 : bias.percent < 0)
    .sort((left, right) => direction === "like" ? right.percent - left.percent : left.percent - right.percent)
    .slice(0, 4);
  if (!matches.length) return direction === "like" ? "I have no special favorite today." : "Nothing stands out as especially unwelcome.";
  return matches.map((bias) => `${bias.tag} ${bias.percent > 0 ? "+" : ""}${bias.percent}%`).join(", ");
}

function relationshipReply(character: Character, relation: NpcRelation | null | undefined) {
  if (!relation || relation.trades === 0 && relation.failedOffers === 0) {
    return `${character.name} does not know your ledger yet. Fair trades will build trust; repeated weak offers will drain patience.`;
  }
  const tradeLine = relation.trades ? `${relation.trades} completed trade${relation.trades === 1 ? "" : "s"}` : "no completed trades";
  const failedLine = relation.failedOffers ? `${relation.failedOffers} recent failed offer${relation.failedOffers === 1 ? "" : "s"}` : "no recent failed offers";
  return `${character.name} remembers ${tradeLine} and ${failedLine}. Trust ${relation.trust}, mood ${relation.mood}, patience ${relation.patience}.`;
}

function secretReply(character: Character, context: DialogueContext) {
  const secrets = context.relation?.secretsUnlocked || [];
  if (secrets.includes("underworld-contact")) return `${character.name} names a discreet intermediary who watches for contraband and forged papers after sunset.`;
  if (secrets.includes("trusted-route")) return `${character.name} shares a favored route: repeat journeys become safer as landmarks, patrols, and reliable stops become familiar.`;
  return `${character.name} is not ready to share anything private yet.`;
}

function routeReply(context: DialogueContext) {
  if (!context.market || !context.markets?.length) return "I have not heard enough about the roads today.";
  const routes = routeLedger(context.market, context.markets).slice(0, 3);
  if (!routes.length) return "No easy roads leave this market.";
  return routes.map((route) => `${route.to.name}: ${route.days} days, ${route.tolls} copper toll, demand ${route.demand}.`).join(" ");
}

function lawReply(context: DialogueContext) {
  const illegal = context.kingdom?.illegalItemTags || [];
  if (!context.kingdom) return "The local laws are unclear from here.";
  if (!illegal.length) return `${context.kingdom.name} has no special contraband tags recorded in your ledger.`;
  return `${context.kingdom.name} watches for ${illegal.slice(0, 6).join(", ")}. Concealment may help, but guards can still ruin a journey.`;
}

function riskReply(context: DialogueContext) {
  const theft = context.market?.theft;
  if (!context.market || !theft) return "This market feels calm enough, though no crowd is perfectly safe.";
  return `${context.market.name} theft risk is ${theft.percent}%. Thieves prefer goods worth up to ${theft.maxLoafValue} loaf value, size ${theft.maxSize} or less, and may take up to ${theft.maxQuantity}. Protect important cargo.`;
}

function stockReply(character: Character) {
  const pools = (character.obtainableItems || []).slice(0, 5);
  const poolText = pools.length ? pools.map((pool) => `${pool.tag} (${pool.quantityMin}-${pool.quantityMax})`).join(", ") : "their stock is unpredictable";
  const visibleStock = character.inventory.length ? `${character.inventory.length} stock stack${character.inventory.length === 1 ? "" : "s"} visible now` : "no visible stock";
  return `${character.name} can usually source ${poolText}; ${visibleStock}.`;
}

function haggleReply(character: Character, relation: NpcRelation | null | undefined) {
  const pressure = relation?.failedOffers ? `You have ${relation.failedOffers} failed offer${relation.failedOffers === 1 ? "" : "s"} in memory, so patience is tighter.` : "No failed offers are weighing on this conversation yet.";
  return `${character.name} is ${character.frugalPercent}% frugal and haggles at ${character.hagglePercent || 0}%. Close offers keep the conversation alive; insulting ones damage trust. ${pressure}`;
}

export function dialogueChoices(character: Character, context: DialogueContext = {}, node: DialogueNodeId = "root"): DialogueChoice[] {
  const marketName = context.market?.name || "this market";
  const day = context.day ? `day ${context.day}` : "today";
  const choices: DialogueChoice[] = [
    {
      id: "who",
      label: "Who are you?",
      reply: customerIntro(character),
      tone: "friendly",
    },
    {
      id: "preference",
      label: "What are you looking for?",
      reply: `${customerPreference(character)} Strong likes: ${strongestBias(character, "like")}`,
      tone: "business",
    },
    {
      id: "custom",
      label: customerPrompt(character),
      reply: customerReply(character),
      tone: "friendly",
    },
    {
      id: "relationship",
      label: "How do you see our trade history?",
      reply: relationshipReply(character, context.relation),
      tone: "business",
    },
    {
      id: "market-demand",
      label: `What sells well in ${marketName}?`,
      reply: `${marketName} demand on ${day}: ${context.market ? compactBiasText(context.market, "demand") : "unknown"}. Your own target goods should follow those tags when possible.`,
      tone: "gossip",
    },
    {
      id: "market-discounts",
      label: "What is cheap here?",
      reply: `${marketName} discounts: ${context.market ? compactBiasText(context.market, "discount") : "unknown"}. Cheap goods here may become profitable on another route.`,
      tone: "gossip",
    },
    {
      id: "route-gossip",
      label: "Any route advice?",
      reply: routeReply(context),
      tone: "gossip",
    },
    {
      id: "local-law",
      label: "What should I hide from guards?",
      reply: lawReply(context),
      tone: "warning",
    },
    {
      id: "risk",
      label: "How dangerous is this market?",
      reply: riskReply(context),
      tone: "warning",
    },
    {
      id: "stock",
      label: "What can you usually source?",
      reply: stockReply(character),
      tone: "business",
    },
    {
      id: "haggle",
      label: "How hard will you bargain?",
      reply: haggleReply(character, context.relation),
      tone: "business",
    },
    {
      id: "ask-price",
      label: "Name your price for those goods.",
      reply: `${character.name} studies what you selected from their stock.`,
      tone: "business",
    },
    {
      id: "ask-offer",
      label: "Make me a counteroffer.",
      reply: `${character.name} looks over your side of the scale.`,
      tone: "business",
    },
    {
      id: "barter",
      label: "Let us trade.",
      reply: `${character.name} turns toward the scales.`,
      tone: "business",
    },
    {
      id: "goodbye",
      label: "Goodbye.",
      reply: `${character.name} nods farewell.`,
      tone: "friendly",
    },
  ];
  if (context.relation?.secretsUnlocked?.length) {
    choices.splice(4, 0, {
      id: "secret",
      label: "You said you trusted me. What are you hiding?",
      reply: secretReply(character, context),
      tone: "gossip",
    });
  }
  const back: DialogueChoice = { id: "back", label: "Back to main topics.", reply: `${character.name} waits for your next question.`, nextNode: "root", tone: "friendly" };
  if (node === "personal") return choices.filter((choice) => ["who", "custom", "relationship", "secret"].includes(choice.id)).concat(back);
  if (node === "trade") return choices.filter((choice) => ["preference", "stock", "haggle", "ask-price", "ask-offer", "barter"].includes(choice.id)).concat(back);
  if (node === "world") return choices.filter((choice) => ["market-demand", "market-discounts", "route-gossip", "local-law", "risk"].includes(choice.id)).concat(back);
  if (node === "work") {
    const workChoices: DialogueChoice[] = [];
    if (context.market?.quest) {
      workChoices.push({
        id: "custom",
        label: `Tell me about ${context.market.quest.name}.`,
        reply: context.market.quest.todo || `${character.name} points you toward the local notice board.`,
        effect: "accept-local-quest",
        tone: "business",
      });
    }
    workChoices.push({
      id: "route-gossip",
      label: "Any paid work or useful rumors?",
      reply: `Check the ${marketName} notice board for timed contracts. ${routeReply(context)}`,
      tone: "gossip",
    });
    return workChoices.concat(back);
  }
  return [
    choices[0],
    choices[2],
    { id: "topics-personal", label: "Let us talk about you.", reply: `${character.name} opens up cautiously.`, nextNode: "personal", tone: "friendly" },
    { id: "topics-trade", label: "Tell me about your trading.", reply: `${character.name} turns the conversation toward goods and prices.`, nextNode: "trade", tone: "business" },
    { id: "topics-world", label: "What is happening in the world?", reply: `${character.name} shares local news and road gossip.`, nextNode: "world", tone: "gossip" },
    { id: "topics-work", label: "Do you know of any work?", reply: `${character.name} considers the notices and rumors around ${marketName}.`, nextNode: "work", tone: "business" },
    ...choices.filter((choice) => ["ask-price", "ask-offer", "barter", "goodbye"].includes(choice.id)),
  ];
}
