<?php

enum Artifact: int {
  case Pathfinders_Sandals = 1;
  case Pathfinders_Staff = 2;
  case War_Mask = 3;
  case Treasure_Chest = 4;
  case Ritual_Dagger = 5;

  case Crystal_Earring = 6;
  case Mortar = 7;
  case Serpents_Gold = 8;
  case Serpent_Idol = 9;
  case Monkey_Medallion = 10;

  case Idol_of_AraAnu = 11;
  case Inscribed_Blade = 12;
  case Guardians_Ocarina = 13;
  case Tigerclaw_Hairpin = 14;
  case War_Club = 15;

  case Sundial = 16;
  case Traders_Scales = 17;
  case Hunting_Arrows = 18;
  case Coconut_Flask = 19;
  case Cleansing_Cauldron = 20;

  case Ancient_Wine = 21;
  case Decorated_Horn = 22;
  case Ornate_Hammer = 23;
  case Star_Charts = 24;
  case Stone_Jar = 25;

  case Passage_Shell = 26;
  case Ceremonial_Rattle = 27;
  case Sacred_Drum = 28;
  case Traders_Coins = 29;
  case Stone_Key = 30;

  case Obsidian_Earring = 31;
  case Guiding_Stone = 32;
  case Guiding_Skull = 33;
  case Runes_of_the_Dead = 34;
  case Guardians_Crown = 35;

  public function type() {
    return "art";
  }
}

enum Item: int {
  case Sea_Turtle = 1;
  case Ostrich = 2;
  case Pack_Donkey = 3;
  case Horse = 4;
  case Steam_Boat = 5;

  case Automobile = 6;
  case Sturdy_Boots = 7;
  case Gold_Pan = 8;
  case Trowel = 9;
  case Pickaxe = 10;

  case Hot_Air_Balloon = 11;
  case Aeroplane = 12;
  case Journal = 13;
  case Parrot = 14;
  case Watch = 15;

  case Army_Knife = 16;
  case Binoculars = 17;
  case Tent = 18;
  case Fishing_Rod = 19;
  case Precision_Compass = 20;

  case Bow_and_Arrows = 21;
  case Carrier_Pigeon = 22;
  case Whip = 23;
  case Rough_Map = 24;
  case Airdrop = 25;

  case Flask = 26;
  case Machete = 27;
  case Torch = 28;
  case Large_Backpack = 29;
  case Rope = 30;

  case Revolver = 31;
  case Hat = 32;
  case Bear_Trap = 33;
  case Grappling_Hook = 34;
  case Lantern = 35;

  case Dog = 36;
  case Brush = 37;
  case Axe = 38;
  case Chronometer = 39;
  case Theodolite = 40;

  public function type() {
    return "item";
  }
}

enum Basic: string {
  case Funding_Car = "fundcar";
  case Funding_Ship = "fundship";
  case Explore_Car = "explorecar";
  case Explore_Ship = "exploreship";
  case Fear = "fear";

  public function type() {
    return "basic";
  }
}

enum Effect: string {
  case War_Mask = "war-mask";
  case Guardians_Ocarina = "guardians-ocarina";
}

class GameData {
  public function __construct($game) {
    $this->game = $game;
    $this->material = &$this->game->material;
  }

  public function mergedMaterial() {
    $merged = [
      "cards" => $this->material["cards"],
      "assistants" => $this->material["assistants"],
      "research" => $this->research(),
      "travelCost" => $this->travelCost(),
      "sites" => $this->material["sites"],
      "guardians" => $this->material["guardians"]
    ];
    return $merged;
  }

  private function card($card) {
    return $this->material["cards"][$card->type()][$card->value];
  }

  public function cardName($card) {
    return $this->card($card)["name"];
  }

  public function cardCost($card) {
    return $this->card($card)["cost"];
  }

  public function cardTravel($card) {
    return $this->card($card)["travel"];
  }

  public function cardPoints($card) {
    return $this->card($card)["points"];
  }

  public function cardExileItself($card) {
    if ($card->type() == "item") {
      return $this->card($card)["exileItself"];
    }
    else {
      return false;
    }
  }

  public function cardAction($card) {
    if ($card->type() == "item" || $card->type() == "basic") {
      return $this->card($card)["action"];
    }
    else {
      return "complex";
    }
  }

  public function cardVarname($card) {
    return $this->card($card)["varname"];
  }

  public function assistantPower($num, $gold) {
    return $this->material["assistants"][$num][$gold?"gold":"silver"];
  }

  private function travelCost() {
    return $this->game->birdTemple() ? $this->material["travelCost"]["bird"] : $this->material["travelCost"]["snake"];
  }

  public function siteTravelCost($no, $slot) {
    return $this->travelCost()[$no][$slot];
  }

  public function guardianCost($num) {
    return $this->material["guardians"][$num]["cost"];
  }

  public function guardianBoon($num) {
    return $this->material["guardians"][$num]["boon"];
  }

  public function siteEffects($size, $num) {
    return $this->material["sites"][$size][$num];
  }

  private function research() {
    return $this->game->birdTemple() ? $this->material["research"]["bird"] : $this->material["research"]["snake"];
  }

  public function researchCost($to) {
    return $this->research()["squares"][$to]["cost"];
  }

  public function researchPossibilities($from) {
    return $this->research()["squares"][$from]["possibilities"];
  }

  public function researchStep($spaceId) {
    return $this->research()["squares"][$spaceId]["step"];
  }

  public function stepPoints($book, $step, $rank = NULL) {
    if ($step < 8) {
      return $this->research()["steps"][$step][$book?"book":"glass"]["points"];
    }
    else {
      return $this->research()["lastSteps"][$rank];
    }
  }

  public function researchBonus($step, $book) {
    return $this->research()["steps"][$step][$book?"book":"glass"]["bonus"];
  }

  public function templeTileCost($id) {
    return $this->research()["tiles"][$id]["cost"];
  }

  public function templeTileColor($id) {
    return $this->research()["tiles"][$id]["color"];
  }

  public function templeTilePoints($id) {
    return $this->research()["tiles"][$id]["points"];
  }
}

?>