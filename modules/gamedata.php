<?php
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