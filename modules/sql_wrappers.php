<?php

class SqlWrapper {

  public function __construct($game) {
    $this->game = $game;
    $this->cardFeildMapping = array(
      "idcard" => "id",
      "deck_order" => "deckOrder",
      "card_type" => "type",
      "num" => "num",
      "card_position" => "position",
      "player" => "playerId"
    );
  }

  public function getPublicCards($player_id = NULL, $position = NULL, $type = NULL) {
    $fields = ["idcard", "card_type", "num", "deck_order"];
    return $this->getCardsFromFields($player_id, $position, $type, $fields);
  }

  public function getCards($player_id = NULL, $position = NULL, $type = NULL) {
    $fields = ["idcard", "deck_order", "card_type", "num", "card_position", "player"];
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

  public function moveCard($card, $playerId, $position, $high = true) {
    $cards = $this->getCards($playerId, $position);
    $nextOrder = 0;
    if (count($cards) > 0) {
      if ($high) {
        $nextOrder = end($cards)["deckOrder"] + 1;
      }
      else {
        $nextOrder = $cards[0]["deckOrder"] - 1;
      }
    }
    $player_str = $playerId ? $playerId : "NULL";
    $id = $card['id'];
    $this->game->DbQuery("UPDATE card SET player = $player_str, card_position = '$position', deck_order = $nextOrder WHERE idcard = $id");

    return $nextOrder;
  }

  public function moveCards($playerId, $from, $to) {
    $this->game->DbQuery("UPDATE card SET player = $playerId, card_position = '$to' WHERE player = $playerId  AND card_position = '$from'");
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
}
?>