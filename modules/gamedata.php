<?php

enum Artefact: int {
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

  private function data(): array {
    return match($this) {
      Artefact::Pathfinders_Sandals => array(3, 1, [PLANE],       clienttranslate("Pathfinder's Sandals")),
      Artefact::Pathfinders_Staff =>   array(4, 1, [PLANE],       clienttranslate("Pathfinder's Staff")), 
      Artefact::War_Mask =>            array(3, 1, [PLANE],       clienttranslate("War Mask")), 
      Artefact::Treasure_Chest =>      array(4, 3, [PLANE],       clienttranslate("Treasure Chest")), 
      Artefact::Ritual_Dagger =>       array(4, 2, [PLANE],       clienttranslate("Ritual Dagger")), 

      Artefact::Crystal_Earring =>     array(4, 2, [PLANE],       clienttranslate("Crystal Earring")),
      Artefact::Mortar =>              array(3, 1, [PLANE],       clienttranslate("Mortar")),
      Artefact::Serpents_Gold =>       array(3, 2, [PLANE],       clienttranslate("Serpent's Gold")),
      Artefact::Serpent_Idol =>        array(2, 1, [PLANE],       clienttranslate("Serpent Idol")),
      Artefact::Monkey_Medallion =>    array(4, 2, [PLANE],       clienttranslate("Monkey Medallion")),

      Artefact::Idol_of_AraAnu =>      array(3, 1, [PLANE],       clienttranslate("Idol of Ara-Anu")),
      Artefact::Inscribed_Blade =>     array(2, 1, [PLANE],       clienttranslate("Inscribed Blade")),
      Artefact::Guardians_Ocarina =>   array(4, 2, [PLANE,PLANE], clienttranslate("Guardian's Ocarina")),
      Artefact::Tigerclaw_Hairpin =>   array(4, 2, [PLANE],       clienttranslate("Tigerclaw Hairpin")),
      Artefact::War_Club =>            array(4, 1, [PLANE],       clienttranslate("War Club")),

      Artefact::Sundial =>             array(2, 1, [PLANE],       clienttranslate("Sundial")),
      Artefact::Traders_Scales =>      array(4, 2, [PLANE],       clienttranslate("Traders' Scales")),
      Artefact::Hunting_Arrows =>      array(4, 1, [PLANE],       clienttranslate("Hunting Arrows")),
      Artefact::Coconut_Flask =>       array(3, 2, [PLANE],       clienttranslate("Coconut Flask")),
      Artefact::Cleansing_Cauldron =>  array(3, 1, [PLANE],       clienttranslate("Cleansing Cauldron")),

      Artefact::Ancient_Wine =>        array(3, 1, [PLANE],       clienttranslate("Ancient Wine")),
      Artefact::Decorated_Horn =>      array(2, 1, [PLANE],       clienttranslate("Decorated Horn")),
      Artefact::Ornate_Hammer =>       array(4, 2, [PLANE],       clienttranslate("Ornate Hammer")),
      Artefact::Star_Charts =>         array(4, 2, [PLANE],       clienttranslate("Star Charts")),
      Artefact::Stone_Jar =>           array(2, 1, [PLANE],       clienttranslate("Stone Jar")),

      Artefact::Passage_Shell =>       array(3, 1, [PLANE],       clienttranslate("Passage Shell")),
      Artefact::Ceremonial_Rattle =>   array(3, 2, [PLANE],       clienttranslate("Ceremonial Rattle")),
      Artefact::Sacred_Drum =>         array(4, 1, [PLANE],       clienttranslate("Sacred Drum")),
      Artefact::Traders_Coins =>       array(3, 1, [PLANE],       clienttranslate("Trader's Coins")),
      Artefact::Stone_Key =>           array(3, 2, [PLANE],       clienttranslate("Stone Key")),

      Artefact::Obsidian_Earring =>    array(4, 2, [PLANE],       clienttranslate("Obsidian Earring")),
      Artefact::Guiding_Stone =>       array(3, 1, [PLANE],       clienttranslate("Guiding Stone")),
      Artefact::Guiding_Skull =>       array(4, 1, [PLANE],       clienttranslate("Guiding Skull")),
      Artefact::Runes_of_the_Dead =>   array(4, 1, [PLANE],       clienttranslate("Runes of the Dead")),
      Artefact::Guardians_Crown =>     array(4, 2, [PLANE],       clienttranslate("Guardian's Crown"))
    };
  }

  public function cost(): int {
    return $this->data($this)[0];
  }

  public function points(): int {
    return $this->data($this)[1];
  }

  public function travel(): array {
    return $this->data($this)[2];
  }

  public function name(): string {
    return $this->data($this)[3];
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

  private function data(): array {
    return match($this) {
      Item::Sea_Turtle =>        array(3, 1, [SHIP, SHIP],   clienttranslate("Sea Turtle")),
      Item::Ostrich =>           array(3, 1, [CAR, CAR],     clienttranslate("Ostrich")),
      Item::Pack_Donkey =>       array(4, 1, [CAR, CAR],     clienttranslate("Pack Donkey")),
      Item::Horse =>             array(4, 1, [CAR, CAR],     clienttranslate("Horse")),
      Item::Steam_Boat =>        array(3, 3, [SHIP, SHIP],   clienttranslate("Steam Boat")),

      Item::Automobile =>        array(3, 3, [CAR, CAR],     clienttranslate("Automobile")),
      Item::Sturdy_Boots =>      array(1, 1, [CAR, CAR],     clienttranslate("Sturdy Boots")),
      Item::Gold_Pan =>          array(1, 1, [SHIP, SHIP],   clienttranslate("Gold Pan")),
      Item::Trowel =>            array(1, 1, [CAR],          clienttranslate("Trowel")),
      Item::Pickaxe =>           array(1, 1, [CAR],          clienttranslate("Pickaxe")),

      Item::Hot_Air_Balloon =>   array(2, 1, [PLANE],        clienttranslate("Hot Air Balloon")),
      Item::Aeroplane =>         array(4, 3, [PLANE, PLANE], clienttranslate("Aeroplane")),
      Item::Journal =>           array(3, 1, [CAR, SHIP],    clienttranslate("Journal")),
      Item::Parrot =>            array(2, 2, [SHIP],         clienttranslate("Parrot")),
      Item::Watch =>             array(1, 1, [SHIP],         clienttranslate("Watch")),

      Item::Army_Knife =>        array(3, 1, [CAR, SHIP],    clienttranslate("Army Knife")),
      Item::Binoculars =>        array(4, 1, [SHIP],         clienttranslate("Binoculars")),
      Item::Tent =>              array(4, 2, [CAR],          clienttranslate("Tent")),
      Item::Fishing_Rod =>       array(2, 2, [SHIP],         clienttranslate("Fishing Rod")),
      Item::Precision_Compass => array(4, 1, [SHIP],         clienttranslate("Precision Compass")),

      Item::Bow_and_Arrows =>    array(2, 2, [CAR],          clienttranslate("Bow and Arrows")),
      Item::Carrier_Pigeon =>    array(2, 1, [SHIP],         clienttranslate("Carrier Pigeon")),
      Item::Whip =>              array(2, 1, [CAR],          clienttranslate("Whip")),
      Item::Rough_Map =>         array(1, 1, [SHIP],         clienttranslate("Rough Map")),
      Item::Airdrop =>           array(2, 1, [PLANE],        clienttranslate("Airdrop")),

      Item::Flask =>             array(2, 1, [SHIP],         clienttranslate("Flask")),
      Item::Machete =>           array(4, 1, [CAR],          clienttranslate("Machete")),
      Item::Torch =>             array(2, 2, [SHIP],         clienttranslate("Torch")),
      Item::Large_Backpack =>    array(3, 1, [CAR],          clienttranslate("Large Backpack")),
      Item::Rope =>              array(2, 1, [SHIP],         clienttranslate("Rope")),

      Item::Revolver =>          array(4, 1, [SHIP, SHIP],   clienttranslate("Revolver")),
      Item::Hat =>               array(1, 1, [SHIP],         clienttranslate("Hat")),
      Item::Bear_Trap =>         array(2, 1, [CAR],          clienttranslate("Bear Trap")),
      Item::Grappling_Hook =>    array(2, 2, [CAR],          clienttranslate("Grappling Hook")),
      Item::Lantern =>           array(3, 2, [CAR],          clienttranslate("Lantern")),

      Item::Dog =>               array(3, 1, [CAR],          clienttranslate("Dog")),
      Item::Brush =>             array(3, 3, [CAR],          clienttranslate("Brush")),
      Item::Axe =>               array(2, 2, [SHIP],         clienttranslate("Axe")),
      Item::Chronometer =>       array(3, 2, [SHIP, SHIP],   clienttranslate("Chronometer")),
      Item::Theodolite =>        array(3, 1, [SHIP],         clienttranslate("Theodolite"))
    };
  }

  public function cost(): int {
    return $this->data($this)[0];
  }

  public function points(): int {
    return $this->data($this)[1];
  }

  public function travel(): array {
    return $this->data($this)[2];
  }

  public function name(): string {
    return $this->data($this)[3];
  }

}

enum Basic: int {
  case Funding_Car = 1;
  case Funding_Ship = 2;
  case Explore_Car = 3;
  case Explore_Ship = 4;
  case Fear = 5;

  private function data(): array {
    return match($this) {
      Funding_Car =>  array(0,  [CAR],  clienttranslate("Funding")),
      Funding_Ship => array(0,  [SHIP], clienttranslate("Funding")),
      Explore_Car =>  array(0,  [CAR],  clienttranslate("Exploration")),
      Explore_Ship => array(0,  [SHIP], clienttranslate("Exploration")),
      Fear =>         array(-1, [BOOT], clienttranslate("Fear"))
    };
  }

  public function points(): int {
    return $this->data($this)[0];
  }

  public function travel(): array {
    return $this->data($this)[1];
  }

  public function name(): string {
    return $this->data($this)[2];
  }
}

function cardName($type, $no) {
  $basicNames = array(
    "fundship" => clienttranslate("Funding"),
    "fundcar" => clienttranslate("Funding"), 
    "exploreship" => clienttranslate("Exploration"), 
    "explorecar" => clienttranslate("Exploration"),
    "fear" => clienttranslate("Fear")
  );
  if (array_key_exists($type, $basicNames)) {
    return $basicNames[$type];
  }

  if ($type == "art") {
    return ["",
    clienttranslate("Pathfinder's Sandals"),
    clienttranslate("Pathfinder's Staff"),
    clienttranslate("War Mask"),
    clienttranslate("Treasure Chest"),
    clienttranslate("Ritual Dagger"),

    clienttranslate("Crystal Earring"),
    clienttranslate("Mortar"),
    clienttranslate("Serpent's Gold"),
    clienttranslate("Serpent Idol"),
    clienttranslate("Monkey Medallion"),

    clienttranslate("Idol of Ara-Anu"),
    clienttranslate("Inscribed Blade"),
    clienttranslate("Guardian's Ocarina"),
    clienttranslate("Tigerclaw Hairpin"),
    clienttranslate("War Club"),

    clienttranslate("Sundial"),
    clienttranslate("Traders' Scales"),
    clienttranslate("Hunting Arrows"),
    clienttranslate("Coconut Flask"),
    clienttranslate("Cleansing Cauldron"),

    clienttranslate("Ancient Wine"),
    clienttranslate("Decorated Horn"),
    clienttranslate("Ornate Hammer"),
    clienttranslate("Star Charts"),
    clienttranslate("Stone Jar"),

    clienttranslate("Passage Shell"),
    clienttranslate("Ceremonial Rattle"),
    clienttranslate("Sacred Drum"),
    clienttranslate("Trader's Coins"),
    clienttranslate("Stone Key"),

    clienttranslate("Obsidian Earring"),
    clienttranslate("Guiding Stone"),
    clienttranslate("Guiding Skull"),
    clienttranslate("Runes of the Dead"),
    clienttranslate("Guardian's Crown")

    ][$no];
  }
  if ($type == "item") {
    return ["",
    clienttranslate("Sea Turtle"),
    clienttranslate("Ostrich"),
    clienttranslate("Pack Donkey"),
    clienttranslate("Horse"),
    clienttranslate("Steam Boat"),

    clienttranslate("Automobile"),
    clienttranslate("Sturdy Boots"),
    clienttranslate("Gold Pan"),
    clienttranslate("Trowel"),
    clienttranslate("Pickaxe"),

    clienttranslate("Hot Air Balloon"),
    clienttranslate("Aeroplane"),
    clienttranslate("Journal"),
    clienttranslate("Parrot"),
    clienttranslate("Watch"),

    clienttranslate("Army Knife"),
    clienttranslate("Binoculars"),
    clienttranslate("Tent"),
    clienttranslate("Fishing Rod"),
    clienttranslate("Precision Compass"),

    clienttranslate("Bow and Arrows"),
    clienttranslate("Carrier Pigeon"),
    clienttranslate("Whip"),
    clienttranslate("Rough Map"),
    clienttranslate("Airdrop"),

    clienttranslate("Flask"),
    clienttranslate("Machete"),
    clienttranslate("Torch"),
    clienttranslate("Large Backpack"),
    clienttranslate("Rope"),

    clienttranslate("Revolver"),
    clienttranslate("Hat"),
    clienttranslate("Bear Trap"),
    clienttranslate("Grappling Hook"),
    clienttranslate("Lantern"),

    clienttranslate("Dog"),
    clienttranslate("Brush"),
    clienttranslate("Axe"),
    clienttranslate("Chronometer"),
    clienttranslate("Theodolite")
    ][$no];
  }
  return "Card name not defined";
}

function cardCost($type, $no) {
  if ($type == 'item') {
    return [
    0,  
    3, 3, 4, 4, 3,  
    3, 1, 1, 1, 1, 
    2, 4, 3, 2, 1,  
    3, 4, 4, 2, 4,  
    2, 2, 2, 1, 2,  
    2, 4, 2, 3, 2,  
    4, 1, 2, 2, 3,  
    3, 3, 2, 3, 3][$no];
  }
  if ($type == 'art') {
    return [0,  
    3, 4, 3, 4, 4,  
    4, 3, 3, 2, 4,  
    3, 2, 4, 4, 4,  
    2, 4, 4, 3, 3,  
    3, 2, 4, 4, 2,  
    3, 3, 4, 3, 3,  
    4, 3, 4, 4, 4][$no];
  }
  throw new BgaUserException("$type card doesn't have a cost");
  return 0;
}

function cardTravel($type, $no) {
  switch ($type) {
    case "fear":
      return [BOOT];
    case "fundship": case "exploreship":
      return [SHIP];
    case "fundcar": case "explorecar":
      return [CAR];
    case "art":
      if ($no == 13) {
        return [PLANE, PLANE];
      }
      return [PLANE];
    case "item":
      return [[],
        [SHIP, SHIP], [CAR, CAR], [CAR, CAR], [CAR, CAR], [SHIP, SHIP],
        [CAR, CAR], [CAR, CAR], [SHIP, SHIP], [CAR], [CAR],
        [PLANE], [PLANE, PLANE], [CAR, SHIP], [SHIP], [SHIP],
        [CAR, SHIP], [SHIP], [CAR], [SHIP], [SHIP],
        [CAR], [SHIP], [CAR], [SHIP], [PLANE],
        [SHIP], [CAR], [SHIP], [CAR], [SHIP],
        [SHIP, SHIP], [SHIP], [CAR], [CAR], [CAR],
        [CAR], [CAR], [SHIP], [SHIP, SHIP], [SHIP]
      ][$no];
  }
  return [];
}

function siteTravelCost($no, $slot, $birdSide) {
  if ($birdSide) {
    $costs = [
      [[BOOT => 1], [BOOT => 2]],
      [[BOOT => 1], [BOOT => 2]],
      [[BOOT => 1], [BOOT => 2]],
      [[BOOT => 1], [BOOT => 2]],
      [[BOOT => 1], [BOOT => 2]],

      [[CAR => 1]],
      [[CAR => 1]],
      [[SHIP => 1]],
      [[SHIP => 1]],
      [[CAR => 1]],
      [[CAR => 1]],
      [[SHIP => 1]],
      [[SHIP => 1]],

      [[CAR => 2]],
      [[CAR => 2]],
      [[SHIP => 2]],
      [[SHIP => 2]]
    ];
  }
  else {
    $costs = [
      [[BOOT => 1], [BOOT => 2]],
      [[BOOT => 1], [BOOT => 2]],
      [[BOOT => 1], [BOOT => 2]],
      [[BOOT => 1], [BOOT => 2]],
      [[BOOT => 1], [BOOT => 2]],

      [[CAR => 1]],
      [[CAR => 1]],
      [[SHIP => 1]],
      [[SHIP => 1]],
      [[CAR => 1]],
      [[BOOT => 2]],
      [[PLANE => 1]],
      [[SHIP => 1]],

      [[CAR => 2]],
      [[BOOT => 1, PLANE => 1]],
      [[SHIP => 1, CAR => 1]],
      [[SHIP => 2]]
    ];
  }
  return $costs[$no][$slot];
}

function guardianCost($num) {
  return [[],
    array("compass" => 1, "coins" => 1, "arrowhead" => 1),
    array("discard" => 1, "coins" => 1, "arrowhead" => 1),
    array("travel" => [BOOT => 1], "coins" => 1, "arrowhead" => 1),
    array("coins" => 2, "arrowhead" => 1),
    array("travel" => [BOOT => 1], "tablet" => 1, "arrowhead" => 1),

    array("travel" => [PLANE => 1], "arrowhead" => 1),
    array("compass" => 1, "discard" => 1, "arrowhead" => 1),
    array("coins" => 4),
    array("travel" => [SHIP => 1], "arrowhead" => 1),
    array("travel" => [CAR => 1], "arrowhead" => 1),

    array("travel" => [BOOT => 2], "compass" => 1),
    array("travel" => [BOOT => 1], "jewel" => 1),
    array("tablet" => 3),
    array("travel" => [PLANE => 1], "arrowhead" => 1),
    array("compass" => 2, "arrowhead" => 1)
  ][$num];
}

function siteEffects($size, $num) {
  if ($size === "basic" && $num == 4) {
    // discard
  }
  if ($size === "small" && $num == 1) {
    // plane
  }
  switch($size) {
    case "basic":
      return [
      ["coins" => 2], 
      ["compass" => 2], 
      ["tablet" => 2], 
      ["arrowhead" => 1], 
      ["jewel" => 1]
    ][$num];
    case "small":
      return [[],
        [],
        ["coins" => 1, "arrowhead" => 1],
        ["card" => 1, "coins" => 1, "tablet" => 1],
        ["compass" => 1, "arrowhead" => 1],
        ["coins" => 1, "tablet" => 2],
        ["arrowhead" => 1, "tablet" => 1],
        ["arrowhead" => 1, "card" => 1],
        ["fear" => 1, "tablet" => 1, "jewel" => 1],
        ["fear" => 1, "compass" => 1, "jewel" => 1],
        ["jewel" => 1, "discard" => 1]
      ][$num];
    case "big": 
      return [[],
        ["compass" => 2, "jewel" => 1],
        ["coins" => 1, "compass" => 1, "tablet" => 1, "arrowhead" => 1],
        ["arrowhead" => 1, "jewel" => 1],
        ["card" => 1, "tablet" => 1, "jewel" => 1],
        ["tablet" => 2, "jewel" => 1],
        ["fear" => 1, "tablet" => 2, "arrowhead" => 2],

      ][$num];
  }
  return [];
}

function cardPoints($type, $no) {
  if ($type == "fear") {
    return -1;
  }
  if ($type == "item") {
    return [0, 
    1, 1, 1, 1, 3,  
    3, 1, 1, 1, 1,  
    1, 3, 1, 2, 1,  
    1, 1, 2, 2, 1,  
    2, 1, 1, 1, 1,  
    1, 1, 2, 1, 1,  
    1, 1, 1, 2, 2,  
    1, 3, 2, 2, 1][$no];
  }
  if ($type == "art") {
    return [0, 
    1, 1, 1, 3, 2,
    2, 1, 2, 1, 2,  
    1, 1, 2, 2, 1,  
    1, 2, 1, 2, 1,  
    1, 1, 2, 2, 1,  
    1, 2, 1, 1, 2,  
    2, 1, 1, 1, 2,  
    ][$no];
  }
  return 0;
}

function researchCost($birdSide, $to) {
  if ($birdSide) {
    return [
    array(),

    array("compass"  => 1, "arrowhead" => 1),
    array("jewel" => 1),

    array("jewel"=> 1),
    array("tablet"=> 1, "arrowhead"=> 1),

    array("tablet"=> 2, "arrowhead"=> 1),

    array("tablet"=> 1, "arrowhead"=> 1, "coins"=> 1),
    array("tablet"=> 1, "jewel"=> 1),
    array("arrowhead"=> 2),

    array("coins"=> 1, "jewel"=> 1),

    array("compass"=> 1, "jewel"=> 1),
    array("tablet"=> 2, "arrowhead"=> 1),

    array("tablet"=> 1, "arrowhead"=> 1, "coins"=> 1),
    array("tablet"=> 1, "jewel"=> 1),
    array("coins"=> 1, "compass"=> 1, "jewel"=> 1),
    ][$to];
  }
  else {
    return [
    array(),

    array("compass" => 1, "tablet" => 2),
    array("jewel" => 1),

    array("coins" => 1, "compass" => 1, "arrowhead" => 1),
    array("tablet" => 1, "jewel" => 1),
    array("arrowhead" => 2),

    array("tablet" => 2, "arrowhead" => 1),
    array("coins" => 1, "jewel" => 1),

    array("idol" => 1),

    array("arrowhead" => 2),
    array("tablet" => 1, "jewel" => 1),

    array("tablet" => 1, "jewel" => 1),
    array("compass" => 1, "tablet" => 3),

    array("coins" => 1, "tablet" => 1, "arrowhead" => 1),

    array("compass" => 1, "arrowhead" => 1, "jewel" => 1),

    ][$to];
  }
}

function researchPossibilities($birdSide, $from) {
  if ($birdSide) {
    return [
      [1, 2],
      [3, 4],
      [4],
      [5],
      [5],

      [6, 7, 8],
      [9],
      [9],
      [9],
      [10, 11],

      [12],
      [12, 13],
      [14],
      [14],
      []
    ][$from];
  }
  else {
    return [
      [1, 2],
      [3, 4],
      [4, 5],
      [6],
      [6, 7],

      [7],
      [8],
      [8],
      [9, 10],
      [11, 12],

      [12],
      [13],
      [13],
      [14],
      []
    ][$from];
  }
}

function researchStep($birdSide, $spaceId) {
  if ($birdSide) {
    return [0, 1, 1, 2, 2, 3, 4, 4, 4, 5, 6, 6, 7, 7, 8][$spaceId];
  }
  else {
    return [0, 1, 1, 2, 2, 2, 3, 3, 4, 5, 5, 6, 6, 7, 8][$spaceId];
  }
}

function stepPoints($birdSide, $book, $step, $rank = 0) {
  if ($step == 8) {
    return [0, 23, 21, 20, 19][$rank];
  }
  if ($birdSide) {
    if ($book) {
      return [0, 0, 1, 2, 4, 6, 8, 10][$step];
    }
    else {
      return [0, 1, 2, 4, 6, 9, 12, 16][$step];
    }
  }
  else {
    if ($book) {
      return [0, 0, 3, 4, 5, 8, 12, 15][$step];
    }
    else {
      return [0, 1, 2, 3, 4, 5, 10, 15][$step];
    }
  }
}

function researchBonus($birdSide, $step, $book) {
  if ($birdSide) {

    return [[],
      ["coins", "assistant-silver"],
      ["compass", "assistant-silver"],
      ["compass", "assistant-gold"],
      ["compass", "assistant-gold"],
      ["compass", "3compass"],
      ["card", "free-art"],
      ["compass", "guard"],
      ["", ""],
    ][$step][$book ? 1 : 0];
  }
  else {
    return [
      [],
      ["coins", "assistant-silver"],
      ["2coins", "exile"],
      ["card", "assistant-gold"],
      ["assistant-special", "free-art"],
      ["assistant-gold", "assistant-refresh"],
      ["fear", "card"],
      ["fear", "jewel"],
      ["", ""],
    ][$step][$book ? 1 : 0];
  }
}

function templeTileCost($id, $birdSide) {
  $cost = array();
  if ($id == 1 || $id == 4 || $id == 6) {
    if ($birdSide) {
      $cost["coins"] = 1;
    }
    else {
      $cost["compass"] = 1;
    }
    $cost["tablet"] = 2;
  }
  if ($id == 2 || $id == 4 || $id == 5 || $id == 6) {
    $cost["jewel"] = 1;
  }
  if ($id == 3 || $id == 5 || $id == 6) {
    if ($birdSide) {
      $cost["compass"] = 1;
    }
    else {
      $cost["coins"] = 1;
    }
    $cost["arrowhead"] = 1;
  }
  return $cost;
}
function templeColor($id) {
  return ["", "bronze", "bronze", "bronze", "silver", "silver", "gold"][$id];
}

?>