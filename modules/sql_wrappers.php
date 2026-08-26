<?php

class SqlWrapper {

  public function __construct($game) {
    $this->game = $game;
    $this->cardFeildMapping = array(
      "idcard" => "id",
      "card_type" => "type",
      "num" => "num",
      "card_position" => "position",
      "player" => "playerId"
    );
  }

  public function getPublicCards($player_id = NULL, $position = NULL, $type = NULL) {
    $fields = ["idcard", "card_type", "num"];
    $cards = $this->getCardsFromFields($player_id, $position, $type, $fields);
    foreach ($cards as $idx => $card) {
      if ($card["type"] != "art" && $card["type"] != "item") {
        $cards[$idx]["num"] = $card["type"];
        $cards[$idx]["type"] = "basic";
      }
    }
    return $cards;
  }

  public function getCards($player_id = NULL, $position = NULL, $type = NULL) {
    $fields = ["idcard", "card_type", "num", "card_position", "player"];
    $cards = $this->getCardsFromFields($player_id, $position, $type, $fields);
    foreach ($cards as $idx => $card) {
      $cards[$idx] = $this->cardWithInfo($cards[$idx]);
    }
    return $cards;
  }

  private function getCardsFromFields($player_id = NULL, $position = NULL, $type = NULL, $fields = []) {
    $filters = [];
    if ($position) {
      array_push($filters, "card_position = '$position'" );
    }
    array_push($filters, is_null($player_id) ? "player IS NULL" : "player = $player_id");
    if ($type) {
      array_push($filters, "card_type = '$type'");
    }
    $filters_str = implode(' AND ', $filters);
    $field_str = $this->cardFeildStr($fields);
    return $this->game->getObjectListFromDb("SELECT $field_str FROM card WHERE $filters_str ORDER BY deck_order");
  }

  public function getCardFromId($id, $extra_fields = [], $player_id = NULL) {
    $field_str = $this->cardFeildStr(["idcard", "card_type", "num", "card_position", "player"]);

    $filters = "idcard = $id";
    if ($player_id) {
      $filters .= " AND player = $player_id";
    }
    $card = $this->game->getObjectFromDB("SELECT $field_str FROM card WHERE $filters");
    return $this->cardWithInfo($card);
  }

  public function getCardId($type, $num) {
    $card = $this->game->getObjectFromDB("SELECT idcard FROM card WHERE card_type = '$type' AND num = '$num'");
    return $card["idcard"];
  }

  private function getCardOrders($player_id, $position) {
    $filters = [];
    if ($position) {
      array_push($filters, "card_position = '$position'" );
    }
    array_push($filters, is_null($player_id) ? "player IS NULL" : "player = $player_id");
    $filters_str = implode(' AND ', $filters);
    $cards = $this->game->getObjectListFromDb("SELECT deck_order FROM card WHERE $filters_str ORDER BY deck_order");

    $orders = [];
    foreach ($cards as $card) {
      array_push($orders, $card["deck_order"]);
    }
    return $orders;
  }

  public function moveCard($card, $playerId, $destination, $notifs = [], $high = true) {
    $destinationOrders = $this->getCardOrders($playerId, $destination);
    $nextOrder = 0;
    if (count($destinationOrders) > 0) {
      $nextOrder = $high ? (end($destinationOrders) + 1) : ($destinationOrders[0] - 1);
    }

    $id = $card['id'];
    $cardInfo = $card["info"];
    $player_str = $playerId ? $playerId : "NULL";
    $this->game->DbQuery("UPDATE card SET player = $player_str, card_position = '$destination', deck_order = $nextOrder WHERE idcard = $id");

    if (count($notifs) > 0) {
      $notif_card = array(
        "i18n" => ["cardName"],
        "cardName" => $this->game->gameData->cardName($cardInfo),
        "cardType" => $cardInfo->type(),
        "cardNum" => $cardInfo->value,
        "cardId" => $id,
        "source" => $card['position'],
        "srcPlayerId" => $card['playerId'],
        "destination" => $destination,
        "dstPlayerId" => $playerId,
        "preserve" => ['cardType', 'cardNum']
      );

      if ($playerId) {
        $notif_card["playerName"] = $this->game->loadPlayersBasicInfos()[$playerId]["player_name"];
      }
      else {
        $notif_card["playerName"] = $this->game->getActivePlayerName();
      }

      foreach($notifs[0] as $var => $value) {
        if ($var != "msg") {
          array_push($notif_card["i18n"], $var);
          $notif_card[$var] = $value;
        }
      }

      if (count($notifs) == 1) {
        if (!is_null($notifs[0])) {
          $this->game->notifyAllPlayers("moveCard", $notifs[0]["msg"], $notif_card);
        }
      }
      else if (count($notifs) == 2) {
        if (!is_null($notifs[0])) {
          $this->game->notifyPlayer($playerId, "moveCard", $notifs[0]["msg"], $notif_card);
        }

        if (!is_null($notifs[1])) {
          $notif_players = array (
            "i18n" => [],
            "playerName" => $this->game->getActivePlayerName(),
            "source" => $card['position'],
            "srcPlayerId" => $card['playerId'],
            "destination" => $destination,
            "dstPlayerId" => $playerId
          );
          foreach($notifs[1] as $var => $value) {
            if ($var != "msg") {
              array_push($notif_players["i18n"], $var);
              $notif_players[$var] = $value;
            }
          }

          $this->game->notifyAllPlayers("playerMoveCard", $notifs[1]["msg"], $notif_players);
        }
      }
    }
  }

  public function moveCards($playerId, $from, $to, $notifs) {

    $fromCards = $this->getPublicCards($playerId, $from);

    $this->game->DbQuery("UPDATE card SET player = $playerId, card_position = '$to' WHERE player = $playerId  AND card_position = '$from'");

    if (count($notifs) > 0) {
      $notif_cards = array (
        "i18n" => [],
        "playerId" => $playerId,
        "playerName" => $this->game->loadPlayersBasicInfos()[$playerId]["player_name"],
        "source" => $from,
        "destination" => $to,
        "cards" => JSON_ENCODE($fromCards)
      );
      foreach($notifs[0] as $var => $value) {
        if ($var != "msg") {
          array_push($notif_cards["i18n"], $var);
          $notif_cards[$var] = $value;
        }
      }

      if (count($notifs) == 1) {
        if (!is_null($notifs[0])) {
          $this->game->notifyAllPlayers("moveCards", $notifs[0]["msg"], $notif_cards);
        }
      }
      else {
        if (!is_null($notifs[0])) {
          $this->game->notifyPlayer($playerId, "moveCards", $notifs[0]["msg"], $notif_cards);
        }

        if (!is_null($notifs[1])) {
          $notif_players = array (
            "i18n" => []
          );
          foreach($notifs[1] as $var => $value) {
            if ($var != "msg") {
              array_push($notif_players["i18n"], $var);
              $notif_players[$var] = $value;
            }
          }

          $this->game->notifyAllPlayers("movePlayerCards", $notifs[1]["msg"], $notif_players);
        }
      }
    }
  }

  public function createCards($cards, $playerId, $position, $notifs = []) {
    $orders = $this->getCardOrders($playerId, $position);
    $deckOrder = 0;
    if (count($orders) > 0) {
      $deckOrder = end($orders) + 1;
    }

    foreach($cards as $card) {
      $cardType = $card->type();
      $cardTypeDb = ($cardType == "basic") ? $card->value : $cardType;
      $cardNum = ($cardType == "basic") ? 'NULL' : $card->value;
      $player_str = $playerId ? $playerId : "NULL";
      $this->game->DbQuery("INSERT INTO card (player, card_position, card_type, num, deck_order) VALUES ($player_str, '$position', '$cardTypeDb', $cardNum, $deckOrder)");
      $deckOrder++;
      if (count($notifs) == 1) {
        $id = $this->game->getObjectFromDB("SELECT LAST_INSERT_ID() id")["id"];
        $notif_cards = array(
          "i18n" => ["cardName"],
          "player_name" => $this->game->loadPlayersBasicInfos()[$playerId]["player_name"],
          "cardName" => $this->game->gameData->cardName($card),
          "cardType" => $card->type(),
          "cardNum" => $card->value,
          "cardId" => $id,
          "source" => 'discard',
          "srcPlayerId" => NULL,
          "destination" => $position,
          "dstPlayerId" => $playerId
        );
        $this->game->notifyAllPlayers("moveCard", $notifs[0]["msg"], $notif_cards);
      }
    }
  }

  private function cardFeildStr($feilds) {
    $strFields = array_map(function ($feild) { return "$feild ".$this->cardFeildMapping[$feild];}, $feilds);
    return implode(', ', $strFields);
  }

  private function cardWithInfo($cardData)
  {
    $card = $cardData;
    unset($card["type"]);
    unset($card["num"]);
    $type = $cardData["type"];
    if ($type == "art") {
      $card["info"] = Artefact::from($cardData["num"]);
    }
    else if ($type == "item") {
      $card["info"] = Item::from($cardData["num"]);
    }
    else {
      $card["info"] = Basic::from($type);
    }
    return $card;
  }

  public function getAssistantFromNum($num) {
    $assistants = $this->getAssistants(["num" => $num], ["in_hand", "in_offer", "gold", "ready"]);
    if (count($assistants) > 0) {
      $assistants[0]["gold"] = ($assistants[0]["gold"] == 1);
      $assistants[0]["ready"] = ($assistants[0]["ready"] == 1);
      $assistants[0]["in_hand"] = is_null($assistants[0]["in_hand"])?NULL:intval($assistants[0]["in_hand"]);
      $assistants[0]["in_offer"] = intval($assistants[0]["in_offer"]);
    }
    return (count($assistants) > 0)?$assistants[0]:NULL;
  }

  public function getAssistantsStack($stack) {
    $assistants = $this->getAssistants(["in_hand" => NULL, "in_offer" => $stack], ["num", "gold", "ready"]);
    foreach ($assistants as $idx => $ass) {
      $assistants[$idx]["num"] = (intval($ass["num"]));
      $assistants[$idx]["gold"] = ($ass["gold"] == 1);
      $assistants[$idx]["ready"] = ($ass["ready"] == 1);
    }
    return $assistants;
  }

  public function getPlayerAssistants($playerId) {
    $assistants = $this->getAssistants(["in_hand" => $playerId], ["num", "gold", "ready"]);
    foreach ($assistants as $idx => $ass) {
      $assistants[$idx]["num"] = (intval($ass["num"]));
      $assistants[$idx]["gold"] = ($ass["gold"] == 1);
      $assistants[$idx]["ready"] = ($ass["ready"] == 1);
    }
    return $assistants;
  }

  private function getAssistants($conditions, $fields) {
    $conds = [];
    foreach ($conditions as $key => $value) {
      array_push($conds, ($value === NULL)?"$key IS NULL":"$key = $value");
    }
    $conds_str = implode(' AND ', $conds);
    $fields_str = implode(', ', $fields);
    return $this->game->getObjectListFromDb("SELECT $fields_str FROM assistant WHERE $conds_str ORDER BY offer_order");
  }
  
  public function changeAssistantUpgarded($num, $upgraded, $notif = "") {
    $gold = $upgraded ? 1 : 0;
    $this->game->DbQuery("UPDATE assistant SET gold = $gold WHERE num = $num");
    $this->game->notifyAllPlayers("upgradeAss", $notif, array(
      "player_name" => $this->game->getActivePlayerName(),
      "player_id" => $this->game->getActivePlayerId(),
      "gold" => $upgraded,
      "assNum" => $num
    ));
  }

  public function changeAssistantUsed($num, $used, $msg = "") {
    $ready = $used ? 0 : 1;
    $this->game->DbQuery("UPDATE assistant SET ready = $ready WHERE num = $num");
    $this->game->notifyAllPlayers("useAssistant", $msg, array(
      "player_name" => $this->game->getActivePlayerName(),
      "player_id" => $this->game->getActivePlayerId(),
      "used" => $used,
      "assNum" => $num
    ));
  }

  public function moveAssistantFromStack($num, $playerId, $msg, $revealedAss, $deckHeight, $stack) {
    $assistants = $this->getAssistants(["in_hand" => $playerId], ["offer_order"]);
    $order = 0;
    if (count($assistants) > 0 && $assistants[0]["offer_order"] == 0) {
      $order = 1;
    }
    $this->game->DbQuery("UPDATE assistant SET in_offer = NULL, offer_order = $order, in_hand = $playerId WHERE num = $num");
    $this->game->notifyAllPlayers("getAssistant", $msg, array(
      "player_name" => $this->game->getActivePlayerName(),
      "player_id" => $this->game->getActivePlayerId(),
      "playerSlot" => $order,
      "revealedAss" => $revealedAss,
      "revealedStack" => $stack,
      "newHeight" => $deckHeight,
      "assNum" => $num
    ));
  }

  public function swapAssistants($oldNum, $newNum, $playerId, $notifOld, $notifNew, $deckHeight, $stack) {
    $playerSlot = $this->getAssistants(["num" => $oldNum], ["offer_order"])[0]["offer_order"];
    $stackOrder = $this->getAssistants(["num" => $newNum], ["offer_order"])[0]["offer_order"];

    $this->game->DbQuery("UPDATE assistant SET in_offer = $stack, offer_order = $stackOrder, in_hand = NULL WHERE num = $oldNum");
    $this->game->DbQuery("UPDATE assistant SET in_offer = NULL, offer_order = $playerSlot, in_hand = $playerId WHERE num = $newNum");

    $this->game->notifyAllPlayers('returnAss', $notifOld, array(
        "player_name" => $this->game->getActivePlayerName(),
        "player_id" => $this->game->getActivePlayerId(),
        "num" => $oldNum,
        "slot" => $stack
    ));
    $this->game->notifyAllPlayers("getAssistant", $notifNew, array(
      "player_name" => $this->game->getActivePlayerName(),
      "player_id" => $this->game->getActivePlayerId(),
      "playerSlot" => $playerSlot,
      "revealedAss" => NULL,
      "revealedStack" => $stack,
      "newHeight" => $deckHeight,
      "assNum" => $newNum
    ));
  }

  public function createAssistants($stacks) {
    foreach ($stacks as $idx => $stack) {
      $ready = ($idx != 4) ? 1 : 0;
      foreach ($stack as $order => $num) {
        $this->game->DbQuery("INSERT INTO assistant (gold, ready, num, in_offer, offer_order) VALUES(0, $ready, $num, $idx, $order)");
      }
    }
  }

  private function formatSite($position) {
    $site = ["slots" => []];
    foreach (["slot1", "slot2"] as $slot) {
      if (is_null($position[$slot])) {
        array_push($site["slots"], NULL);
      }
      else if($position[$slot] != -1) {
        array_push($site["slots"], $position[$slot]);
      }
    }
    $site["discovered"] = !is_null($position["location_id"]);
    if($site["discovered"]) {
      $site["location_num"] = intval($position["location_num"]);
      $site["location_id"] = intval($position["location_id"]);
      $site["size"] = $position["size"];
    }
    else {
      $site["idol_bonus"] = $position["idol_bonus"];
    }
    $site["threat"] = !is_null($position["guardian_id"]);
    if($site["threat"]) {
      $site["guardian_num"] = intval($position["guardian_num"]);
      $site["guardian_id"] = intval($position["guardian_id"]);
    }
    return $site;
  }

  private function locationRequest($siteId = NULL) {
    $sql =  "SELECT slot1, slot2, idol_bonus, loc.num location_num, idlocation location_id, loc.size size, g.num guardian_num, g.idguardian guardian_id FROM board_position board ";
    $sql .= "LEFT JOIN location loc ON board.idboard_position = loc.is_at_position ";
    $sql .= "LEFT JOIN guardian g ON board.idboard_position = g.at_location ";
    if (!is_null($siteId)) {
      $sql .= "WHERE board.idboard_position = $siteId";
    }
    return $sql;
  }

  public function getSite($siteId) {
    return $this->formatSite($this->game->getObjectFromDB($this->locationRequest($siteId)));
  }

  public function getAllSites() {
    $positions = $this->game->getObjectListFromDb($this->locationRequest());
    $sites = [];
    foreach ($positions as $idx => $position) {
      $sites[$idx] = $this->formatSite($position);
    }
    return $sites; 
  }

  public function getBoons($playerId, $available) {
    $readyStr = $available ? 1 : 0;
    $guardianNums = $this->game->getObjectListFromDb("SELECT num FROM guardian WHERE in_hand = $playerId AND ready = $readyStr ORDER BY deckorder");
    $boons = [];
    foreach ($guardianNums as $guardian) {
      array_push($boons, intval($guardian["num"]));
    }
    return $boons;
  }

  public function getAvailableBoons($playerId) {
    $guardianNums = $this->game->getObjectListFromDb("SELECT num FROM guardian WHERE in_hand = $playerId AND ready = 1 ORDER BY deckorder");
    $boons = [];
    foreach ($guardianNums as $guardian) {
      array_push($boons, intval($guardian["num"]));
    }
    return $boons;
  }

  public function getTopSiteDeck($small) {
    $sizeStr = $small ? "small" : "big";
    $site = $this->game->getObjectFromDB("SELECT idlocation location_id, num location_num FROM location WHERE is_at_position IS NULL AND size = '$sizeStr' ORDER BY deck_order LIMIT 1");
    $site["location_num"] = intval($site["location_num"]);
    return $site;
  }

  public function getTopGuardianDeck() {
    $guardian = $this->game->getObjectFromDB("SELECT idguardian guardian_id, num guardian_num FROM guardian WHERE at_location IS NULL AND in_hand IS NULL ORDER BY deckorder LIMIT 1");
    $guardian["guardian_num"] = intval($guardian["guardian_num"]);
    return $guardian;
  }

  public function clearBoardSlots($notif) {
    $this->game->DbQuery("UPDATE board_position SET slot1 = NULL WHERE slot1 != -1");
    $this->game->DbQuery("UPDATE board_position SET slot2 = NULL WHERE slot2 != -1");
    $this->game->notifyAllPlayers("returnWorkers", $notif["msg"], array());
  }

  public function moveSlotWorker($playerId, $siteFrom, $fromSlot, $siteTo, $toSlot, $notif) {
    if (!is_null($siteFrom)) {
      $slotStr = 'slot'.($fromSlot+1);
      $this->game->DbQuery("UPDATE board_position SET $slotStr = NULL WHERE idboard_position = $siteFrom");
    }
    if (!is_null($siteTo)) {
      $slotStr = 'slot'.($toSlot+1);
      $this->game->DbQuery("UPDATE board_position SET $slotStr = $playerId WHERE idboard_position = $siteTo");
    }
    $this->game->notifyAllPlayers("moveWorker", $notif["msg"],
      array(
        "player_name" => $this->game->getCurrentPlayerName(),
        "playerId" => $this->game->getCurrentPlayerId(),
        "siteTo" => $siteTo,
        "slotTo" => $toSlot,
        "siteFrom" => $siteFrom,
        "slotFrom" => $fromSlot
      )
    );
  }

  public function setSitePosition($siteid, $positionId, $size, $num, $notif) {
    $this->game->DbQuery("UPDATE board_position SET idol_bonus = NULL WHERE idboard_position = $positionId");
    $this->game->DbQuery("UPDATE location SET is_at_position = $positionId WHERE idlocation = $siteid");
    $this->game->notifyAllPlayers("discoverLocation", $notif["msg"],
      array(
        "player_name" => $this->game->getCurrentPlayerName(),
        "player_id" => $this->game->getCurrentPlayerId(),
        "locationSize" => $size,
        "locationNum" => $num,
        "locationId" => $siteid,
        "boardPosition" => $positionId
      )
    );
  }

  public function setSiteOnBottomDeck($locationId, $sizeDeck) {
    $deckOrders = $this->game->getObjectListFromDb("SELECT deck_order FROM location WHERE size = '$sizeDeck' ORDER BY deck_order");
    $newOrder = (count($deckOrders) > 0) ? (end($deckOrders)["deck_order"] + 1) : 0;
    $this->game->DbQuery("UPDATE location SET deck_order = $newOrder WHERE idlocation = $locationId");
  }

  public function setGuardianPosition($guardian, $siteId, $notif) {
    $guardianId = $guardian["guardian_id"];
    $this->game->DbQuery("UPDATE guardian SET at_location = $siteId, deckorder = NULL WHERE idguardian = $guardianId");
    $this->game->notifyAllPlayers("guardMove", $notif["msg"],
      array(
        "player_name" => $this->game->getActivePlayerName(),
        "player_id" => $this->game->getActivePlayerId(),
        "guardNum" => $guardian["guardian_num"],
        "boardPosition" => $siteId
      )
    );
  }

  public function setGuardianToPlayer($guardianNum, $playerId, $notif) {
    $boonOrders = $this->game->getObjectListFromDb("SELECT deckorder FROM guardian WHERE in_hand = $playerId AND ready = 1 ORDER BY deckorder");
    $newOrder = (count($boonOrders) > 0) ? (end($boonOrders)["deckorder"] + 1) : 0;
    $this->game->DbQuery("UPDATE guardian SET in_hand = $playerId, ready = 1, deckorder = $newOrder, at_location = NULL WHERE num = $guardianNum");
    $this->game->notifyAllPlayers("overcomeGuard", $notif["msg"],
      array(
      "player_name" => $this->game->getCurrentPlayerName(),
      "playerId" => $this->game->getCurrentPlayerId(),
      "guardNum" => $guardianNum
      )
    );
  }

  public function setGuardianBoonUsed($guardianNum, $notif) {
    $this->game->DbQuery("UPDATE guardian SET ready = 0, deckorder = NULL WHERE num = $guardianNum");
    $this->game->notifyAllPlayers("useGuard", $notif["msg"],
      array(
        "player_name" => $this->game->getActivePlayerName(),
        "player_id" => $this->game->getActivePlayerId(),
        "guardNum" => $guardianNum
    ));
  }

  public function createBoardPositions($boardPositions) {
    foreach ($boardPositions as $i => $position) {
      $slot2 = ($position["numSlots"] == 2) ? "NULL" : "-1";
      $idol = is_null($position["idol"]) ? "NULL" : "'".$position["idol"]."'";
      $this->game->DbQuery("INSERT INTO board_position (idboard_position, slot2, idol_bonus) VALUES ($i, $slot2, $idol)");
    }
  }

  public function createLocations($locations, $size, $inDeck) {
    foreach($locations as $order => $num) {
      $orderStr = $inDeck ? $order : "NULL";
      $positionStr = $inDeck ? "NULL" : $order;
      $this->game->DbQuery("INSERT INTO location (is_at_position, size, num, deck_order) VALUES ($positionStr, '$size', $num, $orderStr)");
    }
  }

  public function createGuardians($guardianIds) {
    foreach($guardianIds as $order => $id) {
      $this->game->DbQuery("INSERT INTO guardian (num, deckorder) VALUES ($id, $order)");
    }
  }

  public function getAllResearchBonus() {
    $bonuses = $this->game->getObjectListFromDb("SELECT idresearch_bonus id, track_pos, bonus_type FROM research_bonus ORDER by track_pos");
    foreach ($bonuses as $idx => $bonus) {
      $bonuses[$idx]["track_pos"] = intval($bonus["track_pos"]);
    }
    return $bonuses;
  }

  public function getResearchBonus($trackPos) {
    return $this->game->getObjectListFromDb("SELECT idresearch_bonus id, bonus_type FROM research_bonus WHERE track_pos = $trackPos");
    foreach ($bonuses as $idx => $bonus) {
      $bonuses[$idx] = intval($bonus["track_pos"]);
    }
    return $bonuses;
  }
  
  public function getResearchBonusFromId($researchId) {
    $bonus = $this->game->getObjectFromDB("SELECT track_pos, bonus_type FROM research_bonus WHERE idresearch_bonus = $researchId");
    if (!is_null($bonus)) {
      $bonus["track_pos"] = intval($bonus["track_pos"]);
    }
    return $bonus;
  }

  public function removeResearchToken($id) {
    $this->game->DbQuery("DELETE FROM research_bonus WHERE idresearch_bonus = $id");
    $this->game->notifyAllPlayers("removeResearchToken", "", array("tokenId" => $id));
  }

  public function createResearchTokens($positions, $bonuses) {
    foreach ($positions as $idx => $position) {
      $bonus = $bonuses[$idx];
      $this->game->DbQuery("INSERT INTO research_bonus (track_pos, bonus_type) VALUES ($position, '$bonus')");
    }
  }

  public function getAllTempleTiles () {
    $tiles = $this->game->getCollectionFromDb("SELECT idtemple_tile id, amt amt FROM temple_tile");
    foreach ($tiles as $idx => $tile) {
      $tiles[$idx]["amt"] = intval($tile["amt"]);
    }
    return $tiles;
  }

  public function getTempleTileAmt ($id) {
    $tile = $this->game->getObjectFromDB("SELECT amt FROM temple_tile WHERE idtemple_tile = $id");
    return is_null($tile) ? NULL : intval($tile["amt"]);
  }

  public function decreaseTempleTileAmt($id, $notif) {
    $this->game->DbQuery("UPDATE temple_tile SET amt = amt - 1 WHERE idtemple_tile = $id");
    $this->game->notifyAllPlayers("getTempleTile", $notif["msg"],
      array(
        "player_name" => $this->game->getActivePlayerName(),
        "player_id" => $this->game->getActivePlayerId(),
        "colorText" => $notif["colorText"],
        "id" => $id,
        "i18n" => ["colorText"]
      )
    );
  }

  public function createTempleTiles($amt) {
    for ($tileId = 1; $tileId <= 6; ++$tileId) {
      $this->game->DbQuery("INSERT INTO temple_tile (idtemple_tile, amt) VALUES ($tileId, $amt)");
    }
  }
}
?>