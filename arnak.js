/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * arnak implementation : © <Adam Spanel> <adam.spanel@seznam.cz>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * arnak.js
 *
 * arnak user interface script
 *
 * In this file, you are describing the logic of your user interface, in Javascript language.
 *
 */
const BOOT = 1;
const SHIP = 2;
const CAR = 3;
const PLANE = 4;

define([
  "dojo","dojo/_base/declare",
  "ebg/core/gamegui",
  "ebg/counter",
  g_gamethemeurl + "modules/tooltips.js",
],
function (dojo, declare) {
  return declare("bgagame.arnak", ebg.core.gamegui, {
    constructor: function(){

      // Here, you can init the global variables of your user interface
      // Example:
      // this.myGlobalValue = 0;

    },
    fsr(log, args) {
      return this.format_string_recursive(log, args);
    },

    /*
      setup:

      This method must set up the game user interface according to current game situation specified
      in parameters.

      The method is called each time the game interface is displayed to a player, ie:
      _ when the game starts
      _ when a player refreshes the game page (F5)

      "gamedatas" argument contains all datas retrieved by your "getAllDatas" PHP method.
    */
    siteBoxes: [
      {x: 2, y: 74.5, w: 11.7, h: 9.5, size: "basic"},
      {x: 15, y: 72.7, w: 11.7, h: 9.5, size: "basic"},
      {x: 28, y: 71.3, w: 11.7, h: 9.5, size: "basic"},
      {x: 41.1, y: 72.7, w: 11.7, h: 9.5, size: "basic"},
      {x: 54.1, y: 74.5, w: 11.7, h: 9.5, size: "basic"},

      {x: 3, y: 57.2, w: 12.5, h: 10, size: "small"},
      {x: 19.7, y: 53.8, w: 12.5, h: 10, size: "small"},
      {x: 36.3, y: 56, w: 12.5, h: 10, size: "small"},
      {x: 52.3, y: 56.6, w: 12.5, h: 10, size: "small"},

      {x: 2.5, y: 40.4, w: 12.5, h: 10, size: "small"},
      {x: 19.1, y: 39.2, w: 12.5, h: 10, size: "small"},
      {x: 35.1, y: 41.6, w: 12.5, h: 10, size: "small"},
      {x: 52.8, y: 41.8, w: 12.5, h: 10, size: "small"},

      {x: 1.6, y: 22.4, w: 14.9, h: 10.8, size: "big"},
      {x: 18.1, y: 21.4, w: 14.9, h: 10.8, size: "big"},
      {x: 34.8, y: 19.6, w: 14.9, h: 10.8, size: "big"},
      {x: 51.1, y: 22.6, w: 14.9, h: 10.8, size: "big"},

    ],
    researchBoxes: [[
      {x: 67, y: 87.5, w: 33, h: 3},
      {x: 68, y: 79.7, w: 14, h: 5.5},
      {x: 83.5, y: 79.7, w: 10.5, h: 5.5},
      {x: 67.5, y: 72.7, w: 10.1, h: 5.6},
      {x: 78.5, y: 72.5, w: 15.7, h: 5.6},

      {x: 67.2, y: 64.7, w: 27.1, h: 5.6},
      {x: 67.7, y: 57.9, w: 8, h: 5.2},
      {x: 77.3, y: 57.9, w: 8, h: 5.2},
      {x: 86.6, y: 57.9, w: 8, h: 5.2},
      {x: 67.2, y: 51.0, w: 27.1, h: 5.3},

      {x: 68, y: 44.2, w: 10.2, h: 5.3},
      {x: 80, y: 44.2, w: 14.2, h: 5.3},
      {x: 68, y: 37.7, w: 15.2, h: 5.3},
      {x: 85, y: 37.7, w: 9.2, h: 5.3},
      {x: 68, y: 31.7, w: 31.6, h: 4},

      ]
      ,
      [
      {x: 67, y: 87.5, w: 33, h: 3},
      {x: 68, y: 80.7, w: 12, h: 4.5},
      {x: 81.5, y: 80.7, w: 12.5, h: 4.5},
      {x: 67.5, y: 73.7, w: 8.1, h: 4.6},
      {x: 76.8, y: 73.7, w: 8.1, h: 4.6},

      {x: 86.2, y: 73.7, w: 8.1, h: 4.6},
      {x: 67.2, y: 66.7, w: 13, h: 4.6},
      {x: 81.5, y: 66.7, w: 12.5, h: 4.6},
      {x: 67.5, y: 58.4, w: 26.5, h: 6},
      {x: 67.5, y: 51.7, w: 14.5, h: 5},

      {x: 83.5, y: 51.7, w: 10.5, h: 5},
      {x: 67.5, y: 44.7, w: 8.5, h: 5},
      {x: 77.5, y: 44.7, w: 16.5, h: 5},
      {x: 67.5, y: 37.7, w: 26.5, h: 5},
      {x: 67.5, y: 32.2, w: 26.5, h: 4},
      ]
    ],
    siteTravelCost: function(no, birdSide) {
      if (birdSide) {
        var costs = [
          [[BOOT], [BOOT, BOOT]],
          [[BOOT], [BOOT, BOOT]],
          [[BOOT], [BOOT, BOOT]],
          [[BOOT], [BOOT, BOOT]],
          [[BOOT], [BOOT, BOOT]],

          [[CAR]],
          [[CAR]],
          [[SHIP]],
          [[SHIP]],
          [[CAR]],
          [[CAR]],
          [[SHIP]],
          [[SHIP]],

          [[CAR, CAR]],
          [[CAR, CAR]],
          [[SHIP, SHIP]],
          [[SHIP, SHIP]]
        ];
      }
      else {
        var costs = [
          [[BOOT], [BOOT, BOOT]],
          [[BOOT], [BOOT, BOOT]],
          [[BOOT], [BOOT, BOOT]],
          [[BOOT], [BOOT, BOOT]],
          [[BOOT], [BOOT, BOOT]],

          [[CAR]],
          [[CAR]],
          [[SHIP]],
          [[SHIP]],
          [[CAR]],
          [[BOOT, BOOT]],
          [[PLANE]],
          [[SHIP]],

          [[CAR, CAR]],
          [[BOOT, PLANE]],
          [[SHIP, CAR]],
          [[SHIP, SHIP]]
        ];
      }
      return costs[no];
    },
    restoreGlobals: function() {
      this.chartsSelected = undefined;
      this.siteSelected = undefined;
      this.travelSelected = [];
      this.knifeBonuses = {};
      this.keep = [];
      this.turnEnded = false;
      this.relocateFrom = undefined;
      this.relocateToArt = undefined;
    },
    setup: function( gamedatas )
    {
      window.close = function() {};  // I am so sorry...
      this.undoable = true;
      dojo.destroy(dojo.byId("aidbutton"));
      var aidButton = dojo.create("a", {class: "action-button bgabutton bgabutton_blue", "id": "aidbutton"});
      aidButton.innerHTML = _("Toggle player aid");
      dojo.connect(aidButton, "click", this, "togglePlayerAid");

      dojo.place(aidButton, dojo.query("#maintitlebar_content > div")[0], "first");

      this.restoreGlobals();
      this.hand = [];
      this.play = [];
      this.artSupply = [];
      this.itemSupply = [];
      this.tooltips = new Tooltips();
      this.tooltipDelay = 700;

      if (gamedatas.bird_temple) {
        this.dontPreloadImage('board-back.jpg');
      }
      else {
        this.dontPreloadImage('board-front.jpg');
      }

      var board = dojo.query(".arnak-board")[0];
      dojo.addClass(board, gamedatas.bird_temple ? "front" : "back");
      this.current_player_color = this.playerColor(this.player_id);
      dojo.addClass(dojo.query(".player-camp")[0], this.current_player_color + " camp-" + this.player_id);
      dojo.query(".player-area").addClass("area-" + this.player_id);
      // Setting up player boards
      for (var player_id in gamedatas.players) {
        if (player_id != this.player_id) {
          var newArea = this.campDiv(player_id);
          dojo.place(newArea, dojo.query(".arnak-wrap")[0]);
        }
      }
      for (var player_id in gamedatas.players) {
        var player = gamedatas.players[player_id];
        var color = this.playerColor(player_id);
        var glassDiv = dojo.create("div");
        dojo.addClass(glassDiv, "research-token research-glass " + this.playerColor(player_id));
        glassDiv.id = "research-glass-" + player_id;
        dojo.place(glassDiv, board);
        var bookDiv = dojo.create("div");
        dojo.addClass(bookDiv, "research-token research-book " + this.playerColor(player_id));
        bookDiv.id = "research-book-" + player_id;
        dojo.place(bookDiv, board);

        player.meeple = 2;
        var handDiv = dojo.query(".camp-" + player_id)[0];
        player.play = Object.values(player.play);
        if (player_id == this.player_id) {
          player.hand = Object.values(player.hand);
          this.hand = player.hand;

          this.play = player.play;
        }
        var x = -30;
        var y = -140;
        //var scaleRatio = 0.45;


        for (var i = 0; i < player.deck_amt; ++i) {
          var cardDiv = this.cardDiv({type: "back"});
          dojo.place(cardDiv, handDiv);
          this.deckTransform(cardDiv);
        }
        if (player_id != this.player_id) {
          var handAmtDiv = dojo.create("div", {class: "hand-amt"});
          handAmtDiv.innerHTML = this.fsr(_("${player_name} has ${n} cards in hand"), {
            'player_name' : "<span class='player-name'>" + player.name + " </span>",
            'n' : "<span class='hand-amt-num' id='hand-amt-" + player.id + "'>0</span>",
          });
          dojo.place(handAmtDiv, handDiv)
        }
        dojo.query(".camp-" + player_id + " .deck-amt")[0].innerHTML = player.deck_amt;

        this.updateResources(player_id);
        for (var p of gamedatas.board_position) {
          player.meeple -= p.slot1 == player_id;
          player.meeple -= p.slot2 == player_id;
        }
        var playerBoard = dojo.query("#player_board_" + player_id)[0];
        if (gamedatas.turn_based) {
          dojo.place(dojo.create("button", {class: "display-deck", id: "display-deck-" + player_id, "data-id": player_id, innerHTML: _("Display player's deck")}), playerBoard);
        }
        if (this.player_id == player_id) {
          dojo.place(dojo.create("button", {class: "display-discard", id: "display-discard", "data-id": player_id, innerHTML: _("Display discarded items")}), playerBoard);
        }
        var resWrap = dojo.create("div");
        var meepleWrap = dojo.create("div", {class: "counter-wrap meeple", id: "counter-" + player_id + "-meeple"});
        dojo.place(resWrap, playerBoard);
        dojo.addClass(resWrap, "res-wrap");
        for (var resName of ["coins", "compass", "tablet", "arrowhead", "jewel", "idol", "idol_slot", "guardian", "handsize"]) {
          var counterWrap = dojo.create("div");
          var id = "counter-" + player_id + "-" + resName;
          counterWrap.id = id;
          dojo.addClass(counterWrap, "counter-wrap " + resName);
          var counterImage = dojo.create("div");
          dojo.addClass(counterImage, "counter icon " + resName + " " + color);
          var counterNumber = dojo.create("span");
          counterNumber.innerHTML = player[resName] || 0;
          dojo.addClass(counterNumber, "counter-number-" + resName);
          dojo.place(counterNumber, counterWrap);
          dojo.place(counterImage, counterWrap);
          dojo.place(counterWrap, resWrap);

          this.addTooltipHtml(id, this.tooltips.resource(resName), this.tooltipDelay);
        }
        var templeWrap = dojo.create("div", {class: "temple-wrap"});
        dojo.place(templeWrap, playerBoard);
        for (var color of ["gold", "silver", "bronze"]) {
          for (var i = 0; i < player["temple_" + color]; ++i) {
            var tileN = Math.floor(Math.random() * {"gold": 4, "silver": 6, "bronze": 8}[color] + 1);
            dojo.place(dojo.create("div", {class: "temple-tile tile-num-" + tileN + " " + color}), templeWrap);
          }
        }


        dojo.place(meepleWrap, resWrap);
        this.addTooltipHtml("counter-" + player_id + "-meeple", this.tooltips.resource("meeple"), this.tooltipDelay);
        this.updatePlayerCards(player_id);

        if (this.player_id == player_id) {
          var layoutButtonWrap = dojo.create("div", {class: "layout-button-wrap", innerHTML: _("Layout:")});
          var button = dojo.create("button", {class: "layout-button layout-twoCol", innerHTML: "█ █"});
          dojo.connect(button, "click", this, "layoutTwocol");
          dojo.place(button, layoutButtonWrap);
          var button = dojo.create("button", {class: "layout-button layout-oneCol", innerHTML: "█"});
          dojo.connect(button, "click", this, "layoutOnecol");
          dojo.place(button, layoutButtonWrap);
          var button = dojo.create("button", {class: "layout-button layout-auto layout-selected", innerHTML: _("auto")});
          dojo.connect(button, "click", this, "layoutAuto");
          dojo.place(button, layoutButtonWrap);
          dojo.place(layoutButtonWrap, playerBoard);


          var cb = dojo.create("input", {type: "checkbox", class: "endturn-auto-button", id: "endturn-auto-button", checked: this.prefs[102].value == 1});
          dojo.connect(cb, "click", this, "endturnAuto");
          dojo.place(cb, playerBoard);
          dojo.place(dojo.create("label", {innerHTML: _("End turn automatically after main action"), for: "endturn-auto-button"}), playerBoard);
        }

        if (gamedatas.start_player == player_id) {
          var clockDiv = dojo.create("div", {id: "start-player"});
          var clockInner = dojo.create("div")
          dojo.place(clockInner, clockDiv);
          dojo.place(clockDiv, playerBoard);
        }
        for (var assistant of player.assistants) {
          var assDiv = this.assistantDiv(assistant.num, assistant.gold, assistant.ready);
          dojo.place(assDiv, handDiv);
          this.addTooltipHtml(assDiv.id, this.tooltips.assistant(assistant.num, assistant.gold == 1 ? true : false));
        }
        for (var idolBonus of ["jewel", "arrowhead", "tablet", "coins", "card"]) {
          var div = dojo.query(".idol-bonus.bonus-" + idolBonus, handDiv)[0];
          div.id = "idol-bonus-" + idolBonus + "-" + player_id;
          this.addTooltipHtml(div.id, this.tooltips.idolBonus(idolBonus), this.tooltipDelay);
        }

        this.updatePlayerGuards(player_id);

        if (player.passed === "1") {
          this.playerPass(player_id);
        }
      }
      this.addTooltipHtml("arn-staff", "<h3>" + this.tooltips.staff.header + "</h3><div>" + this.tooltips.staff.text + "</div>", this.tooltipDelay);
      this.addTooltipHtml("start-player", "<h3>" + this.tooltips.startPlayer.header + "</h3><div>" + this.tooltips.startPlayer.text + "</div>", this.tooltipDelay);

      this.makeMeeple();

      var playerMeeples = [];
      for(var player of Object.values(this.gamedatas.players))
        playerMeeples[player.id] = player.meeple;

      this.itemSupply = Object.values(gamedatas.itemSupply);
      this.artSupply = Object.values(gamedatas.artSupply);
      this.updateSupply();
      //dojo.query(".hand.card, .play.card").connect("click", this, "handClick");
      dojo.addClass(dojo.query(".staff-parent")[0], "round" + gamedatas.round);

      var id = 0;
      for (var b of this.siteBoxes) {
        var box = dojo.create("div");
        dojo.addClass(box, "site-box");
        dojo.place(box, board);

        dojo.style(box, "left", b.x + "%");
        dojo.style(box, "top", b.y + "%");
        dojo.style(box, "height", b.h + "%");
        dojo.style(box, "width", b.w + "%");

        box.dataset.id = id;
        box.id = "site-box-" + id;
        var currPos = gamedatas.board_position[id];
        for (var slot of ["slot1", "slot2"]) {
          var playerId = currPos[slot];
          if (playerId && playerId != -1) {
            var meepleDiv = dojo.create("div");
            dojo.addClass(meepleDiv, "onboard meeple meeple-" + (playerMeeples[playerId]++) + " " + this.playerColor(playerId));
            meepleDiv.dataset.position = id;
            meepleDiv.dataset.slot = (slot === "slot1" ? 1 : 2);

            dojo.place(meepleDiv, board);
            var p = this.workerPosition(id, slot === "slot1" ? 1 : 2);
            dojo.style(meepleDiv, "left", p.x + "px");
            dojo.style(meepleDiv, "top", p.y + "px");
          }
          if (playerId && playerId == -1 && id < 5) {
            var blockDiv = dojo.create("div");
            dojo.addClass(blockDiv, "blocking-tile");
            blockDiv.dataset.position = id;
            var p = this.workerPosition(id, slot === "slot1" ? 1 : 2);
            dojo.style(blockDiv, "left", (p.x + 2) + "px");
            dojo.style(blockDiv, "top", p.y + "px");
            dojo.place(blockDiv, board);
          }
        }


        if (currPos.idol_bonus !== "" && currPos.idol_bonus) {
          var idolDiv = dojo.create("div");
          dojo.addClass(idolDiv, "idol " + currPos.idol_bonus);
          idolDiv.dataset.bonus = currPos.idol_bonus;
          idolDiv.dataset.id = id;
          dojo.place(idolDiv, box);
          if (id >= 13) {
            var idolDiv = dojo.create("div");
            dojo.addClass(idolDiv, "idol back");
            idolDiv.dataset.id = id;
            dojo.place(idolDiv, box);
          }
        }
        var site = Object.values(gamedatas.locations).filter(a => a.position == id)[0];
        var guard = Object.values(gamedatas.guardians).filter(a => a.at_location == id)[0];
        //this.addTooltipHtml(box.id, this.tooltips.siteBox(b, site, guard, gamedatas.bird_temple));

        ++id;
      }
      id = 0;

      for (var assistant of Object.values(gamedatas.assistants)) {
        if (assistant) {
          var assDiv = this.assistantDiv(assistant.num, assistant.gold, assistant.ready);

          dojo.addClass(assDiv, "position-" + assistant.in_offer);
          dojo.place(assDiv, board);
          this.addTooltipHtml(assDiv.id, this.tooltips.assistant(assistant.num, false, assistant.deckHeight));
        }
      }
      dojo.query(".assistant").connect("click", this, "assistantClick");

      this.updateResearchTrack();

      gamedatas.research_bonus = Object.values(gamedatas.research_bonus);
      for (var b of this.researchBoxes[gamedatas.bird_temple ? 0:1]) {
        var box = dojo.create("div");
        dojo.addClass(box, "research-box");
        box.dataset.research_id = id;
        box.id = "research-box-" + id;
        dojo.place(box, board);

        dojo.style(box, "left", b.x + "%");
        dojo.style(box, "top", b.y + "%");
        dojo.style(box, "height", b.h + "%");
        dojo.style(box, "width", b.w + "%");
        var currSlotBonuses = gamedatas.research_bonus.filter(a => a.track_pos == id);
        for (var bonus of currSlotBonuses) {
          var bonusDiv = dojo.create("div");
          bonusDiv.dataset.id = bonus.idresearch_bonus;
          bonusDiv.dataset.type = bonus.bonus_type;
          dojo.addClass(bonusDiv, "research-bonus reward-" + bonus.bonus_type);
          dojo.place(bonusDiv, box);
        }
        this.addTooltipHtml(box.id, this.tooltips.research(b, currSlotBonuses, gamedatas.bird_temple, id), this.tooltipDelay);
        ++id;


        //dojo.place(box, board);
      }
      var y = 850;
      for (var step = 1; step <= 7; ++step) {
        for (var type of ["book", "glass"]) {
          var id = type + "-tooltip-" + step;
          var div = dojo.create("div", {class: 'research-bonus-tooltip', id: id});
          div.style.top = y + "px";
          dojo.place(div, board);
          this.addTooltipHtml(id, this.tooltips.researchBonus(type, step, gamedatas.bird_temple));

          if (type == "glass") {
            y -= 39;
          }
          else {
            y -= 34;
          }
        }
      }

      dojo.query(".research-box").connect("click", this, "researchClick");

      for (var templeTile of Object.values(gamedatas.temple_tile)) {
        if (templeTile.amt == "0") {
          continue;
        }
        var color = "bronze";
        var id = templeTile.id;
        if (id > 3) {
          color = "silver";
        }
        if (id == 6) {
          color = "gold";
        }
        var picAmt = {"gold": 4, "silver": 8, "bronze": 8}[color];
        var templeWrap = dojo.create("div", {class: "temple-tile-wrap tile-pos-" + templeTile.id, "data-num": id});
        templeWrap.id = "temple-tile-wrap-" + templeTile.id;
        var templeDiv = dojo.create("div", {class: "temple-tile " + color + " tile-num-" + Math.ceil(Math.random() * picAmt), "data-num": id});
        dojo.place(templeDiv, templeWrap);
        dojo.place(templeWrap, board);
        dojo.connect(templeWrap, "click", this, "templeClick");
      }
      this.updateTempleTooltips();

      for (var site of Object.values(gamedatas.locations)) {
        this.newSite(site.size, site.num, site.position);
      }
      for (var guard of Object.values(gamedatas.guardians)) {
        if(!guard.in_hand)
          this.newGuard(guard.at_location, guard.num);
      }
      this.updateSiteTooltips();

      dojo.query(".site-box").connect("click", this, "siteClick");
      dojo.query(".idol-bonus").connect("click", this, "clickIdolBonus");
      dojo.query(".idol-highlight-box").connect("click", this, "highlightIdol");
      dojo.query(".display-deck").connect("click", this, "displayDeck");
      dojo.query(".display-discard").connect("click", this, "displayDiscard");

      // Setup game notifications to handle (see "setupNotifications" method below)
      this.setupNotifications();
    },
    highlightIdol: function() {
      dojo.query(".idol-bonus").addClass("idol-highlight");
      setTimeout(function() {dojo.query(".idol-highlight").removeClass("idol-highlight");}, 500);
    },
    makeMeeple: function(full = false) {
      for (var player of Object.values(this.gamedatas.players)) {
        for (var i = 0; i < (full ? 2 : player.meeple); ++i) {
          var player = this.gamedatas.players[player.id];
          var color = this.playerColor(player.id);
          var handDiv = dojo.query(".camp-" + player.id)[0];

          var meepleDiv = dojo.create("div");
          dojo.addClass(meepleDiv, "meeple meeple-" + i + " " + color);
          dojo.place(meepleDiv, handDiv);

          this.addOverviewMeeple(player.id);
        }
      }
    },
    addOverviewMeeple(playerId) {
      var resWrap = dojo.query("#player_board_" + playerId + " .counter-wrap.meeple")[0];
      var color = this.playerColor(playerId);
      var overviewMeeple = dojo.create("div", {class: "meeple " + color});
      dojo.place(overviewMeeple, resWrap);
    },
    playerColor: function(playerId) {
      return {
        "ff0000": "red",
        "008000": "green",
        "0000ff": "blue",
        "ffa500": "yellow"
      }[this.gamedatas.players[playerId]?this.gamedatas.players[playerId].color : undefined];
    },
    campDiv: function(playerId) {
      var newArea = dojo.query(".player-area")[0].cloneNode(true);
      var newCamp = dojo.query(".player-camp", newArea)[0];
      dojo.addClass(newArea, "area-" + playerId);
      dojo.removeClass(newCamp);
      dojo.addClass(newCamp, "player-camp opp-camp camp-" + playerId + " " + this.playerColor(playerId));
      dojo.addClass(newArea, "opp-area")
      return newArea;
    },
    cardDiv: function(card, playerId = this.player_id) {
      var wrap = dojo.create("div");
      var flipWrap = dojo.create("div");
      var rotateWrap = dojo.create("div");
      var result = dojo.create("div");
      var front = dojo.create("div");
      var back = dojo.create("div");
      dojo.addClass(front, "card front");
      dojo.addClass(result, "card card-outer");
      dojo.addClass(back, "card back");
      dojo.addClass(wrap, "card-wrap");
      dojo.addClass(flipWrap, "card-flip-wrap");
      dojo.addClass(rotateWrap, "card-rotate-wrap");
      result.id = "card-" + card.id;

      result.dataset.cardid = card.id;
      result.dataset.cardnum = card.num;
      result.dataset.cardtype = card.type;
      this.addCardClass(front, card.type, card.num, playerId);
      if (card.type === "back") {
        dojo.addClass(flipWrap, "flipped");
      }
      dojo.place(front, flipWrap);
      dojo.place(back, flipWrap);
      dojo.place(flipWrap, rotateWrap);
      dojo.place(rotateWrap, wrap);
      dojo.place(wrap, result);

      return result;
    },
    assistantDiv: function(num, gold, ready) {
      var assDiv = dojo.create("div");
      dojo.addClass(assDiv, "assistant");
      assDiv.id = "assistant-" + num;

      var rotateWrap = dojo.create("div");
      dojo.addClass(rotateWrap, "assistant-inner assistant-" +num + " " + (gold == "1" ? "gold" : "silver") + " " + (ready == "1" ? "ready" : "exhausted"));
      assDiv.dataset.num = num;
      dojo.place(rotateWrap, assDiv);
      return assDiv;
    },
    newSite: function(size, num, position) {
      var board = dojo.query(".arnak-board")[0];
      var siteWrap = dojo.create("div");
      siteWrap.dataset.position = position;
      dojo.addClass(siteWrap, "location-wrap " + size);
      var siteDiv = dojo.create("div");
      siteDiv.dataset.num = num;
      siteDiv.dataset.size = size;
      var size = size;
      dojo.addClass(siteDiv, "location " + size + " location-" + num + " location-position-" + position);
      siteDiv.id = "site-" + size + "-" + num;
      dojo.place(siteDiv, siteWrap);

      if (position.type) {
        var cardDiv = dojo.query(".card[data-cardtype='art'][data-cardnum=" + position.id + "]")[0];
        var left = dojo.style(cardDiv, "left");
        var top = dojo.style(cardDiv, "top");
        siteWrap.style.left = left + "px";
        siteWrap.style.top = top + "px";
        siteWrap.style.transform = "scale(0.7)";

        dojo.place(siteWrap, cardDiv.parentNode);
        setTimeout(function(el, app) {app.fadeOutAndDestroy(el);}, 4500, siteWrap, this);
      }
      else {
        dojo.style(siteWrap, "left", this.siteBoxes[position].x + "%");
        dojo.style(siteWrap, "top", this.siteBoxes[position].y + "%");
        dojo.place(siteWrap, board);
      }
    },
    handGuard: function(num) {
      var result = dojo.create("div");
      var inner = dojo.create("div");
      dojo.addClass(result, "guardian-hand-wrap");
      if ([1, 3, 4, 9, 10, 12, 13, 15].indexOf(+num) > -1) {
        dojo.addClass(inner, "small");
      }
      dojo.addClass(inner, "guardian-hand guardian guardian-" + num);
      dojo.connect(inner, "click", this, "guardEffect");
      inner.dataset.num = num;
      dojo.place(inner, result);
      return result;
    },
    newGuard: function(position, num) {
      var siteWrap = dojo.query(".location-wrap[data-position=" + position + "]")[0];
      if (!siteWrap) {
        console.log("Trying to put guardian to undiscovered location. Weird");
        return;
      }
      var guardDiv = dojo.create("div");
      var guardWrap = dojo.create("div");
      guardWrap.dataset.num = num;
      dojo.addClass(guardDiv, "guardian guardian-" + num);
      guardDiv.id = "guardian-" + num;
      dojo.addClass(guardWrap, "guardian-wrap guardian-" + num);
      dojo.place(guardDiv, guardWrap);
      dojo.place(guardWrap, siteWrap);
    },
    addCardClass(frontDiv, type, num, playerId = this.player_id) {
      frontDiv.className = "card front " + this.playerColor(playerId);
      switch(type) {
        case "exploreship":
          dojo.addClass(frontDiv, "exploration ship");
          break;
        case "explorecar":
          dojo.addClass(frontDiv, "exploration car");
          break;
        case "fundship":
          dojo.addClass(frontDiv, "funding ship");
          break;
        case "fundcar":
          dojo.addClass(frontDiv, "funding car");
          break;
        case "fear":
          dojo.addClass(frontDiv, "fear");
          break;
        case "back":
          dojo.addClass(frontDiv, "blank");

          break;
        case "art": case "item":
          dojo.addClass(frontDiv, type + " " + type + "-" + num);
      }
    },
    addScoringTable: function(notif) {
      if (dojo.query("#score-wrap").length) {
        return;
      }
      this.counters = {};
      var scoreWrap = dojo.create("div", {id: "score-wrap"});
      var scoreTable = dojo.create("table", {id: "score-table"});
      dojo.place(scoreTable, scoreWrap);
      var parent = dojo.query(".area-" + this.player_id)[0];
      if (parent) {
        dojo.place(scoreWrap, parent);
      }
      else {
        dojo.place(scoreWrap, dojo.query(".arnak-board")[0]);
      }
      for (var row of ["name", "research", "temple", "idols", "guardians", "cards", "fear", "total"]) {
        var tr = dojo.create("tr", {id: "score-" + row});
        dojo.place(tr, scoreTable);
        for (var p of Object.values(this.gamedatas.players)) {
          var tdId = "score-" + row + "-" + p.id;
          var td = dojo.create("td", {id: tdId});
          dojo.place(td, tr);
          if (row == "name") {
            this.counters[p.id] = {};
            td.innerHTML = p.name;
            td.style.color = "#" + p.color;
          }
          else {
            var c = new ebg.counter();
            c.create(tdId);
            c.setValue(0);
            this.counters[p.id][row] = c;
          }
        }
      }
    },
    updatePlayerCards: function(playerId, noHand = false) {
      var handAmt = this.gamedatas.players[playerId].hand_amt
      if (playerId == this.player_id) {
        if (!noHand) {
          this.updateHand(playerId);
        }
      }
      else {
        var numDiv = dojo.byId("hand-amt-" + playerId);
        numDiv.innerHTML = handAmt;
        dojo.query(".player-name", numDiv.parentNode)[0].style.color = "#" + this.gamedatas.players[playerId].color;
      }
      dojo.query("#player_board_" + playerId + " .counter-number-handsize")[0].innerHTML = handAmt;
      this.updatePlay(playerId);
    },
    updateHand: function(playerId = this.player_id) {
      var handDiv = dojo.query(".camp-" + playerId)[0];
      var areaDiv = dojo.query(".area-" + playerId)[0];
      dojo.removeClass(areaDiv, "hand-2row hand-3row");
      var x = 2;
      var dx = [0, 0, 29, 27, 21, 18][this.hand.length] || 18;
      var y = -90;
      var scaleRatio = 0.48;
      var z = 0;
      var cardsPlaced = 0;
      for (var card of this.hand) {
        if (cardsPlaced % 5 === 0 && cardsPlaced) {
          if (dojo.hasClass(areaDiv, "hand-2row")) {
            dojo.addClass(areaDiv, "hand-3row");
          }
          dojo.addClass(areaDiv, "hand-2row");
        }
        var cardDiv = dojo.query("#card-" + card.id, handDiv)[0];
        if (!cardDiv) {
          cardDiv = this.cardDiv(card);
          dojo.connect(cardDiv, "click", this, "handClick");
          dojo.place(cardDiv, handDiv);
        }
        this.addTooltipHtml("card-" + card.id, this.tooltips.card(card.type, card.num, this.playerColor(playerId)), this.tooltipDelay);

        dojo.style(cardDiv, "transform", "scale(" + scaleRatio + ", " + scaleRatio + ")")
        dojo.style(cardDiv, "left", x + "%");
        dojo.style(cardDiv, "top", y + "%");
        dojo.addClass(cardDiv, "hand");
        if (card.position == "earring") {
          dojo.addClass(cardDiv, "earring");
        }
        var f = dojo.query(".flipped", cardDiv)[0];
        if (f) {
          dojo.removeClass(f, "flipped");
        }
        dojo.query(".card-rotate-wrap", cardDiv).style("transform", "");
        x += dx;

        dojo.style(cardDiv, "z-index", z++);

        cardDiv.dataset.cardtype = card.type;
        cardDiv.dataset.cardnum = card.num;


        ++cardsPlaced;
        if (cardsPlaced % 5 === 0 && cardsPlaced) {
          x = 2;
          y -= 85;
        }
      }
    },
    updateWorkers: function() {
      var boardDiv = dojo.query(".player-camp")[0];
    },
    updateResources: function(playerId) {
      var campDiv = dojo.query(".camp-" + playerId)[0];
      var player = this.gamedatas.players[playerId];
      var empty = player.idol_slot;
      var idols = player.idol;
      var idolNum = 0;
      function addIdol(x, y) {
        var idolDiv = dojo.query(".idol-num-" + idolNum, campDiv)[0];
        if (!idolDiv) {
          idolDiv = dojo.create("div", {class: "idol-wrap idol-num-" + idolNum});
          dojo.place(dojo.create("div", {class: "idol back"}), idolDiv);
          dojo.place(idolDiv, campDiv);
        }
        ++idolNum;

        idolDiv.style.left = 312 + (x * 60.5) + "px";
        idolDiv.style.top = (17 + y * 70) + "px";
      }
      for (var i = 0; i < 4 - empty; ++i) {
        addIdol(i, 0);
      }
      var startx = (4 - empty) % 4;
      var y = 1;
      var x = startx;
      for (var i = 0; i < idols; ++i) {
        addIdol(x, y);
        x += 1;
        x %= 4;
        if (x == startx) {
          x = 0;
          startx = 0;
          y += 1;
        }
      }
      while (idolNum < 50) {
        var oldIdol = dojo.query(".idol-num-" + idolNum++, campDiv)[0];
        if (oldIdol) {
          dojo.destroy(oldIdol);
        }
        idolNum += 1;
      }
    },
    updatePlay: function(playerId) {
      var handDiv = dojo.query(".camp-" + playerId)[0];
      var areaDiv = dojo.query(".area-" + playerId)[0];
      dojo.removeClass(areaDiv, "play-2row play-3row");
      var x = 2;
      var play = this.gamedatas.players[playerId].play;
      var dx = [0,0, 25, 18, 17, 16, 15][play.length] || 15;
      var y = 110;
      var scaleRatio = 0.38;
      var z = 5;
      var pos = "last";
      if (this.gamedatas.gamestate.name == "gameEnd" || this.gamedatas.gamestate.name == "scoring") {
        pos = "first"
      }
      if (pos == "first") {
        z = 100;
      }
      var cardsPlaced = 0;
      for (var card of play) {
        if (cardsPlaced % 6 === 0 && cardsPlaced) {
          if (dojo.hasClass(areaDiv, "play-3row")) {
            dojo.addClass(areaDiv, "play-4row");
          }
          else if (dojo.hasClass(areaDiv, "play-2row")) {
            dojo.addClass(areaDiv, "play-3row");
          }
          dojo.addClass(areaDiv, "play-2row");
        }
        var cardDiv = dojo.byId("card-" + card.id);
        if (cardDiv) {
          if (cardDiv.classList.contains("supply")) {
            var newElement = cardDiv.cloneNode(true);
            cardDiv.parentElement.replaceChild(newElement, cardDiv);
            cardDiv = newElement;
          }
        }
        else {
          cardDiv = this.cardDiv(card, playerId);
          dojo.connect(cardDiv, "click", this, "handClick");

          dojo.place(cardDiv, handDiv, pos);
          this.addTooltipHtml("card-" + card.id, this.tooltips.card(card.type, card.num, this.playerColor(playerId)), this.tooltipDelay);
          if (card.justPlayed) {
            dojo.addClass(cardDiv, "just-played");
          }
        }
        if (dojo.query(".arnak-board #card-" + card.id)[0]) {
          dojo.place(cardDiv, handDiv, pos);
        }
        dojo.removeClass(cardDiv, "selected supply");

        var rx = (Math.random()-.5) * 0.5;
        var ry = (Math.random()-.5) * 0.2;
        var rr = (Math.random()-.5) * 5;

        dojo.style(cardDiv, "transform", "scale(" + scaleRatio + ", " + scaleRatio + ")");
        dojo.query(".card-rotate-wrap", cardDiv).style("transform", "rotate(" + rr + "deg)")
        dojo.style(cardDiv, "left", (x + rx) + "%");
        dojo.style(cardDiv, "top", (y + ry) + "%");
        dojo.style(cardDiv, "z-index", z);
        dojo.removeClass(cardDiv, "hand supply");
        dojo.addClass(cardDiv, "play");
        if (pos == "first") {
          --z;
        }
        else {
          ++z;
        }
        x += dx;
        ++cardsPlaced;
        if (cardsPlaced % 6 === 0) {
          x = 2;
          y += 70;
        }
      }
    },
    makeDiscards(cards, player_id) {
      var cardsDiv = dojo.create("div", {class: "discarded-cards"});
      var boardDiv = dojo.query(".area-" + this.player_id)[0];
      dojo.place(cardsDiv, boardDiv, "after");
      var x = 30;
      var y = 30;
      for (var card of cards) {
        card.type = "item";
        card.id = card.cardId;
        var cardDiv = this.cardDiv(card);

        dojo.connect(cardDiv, "click", this, "selectFromExile");
        dojo.place(cardDiv, cardsDiv);
        this.addTooltipHtml("card-" + card.id, this.tooltips.card(card.type, card.num), this.tooltipDelay);

        x += 110;
        if (x >= 600) {
          y += 180;
          cardsDiv.style.height = (y + 200) + "px";
          x = 30;
        }
      }

    },
    updatePlayerGuards(playerId) {
      var left = 356;
      var player = this.gamedatas.players[playerId];
      var handDiv = dojo.query(".player-camp.camp-" + playerId)[0];
      for (var guard of player.guardians_ready) {
        var guardChild = dojo.query(".guardian-hand.guardian-" + guard.num)[0];
        var guardDiv;
        if (!guardChild) {
          guardDiv = this.handGuard(guard.num);
          dojo.place(guardDiv, handDiv);
        }
        else {
          guardDiv = guardChild.parentNode;
        }
        guardDiv.style.left = left + "px";

        left -= dojo.query(".small", guardDiv)[0] ? 50 : 66;

        guardDiv.style.top = "";
        guardDiv.style.transform = "";
      }
    },
    updateSiteTooltips() {
      for (var positionId = 0; positionId < 17; ++positionId) {
        var wrap = dojo.query(".location-wrap[data-position=" + positionId + "]")[0];
        var site = undefined;
        var guard = undefined;
        if (wrap) {
          site = dojo.query(".location", wrap)[0];
          guard = dojo.query(".guardian-wrap", wrap)[0];
        }
        this.addTooltipHtml("site-box-" + positionId,
          this.tooltips.siteBox(
            this.siteBoxes[positionId],
            site ? {num: site.dataset.num,
             size: site.dataset.size
            } : undefined,
            guard ?{num: guard.dataset.num} : undefined,
            this.gamedatas.bird_temple), this.tooltipDelay);
      }
    },
    updateTempleTooltips() {
      for (var pos = 1; pos <= 6; ++pos) {
        var n = this.gamedatas.temple_tile[pos].amt;
        if (n > 0) {
          this.addTooltipHtml("temple-tile-wrap-" + pos, this.tooltips.temple(pos, n, this.gamedatas.bird_temple), this.tooltipDelay);
        }
      }
    },
    sortSupply() {
      this.artSupply = this.artSupply.sort((a, b) => a.deckOrder - b.deckOrder);
      this.itemSupply = this.itemSupply.sort((a, b) => a.deckOrder - b.deckOrder);
    },
    updateSupply() {
      var x = 1;
      var dx = 17.08;
      var allCards = this.artSupply.reverse().concat(this.itemSupply);
      if (allCards.length == 7) {
        dx = 14.2;
      }
      var y = 5;
      var scaleRatio = 0.27;
      var boardDiv = dojo.query(".arnak-board")[0];
      this.sortSupply();

      for (var card of allCards) {
        var cardDiv = dojo.byId("card-" + card.id);
        if (!cardDiv) {
          cardDiv = this.cardDiv(card);
          dojo.connect(cardDiv, "click", this, "supplyClick");

          dojo.place(cardDiv, boardDiv);
          this.addTooltipHtml("card-" + card.id, this.tooltips.card(card.type, card.num), this.tooltipDelay);
        }

        dojo.style(cardDiv, "transform", "scale(" + scaleRatio + ", " + scaleRatio + ")")
        dojo.style(cardDiv, "left", x + "%");
        dojo.style(cardDiv, "top", y + "%");
        dojo.addClass(cardDiv, "supply");
        x += dx;
      }

      dojo.query(".item-deck-number")[0].innerHTML = this.gamedatas.itemDeck;
      dojo.query(".art-deck-number")[0].innerHTML = this.gamedatas.artDeck;
      dojo.query(".item-exile-number")[0].innerHTML = this.gamedatas.itemExile;
      dojo.query(".art-exile-number")[0].innerHTML = this.gamedatas.artExile;
    },
    updateResearchTrack: function() {
      for (var i = 0; i <= 14; ++i) {
        var box = this.researchBoxes[this.gamedatas.bird_temple ? 0 : 1][i];
        var spaceObjects = [];
        for (var p of Object.values(this.gamedatas.players)) {
          if (p.research_glass == i) {
            spaceObjects.push({type: "glass", player: p.id, rank: p.temple_rank});
          }
          if (p.research_book == i) {
            spaceObjects.push({type: "book", player: p.id});
          }
        }
        if (i == 14) {
          spaceObjects.sort((a, b) => a.rank - b.rank);
        }
        var dx = 3.8;
        var basex = box.x + box.w/2 - spaceObjects.length * dx / 2;
        var basey = box.y + box.h / 2 - dx / 2;

        for (var j in spaceObjects) {
          var s = spaceObjects[j];
          var toMove = dojo.byId("research-" + s.type + "-" + s.player);
          var x = basex + j * dx;
          var y = basey;
          if (i == 14) {
            x = box.x + 3.3 + j * 5.2;
            y = box.y + 0.2;
          }
          else if (i == 8 && !this.bird_temple) {
            var skip = dojo.query(".assistant.position-4")[0] ? 2.5 : 0;
            var pos = +j;
            if (pos > 1) {
              pos += skip;
            }
            x = box.x + 0.5 + pos * dx;
          }
          if (toMove) {
            dojo.style(toMove, "left", x + "%");
            dojo.style(toMove, "top", y + "%");
          }
        }
      }
    },
    updateScore() {

      for (var player of Object.values(this.gamedatas.players)) {
        if (player.scoreBreakdown) {
          for (var category of ["research", "temple", "idols", "guardians", "cards", "fear"]) {
            this.counters[player.id][category].setValue(player.scoreBreakdown[category]);
          }
          this.counters[player.id].total.setValue(player.score);
        }
      }
    },
    revealTokens: function(tokens) {
      var x = 186;
      for (var token of Object.values(tokens)) {
        var targetToken = dojo.query(".research-bonus[data-id=" + token.idresearch_bonus + "]")[0];
        targetToken.dataset.type = token.bonus_type;
        dojo.removeClass(targetToken, "reward-hidden");
        dojo.addClass(targetToken, "reward-" + targetToken.dataset.type);
        targetToken.style.left = x + "px";
        x -= 40;
      }
    },
    specialAssistants: function(assNums) {
      var position = 4;
      for (aNum of assNums) {
        var assDiv = dojo.query(".assistant[data-num=" + aNum + "]")[0];
        if (!assDiv) {
          assDiv = this.assistantDiv(aNum, 0, 0);
          dojo.connect(assDiv, "click", this, "assistantClick");
        }
        var board = dojo.query(".arnak-board")[0];
        dojo.addClass(assDiv, "position-" + position);
        dojo.place(assDiv, board);
        this.addTooltipHtml(assDiv.id, this.tooltips.assistant(aNum, false));
        ++position;
      }
    },
    cardToDeck: function(cardId, player, bottom = true) {
      var cardDiv = dojo.byId("card-" + cardId);
      if (!cardDiv) {
        throw "Card " + cardId + " is not present"
      }
      cardDiv.id = "";
      var targetBoard;
      targetBoard = dojo.query(".camp-" + player)[0];
      var newCardDiv = cardDiv;
      //if (!dojo.hasClass(cardDiv.parentNode, "player-camp")) {
        newCardDiv = cardDiv.cloneNode(true);
        var targetB = targetBoard.getBoundingClientRect();
        var cardB = cardDiv.getBoundingClientRect();
        var x = cardB.x - targetB.x;
        var y = cardB.y - targetB.y;
        var s = targetB.width / targetBoard.offsetWidth;
        x += (1-s) * (x) * (1/s);
        y += (1-s) * (y) * (1/s);
        dojo.removeClass(newCardDiv, "supply");
        dojo.style(newCardDiv, "transform", "scale(0.25, 0.25)");
        dojo.style(newCardDiv, "left", x + "px");
        dojo.style(newCardDiv, "top", y + "px");

        dojo.destroy(cardDiv);
      //}
      newCardDiv.style["z-index"] = "";
      dojo.place(newCardDiv, targetBoard, bottom ? "first" : "last");
      var n = dojo.query(".deck-amt", targetBoard)[0];
      n.innerHTML = +n.innerHTML + 1;


      setTimeout(function(thisArg, newDiv) {
        thisArg.deckTransform(newDiv);
        dojo.query(".card-flip-wrap", newDiv).addClass("flipped");

      }, 0, this, newCardDiv);

      this.deckTransform(cardDiv);
    },
    deckTransform(cardDiv) {
      var scaleRatio = 0.48;
      var rx = (Math.random() - 0.5) * 2;
      var ry = (Math.random() - 0.5) * 2;
      var rr = (Math.random() - 0.5) * 0.3;
      dojo.style(cardDiv, "transform", "scale(" + scaleRatio + ", " + scaleRatio + ")");

      dojo.query(".card-rotate-wrap", cardDiv).style("transform", "rotate(" + rr + "rad)");

      dojo.style(cardDiv, "left", (3 + rx) + "%");
      dojo.style(cardDiv, "top", (10 + ry) + "%");

      dojo.removeClass(cardDiv, "play hand");
      dojo.addClass(cardDiv, "deck");
    },
    workerPosition(siteNo, spotNo) {
      var board = dojo.query(".arnak-board")[0];
      var bw = board.offsetWidth;
      var bh = board.offsetHeight;;
      var b = this.siteBoxes[siteNo];
      if (!b) {
        debugger;
      }
      var x = b.x + b.w/2 - 3.2;
      var y = b.y + b.h;
      if (siteNo < 5) {
        x -= 3;
        if (spotNo == 2) {
          x += 6;
        }
      }
      x = x * bw / 100;
      y = y * bh / 100;
      return {x: x, y: y};
    },
    playerPass(playerId, unpass = false) {
      var playerBoard = dojo.byId("overall_player_board_" + playerId);
      if (!playerBoard) {
        console.log("player board of", playerId, "not found");
      }
      if (unpass) {
        dojo.removeClass(playerBoard, "passed");
      }
      else {
        dojo.addClass(playerBoard, "passed");
      }
      this.gamedatas.players[playerId].passed = unpass ? "0" : "1";
    },
    handClick: function(evt, force = false) {
      var cardDiv = evt.target;
      var cardId = evt.target.dataset.cardid;
      var hand = dojo.hasClass(evt.target, "hand");
      var legit = true;
      if (!hand) {
        legit = ["idolExile", "mayExile", "researchExile", "assExile", "guardExile", "exileForCard", "hairpinExile", "selectKnife"].indexOf(this.gamedatas.gamestate.name) > -1;
      }
      if (!legit) {
        return;
      }
      var cl = evt.target.classList;
      if (!force && cl.contains("exilable") && (evt.target.dataset.cardtype == "art" || evt.target.dataset.cardtype == "item")) {
        this.confirmationDialog( _("You are about to exile a non-start card. Are you sure?"), dojo.hitch(
          this, function() {
            this.handClick(evt, true);
          } )
        );
        return;
      }

      switch(this.gamedatas.gamestate.name) {
        case "payTravel": case "assTravel":
          //TODO: check if travel is enough
          this.travelSelected.push({type: "card", id: cardDiv.dataset.cardid});
          dojo.addClass(cardDiv, "selected");
          this.paidTravel();
          break;
        case "mustDiscard": case "mustDiscardFree": case "mayDiscard":
          this.ajaxcall("/arnak/arnak/discardCard.html", {
            cardId: cardId,
            lock: true
          }, this, function(result) {});
          break;
        case "idolExile": case "mayExile":
          this.ajaxcall("/arnak/arnak/exile.html", {
            cardId: cardId,
            lock: true
          }, this, function(result) {});
          var args = this.gamedatas.gamestate.args;
          var i;
          if (args && args.indexOf && (i = args.indexOf("exile") > -1)) {
            args.splice(i, 1);
          }
          break;
        case "researchExile":
          this.ajaxcall("/arnak/arnak/useResearchToken.html", {
            tokenId: this.selectedToken,
            arg: btoa(cardId),
            lock: true
          }, this, function(result) {});
          break;
        case "assExile":
          this.ajaxcall("/arnak/arnak/useAssistant.html", {
            assArg: btoa(cardId),
            assNum: 5,
            lock: true
          }, this, function(result) {});
          break;
        case "guardExile":
          this.ajaxcall("/arnak/arnak/useGuard.html", {
            guardArg: btoa(cardId),
            guardNum: this.selectedGuard,
            lock: true
          }, this, function(result) {});
          break;
        case "exileForCard": case "discardForCard":
          this.ajaxcall("/arnak/arnak/playCard.html", {
            arg: btoa(cardId),
            cardId: this.selectedCard,
            lock: true
          }, this, function(result) {});
          break;
        case "hairpinExile":
          this.hairpinExile = cardId;
          this.setClientState("hairpinSite", {descriptionmyturn: _("You must select a site to activate")});
          for( var site of dojo.query(".location-wrap.basic") ) {
            var position = dojo.attr(site,"data-position");
            if( dojo.query(".meeple[data-position=" + position + "]") == 0 ) {
              site.classList.add("highlight-turn");
            }
          }
          break;
        case "artEarringSelectKeep": case "artEarringSelectTopdeck":
          this.ajaxcall("/arnak/arnak/selectCard.html", {
            cardId: cardId,
            lock: true
          }, this, function(result) {});
          break;
        case "selectKnife":
          this.addKnifeBonus("exile", cardId);
          break;

        case "decideKeep":
          if (dojo.hasClass(cardDiv, "selected")) {
            this.keep.splice(this.keep.indexOf(cardId), 1);
            dojo.removeClass(cardDiv, "selected");
          }
          else {
            this.keep.push(cardId);
            dojo.addClass(cardDiv, "selected");
          }
          dojo.byId("keep-num").innerHTML = this.keep.length;
          break;
        default:
          this.playCard(cardId);
          break;
      }
    },
    selectFromExile: function(evt) {
      cardId = evt.target.dataset.cardid;
      this.ajaxcall("/arnak/arnak/getFromExile.html", {
        cardId: cardId,
        lock: true
      }, this, function(result) {});
    },
    playCard: function(cardId) {
      var cardDiv = dojo.byId("card-" + cardId);
      var type = cardDiv.dataset.cardtype;
      var num = +cardDiv.dataset.cardnum;
      this.selectedCard = cardId;
      var cantPlay = this.gamedatas.gamestate.name == "afterMain" && (
              type == "art" || (
                type == "item" && ([5, 6, 8, 15, 22, 32, 39].indexOf(num) == -1 )
              )
            )
      if (cantPlay) {
        this.showMessage(_("You already played a main action this turn"), "error");
        return;
      }
      var color = this.playerColor(this.player_id);
      dojo.addClass(cardDiv, "active");
      if (type === "item") {
        switch(num) {
          case 15: case 39:
            this.setClientState("choosePass", {descriptionmyturn: _("Select one option")});
            break;
          case 14: case 30: case 34:
            this.setClientState("discardForCard", {descriptionmyturn: _("Discard a card for the effect")});
            break;
          case 27: case 28: case 38:
            this.setClientState("exileForCard", {descriptionmyturn: _("You may exile a card")});
            break;
          case 25:
            this.setClientState("selectItem", {descriptionmyturn: _("Select an item from the supply")});
            dojo.query(".card.supply[data-cardtype='item']").addClass("highlight-turn");
            break;
          case 23:
            this.setClientState("selectArt", {descriptionmyturn: _("Select an artifact from the supply")});
            dojo.query(".card.supply[data-cardtype='art']").addClass("highlight-turn");
            break;

          case 35: case 36: case 17: case 18: case 31: case 33:
            this.setClientState("selectCardSite", {descriptionmyturn: _("Select a site")});
            switch(num) {
              // nested switch with the same expression sure feels weird, bug I think it is correct
              case 17:
                dojo.query(".location-wrap.small").addClass("highlight-turn");
                break;
              case 18:
                for (var candidate of dojo.query(".location-wrap")) {
                  var pos = candidate.dataset.position;
                  if (dojo.query(".meeple.onboard." + color + "[data-position=" + pos + "]")[0]) {
                    candidate.classList.add("highlight-turn");
                  }
                }
                break;
              case 31:
                for (var candidate of dojo.query(".guardian-wrap")) {
                  var pos = candidate.parentNode.dataset.position;
                  if (dojo.query(".meeple.onboard." + color + "[data-position=" + pos + "]").length > 0) {
                    candidate.parentNode.classList.add("highlight-turn");
                  }
                }
                break;
              case 33:
                for (var candidate of dojo.query(".guardian-wrap")) {
                  var pos = candidate.parentNode.dataset.position;
                  if (dojo.query(".meeple.onboard." + color + "[data-position=" + pos + "]").length == dojo.query(".meeple.onboard[data-position=" + pos + "]").length) {
                    candidate.parentNode.classList.add("highlight-turn");
                  }
                }
                break;
              case 35:
                dojo.query(".location-wrap.basic").addClass("highlight-turn");
                break;
              case 36:
                for( var site of dojo.query(".location-wrap.basic") ) {
                  var position = dojo.attr(site,"data-position");
                  if( dojo.query(".meeple[data-position=" + position + "]") == 0 ) {
                    site.classList.add("highlight-turn");
                  }
                }
                break;
            };
            break;
          case 13:
            this.setClientState("selectResearch", {descriptionmyturn: _("Select a research space")});
            //dojo.query(".research-box").addClass("highlight-turn");
            break;
          case 16:
            this.setClientState("selectKnife", {descriptionmyturn: _("Select 2 bonuses (click a card to exile)")});
            break;
          default:
            dojo.removeClass(cardDiv, "active");
            this.ajaxcall("/arnak/arnak/playCard.html", {
              cardId: cardId,
              lock: true
            }, this, function(result) {});
            break;
        }
      }
      else if (type === "art") {
        if (!this.artClientState(num)) {
          dojo.removeClass(cardDiv, "active");
          this.ajaxcall("/arnak/arnak/playCard.html", {
            cardId: cardId,
            lock: true
          }, this, function(result) {});
        }
      }
      else {
        dojo.removeClass(cardDiv, "active");
        this.ajaxcall("/arnak/arnak/playCard.html", {
          cardId: cardId,
          lock: true
        }, this, function(result) {});
      }
    },
    artClientState(artNum) {
      if (!this.isCurrentPlayerActive()) {
        return;
      }
      var playerId = this.player_id;
      var color = this.playerColor(this.player_id);
      var stateSet = true;
      dojo.query(".card[data-cardtype=art][data-cardnum=" + artNum + "] .card.front").addClass("active");
      switch(+artNum) {
        case 1: case 2:
          this.relocateToArt = artNum;
          var workersOnBoard = dojo.query(".meeple.onboard." + this.playerColor(this.player_id));
          switch(workersOnBoard.length) {
            case 0:
              this.showMessage("No workers on board to relocate", "error");
              break;
            case 1:
              this.relocateFrom = workersOnBoard[0].dataset.position;
              this.setClientState("selectRelocateTo", {descriptionmyturn: _("Select space to relocate to")});
              this.highlightRelocateTo();
              break;
            default:
              this.setClientState("selectRelocateFrom", {descriptionmyturn: _("Select space to relocate from")});
              this.highlightRelocateFrom();
              break;
          }
          break;
        case 35:
          this.setClientState("selectRelocateFrom", {descriptionmyturn: _("Select a guardian to relocate")});
          for (var candidate of dojo.query(".guardian-wrap")) {
            var pos = candidate.parentNode.dataset.position;
            if (dojo.query(".meeple.onboard." + color + "[data-position=" + pos + "]").length > 0) {
              candidate.classList.add("highlight-turn");
            }
          }
          break;
        case 5: case 7:
          this.setClientState("exileForCard", {descriptionmyturn: _("You may exile a card")});
          break;
        case 6:
          this.setClientState("selectCardAmt", {descriptionmyturn: _("You must select how many cards to draw"), args: {maxAmt: 3}});
          break;
        case 12:
          this.setClientState("selectResearchDiscount", {descriptionmyturn: _("You must select discount")});
          break;
        case 31:
          this.setClientState("selectCardAmt", {descriptionmyturn: _("You must select how many cards to draw"), args: {maxAmt: 2}});
          break;
        case 10:
          this.setClientState("selectItem", {descriptionmyturn: _("You must select an item from the supply")});
          dojo.query(".card.supply[data-cardtype='item']").addClass("highlight-turn");
          break;
        case 13:
          this.setClientState("selectCardSite", {descriptionmyturn: _("You must select a site")});
          this.highlightRelocateFrom();
          break;
        case 15:
          this.setClientState("selectCardSite", {descriptionmyturn: _("You must select a site")});
          for (var candidate of dojo.query(".guardian-wrap")) {
            var pos = candidate.parentNode.dataset.position;
            if (dojo.query(".meeple.onboard." + color + "[data-position=" + pos + "]").length > 0) {
              candidate.parentNode.classList.add("highlight-turn");
            }
          }

          break;
        case 14:
          this.setClientState("hairpinExile", {descriptionmyturn: _("You may exile a card")});
          break;
        case 16:
          this.setClientState("choosePass", {descriptionmyturn: _("Select one option")});
          break;
        case 22:
          this.setClientState("hornSelectAss", {descriptionmyturn: _("Select an asssistant to replace")});

          dojo.query(".camp-" + playerId + " .assistant").addClass("highlight-turn");
          break;
        case 24:
          this.setClientState("selectCardSite1", {descriptionmyturn: _("Select first site to activate")});
          dojo.query(".location-wrap.basic").addClass("highlight-turn");
          break;
        case 17:
        case 29:
          this.setClientState("cardUpgrade", {descriptionmyturn: _("You may select one option")});
          break;
        case 27:
          this.setClientState("artSelectAss", {descriptionmyturn: _("You must choose an assistant to refresh")});
          dojo.query(".camp-" + playerId + " .assistant").addClass("highlight-turn");
          break;
        case 28:
          this.setClientState("discardForCard", {descriptionmyturn: _("You must discard a card for the effect")});
          break;
        case 11: case 12:
          this.setClientState("selectResearch", {descriptionmyturn: _("You must select a research space (or a temple tile)")});
          //dojo.query(".research-box, .temple-tile").addClass("highlight-turn");
          break;
        default:
          stateSet = false;
      }
      return stateSet;
    },
    highlightRelocateFrom() {
      var color = this.playerColor(this.player_id);
      for (var candidate of dojo.query(".location-wrap")) {
        var pos = candidate.dataset.position;
        if (dojo.query(".meeple.onboard." + color + "[data-position=" + pos + "]").length > 0) {
          candidate.classList.add("highlight-turn");
        }
      }
    },
    highlightRelocateTo() {
      for( var site of dojo.query(".location-wrap.basic") ) {
        var position = dojo.attr(site,"data-position");
        if( dojo.query(".meeple[data-position=" + position + "]").length + dojo.query(".blocking-tile[data-position=" + position + "]").length < 2 )
          site.classList.add("highlight-turn");
      }
      if( this.relocateToArt == 2 ) {
        for( var site of dojo.query(".location-wrap.small") ) {
          var position = dojo.attr(site,"data-position");
          if( dojo.query(".meeple[data-position=" + position + "]").length < 1 )
            site.classList.add("highlight-turn");
        }
      }
    },
    paidTravel: function() {
      switch(this.gamedatas.gamestate.name) {
        case "payTravel":
          this.ajaxcall("/arnak/arnak/moveToSite.html", {
            siteId: this.siteSelected,
            movePayment: btoa(JSON.stringify(this.travelSelected)),  // TODO
            lock: true
          }, this, function(result) {});
          break;
        case "assTravel":
          this.ajaxcall("/arnak/arnak/useAssistant.html", {
            assNum: 3,
            assArg: btoa(JSON.stringify(this.travelSelected)),  // TODO
            lock: true
          }, this, function(result) {});
          break;
      }
    },
    displayDeck: function(evt) {
      var oldDisplay = dojo.query(".deck-display-wrap")[0];
      var targetId = evt.target.dataset.id;
      for (var b of dojo.query(".display-deck")) {
        b.innerHTML = _("Display player's deck");
      }
      if (oldDisplay) {
        var oldId = oldDisplay.dataset.id;
        if (oldId == targetId) {
          oldDisplay.remove();

          return;
        }
        oldDisplay.remove();
      }
      evt.target.innerHTML = _("Hide player's deck");
      this.ajaxcall("/arnak/arnak/displayDeck.html", {
        playerId: targetId,
        lock: true
      }, this, function(result) {});
    },
    displayDiscard: function(evt) {
      var oldDisplay = dojo.query(".deck-display-wrap")[0];
      if (oldDisplay) {
        oldDisplay.remove();
        evt.target.innerHTML = _("Display discarded items");
        return;
      }
      evt.target.innerHTML = _("Hide discarded items");
      this.ajaxcall("/arnak/arnak/displayDiscard.html", {
        lock: true
      }, this, function(result) {});
    },
    supplyClick: function(evt) {
      // TODO: check state

      var cardDiv = evt.target;
      switch(this.gamedatas.gamestate.name) {
        case "selectArt": case "selectItem":
          this.ajaxcall("/arnak/arnak/playCard.html", {
            arg: btoa(cardDiv.dataset.cardid),
            cardId: this.selectedCard,
            lock: true
          }, this, function(result) {});
          break;
        case "selectSupply":
          this.ajaxcall("/arnak/arnak/useAssistant.html", {
            assNum: 10,
            assArg: btoa(cardDiv.dataset.cardid),
            lock: true
          }, this, function(result) {});
          break;
        default:
          this.ajaxcall("/arnak/arnak/buyCard.html", {
            cardId: cardDiv.dataset.cardid,
            lock: true
          }, this, function(result) {});
      }
    },
    cancelBuy : function(evt) {
      var cardDiv = evt.target;
      this.ajaxcall("/arnak/arnak/cancelBuy.html", {
        lock: true
      }, this, function(result) {});
    },
    siteClick: function(evt) {
      var siteDiv = evt.target;

      if (this.gamedatas.gamestate.name == "afterMain") {
        this.showMessage(_("You already played a main action this turn"), "error");
        return;
      }

      this.siteSelected = siteDiv.dataset.id;
      switch(this.gamedatas.gamestate.name) {
        case "selectCardSite":
          if (this.chartsSelected) {
            arg = JSON.stringify([this.chartsSelected, this.siteSelected]);
          }
          else {
            arg = this.siteSelected;
          }
          this.ajaxcall("/arnak/arnak/playCard.html", {
            cardId: this.selectedCard,
            arg: btoa(arg),
            lock: true
          }, this, function(result) {}, this.cancelClientstate );
          break;
        case "selectCardSite1":
          this.chartsSelected = this.siteSelected;
          this.setClientState("selectCardSite", {descriptionmyturn: _("Select second camp site to activate")});
          var sites = dojo.query(".location-wrap.basic");
          for(var site of sites) {
            if( dojo.attr(site,"data-position") != this.chartsSelected) {
               site.classList.add("highlight-turn");
            }
          }
          break;
        case "selectRelocateFrom":
          this.relocateFrom = this.siteSelected;
          this.setClientState("selectRelocateTo", {descriptionmyturn: _("You must select space to relocate to")});
          this.highlightRelocateTo();
          break;
        case "selectRelocateTo":
          this.ajaxcall("/arnak/arnak/playCard.html", {
            cardId: this.selectedCard,
            arg: btoa(JSON.stringify({from: this.relocateFrom, to: this.siteSelected})),
            lock: true
          }, this, function(result) {}, this.cancelClientstate);
          break;
        case "hairpinSite":
          this.ajaxcall("/arnak/arnak/playCard.html", {
            cardId: this.selectedCard,
            arg: btoa(JSON.stringify({site: this.siteSelected, exile: this.hairpinExile})),
            lock: true
          }, this, function(result) {});
          break;
        default:
          var siteDiscovered = dojo.query(".location-position-" + this.siteSelected)[0];
          if (dojo.hasClass(siteDiv, "selected") || (siteDiscovered && dojo.hasClass(siteDiscovered, "selected"))) {
            this.cancelClientstate();
            return;
          }

          dojo.query(".site-box.selected, .location.selected").removeClass("selected");
          if (this.siteSelected > 4 && siteDiscovered) {
            dojo.addClass(siteDiscovered, "selected");
          }
          else {
            dojo.addClass(evt.target, "selected");
          }
          this.ajaxcall("/arnak/arnak/moveToSite.html", {
            siteId: this.siteSelected,
            movePayment: btoa(JSON.stringify(this.travelSelected)),
            lock: true
          }, this, function(result) {});
          //this.setClientState("payTravel", {descriptionmyturn: "Pay travel: <div class='travel-costs'></div>"});
      }
      //todo: set cost to pay
    },
    researchClick: function(evt) {
      if (dojo.hasClass(evt.target, "research-bonus")) {
        var id = evt.target.dataset.id;
        var type = evt.target.dataset.type;
        this.selectedToken = id;
        switch(type) {
          case "upgrade":
            this.setClientState("researchUpgrade", {descriptionmyturn: _("Choose upgrade")});
            break;
          case "exile":
            this.setClientState("researchExile", {descriptionmyturn: _("Choose a card to exile")});
            break;
          default:
            this.ajaxcall("/arnak/arnak/useResearchToken.html", {
              tokenId: id,
              lock: true
            }, this, function(result) {});
        }
      }
      else {
        var id = evt.target.dataset.research_id;
        switch(this.gamedatas.gamestate.name) {
          case "selectResearch":
            var arg = this.researchDiscount ? JSON.stringify({discount: this.researchDiscount, research: id}) : id;
            this.researchDiscount = null;
            this.ajaxcall("/arnak/arnak/playCard.html", {
              cardId: this.selectedCard,
              arg: btoa(arg),
              lock: true
            }, this, function(result) {});
            break;
          default:
            this.ajaxcall("/arnak/arnak/research.html", {
              researchId: id,
              lock: true
            }, this, function(result) {});
        }
      }
    },
    templeClick: function(evt) {
      if (this.gamedatas.gamestate.name == "selectResearch") {
        var args = {temple: evt.target.dataset.num};
        if (this.researchDiscount) {
          args.discount = this.researchDiscount;
        }
        this.ajaxcall("/arnak/arnak/playCard.html", {
          cardId: this.selectedCard,
          arg: btoa(JSON.stringify(args)),
          lock: true
        }, this, function(result) {});
      }
      else {
        this.ajaxcall("/arnak/arnak/getTempleTile.html", {
          tileNum: evt.target.dataset.num,
          lock: true
        }, this, function(result) {});
      }
    },
    assistantClick: function(evt) {
      var num = +evt.target.dataset.num;
      var gold = dojo.hasClass(dojo.query(".assistant-inner", evt.target)[0], "gold");
      if (this.gamedatas.gamestate.name == "artActivateAss" &&
      this.gamedatas.gamestate &&
      this.gamedatas.gamestate.args &&
      this.gamedatas.gamestate.args.num == 21
      ) {
        // activating gold side of assistant on the board
        gold = true;
      }
      var exhausted = dojo.hasClass(dojo.query(".assistant-inner", evt.target)[0], "exhausted");
      var inHand = dojo.hasClass(evt.target.parentNode, "player-camp");
      if (inHand && this.gamedatas.gamestate["name"] == "hornSelectAss") {
        this.hornOld = num;
        this.setClientState("hornSelectNew", {descriptionmyturn: _("Select a new assistant")});
        dojo.query(".arnak-board .assistant").addClass("highlight-turn");
        return;
      }
      if (!inHand && this.gamedatas.gamestate["name"] == "hornSelectNew") {
        this.ajaxcall("/arnak/arnak/playCard.html", {
          cardId: this.selectedCard,
          arg: btoa(JSON.stringify({oldAss: this.hornOld, newAss: num})),
          lock: true
        }, this, function(result) {});
        return;
      }
      if (this.gamedatas.gamestate["name"] == "artSelectAss") {
        this.ajaxcall("/arnak/arnak/playCard.html", {
          cardId: this.selectedCard,
          arg: btoa(num),
          lock: true
        }, this, function(result) {});
        return;
      }
      var callAction = false;
      var a = this.gamedatas.gamestate.args;
      var spec;
      if (a) {
        var spec = a.special;
      }
      var playInHand = !exhausted && inHand && spec != "assistant-gold";
      var playAtBoard = !inHand && this.gamedatas.gamestate.name == "artActivateAss";
      if (this.isCurrentPlayerActive() && (playInHand || playAtBoard)) {
        var state = this.gamedatas.gamestate.name;
        if ((state == "payTravel" || state == "assTravel") && [7, 8, 9].indexOf(+num) > -1) {
          this.travelSelected.push({type: "assistant", num: num});
          dojo.addClass(evt.target, "selected");
          this.paidTravel();
        }
        else {
          switch(num) {
            case 3: // pay boot
              if (gold) {
                callAction = true;
              }
              else {
                this.setClientState("assTravel", {descriptionmyturn: _("Pay travel:") + " <div class='travel-costs'><div class='travel-icon icon boot'>"});
              }
              break;
            case 4: // gold select jewel vs arrowhead
              if (gold) {
                this.setClientState("assJewelArrowhead", {descriptionmyturn: _("Select resource")});
              }
              else {
                callAction = true;
              }
              break;
            case 5: // exile
              this.setClientState("assExile", {descriptionmyturn: _("Select card to exile")});
              break;
            case 10:
              if (playAtBoard || this.gamedatas.gamestate.name == "selectAction") {
                this.setClientState("selectSupply", {descriptionmyturn: _("Select card to buy")});
                dojo.query(".card.supply").addClass("highlight-turn");
              }
              else {
                callAction = true;
              }
              break;
            case 11: // choose upgrade
              this.setClientState("assUpgrade", {descriptionmyturn: _("Select upgrade")});
              break;
            default: callAction = true;
          }
        }
      }
      else {
        callAction = true;
      }
      if (callAction) {
        this.ajaxcall("/arnak/arnak/useAssistant.html", {
          assNum: num,
          arg: "",
          lock: true
        }, this, function(result) {});
      }
    },
    guardEffect: function(evt) {
      var num = evt.target.dataset.num;
      this.selectedGuard = num;
      switch(+num) {
        case 7:
          this.ajaxcall("/arnak/arnak/useGuard.html", {
            guardNum: num,
            arg: "",
            lock: true
          }, this, function(result) {});
          break;
        case 2: case 5: case 6: case 11: case 14:
          this.setClientState("guardExile", {descriptionmyturn: _("Select card to exile")});
          break;
        case 8:
          this.setClientState("guardUpgrade", {descriptionmyturn: _("Select upgrade")});
          break;
        case 1: case 3: case 4: case 9: case 10: case 12: case 13: case 15:
          this.travelSelected.push({type: "guardian", num: num});
          dojo.addClass(evt.target, "selected");
          this.paidTravel();
          break;
        default:
          console.log("cannot use guard " + num);
      }
    },
    cancelTravel: function(evt) {
      this.ajaxcall("/arnak/arnak/cancelTravel.html", {
        lock: true
      }, this, function(result) {});
    },
    cancelClientstate: function(evt) {
      this.restoreGlobals();
      this.restoreServerGameState();
      dojo.query(".active").removeClass("active");
      dojo.query(".selected").removeClass("selected");
      dojo.query(".exiled").removeClass("exiled");
    },
    buyPlane: function(evt) {
      this.travelSelected.push({type: "buyplane"});
      /*this.ajaxcall("/arnak/arnak/moveToSite.html", {
        siteId: this.siteSelected,
        movePayment: btoa(JSON.stringify(this.travelSelected)),  // TODO
        lock: true
      }, this, function(result) {});*/
      this.paidTravel();
    },
    cancelExile: function(evt) {
      switch(this.gamedatas.gamestate.name) {

        case "idolExile":
          this.ajaxcall("/arnak/arnak/cancelIdolExile.html", {  lock: true
          }, this, function(result) {});
          break;
        case "mayExile":
          this.ajaxcall("/arnak/arnak/cancelExile.html", {    lock: true
          }, this, function(result) {});
          break;
        case "researchExile":
          this.ajaxcall("/arnak/arnak/useResearchToken.html", {
            tokenId: this.selectedToken,
            arg: btoa("cancel"),
            lock: true
          }, this, function(result) {});
          break;
        case "assExile":
          this.ajaxcall("/arnak/arnak/useAssistant.html", {
            assArg: btoa("cancel"),
            assNum: 5,
            lock: true
          }, this, function(result) {});
          break;
        case "exileForCard":
          this.ajaxcall("/arnak/arnak/playCard.html", {
            arg: btoa("cancel"),
            cardId: this.selectedCard,
            lock: true
          }, this, function(result) {});
          break;
        case "hairpinExile":
          this.hairpinExile = "cancel";
          this.setClientState("hairpinSite", {descriptionmyturn: _("You must select a site to activate")});
          break;
        case "exileForCard":
          this.ajaxcall("/arnak/arnak/playCard.html", {
          cardId: this.selectedCard,
          arg: btoa("cancel"),
          lock: true
        }, this, function(result) {});
          break;
      }
    },
    cancelDiscard: function(evt) {
      this.ajaxcall("/arnak/arnak/cancelShellDiscard.html", {    lock: true
      }, this, function(result) {});
    },
    planeCompass: function(evt) {
      this.ajaxcall("/arnak/arnak/planeCompass.html", {lock: true

      }, this, function(result) {});
    },
    upgrade: function(type) {
      switch(this.gamedatas.gamestate.name) {
        case "assUpgrade":
          this.ajaxcall("/arnak/arnak/useAssistant.html", {
            assNum: 11,
            assArg: btoa(type),
            lock: true
          }, this, function(result) {});
          break;
        case "researchUpgrade":
          this.ajaxcall("/arnak/arnak/useResearchToken.html", {
            tokenId: this.selectedToken,
            arg: btoa(type),
            lock: true
          }, this, function(result) {});
          break;
        case "guardUpgrade":
          this.ajaxcall("/arnak/arnak/useGuard.html", {
            guardArg: btoa(type),
            guardNum: this.selectedGuard,
            lock: true
          }, this, function(result) {});
          break;
        case "cardUpgrade":
          this.ajaxcall("/arnak/arnak/playCard.html", {
            cardId: this.selectedCard,
            arg: btoa(type),
            lock: true
          }, this, function(result) {});
          break;
        default:
          this.ajaxcall("/arnak/arnak/upgrade.html", {
            type: type,
            lock: true
          }, this, function(result) {});
      }
    },
    upgrade1: function(evt) {
      this.upgrade(1);
    },
    upgrade2: function(evt) {
      this.upgrade(2);
    },
    upgradeCancel: function(evt) {
      this.upgrade(0)
    },
    selectCardAmt1: function(evt) {
      this.selectCardAmt(1);
    },
    selectCardAmt2: function(evt) {
      this.selectCardAmt(2);
    },
    selectCardAmt3: function(evt) {
      this.selectCardAmt(3);
    },
    selectCardAmt(amt) {
      this.ajaxcall("/arnak/arnak/playCard.html", {
        cardId: this.selectedCard,
        arg: btoa(amt),
        lock: true
      }, this, function(result) {});
    },
    getArrowhead: function(evt) {
      this.useJewelArrowheadAssistant("arrowhead");
    },
    getJewel: function(evt) {
      this.useJewelArrowheadAssistant("jewel");
    },
    addKnifeBonus(resName, cardId) {
      if (resName == "exile") {
        var cardDivs = dojo.query(".camp-" + this.getActivePlayerId() + " :is(.hand.card, .play.card)");
        cardDivs.addClass("exilable").removeClass("exiled");
        if(this.knifeBonuses.hasOwnProperty("exile") && this.knifeBonuses["exile"] == cardId) {
          delete this.knifeBonuses["exile"];
        }
        else {
          dojo.query(".camp-" + this.getActivePlayerId() + " .card[data-cardid=" + cardId + "] ").removeClass("exilable").addClass("exiled");
          this.knifeBonuses["exile"] = cardId;
        }
      }
      else {
        var button = dojo.byId("button_knife_" + resName);
        if (this.knifeBonuses.hasOwnProperty(resName)) {
          delete this.knifeBonuses[resName];
          dojo.removeClass(button,"bgabutton_gray");
          dojo.addClass(button,"bgabutton_blue");
        }
        else {
          this.knifeBonuses[resName] = 1;
          dojo.removeClass(button,"bgabutton_blue");
          dojo.addClass(button,"bgabutton_gray");
        }
      }
      if (Object.keys(this.knifeBonuses).length == 2) {
        var bonuses = [];
        for(var bonus of Object.keys(this.knifeBonuses)) {
          if( bonus == "exile" )
            bonuses.push(parseInt(this.knifeBonuses["exile"]));
          else
            bonuses.push(bonus);
        }
        this.ajaxcall("/arnak/arnak/playCard.html", {
          cardId: this.selectedCard,
          arg: btoa(JSON.stringify(bonuses)),
          lock: true
        }, this, function(result) {}, this.cancelClientstate);
      }
    },
    knifeBonus_coins(evt) {
      this.addKnifeBonus("coins");
    },
    knifeBonus_compass(evt) {
      this.addKnifeBonus("compass");
    },
    knifeBonus_tablet(evt) {
      this.addKnifeBonus("tablet");
    },
    discountResearchArrowhead(evt) {
      this.researchDiscount = "arrowhead";
      this.setClientState("selectResearch", {descriptionmyturn: _("You must select a research space")});
    },
    discountResearchTablet(evt) {
      this.researchDiscount = "tablet";
      this.setClientState("selectResearch", {descriptionmyturn: _("You must select a research space")});
    },
    useJewelArrowheadAssistant: function(type) {
      this.ajaxcall("/arnak/arnak/useAssistant.html", {
        assNum: 4,
        assArg: btoa(type),
        lock: true
      }, this, function(result) {});
    },
    clickIdolBonus: function(evt) {
      this.ajaxcall("/arnak/arnak/idolBonus.html", {
        bonusName: evt.target.dataset.bonus,
        lock: true
      }, this, function(result) {});
    },
    endTurn: function() {
      this.ajaxcall("/arnak/arnak/endTurn.html", {
        lock: true
      }, this, function(result) {});
      this.turnEnded = true;
    },
    passConfirmString: function(playCard = false) {
      var remainingActions = [];
      if (dojo.query("#player_board_" + this.player_id + " .counter-wrap .meeple").length > 0) {
        remainingActions.push(_("archaeologists remaining"));
      }
      if (this.hand.filter(a => a.type !== "fear").length > playCard ? 1 : 0) {
        remainingActions.push(_("playable cards remaining"));
      }
      if (dojo.query(".camp-" + this.player_id + " .assistant-inner:not(.exhausted)").length > 0) {
        remainingActions.push(_("assistants ready"))
      }
      if (remainingActions.length > 0) {
        return _('Are you sure you want to pass? You still have ') + remainingActions.join(_(" and ")) + ". " + _("After passing, you will take no more actions for the rest of the round.");
      }
      return null;
    },
    pass: function() {
      var confirmString = this.passConfirmString();
      if (confirmString) {
        this.confirmationDialog( confirmString, dojo.hitch(
          this, function() {
            this.ajaxcall("/arnak/arnak/pass.html", {
              lock: true
            }, this, function(result) {});
          } )
        );
      }
      else {
        this.ajaxcall("/arnak/arnak/pass.html", {
          lock: true
        }, this, function(result) {});
      }
    },
    confirmKeep: function() {
      this.ajaxcall("/arnak/arnak/confirmKeep.html", {
        cards: btoa(JSON.stringify(this.keep)),
        lock: true
      }, this, function(result) {});
    },
    cancelEarring: function() {
      this.ajaxcall("/arnak/arnak/cancelEarring.html", {
        lock: true
      }, this, function(result) {});
    },
    choosePass: function() {
      var confirmString = this.passConfirmString(true);
      if (confirmString) {
        this.confirmationDialog( confirmString, dojo.hitch(
          this, function() {
            this.ajaxcall("/arnak/arnak/playCard.html", {
              cardId: this.selectedCard,
              arg: btoa("pass"),
              lock: true
            }, this, function(result) {});
          } )
        );
      }
      else {
        this.ajaxcall("/arnak/arnak/playCard.html", {
          cardId: this.selectedCard,
          arg: btoa("pass"),
          lock: true
        }, this, function(result) {});
      }
    },
    chooseNotPass: function() {
      this.ajaxcall("/arnak/arnak/playCard.html", {
        cardId: this.selectedCard,
        lock: true
      }, this, function(result) {});
    },
    skipArt: function() {
      this.ajaxcall("/arnak/arnak/skipArt.html", {
        lock: true
      }, this, function(result) {});
    },
    undo: function() {
      this.ajaxcall("/arnak/arnak/undo.html", {
        lock: true
      }, this, function(result) {});
    },
    highlightTurn: function(toHighlight, arg) {
      var elements;
      if (!this.isCurrentPlayerActive()) {
        return;
      }

      switch(toHighlight) {
        case "special":
          switch(arg) {
            case "assistant-silver":
              elements = dojo.query(".arnak-board .assistant:not(.position-4)");
              elements.addClass("selectable");
              break;
            case "assistant-gold":
              elements = dojo.query(".camp-" + this.player_id + " .assistant .silver:not(.gold)");
              break;
            case "assistant-special":
              elements = dojo.query(".arnak-board .assistant:not(.position-1, .position-2, .position-3) .assistant-inner");
              break;
            case "exile":
              this.setClientState("mayExile");
              break;
            case "free-art":
              elements = dojo.query(".card.supply[data-cardtype='art']");
              break;
            case "guard":
            var color = this.playerColor(this.player_id);
            for (var candidate of dojo.query(".guardian-wrap")) {
              var pos = candidate.parentNode.dataset.position;
              if (dojo.query(".meeple.onboard." + color + "[data-position=" + pos + "]").length > 0) {
                candidate.classList.add("highlight-turn");
              }
            }
            break;
            case "assistant-refresh":
            dojo.query(".camp-" + this.player_id + " .assistant").addClass("highlight-turn");
            break;
          };
          break;
        case "token":
          elements = dojo.query(".research-box[data-research_id=" + arg + "] .research-bonus");
          break;
      }
      if (elements) {
        elements.addClass("highlight-turn");
      }
    },
    togglePlayerAid: function() {
      dojo.toggleClass(dojo.byId("playeraid"), "visible");
    },

    /* @Override */
    showMessage(msg, type) {

      try {
        var parsed = JSON.parse(msg.replace(/&quot;/g, '"'));
        this.travelNeeded = parsed;
        this.setClientState("payTravel", {descriptionmyturn: _("Pay travel: ") + "<div class='travel-costs'></div>"});
        var targetEl = dojo.query(".travel-costs")[0];
        if (!targetEl){
          throw 1;
        }
        dojo.empty(targetEl);
        for (var travelName of Object.keys(parsed)) {
          if (travelName == "card") {
            this.setClientState("payTravel", {descriptionmyturn: _("Select a card to discard")});
            dojo.query(".hand.card").addClass("discardable");
          }
          else if (["ship", "boot", "car", "plane"].indexOf(travelName) > -1) {
            for (var i = 0; i < parsed[travelName]; ++i) {
              dojo.place(dojo.create("div", {class: "travel-icon icon " + travelName}), targetEl);
            }
          }
          else {
            throw 2;
          }
        }
        //this.__proto__.__proto__.showMessage("", "info");
      }
      catch {
        this.__proto__.__proto__.showMessage.call(this, msg, type);
      }
    },
    onEnteringState: function( stateName, args )
    {
      dojo.query(".highlight-turn").removeClass("highlight-turn");
      switch(stateName) {
        case "selectAction":
          this.restoreGlobals();
          break;
        case "mustDiscard": case "mustDiscardFree": case "assDiscard": case "discardForCard": case "mayDiscard":
          dojo.query(".camp-" + this.getActivePlayerId() + " .hand.card").addClass("discardable");
          break;
        case "idolExile": case "researchExile": case "assExile": case "guardExile": case "exileForCard": case "mayExile": case "hairpinExile": case "selectKnife":
          dojo.query(".camp-" + this.getActivePlayerId() + " :is(.hand.card, .play.card)").addClass("exilable");
          break;
        case "idolRefresh":
          dojo.query(".camp-" + this.getActivePlayerId() + " .assistant").addClass("highlight-turn");
          break;
        case "researchBonus":
          dojo.query(".research-box").addClass("unselectable");
          dojo.query(".research-bonus").addClass("selectable");
          if (args.args._private) {
            if( args.args._private.tokens_left) {
               this.revealTokens(args.args._private.tokens_left);
            }
            if (args.args._private.special_assistants) {
              this.specialAssistants(args.args._private.special_assistants);
            }
          }
          for (var r of Object.keys(args.args)) {
            this.highlightTurn(r, args.args[r]);
          }
          break;
        case "artWaitArgs":
          this.selectedCard = args.args.id;
          this.artClientState(args.args.num);
          break;
        case "artDone":
          dojo.query(".earring").removeClass("earring");
          dojo.query(".active").removeClass("active");
          break;
        case "afterMain":
          var tokens = dojo.query(".research-box[data-research_id=14] *");
          tokens.style("left", "");
          tokens.addClass("reward-hidden");
          dojo.query(".selected").removeClass("selected");
          dojo.query(".active").removeClass("active");
          dojo.query(".active").removeClass("exiled");

          if (this.prefs[102].value == 1 && this.isCurrentPlayerActive() &&
          Object.values(this.gamedatas.players).filter(a => a.passed !== "1").length > 1 &&
          !this.turnEnded
          ) {
            this.endTurn();
          }
          break;
        case "nextRound":
          dojo.query(".selected").removeClass("selected");
          break;
        case "decideKeep":
          this.keep = [];
          break;
        case "scoring": case "gameEnd":
          dojo.query(".active").removeClass("active");
          this.addScoringTable();
          if (Object.values(this.gamedatas.players)[0].score) {
            this.updateScore();
          }
          break;
        case "artSelectDiscard":
          this.makeDiscards(this.gamedatas.gamestate.args.cards);
          break;
        case "evalPlane":
          dojo.query(".card.supply[data-cardtype='item']").addClass("highlight-turn");
          break;
        case "buyItem":
          dojo.query(".card.supply[data-cardtype='item']").addClass("highlight-turn");
          break;
        case "buyArt":
          dojo.query(".card.supply[data-cardtype='art']").addClass("highlight-turn");
          break;
        case "artActivateAss":
          dojo.query(".arnak-board .assistant:not(.position-4)").addClass("highlight-turn");
          break;
      case 'dummmy':
        break;
      }
    },
    onLeavingState: function( stateName )
    {
      switch(stateName) {
        case "mustDiscard": case "mustDiscardFree": case "assDiscard": case "discardForCard": case "mayDiscard":
          dojo.query(".discardable").removeClass("discardable");
          break;
        case "idolExile": case "researchExile": case "assExile": case "guardExile": case "exileForCard": case "mayExile": case "hairpinExile": case "selectKnife":
          dojo.query(".exilable").removeClass("exilable");
          break;
        case "payTravel": case "assTravel":
          dojo.query(".discardable").removeClass("discardable");
          //dojo.query(".selected").removeClass("selected");
          break;
        case "researchBonus":
          dojo.query(".research-box").removeClass("unselectable");

          dojo.query(".research-bonus").removeClass("selectable");
          dojo.query(".arnak-board .assistant").removeClass("selectable");
          break;
        case "evalLocation": case "payTravel":
          dojo.query(".location.selected, .site-box").removeClass("selected");
          break;
        case "artSelectDiscard":
          dojo.destroy(dojo.query(".discarded-cards")[0]);
          break;
        case 'dummmy':
          break;
      }
    },
    onUpdateActionButtons: function( stateName, args )
    {
      //this.addActionButton("button_playeraid", _("Display player aid"), 'togglePlayerAid');
      if(this.isCurrentPlayerActive()) {
        if (this.on_client_state) {
          this.addActionButton("button_cancel", _("Cancel"), 'cancelClientstate', null, false, "gray");
        }
        this.addActionButton('button_undo', _("Undo"), "undo", null, false, "gray");
        var coinIcon = "<div class='icon coins'></div>";
        var compassIcon = "<div class='icon compass'></div>";
        var tabletIcon = "<div class='icon tablet'></div>";
        var arrowheadIcon = "<div class='icon arrowhead'></div>";
        var jewelIcon = "<div class='icon jewel'></div>";
        var planeIcon = "<div class='icon plane'></div>";
        var arrow = "<div class='arrow'>➞</div>"
        switch(stateName) {
          case 'selectAction':
            this.addActionButton( 'button_pass', _('Pass'), 'pass', null, false, "red");
            break;
          case 'afterMain':
            this.addActionButton( 'button_endturn', _('End turn'), 'endTurn', null, true);
            break;
          case 'payTravel': case "assTravel":
            var el = dojo.query(".location.selected")[0];
            if (el && el.nextElementSibling && el.nextElementSibling.dataset.num == 7 && dojo.query(".meeple.onboard[data-position=" + el.parentElement.dataset.position + "]").length > 0) {
              // scorpion
              break;
            }
            this.addActionButton("button_buy_plane", coinIcon + coinIcon + arrow + planeIcon, 'buyPlane');
            break;
          case 'mayTravel':
          case 'mustTravel':
            this.addActionButton("button_cancel_travel", _("I don't want to travel"), 'cancelTravel');
            break;
          case "idolExile": case "researchExile": case "assExile":  case "exileForCard": case "mayExile": case "hairpinExile":
            this.addActionButton("button_cancel_exile", _("I don't want to exile anything"), 'cancelExile');
            break;
          case 'choosePass':
            var buttonText = _("Use as free action");
            var cardDiv = $("card-" + this.selectedCard);
            if (cardDiv && cardDiv.dataset.cardtype == "art" && cardDiv.dataset.cardnum == 16) {
              buttonText = _("Use as main action");
            }
            this.addActionButton("button_choose_pass", _("Use to pass"), 'choosePass', null, false, "red");
            this.addActionButton("button_choose_notpass", buttonText, 'chooseNotPass');
            break;
          case 'evalPlane':
            this.addActionButton("button_plane_compass", _("Get ") +  compassIcon + compassIcon + _(" instead"), 'planeCompass');
            break;

          case 'idolUpgrade': case 'researchUpgrade': case "assUpgrade": case "guardUpgrade": case 'cardUpgrade':
            this.addActionButton("button_upgrade_1", tabletIcon + arrow + arrowheadIcon, 'upgrade1');
            this.addActionButton("button_upgrade_2", arrowheadIcon + arrow + jewelIcon, 'upgrade2');
            this.addActionButton("button_upgrade_cancel", _("I don't want to trade"), 'upgradeCancel');
            break;
          case "assJewelArrowhead":
            this.addActionButton("button_arrowhead", arrowheadIcon, 'getArrowhead');
            this.addActionButton("button_jewel", jewelIcon, 'getJewel');
            break;
          case "selectCardAmt":
            for (var cardAmt = 1; cardAmt <= this.gamedatas.gamestate.args.maxAmt; ++cardAmt) {
              this.addActionButton("button_draw_" + cardAmt, _("Draw ") + cardAmt, 'selectCardAmt' + cardAmt);
            }
            break;
          case "artEarringSelectTopdeck":
            this.addActionButton("button_earring_cancel", _("I don't want to put anything to the deck"), 'cancelEarring');
            break;
          case "mayDiscard":
            this.addActionButton("button_cancelDiscard", _("I don't want to discard (lose 1 jewel)"), 'cancelDiscard');
            break;
          case "selectResearchDiscount":
            this.addActionButton("button_2tablet", tabletIcon + tabletIcon, 'discountResearchTablet');
            this.addActionButton("button_arrowhead", arrowheadIcon, 'discountResearchArrowhead');
            break;
          case "selectKnife":
            this.addActionButton("button_knife_coins", coinIcon, 'knifeBonus_coins');
            this.addActionButton("button_knife_tablet", tabletIcon, 'knifeBonus_tablet');
            this.addActionButton("button_knife_compass", compassIcon, 'knifeBonus_compass');
            break;
          case "decideKeep":
            this.addActionButton("button_confirm_keep", _("Confirm"), "confirmKeep");
            dojo.destroy("button_undo");
            break;
          case "buyArt":
            this.addActionButton("cancel_buy", _("Don't buy Artefact"), "cancelBuy");
            dojo.destroy("button_undo");
            break;
          case "buyItem":
            this.addActionButton("cancel_buy", _("Don't buy Item"), "cancelBuy");
            dojo.destroy("button_undo");
            break;
        }
        if (this.last_server_state.name == "artWaitArgs" && !["exileForCard", "cardUpgrade"].includes(stateName)) {
          this.addActionButton("button_skip_art", _("Skip artifact effect"), "skipArt", null, false, "red");
        }
      }
    },
    changeLayout(name) {
      this.forceLayout = name;
      dojo.query(".layout-selected").removeClass("layout-selected");
      dojo.query(".layout-" + name).addClass("layout-selected")
      this.onScreenWidthChange();
    },
    layoutTwocol() {
      this.changeLayout("twoCol");
    },
    layoutAuto() {
      this.changeLayout("auto");
    },
    layoutOnecol() {
      this.changeLayout("oneCol");
    },
    endturnAuto() {
      dojo.query("#preference_control_102 *").attr("selected", false);
      var newVal = this.prefs[102].value == 1 ? 2 : 1;
      var element = dojo.query("#preference_control_102")[0];
      element.value = newVal;

      // https://stackoverflow.com/questions/2856513/how-can-i-trigger-an-onchange-event-manually
      if ("createEvent" in document) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("change", false, true);
        element.dispatchEvent(evt);
      }
      else {
        element.fireEvent("onchange");
      }
      this.prefs[102].value = newVal;
    },
    onScreenWidthChange() {
      var viewWidth = dojo.query(".arnak-wrap")[0].offsetWidth;
      viewWidth = Math.min(viewWidth, 1600);
      var board = dojo.query(".arnak-board")[0];
      var twoCols = viewWidth > 700;
      if (this.forceLayout == "twoCol") {
        twoCols = true;
      }
      if (this.forceLayout == "oneCol") {
        twoCols = false;
      }
      var baseW = 720;
      var boardH = 1023;

      var targetW = viewWidth / (twoCols ? 2 : 1);
      var ratio = Math.min(1, targetW / baseW - 0.01);

      board.style.transform = "scale(" + ratio + ")";
      var horizMargin = (baseW) /2 * (1-ratio);
      board.style.marginLeft = board.style.marginRight = -horizMargin + "px";

      var vertMargin = (boardH) / 2 * (1-ratio);
      board.style.marginTop = board.style.marginBottom = -vertMargin + "px";

      for (var p of Object.keys(this.gamedatas.players)) {
        var playerArea = dojo.query(".area-" + p)[0];
        if (!playerArea) {
          continue;
        }
        playerArea.style.transform = "scale(" + ratio + ")";
        playerArea.style.marginLeft = playerArea.style.marginRight = -horizMargin + "px";
        var s = getComputedStyle(playerArea);
        var h = 0 + parseInt(s.height) + parseInt(s.paddingTop) + parseInt(s.paddingBottom);
        var vertMargin = (h) / 2 * (1-ratio);
        playerArea.style.marginTop = playerArea.style.marginBottom = -vertMargin + "px";
      }
    },

    /* @Override */
    format_string_recursive : function(log, args) {
      try {
        if (log && args && !args.processed) {
          args.processed = true;

          var prefix = "";
          var sufix = "";
          if (args.cardType) {
            prefix = "<div class='notif-inner-tooltip' data-type='" + args.cardType + "' data-num='" + (args.cardNum || args.num) + "'>";
            sufix = "</div>";
          }
          this.updateNotificationTooltips();
        }
      } catch (e) {
        console.error(log, args, 'Exception thrown', e.stack);
      }

      return prefix + this.inherited(arguments) + sufix;
    },
    updateNotificationTooltips() {
      var logMessages = dojo.query("#logs .log");
      for (var i = 0; i < Math.min(logMessages.length, 30); ++i) {
        var message = logMessages[i];
        var inner;
        if (inner = dojo.query(".notif-inner-tooltip", message)[0]) {
          this.addTooltipHtml(message.id, this.tooltips.card(inner.dataset.type, inner.dataset.num), this.tooltipDelay);
        }
      }
    },
    setupNotifications: function()
    {
      dojo.subscribe("playCard", this, "notif_cardPlayed");
      dojo.subscribe("discardCard", this, "notif_cardPlayed");
      dojo.subscribe("exileCard", this, "notif_exileCard");
      dojo.subscribe("gainRes", this, "notif_gainRes");
      dojo.subscribe("gainFear", this, "notif_gainFear");
      dojo.subscribe("pass", this, "notif_pass");
      dojo.subscribe("nextRound", this, "notif_nextRound");
      dojo.subscribe("putToDeck", this, "notif_putToDeck");
      dojo.subscribe("cardReveal", this, "notif_cardReveal");
      dojo.subscribe("drawnCardPutBack", this, "notif_drawnCardPutBack");
      dojo.subscribe("shufflePlay", this, "notif_shufflePlay");
      dojo.subscribe("drawCard", this, "notif_drawCard");
      dojo.subscribe("drawSelfCard", this, "notif_drawSelfCard");
      dojo.subscribe("moveStaff", this, "notif_moveStaff");
      dojo.subscribe("removeStaffCard", this, "notif_removeStaffCard");
      dojo.subscribe("returnWorkers", this, "notif_returnWorkers");
      dojo.subscribe("moveWorker", this, "notif_moveWorker");
      dojo.subscribe("guardMove", this, "notif_guardMove");
      dojo.subscribe("discoverLocation", this, "notif_discoverLocation");
      dojo.subscribe("siteReveal", this, "notif_siteReveal");
      dojo.subscribe("idolGain", this, "notif_idolGain");
      dojo.subscribe("newGuardian", this, "notif_newGuardian");
      dojo.subscribe("overcomeGuard", this, "notif_overcomeGuardian");
      dojo.subscribe("useGuard", this, "notif_useGuard");
      dojo.subscribe("research", this, "notif_research");
      dojo.subscribe("getTempleTile", this, "notif_getTempleTile");
      dojo.subscribe("removeResearchToken", this, "notif_removeResearchToken");
      dojo.subscribe("useAssistant", this, "notif_useAssistant");
      dojo.subscribe("getAssistant", this, "notif_getAssistant");
      dojo.subscribe("returnAss", this, "notif_returnAssistant");
      dojo.subscribe("upgradeAss", this, "notif_upgradeAss");
      dojo.subscribe("refreshAss", this, "notif_refreshAss");
      dojo.subscribe("refreshAll", this, "notif_refreshAll");
      dojo.subscribe("passStartMarker", this, "notif_passStartMarker");
      dojo.subscribe("endTurn", this, "notif_endTurn");
      dojo.subscribe("earringKeep", this, "notif_earringKeep");
      dojo.subscribe("showAllCards", this, "notif_showAllCards");
      dojo.subscribe("deckDisplay", this, "notif_deckDisplay");
      dojo.subscribe("score", this, "notif_score");

      this.notifqueue.setSynchronous("drawSelfCard", 800);
      this.notifqueue.setSynchronous("gainRes", 500);
      this.notifqueue.setSynchronous("gainFear", 500);
      this.notifqueue.setSynchronous("putToDeck", 500);
      this.notifqueue.setSynchronous("playCard", 800);
      this.notifqueue.setSynchronous("score", 2000);
      this.notifqueue.setSynchronous("moveWorker", 800);

      this.notifqueue.setSynchronous("shufflePlay", 1000);
      this.notifqueue.setSynchronous("passStartMarker", 500);
      this.notifqueue.setSynchronous("removeStaffCard", 500);

      this.notifqueue.setSynchronous("startScoring", 2000);


    },

    notif_cardPlayed: function(notif) {
      var id = notif.args.cardId;
      var play = this.gamedatas.players[notif.args.player_id].play;
      var found = false;
      if (notif.args.player_id == this.player_id) {
        for (var i in this.hand) {
          if (this.hand[i].id == id) {
            this.play.push(this.hand.splice(i, 1)[0]);
            found = true;
            this.gamedatas.players[notif.args.player_id].hand_amt -= 1;
          }
        }

      }
      for (var i in this.artSupply) {
        if (this.artSupply[i].id == id) {
          play.push(this.artSupply.splice(i, 1)[0]);
          found = true;
        }
      }
      if (!found) {
        play.push({id: id, type: notif.args.cardType, num: notif.args.cardNum, justPlayed: true});
        this.gamedatas.players[notif.args.player_id].hand_amt -= 1;
      }

      if (notif.args.cardType == "art") {
        this.artSelected = notif.args.cardNum;
      }

      this.restoreServerGameState();
      this.updatePlayerCards(notif.args.player_id);
    },
    notif_exileCard: function(notif) {
      var a = notif.args;
      var cardDiv = dojo.byId("card-" + a.cardId);
      if (cardDiv) {
        this.fadeOutAndDestroy(cardDiv);
      }
      var play = this.gamedatas.players[a.player_id].play;
      var found = false;
      for (var i in play) {
        if (play[i].id == a.cardId) {
          play.splice(i, 1);
          found = true;
          break;
        }
      }
      if (!found) {
        // exiled from hand
        this.gamedatas.players[a.player_id].hand_amt -= 1;
      }
      if (a.player_id == this.player_id) {
        for (var i in this.hand) {
          if (this.hand[i].id == a.cardId) {
            this.hand.splice(i, 1);
            break;
          }
        }
      }
      for (var i in this.itemSupply) {
        if (this.itemSupply[i].id == a.cardId) {
          this.itemSupply.splice(i, 1);
          this.gamedatas.players[a.player_id].hand_amt += 1;
          break;
        }
      }
      if (notif.args.cardType == "item") {
        this.gamedatas.itemExile += 1;
      }
      else if (notif.args.cardType == "art") {
        this.gamedatas.artExile += 1;
      }
      this.updatePlayerCards(a.player_id);
      this.restoreServerGameState();
      dojo.query(".exilable").removeClass("exilable");
    },
    notif_gainRes: function(notif) {
      var args = notif.args;
      var resNumber = dojo.query("#player_board_" + args.player_id + " .counter-number-" + args.resName)[0];
      this.gamedatas.players[args.player_id][args.resName] = +this.gamedatas.players[args.player_id][args.resName] + args.amt;
      resNumber.innerHTML = +resNumber.innerHTML + args.amt;
      if (args.resName != "idol_slot") {
        this.updateResources(args.player_id);
      }
      var s = JSON.parse(args.source);
      if (s && args.resName != "idol" && args.resName != "idol_slot") {
        var toId = "overall_player_board_" + args.player_id;
        var fromId;
        var q;
        switch(s.component) {
          case "card":
            fromId = "card-" + s.arg;
            break;
          case "site":
            fromId = "site-" + s.size + "-" + s.num;
            break;
          case "guardian":
            fromId = "guardian-" + s.num;
            break;
          case "sitebox":
            fromId = "site-box-" + s.id;
            break;
          case "research":
            fromId = "research-box-" + s.id;
            break;
          case "assistant":
            fromId = "assistant-" + s.num;
            break;
          case "idol":
            fromId = "idol-bonus-" + s.type + "-" + args.player_id;
            break;
          case "temple":
            fromId = "temple-tile-wrap-" + s.num;
            break;
        }

        if (args.amt < 0) {
          [toId, fromId] = [fromId, toId];
          args.amt = -args.amt;
        }
        var resDiv = "<div class='fly-res icon " + args.resName + "'></div>";
        for (var t = 0; t < args.amt; ++t) {
          setTimeout(function(thisArg) {
            if (!dojo.byId(toId) || !dojo.byId(fromId)) {
              return;
            }
            thisArg.slideTemporaryObject(resDiv, "left-side-wrapper", fromId, toId);
          }, t * 100, this)
        }
      }
    },
    notif_gainFear: function(notif) {
      var a = notif.args;
      this.gamedatas.players[a.player_id].play.push({id: a.fearId, type: "fear", num: null});
      this.updatePlayerCards(a.player_id);
    },
    notif_pass: function(notif) {
      this.playerPass(notif.args.player_id);
    },
    notif_putToDeck: function(notif) {
      if (notif.args.cardId > -1) {
        this.cardToDeck(notif.args.cardId, notif.args.playerId, !notif.args.top);
      }
      for (var cardCollection of [this.itemSupply, this.artSupply, this.hand]) {
        for (var i in cardCollection) {
          if (cardCollection[i].id == notif.args.cardId) {
            cardCollection.splice(i, 1);
            break;
          }
        }
      }
    },
    notif_cardReveal: function(notif) {
      var a = notif.args;
      var cardToPush = {id: a.cardId, type: a.cardType, num: a.cardNum, deckOrder: a.deckOrder}
      if (a.cardType === "item") {
        this.itemSupply.push(cardToPush);
        this.gamedatas.itemDeck -= 1;
      }
      else if (a.cardType === "art") {
        this.artSupply.push(cardToPush);
        this.gamedatas.artDeck -= 1;
      }
      this.updateSupply();
    },
    notif_drawnCardPutBack: function(notif) {
      var a = notif.args;
      var supply = (a.cardType === "item" ? this.itemSupply : this.artSupply);
      for (var i in supply) {
        if( supply[i].id == a.cardId ) {
          supply.splice(i, 1);
          this.gamedatas.itemDeck += 1;
          var cardDiv = dojo.byId("card-" + a.cardId);
          if(cardDiv) {
            dojo.destroy(cardDiv);
          }
          break;
        }
      }
      this.updateSupply();
    },
    notif_earringKeep: function(notif) {
      dojo.query("#card-" + notif.args.cardId).removeClass("earring");
    },
    notif_discardedItems: function(notif) {
      this.makeDiscards(notif.args.cards, notif.args.player_id);

    },
    notif_moveWorker: function(notif) {
      dojo.query(".site-box.selected, .location.selected").removeClass("selected");
      var a = notif.args;
      var color = this.playerColor(a.playerId);
      if (!a.from) {
        this.fadeOutAndDestroy(dojo.query("#player_board_" + a.playerId + " .counter-wrap .meeple:not(.onboard)")[0]);
      }
      var toMove = dojo.query(".camp-" + a.playerId + " .meeple:not(.onboard)")[0];
      if (a.from) {
        toMove = dojo.query(".onboard.meeple[data-position=" + a.from + "][data-slot=" + a.fromSlot + "]")[0];
      }
      dojo.addClass(toMove, "new-meeple");
      var board = dojo.query(".arnak-board")[0];

      var fromHome = (a.siteId == "home");
      if (fromHome) {
        var p = {x : '',  y: ''};
        var destination = dojo.query(".camp-" + a.playerId)[0];
        this.addOverviewMeeple(a.playerId);
      }
      else {
        var workerPos = this.workerPosition(a.siteId, a.slot);
        var p = {x : workerPos.x + "px",  y: workerPos.y + "px"};
        var destination = board;
      }
      //*****
      //if (!dojo.hasClass(cardDiv.parentNode, "player-camp")) {
      newMeepleDiv = toMove.cloneNode(true);
      var b1 = toMove.getBoundingClientRect();
      var b2 = destination.getBoundingClientRect();
      var x = b1.x - b2.x;
      var y = b1.y - b2.y;

      var s = b2.width / destination.offsetWidth;
      x += (1-s) * (x) * (1/s);
      y += (1-s) * (y) * (1/s);

      newMeepleDiv.style.left = x + "px";
      newMeepleDiv.style.top = y + "px";

      dojo.destroy(toMove);
      //}
      newMeepleDiv.style["z-index"] = "";
      dojo.place(newMeepleDiv, destination);

      setTimeout(function(newDiv, p) {
        newDiv.style.left = p.x;
        newDiv.style.top = p.y;
      }, 0, newMeepleDiv, p);
      //*****

      //this.attachToNewParent(toMove, destination);
      newMeepleDiv = dojo.query(".new-meeple")[0];
      newMeepleDiv.dataset.position = fromHome ? '' : a.siteId;
      newMeepleDiv.dataset.slot = fromHome ? '' : a.slot;
      dojo.removeClass(newMeepleDiv, "new-meeple");
      dojo.removeClass(newMeepleDiv, "onboard")
      if (fromHome) {
        dojo.addClass(newMeepleDiv, "onboard");
      }


      this.siteSelected = undefined;
      this.travelSelected = [];
      //this.slideToObjectPos(toMove, destination, p.x, p.y).play();
    },
    notif_guardMove: function(notif) {
      var from = notif.args.from;
      var to = notif.args.to;
      var guardDiv = dojo.query(".location-wrap[data-position=" + from + "] .guardian-wrap")[0];
      var destination = dojo.query(".location-wrap[data-position=" + to + "]")[0];

      dojo.place(guardDiv, destination);
      this.updateSiteTooltips();
    },
    notif_returnWorkers: function(notif) {
      var meeples = dojo.query(".meeple:not(.counter-wrap)");
      for (var meeple of meeples) {
        dojo.destroy(meeple);
      }
      this.makeMeeple(true);
    },
    notif_discoverLocation: function(notif) {
      var a = notif.args;
      this.newSite(a.locationSize, a.locationNum, a.boardPosition);
    },
    notif_siteReveal: function(notif) {
      var a = notif.args;
      this.newSite(a.size, a.num, {type: "card", id: a.cardNum});
    },
    notif_newGuardian: function(notif) {
      var a = notif.args;
      this.newGuard(a.boardPosition, a.guardNum);
      this.updateSiteTooltips();

    },
    notif_overcomeGuardian: function(notif) {
      var a = notif.args;
      var targetBoard = dojo.query(".camp-" + a.playerId)[0];
      var toDestroy = dojo.query(".guardian-wrap.guardian-" + a.guardNum)[0];
      var resNumber = dojo.query("#player_board_" + a.playerId +
      " .counter-number-guardian")[0];
      resNumber.innerHTML = +resNumber.innerHTML + 1;
      this.gamedatas.players[a.playerId].guardians_ready.push({num: a.guardNum});
      var newDiv = this.handGuard(a.guardNum);
      var targetB = dojo.position(targetBoard);
      var x = dojo.position(toDestroy).x - targetB.x;
      var y = dojo.position(toDestroy).y - targetB.y;
      var s = targetB.w / targetBoard.offsetWidth;
      x += (1-s) * (x) * (1/s);
      y += (1-s) * (y) * (1/s);
      newDiv.style.transform = "scale(0.26)";
      newDiv.style.left = x + "px";
      newDiv.style.top = y + "px";
      dojo.place(newDiv, targetBoard);

      setTimeout(
        function(thisArg, playerId) {
          thisArg.updatePlayerGuards(playerId);
        }, 1000, this, a.playerId
      );
      this.fadeOutAndDestroy(toDestroy, 800);
      setTimeout(function(thisArg) {thisArg.updateSiteTooltips()}, 1000, this);
      this.restoreServerGameState();

      dojo.query(".discardable").removeClass("discardable");
    },
    notif_useGuard: function(notif) {
      var a = notif.args;
      var guards = this.gamedatas.players[a.player_id].guardians_ready;
      for (var i in guards) {
        if (guards[i].num == a.guardNum) {
          guards.splice(i, 1);
          break;
        }
      }
      this.fadeOutAndDestroy(dojo.query(".guardian-hand.guardian-" + a.guardNum)[0].parentNode);
      this.restoreServerGameState();
    },
    notif_idolGain: function(notif) {
      var idols = dojo.query(".arnak-board .idol[data-id=" + notif.args.position + "]");
      for (var idol of idols) {
        dojo.destroy(idol);
      }
    },
    notif_nextRound: function(notif) {

    },
    notif_endTurn: function(notif) {
      this.updateSupply();
    },
    notif_shufflePlay: function(notif) {
      for (var p in this.gamedatas.players) {
        var areaDiv = dojo.query(".area-" + p)[0];
        dojo.removeClass(areaDiv, "play-2row play-3row");
        for (var card of this.gamedatas.players[p].play) {
          this.cardToDeck(card.id, p);
        }
        this.gamedatas.players[p].play.splice(0, this.gamedatas.players[p].play.length);
        this.playerPass(p, true);
      }

    },
    notif_drawSelfCard: function(notif) {
      var a = notif.args;
      this.hand.push({id: a.card_id, type: a.card_type, num: a.card_no});
      var deck = dojo.query(".camp-" + this.player_id + " .card.deck");
      var topDeck = deck[deck.length - 1];
      topDeck.id = "card-" + a.card_id;
      topDeck.dataset.cardid = a.card_id;
      dojo.removeClass(topDeck, "deck blank");

      var newEl = topDeck.cloneNode(true);
      topDeck.parentNode.replaceChild(newEl, topDeck);  // remove events, because official ways simply don't work

      var n = dojo.query(".camp-" + this.player_id + " .deck-amt")[0];
      n.innerHTML = +n.innerHTML - 1;

      topDeck = newEl;

      dojo.connect(topDeck, "onclick", this, "handClick");

      var front = dojo.query(".front", topDeck)[0];

      this.addCardClass(front, a.card_type, a.card_no);
      if (notif.args.position == "earring") {
        dojo.addClass(topDeck, "earring");
      }
      this.gamedatas.players[this.player_id].hand_amt += 1;
      setTimeout(function(thisArg) {thisArg.updateHand()}, 0, this);
      this.updatePlayerCards(this.player_id, true);
    },
    notif_drawCard: function(notif) {
      var a = notif.args;
      var toDestroy = dojo.query(".camp-" + a.player_id + " .card-outer.deck");
      toDestroy = toDestroy[toDestroy.length - 1];
      if (a.player_id != this.player_id) {
        dojo.removeClass(toDestroy, "deck");
        this.fadeOutAndDestroy(toDestroy);
        var n = dojo.query(".camp-" + a.player_id + " .deck-amt")[0];
        n.innerHTML = +n.innerHTML - 1;
        this.gamedatas.players[a.player_id].hand_amt += 1;
      }
      this.updatePlayerCards(a.player_id);
    },
    notif_useAssistant: function(notif) {
      dojo.query(".player-camp .assistant-" + notif.args.assNum).addClass("exhausted");
      this.restoreServerGameState();
    },
    notif_getAssistant: function(notif) {
      var assDiv = dojo.query(".assistant[data-num=" + notif.args.assNum + "]")[0];
      if (assDiv) {
        var newAssDiv = assDiv.cloneNode(true);
      }
      else {
        assDiv = dojo.query(".assistant.position-4")[0];
        var newAssDiv = this.assistantDiv(notif.args.assNum, false, false);
        dojo.place(newAssDiv, dojo.query(".arnak-board")[0]);
      }

      var targetBoard = dojo.query(".camp-" + notif.args.player_id)[0];
      var targetB = dojo.position(targetBoard);
      var x = dojo.position(assDiv).x - targetB.x;
      var y = dojo.position(assDiv).y - targetB.y;
      for (var i = 0; i < 10; ++i) {
        dojo.removeClass(newAssDiv, "position-" + i);
      }
      var s = targetB.w / targetBoard.offsetWidth;
      x += (1-s) * (x) * (1/s);
      y += (1-s) * (y) * (1/s);
      //dojo.removeClass(newAssDiv.childNodes[0], "exhausted");
      dojo.style(newAssDiv, "left", x + "px");
      dojo.style(newAssDiv, "top", y + "px");
      dojo.place(newAssDiv, targetBoard);
      this.addTooltipHtml(newAssDiv.id, this.tooltips.assistant(notif.args.assNum, false));
      if (notif.args.gold) {
        dojo.query("div", newAssDiv).addClass("gold");
      }
      var oldInner = dojo.query(".assistant-inner", assDiv)[0];
      for (var i = 1; i <= 12; ++i) {
        dojo.removeClass(oldInner, "assistant-" + i);

      }
      for (var i = 5; i < 10; ++i) {
        dojo.query(".assistant.position-" + i).forEach(function(n) {dojo.destroy(n)});
      }
      var newNum = notif.args.revealedAss;
      if (newNum) {
        dojo.addClass(oldInner, "assistant-" + notif.args.revealedAss);
        assDiv.dataset.num = newNum;
        assDiv.id = "assistant-" + newNum;
        this.addTooltipHtml(assDiv.id, this.tooltips.assistant(newNum, false, notif.args.newHeight));
      }
      else {
        dojo.destroy(assDiv);
      }
      dojo.connect(newAssDiv, "click", this, "assistantClick");

      setTimeout(function(assDiv) {
        assDiv.style.left = null;
        assDiv.style.top = null;
      }, 0, newAssDiv);
    },
    notif_returnAssistant: function(notif) {
      var a = notif.args;
      var assList = this.gamedatas.players[a.player_id].assistants;
      for (var i in assList) {
        if (assList[i].num == a.num) {
          assList[i].gold = false;
          assList.splice(i, 1);
        }
      }
      this.fadeOutAndDestroy(dojo.query(".assistant[data-num=" + a.num + "]")[0], 200);
    },
    notif_upgradeAss: function(notif) {
      dojo.query(".assistant-inner.assistant-" + notif.args.assNum).addClass("gold");
    },
    notif_refreshAss: function(notif) {
      dojo.query(".assistant-inner.assistant-" + notif.args.assNum).removeClass("exhausted");
    },
    notif_refreshAll: function(notif) {
      dojo.query(".assistant:not(.position-4) .assistant-inner.exhausted").removeClass("exhausted");
    },
    notif_research: function(notif) {
      var a = notif.args;
      var player = this.gamedatas.players[a.player_id];
      player["research_" + a.type] = a.researchId;
      if (a.rank != null) {
        player.temple_rank = a.rank;
      }
      this.updateResearchTrack();
    },
    notif_getTempleTile: function(notif) {
      var a = notif.args;
      this.gamedatas.temple_tile[a.num].amt -= 1;
      var tileDiv = dojo.query(".tile-pos-" + a.num)[0];
      if (this.gamedatas.temple_tile[a.num].amt <= 0) {
        this.fadeOutAndDestroy(tileDiv);
      }
      var color = a.color;
      var tileN = Math.floor(Math.random() * {"gold": 4, "silver": 6, "bronze": 8}[color] + 1);
      dojo.place(
      dojo.create("div", {class: "temple-tile tile-num-" + tileN + " " + color}),
      dojo.query("#player_board_" + notif.args.player_id + " .temple-wrap")[0]
      );
      this.updateTempleTooltips();
    },
    notif_removeResearchToken: function(notif) {
      var bonusDiv = dojo.query(".research-bonus[data-id=" + notif.args.tokenId + "]")[0];
      if (bonusDiv) {
        dojo.style(bonusDiv, "transition", "");
        this.fadeOutAndDestroy(bonusDiv);
        this.restoreServerGameState();
      }
    },
    notif_passStartMarker: function(notif) {
      dojo.place(dojo.byId("start-player"), dojo.query("#player_board_" + notif.args.player_id + " .res-wrap")[0]);
    },
    notif_moveStaff: function(notif) {
      var staff = dojo.query(".staff-parent")[0];
      dojo.removeClass(staff, "round1 round2 round3 round4 round5");
      dojo.addClass(staff, "round" + notif.args.roundNo);
    },
    notif_removeStaffCard: function(notif) {
      this.sortSupply();
      var args = notif.args;
      var supply = (args.cardType === "item" ? this.itemSupply : this.artSupply);
      if (supply[0].id != args.cardId) {
        console.log("lowest card id does not match");
      }
      supply.splice(0, 1);
      this.fadeOutAndDestroy(dojo.byId("card-" + args.cardId));
      if (args.cardType === "item") {
        this.gamedatas.itemExile += 1;
      }
      else {
        this.gamedatas.artExile += 1;
      }
    },
    notif_showAllCards: function(notif) {
      var playerId = notif.args.player_id;
      var cards = JSON.parse(notif.args.cards);
      var player = this.gamedatas.players[playerId];
      player.hand = player.deck = [];
      player.play = cards;
      dojo.query(".card.deck, .deck-amt").forEach(dojo.destroy);
      this.updatePlayerCards(playerId);
    },
    notif_deckDisplay: function(notif) {
      var a = notif.args;
      var cardWrap = dojo.create("div", {class: "deck-display-wrap", "data-id": a.player_id});
      dojo.place(cardWrap, dojo.query(".arnak-wrap")[0]);

      for (var c of a.cards) {
        var cardDiv = this.cardDiv(c, a.player_id);
        cardDiv.id += "-display";
        dojo.place(cardDiv, cardWrap);
        this.addTooltipHtml("card-" + c.id + "-display", this.tooltips.card(c.type, c.num), this.tooltipDelay);
      }
    },
    notif_score: function(notif) {
      var a = notif.args;
      var c = this.counters[a.player_id][a.category];
      if (c) {
        c.incValue(+a.score);
      }
      var cT = this.counters[a.player_id].total;
      if (cT) {
        cT.incValue(a.score);
      }
      this.scoreCtrl[a.player_id].incValue(a.score);
    }
   });
});
