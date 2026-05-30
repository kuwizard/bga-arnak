<?php

class GameData {
  public function __construct($game) {
    $this->game = $game;
  }

  public function cardName($type, $no) {
    if ($type == "art" || $type == "item") {
      return $this->game->material["cards"][$type][$no]["name"];
    }
    else {
      return $this->game->material["cards"]["basic"][$type]["name"];
    }
  }

  public function cardCost($type, $no) {
    if ($type == "art" || $type == "item") {
      return $this->game->material["cards"][$type][$no]["cost"];
    }
    else {
      return $this->game->material["cards"]["basic"][$type]["cost"];
    }
  }

  public function cardTravel($type, $no) {
    if ($type == "art" || $type == "item") {
      return $this->game->material["cards"][$type][$no]["travel"];
    }
    else {
      return $this->game->material["cards"]["basic"][$type]["travel"];
    }
  }

  public function cardPoints($type, $no) {
    if ($type == "art" || $type == "item") {
      return $this->game->material["cards"][$type][$no]["points"];
    }
    else {
      return $this->game->material["cards"]["basic"][$type]["points"];
    }
  }

  public function siteTravelCost($no, $slot) {
    $travelCosts = $this->game->birdTemple() ? $this->game->material["birdTravelCost"] : $this->game->material["snakeTravelCost"];
    return $travelCosts[$no][$slot];
  }

  public function guardianCost($num) {
    return $this->game->material["guardians"][$num]["cost"];
  }

  public function guardianBoon($num) {
    return $this->game->material["guardians"][$num]["boon"];
  }

  public function siteEffects($size, $num) {
    return $this->game->material["sites"][$size][$num];
  }

  public function researchCost($to) {
    $research = $this->game->birdTemple() ? $this->game->material["birdResearch"] : $this->game->material["snakeResearch"];
    return $research["squares"][$to]["cost"];
  }

  public function researchPossibilities($from) {
    $research = $this->game->birdTemple() ? $this->game->material["birdResearch"] : $this->game->material["snakeResearch"];
    return $research["squares"][$from]["possibilities"];
  }

  public function researchStep($spaceId) {
    $research = $this->game->birdTemple() ? $this->game->material["birdResearch"] : $this->game->material["snakeResearch"];
    return $research["squares"][$spaceId]["step"];
  }

  public function stepPoints($book, $step, $rank = 0) {
    $research = $this->game->birdTemple() ? $this->game->material["birdResearch"] : $this->game->material["snakeResearch"];
    if ($step < 7) {
      return $research["steps"][$step][$book?"book":"glass"]["points"];
    }
    else {
      return $research["lastSteps"][$rank];
    }
  }

  public function researchBonus($step, $book) {
    $research = $this->game->birdTemple() ? $this->game->material["birdResearch"] : $this->game->material["snakeResearch"];
    return $research["steps"][$step][$book?"book":"glass"]["bonus"];
  }

  public function templeTileCost($id) {
    $research = $this->game->birdTemple() ? $this->game->material["birdResearch"] : $this->game->material["snakeResearch"];
    return $research["tiles"][$id]["cost"];
  }

  public function templeTileColor($id) {
    $research = $this->game->birdTemple() ? $this->game->material["birdResearch"] : $this->game->material["snakeResearch"];
    return $research["tiles"][$id]["color"];
  }

  public function templeTilePoints($id) {
    $research = $this->game->birdTemple() ? $this->game->material["birdResearch"] : $this->game->material["snakeResearch"];
    return $research["tiles"][$id]["points"];
  }
}

?>