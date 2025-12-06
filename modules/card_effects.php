<?php


class CardEffects extends APP_GameClass {
  public function __construct($game, $playerId) {
    $this->game = $game;
    $this->playerId = $playerId;
  }
  public function cardEffect($type, $num, $cardId, $arg = "") {
    //$this->game->gainResource("coins", $playerId, -1000);
    //throw new BgaUserException("Here in class for card effects with $type $num $cardId $arg");
    $playerId = $this->playerId;
    $this->activeCard = $cardId;
    switch($type) {
      case "fundcar": case "fundship":
        $this->gainCardResource("coins", $playerId, 1);
        break;
      case "explorecar": case "exploreship":
        $this->gainCardResource("compass", $playerId, 1);
        break;
      case "fear":
        throw new BgaUserException(clienttranslate("Fear cannot be played"));
        break;
      case "art":
        $this->artEffect($num, $cardId, $arg);
        break;
      case "item":
        $this->itemEffect($num, $cardId, $arg);
        break;
      default:
        throw new BgaUserException("Cannot use card type $type");
        break;
    }
  }
  function gainCardResource($resName, $playerId, $amt) {
    $this->game->gainResource($resName, $playerId, $amt, array("component" => "card", "arg" => $this->activeCard));
  }
  function artEffect($num, $cardId, $arg) {
    $game = $this->game;
    $playerId = $this->playerId;
    $game->gamestate->nextState("playArt");
    
    switch($num) {
      case 1: case 2:
        $movement = JSON_DECODE($arg);
        $to = $movement->to;
        $from = $movement->from;
        if ($num == 1) {
          $site = $game->getObjectFromDb("SELECT * FROM location WHERE size='basic' AND is_at_position = $to");
        }
        else {
          $site = $game->getObjectFromDb("SELECT * FROM location WHERE (size='basic' OR size='small') AND is_at_position = $to");
        }
        if (!$site) {
          throw new BgaUserException(clienttranslate("The site you are trying to move to is not valid"));
        }
        $game->moveToSite($to, [], $from);
        break;
      case 3:
        $this->gainCardResource("arrowhead", $playerId, 1);
        $game->setGameStateValue("warmask-played", 1);
        break;
      case 4:
        $this->gainCardResource("card", $playerId, 1);
        $this->gainCardResource("coins", $playerId, 1);
        break;
      case 5:
        $game->exile($arg);
        $this->gainCardResource("arrowhead", $playerId, 1);
        break;
      case 6:
        if (count($this->getCollectionFromDb("SELECT * FROM card WHERE card_position = 'deck' && player = $playerId")) == 0) {
          $game->game->artDone();
        }
        for ($i = 0; $i < $arg; ++$i) {
          $game->drawCard($playerId, false, "earring");
        }
        $game->gamestate->nextState("earring");
        break;
      case 7:
        $game->exile($arg);
        $this->gainCardResource("coins", $playerId, 2);
        break;
      case 8:
        $this->gainCardResource("fear", $playerId, 1);
        $this->gainCardResource("coins", $playerId, 4);
        break;
      case 9:
        $this->gainCardResource("fear", $playerId, 1);
        $this->gainCardResource("jewel", $playerId, 1);
        break;
      case 10:
        $game->setGameStateValue("discount-coins", 9999);
        $game->buyCard($arg, true, false, true);
        $game->resetDiscount();
        break;
      case 11:
        $game->setGameStateValue("discount-jewel", 1);
        $arg = JSON_DECODE($arg);
        if (isset($arg->temple)) {
          $game->getTempleTile($arg->temple);
          $game->artDone();
        }
        else {
          $game->research($arg);
        }
        $game->resetDiscount();
        break;
      case 12:
        $args = JSON_DECODE($arg);
        if ($args->discount == "arrowhead") {
          $game->setGameStateValue("discount-arrowhead", 1);
        }
        else {
          $game->setGameStateValue("discount-tablet", 2);
        }
        if (isset($args->temple)) {
          $game->getTempleTile($args->temple);
          $game->artDone();
        } 
        else {
          
          $game->research($args->research);
        }
        $game->resetDiscount();
        break;
      case 13:
        $game->moveToSite("home", "", $arg);
        $game->setGameStateValue("ocarina-played", 1);
        break;
      case 14:
        $arg = JSON_DECODE($arg);
        $siteId = $arg->site;
        $exile = $arg->exile;
        $game->exile($exile);
        $site = $game->getObjectFromDb("SELECT * FROM board_position WHERE slot1 IS NULL AND (slot2 IS NULL OR slot2 = -1) AND idboard_position = $siteId");
        if (!$site) {
          throw new BgaUserException(clienttranslate("That is not an unoccupied camp site"));
        }
        $siteTile = $this->getNonEmptyObjectFromDb("SELECT * FROM location WHERE is_at_position = $siteId AND size = 'basic'");
        $game->siteEffect("basic", $siteTile["num"]);
        break;
      case 15:
        $game->freeOvercome($arg);
        break;
      case 16:
        if ($arg == "pass") {
          $this->gainCardResource("jewel", $playerId, 1);
          $game->pass(true);
          return;
        }
        else {
          $this->gainCardResource("tablet", $playerId, 2);
          $this->game->artDone();
        }
        break;
      case 17:
        $game->upgrade($arg, true);
        $this->gainCardResource("coins", $playerId, 3);
        break;
      case 18:
        $this->gainCardResource("fear", $playerId, 1);
        $this->gainCardResource("arrowhead", $playerId, 2);
        break;
      case 19:
        $this->gainCardResource("coins", $playerId, 2);
        $game->setGameStateValue("art-active", $num);
        $game->gamestate->nextstate("activateAss");
        break;
      case 20:
        $this->gainCardResource("card", $playerId, 1);
        $game->gamestate->nextstate("artExile");
        break;
      case 21:
        $this->gainCardResource("coins", $playerId, 1);
        $game->setGameStateValue("art-active", $num);
        $game->gamestate->nextstate("activateAss");
        break;
      case 22:
        $args = JSON_DECODE($arg);
        $old = $args->oldAss;
        $new = $args->newAss;
        $oldAss = $game->getNonEmptyObjectFromDb("SELECT * FROM assistant WHERE num = $old AND in_hand = $playerId");
        $newAss = $game->getNonEmptyObjectFromDb("SELECT * FROM assistant WHERE num = $new AND in_hand IS NULL");
        $slot = $newAss["in_offer"];
        $gold = $oldAss["gold"] == 1;
        $game->dbQuery("UPDATE assistant SET offer_order = offer_order - 1 WHERE num = $new");
        $order = $game->getObjectFromDb("SELECT * FROM assistant WHERE num = $new")["offer_order"] + 1;
        $game->dbQuery("UPDATE assistant SET in_hand = NULL, in_offer = $slot, offer_order = $order, ready = true, gold = false WHERE num = $old");
        $game->notifyAllPlayers('returnAss', '${player_name} returns his assistant to the supply', 
        array(
          "player_name" => $game->getActivePlayerName(),
          "player_id" => $game->getActivePlayerId(),
          "num" => $old,
          "slot" => $slot
        ));
        $game->getNewAssistant($new, true, $gold);
        break;
      case 23:
        $toExile = $game->getObjectFromDb("SELECT * FROM card WHERE card_type = 'item' AND card_position = 'supply' ORDER BY deck_order DESC LIMIT 1");
        $game->exile($toExile["idcard"], true);
        $game->gamestate->nextState("discardSelect");
        break;
      case 24:
        $this->gainCardResource("coins", $playerId, -1);
        $siteIds = JSON_DECODE($arg);
        if ($siteIds[0] == $siteIds[1]) {
          throw new BgaUserException(clienttranslate("You must select 2 different sites"));
        }
        if ($siteIds[0] == 4) {
          $game->siteEffect("basic", $siteIds[1], true);
          $game->siteEffect("basic", $siteIds[0]);
        }
        else {
          $game->siteEffect("basic", $siteIds[0], true);
          $game->siteEffect("basic", $siteIds[1]);
        }
        break;
      case 25:
        $this->gainCardResource("card", $playerId, 1);
        break;
      case 26:
        $game->setGameStateValue("discount-boot", 2);
        $game->gamestate->nextState("mayTravel");
        break;
      case 27:
        if (!$arg) {
          break;
        }

        $assistant = $this->getNonEmptyObjectFromDB("SELECT * FROM assistant WHERE num = $arg");
        if($assistant['in_hand'] != $playerId) {
          throw new BgaUserException(clienttranslate("Nothing to do with that assistant right now"));
        }
        $game->refreshAssistant($arg);
        break;
      case 28:
        $game->discardCard($arg);
        $assistants = $game->getCollectionFromDb("SELECT * FROM assistant WHERE in_hand = $playerId AND ready = 0");
        foreach($assistants as $assId => $ass) {
          $game->refreshAssistant($ass["num"]);
        }
        break;
      case 29:
        $game->upgrade($arg, true);
        $this->gainCardResource("coins", $playerId, 2);
        break;
      case 30:
        if ($this->getNonEmptyObjectFromDb("SELECT * FROM player WHERE player_id = $playerId")["idol_slot"] >= 4) {
          $game->notifyAllPlayers("cantIdol", "No idols in slots", array());
        }
        else {
          $this->gainCardResource("idol_slot", $playerId, 1);
          $this->gainCardResource("idol", $playerId, 1);
        }
        break;
      case 31:
        if (count($this->getCollectionFromDb("SELECT * FROM card WHERE card_position = 'deck' && player = $playerId")) == 0) {
          $game->game->artDone();
        }
        for ($i = 0; $i < $arg; ++$i) {
          $game->drawCard($playerId, true, "earring");
        }
        $game->gamestate->nextState("earring");
        break;
      case 32: case 33:
        $size = "small";
        if ($num == 33) {
          $size = "big";
          $this->gainCardResource("compass", $playerId, -1);
        }
        $newSite = $game->getObjectFromDB("SELECT * FROM location WHERE size = '$size' AND is_open = 0  ORDER BY deck_order LIMIT 1");
        $game->notifyAllPlayers("siteReveal", clienttranslate('${player_name} reveals a ${size} location from the deck'), array(
          "size" => $size,
          "player_name" => $game->getActivePlayerName(),
          "player_id" => $playerId,
          "num" => $newSite["num"],
          "cardNum" => $num
        ));
        $deckOrder = $game->getObjectFromDB("SELECT * FROM location WHERE size = '$size' ORDER BY deck_order DESC LIMIT 1")["deck_order"] + 1;
        $siteId = $newSite["idlocation"];
        $game->dbQuery("UPDATE location SET deck_order = $deckOrder WHERE size = '$size' AND idlocation = $siteId");
        $game->undoSavePoint();
        $game->siteEffect($size, $newSite["num"]);
        break;
      case 34:
        $this->gainCardResource("fear", $playerId, 1);
        $this->gainCardResource("coins", $playerId, 1);
        $this->gainCardResource("tablet", $playerId, 3);
        break;
      case 35:
        $movement = JSON_DECODE($arg);
        $to = $movement->to;
        $from = $movement->from;
        $siteFrom = $game->getObjectFromDb("
        SELECT * FROM location loc INNER JOIN board_position pos ON loc.is_at_position = pos.idboard_position INNER JOIN guardian g ON g.at_location = pos.idboard_position WHERE g.at_location = $from AND (slot1 = $playerId OR slot2 = $playerId)");

        if (!$siteFrom) {
          throw new BgaUserException(clienttranslate("You did not select a valid guardian"));
        }
        $siteTo = $game->getObjectFromDb("
        SELECT loc.num num , loc.size size FROM location loc INNER JOIN board_position pos ON loc.is_at_position = pos.idboard_position WHERE (loc.size='basic' OR loc.size='small') AND pos.idboard_position = $to AND (slot1 IS NULL AND (slot2 IS NULL OR slot2 = -1))");
        if (!$siteTo) {
          throw new BgaUserException(clienttranslate("You did not select a valid destination"));
        }
        $newGuard = $game->getObjectFromDB("SELECT * FROM guardian WHERE at_location = $to");
        if ($newGuard) {
          throw new BgaUserException(clienttranslate("There is already a guardian there"));
        }
        $game->dbQuery("UPDATE guardian SET at_location = $to WHERE at_location = $from");
        $game->notifyAllPlayers("guardMove", '${player_name} moves a guardian to another site', array(
          "player_name" => $game->getActivePlayerName(),
          "player_id" => $game->getActivePlayerId(),
          "from" => $from,
          "to" => $to
        ));
        $game->siteEffect($siteTo["size"], $siteTo["num"]);
        break;
    }
    if (in_array(intval($num), [3, 4, 5, 7, 8, 9, 10, 13, 15, 17, 18, 22, 25, 27, 28, 29, 30, 34])) {
      $this->game->artDone();
    }
    else {
      $game->setGameStateValue("art-active", $num);
    }
  }
  function itemEffect($num, $cardId, $arg) {
    $game = $this->game;
    $playerId = $this->playerId;
    if (in_array(intval($num), [11, 13, 23, 24, 25, 26, 33])) {
      $this->game->exile($cardId);
    }
    switch($num) {
      case 1:
        $this->gainCardResource("card", $playerId, 1);
        $game->setGameStateValue("discount-ship", 1);
        $game->gamestate->nextState("mayTravel");
        break;
      case 2:
        $this->gainCardResource("card", $playerId, 1);
        $game->setGameStateValue("discount-car", 1);
        $game->gamestate->nextState("mayTravel");
        break;
      case 3:
        $this->gainCardResource("card", $playerId, 2);
        break;
      case 4:
        $this->gainCardResource("card", $playerId, 1);
        $this->gainCardResource("coins", $playerId, 1);
        $this->gainCardResource("compass", $playerId, 1);
        break;
      case 5:
        $this->gainCardResource("compass", $playerId, 2);
        break;
      case 6: 
        $this->gainCardResource("compass", $playerId, 2);
        break;
      case 7:
        $this->gainCardResource("compass", $playerId, 1);
        $game->setGameStateValue("discount-boot", 2);
        $game->gamestate->nextState("mayTravel");
        break;
      case 8: 
        $this->gainCardResource("coins", $playerId, 2);
        break;
      case 9:
        $this->gainCardResource("compass", $playerId, -1);
        $this->gainCardResource("jewel", $playerId, 1);
        break;
      case 10:
        $this->gainCardResource("compass", $playerId, -1);
        $this->gainCardResource("tablet", $playerId, 1);
        $this->gainCardResource("arrowhead", $playerId, 1);
        break;
      case 11:
        $game->setGameStateValue("discount-compass", 3);
        $game->setGameStateValue("discount-plane", 1);
        $game->gamestate->nextState("mayTravel");
        // reset dis
        break;
      case 12:
        $game->setGameStateValue("discount-compass", 2);
        $game->setGameStateValue("discount-plane", 1);
        $game->gamestate->nextState("mayTravel");
        // reset dis
        break;
      case 13:
        $game->research($arg, true, "book");
        break;
      case 14:
        $game->discardCard($arg);
        $this->gainCardResource("jewel", $playerId, 1);
        break;
      case 15:
        if ($arg == "pass") {
          $this->gainCardResource("coins", $playerId, 3);
          $game->pass();
          return;
        }
        else {
          $this->gainCardResource("coins", $playerId, 2);
        }
        break;
      case 16:
        $options = JSON_DECODE($arg);
        if ($options[0] == $options[1] || (intval($options[0]) && intval($options[1]))) {
          throw new BgaUserException(clienttranslate("The options must be different"));
        }
        foreach ($options as $option) {
          switch($option) {
            case "compass": case "coins": case "tablet":
              $this->gainCardResource($option, $playerId, 1);
              break;
            default:
              $game->exile($option);
          }
        }
        break;
      case 17:
        $siteTile = $this->getNonEmptyObjectFromDb("SELECT * FROM location WHERE is_at_position = $arg AND size = 'small'");
        $game->siteEffect("small", $siteTile["num"]);
        break;
      case 18:
        $siteTile = $this->getNonEmptyObjectFromDb("SELECT * FROM location WHERE is_at_position = $arg");
        if (!$this->getObjectFromDb("SELECT * FROM board_position WHERE (slot1 = $playerId OR slot2 = $playerId) AND idboard_position = $arg")) {
          throw new BgaUserException(clienttranslate("You must have an archeologist on the site"));
        }
        if ($siteTile["size"] == "big") {
          $this->gainCardResource("compass", $playerId, -2);
        }
        $game->siteEffect($siteTile["size"], $siteTile["num"]);
        break;
      case 19: 
        $newCard = $game->revealCard("item");
        $game->setGameStateValue("discount-coins", 3);
        $game->gamestate->nextState("buyItem");
        break;
      case 20:
        $newCard = $game->revealCard("art");
        $game->setGameStateValue("discount-compass", 3);
        $game->gamestate->nextState("buyArt");
        break;
      case 21:
        $guards = $game->getCollectionFromDb(
        "SELECT * FROM guardian g
        LEFT JOIN board_position p ON g.at_location = p.idboard_position 
        WHERE g.in_hand = $playerId OR p.slot1 = $playerId OR p.slot2 = $playerId");

        $this->gainCardResource("compass", $playerId, min(3, count($guards)));
        break;
      case 22:
        $this->gainCardResource("tablet", $playerId, 2);
        break;
      case 23: 
        $game->setGameStateValue("discount-compass", 4);
        $game->buyCard($arg, false, false, true);
        break;
      case 24:
        $this->gainCardResource("compass", $playerId, 3);
        break;
      case 25:
        $game->setGameStateValue("discount-coins", 999);
        $game->buyCard($arg, true, false, true);
        $this->gainCardResource("card", $playerId, 1);
        break;
      case 26:
        $this->gainCardResource("card", $playerId, 3);
        break;
      case 27:
        $game->exile($arg);
        $this->gainCardResource("compass", $playerId, 2);
        break;
      case 28:
        $game->exile($arg);
        $this->gainCardResource("tablet", $playerId, 1);
        break;
      case 29:
        $this->gainCardResource("coins", $playerId, 1);
        $game->drawCard($playerId, true);
        break;
      case 30:
        $game->discardCard($arg);
        $this->gainCardResource("card", $playerId, 2);
        break;
      case 31:
        $this->gainCardResource("compass", $playerId, -1);
        $game->freeOvercome($arg);
        break;
      case 32:
        $this->gainCardResource("compass", $playerId, 1);
        $this->gainCardResource("coins", $playerId, 1);
        break;
      case 33:
        $guards = $game->availableGuardians($arg, true);
        switch (count($guards)) {
          case 0: throw new BgaUserException(clienttranslate("Select a valid guardian"));
          case 1: $game->overcomeGuard($guards[0]["num"], "", true); break;
          default: throw new BgaUserException(clienttranslate("Incorrect number of guards found"));
          break;
        }
        break;
      case 34:
        $game->discardCard($arg);
        $this->gainCardResource("card", $playerId, 1);
        $game->gamestate->nextState("cardExile");
        break;
      case 35:
        $siteTile = $this->getNonEmptyObjectFromDb("SELECT * FROM location WHERE is_at_position = $arg AND size = 'basic'");
        $game->siteEffect("basic", $siteTile["num"]);
        break;
      case 36:
        $site = $game->getObjectFromDb("SELECT * FROM board_position WHERE slot1 IS NULL AND (slot2 IS NULL OR slot2 = -1) AND idboard_position = $arg");
        if (!$site) {
          throw new BgaUserException(clienttranslate("That is not an unoccupied camp site"));
        }
        $siteTile = $this->getNonEmptyObjectFromDb("SELECT * FROM location WHERE is_at_position = $arg AND size = 'basic'");
        $this->gainCardResource("compass", $playerId, 1);
        $game->siteEffect("basic", $siteTile["num"]);
        break;
      case 37:
        $player =  $game->getNonEmptyObjectFromDb("SELECT * FROM player WHERE player_id = $playerId");
        $idols = $player["idol"] + 4 - $player["idol_slot"];
        $this->gainCardResource("compass", $playerId, min($idols, 3));
        break;
      case 38:
        $game->exile($arg);
        $this->gainCardResource("compass", $playerId, 1);
        break;
      case 39:
        if ($arg == "pass") {
          $this->gainCardResource("compass", $playerId, 3);
          $game->pass();
        }
        else {
          $this->gainCardResource("coins", $playerId, 1);
          $this->gainCardResource("compass", $playerId, 1);
        }
        break;
      case 40:
        $this->gainCardResource("coins", $playerId, 1);
        $this->gainCardResource("compass", $playerId, 2 - $game->freeWorkerAmt($playerId)); 
        break;
      default:
        throw new BgaUserException("cannot use item $num");
    }
    if (in_array(intval($num), [3, 4, 9, 10, 14, 16, 21, 24, 25, 26, 27, 28, 29, 30, 31, 33, 37, 38, 40])) {
      $this->game->gamestate->nextState("main_action_done");
    }
  }
}
?>