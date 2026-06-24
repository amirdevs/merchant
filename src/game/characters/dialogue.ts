import type { Character, Kingdom, Marketplace } from "@/shared/types/game-data";
import { characterProfileView } from "@/game/characters/characterPortraitManifest";
import type { CharacterProfileView } from "@/game/characters/characterProfileShared";
import type { NpcRelation } from "@/game/characters/reputation";
import { compactBiasText, routeLedger } from "@/game/travel/travel";

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

function viewFor(character: Character): CharacterProfileView {
  return characterProfileView(character);
}

export function customerIntro(character: Character) {
  const view = viewFor(character);
  return `${view.name} steps up to the counter. ${view.marketFlavor}`;
}

export function customerPreference(character: Character) {
  const view = viewFor(character);
  return view.tradePersonality || "They bargain by instinct and watch your ledger closely.";
}

export function customerPrompt(character: Character) {
  const view = viewFor(character);
  if (view.roleTags.length) return `Ask about ${view.roleTags[0].replace(/[-_]/g, " ")}.`;
  return character.dialogue?.customQuestion || "What is your place in this market?";
}

export function customerReply(character: Character) {
  return character.dialogue?.customReply || viewFor(character).story;
}

export function customerDisplayName(character: Character) {
  return viewFor(character).name;
}

function displayName(character: Character) {
  return customerDisplayName(character);
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
  const name = displayName(character);
  if (!relation || relation.trades === 0 && relation.failedOffers === 0) {
    return `${name} does not know your ledger yet. Fair trades will build trust; repeated weak offers will drain patience.`;
  }
  const tradeLine = relation.trades ? `${relation.trades} completed trade${relation.trades === 1 ? "" : "s"}` : "no completed trades";
  const failedLine = relation.failedOffers ? `${relation.failedOffers} recent failed offer${relation.failedOffers === 1 ? "" : "s"}` : "no recent failed offers";
  return `${name} remembers ${tradeLine} and ${failedLine}. Trust ${relation.trust}, mood ${relation.mood}, patience ${relation.patience}.`;
}

function secretReply(character: Character, context: DialogueContext) {
  const name = displayName(character);
  if (context.relation?.secretsUnlocked?.includes("underworld-contact")) return `${name} names a discreet intermediary who watches for contraband and forged papers after sunset.`;
  if (context.relation?.secretsUnlocked?.includes("trusted-route")) return `${name} shares a favored route: repeat journeys become safer as landmarks, patrols, and reliable stops become familiar.`;
  return `${name} is not ready to share anything private yet.`;
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
  const name = displayName(character);
  const pools = (character.obtainableItems || []).slice(0, 5);
  const poolText = pools.length ? pools.map((pool) => `${pool.tag} (${pool.quantityMin}-${pool.quantityMax})`).join(", ") : "their stock is unpredictable";
  const visibleStock = character.inventory.length ? `${character.inventory.length} stock stack${character.inventory.length === 1 ? "" : "s"} visible now` : "no visible stock";
  return `${name} can usually source ${poolText}; ${visibleStock}.`;
}

function haggleReply(character: Character, relation: NpcRelation | null | undefined) {
  const name = displayName(character);
  const pressure = relation?.failedOffers ? `You have ${relation.failedOffers} failed offer${relation.failedOffers === 1 ? "" : "s"} in memory, so patience is tighter.` : "No failed offers are weighing on this conversation yet.";
  return `${name} is ${character.frugalPercent}% frugal and haggles at ${character.hagglePercent || 0}%. Close offers keep the conversation alive; insulting ones damage trust. ${pressure}`;
}

export function dialogueChoices(character: Character, context: DialogueContext = {}, node: DialogueNodeId = "root"): DialogueChoice[] {
  const marketName = context.market?.name || "this market";
  const day = context.day ? `day ${context.day}` : "today";
  const name = displayName(character);
  const choices: DialogueChoice[] = [
    {
      id: "who",
      label: "Who are you?",
      reply: customerIntro(character),
      tone: "friendly",
    },
    {
      id: "preference",
      label: "What kind of trade do you favor?",
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
      reply: `${name} studies what you selected from their stock.`,
      tone: "business",
    },
    {
      id: "ask-offer",
      label: "Make me a counteroffer.",
      reply: `${name} looks over your side of the scale.`,
      tone: "business",
    },
    {
      id: "barter",
      label: "Let us trade.",
      reply: `${name} turns toward the scales.`,
      tone: "business",
    },
  ];

  const branchChoices: Record<DialogueNodeId, DialogueChoice[]> = {
    root: [
      { id: "topics-personal", label: "Personal matters", reply: `${name} gives you their attention.`, nextNode: "personal" },
      { id: "topics-trade", label: "Trade talk", reply: `${name} taps the ledger beside the scale.`, nextNode: "trade" },
      { id: "topics-world", label: "World and roads", reply: `${name} lowers their voice and glances toward the street.`, nextNode: "world" },
      { id: "topics-work", label: "Work and contracts", reply: `${name} considers what kind of work you can handle.`, nextNode: "work" },
      ...choices.slice(0, 3),
      choices[13],
    ],
    personal: [
      choices[0],
      choices[2],
      choices[3],
      { id: "secret", label: "Any private opportunities?", reply: secretReply(character, context), tone: "gossip" },
      { id: "back", label: "Back to main topics", reply: `${name} returns to the trade at hand.`, nextNode: "root" },
    ],
    trade: [
      choices[1],
      choices[8],
      choices[9],
      choices[10],
      choices[11],
      choices[12],
      choices[13],
      { id: "back", label: "Back to main topics", reply: `${name} closes that line of bargaining for now.`, nextNode: "root" },
    ],
    world: [
      choices[4],
      choices[5],
      choices[6],
      choices[7],
      { id: "secret", label: "Any rumors off the ledger?", reply: secretReply(character, context), tone: "gossip" },
      { id: "back", label: "Back to main topics", reply: `${name} lets the market noise cover the rest.`, nextNode: "root" },
    ],
    work: [
      choices[8],
      choices[9],
      choices[10],
      { id: "secret", label: "Any special work?", reply: secretReply(character, context), tone: "gossip" },
      { id: "back", label: "Back to main topics", reply: `${name} waits for your next offer.`, nextNode: "root" },
    ],
  };

  return branchChoices[node] || branchChoices.root;
}
