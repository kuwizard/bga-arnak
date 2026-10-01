function StateArgs (inputArgs) {
  var args = (Array.isArray(inputArgs))? {} : inputArgs;

  return {
    set(obj) {
      for(var key in obj)
        args[key] = obj[key];
    },
    selectedSites: function(needed) {
      args.selectedSites = {selected: [], needed: needed};
    },
    addSelectedSite: function(site) {
      args.selectedSites.selected.push(site);
    },
    enoughSelectedSites: function() {
      return args.selectedSites.selected.length >= args.selectedSites.needed;
    },
    setTravelParams(params) {
      args.travelSelected = TravelSelector();
      args.travelSelected.setParams(params);
    },
    pushTravel(entry) {
      args.travelSelected.push(entry);
    },
    upgrades: function(needed) {
      args.upgrades = {choices: [], needed: needed};
    },
    addUpgrade: function(choice) {
      args.upgrades.choices.push(choice);
    },
    enoughUpgrades: function() {
      return args.upgrades.choices.length >= args.upgrades.needed;
    },
    get: function() {
      return args;
    },
    clear() {
      args = {};
    }
  };
}

function TravelSelector() {
  var travelEntries = [];
  var travelParams = undefined;
  return {
    push: (entry) => {
      for (var travel of travelEntries) {
        if (travel.type == entry.type) {
          switch(travel.type){
            case "card" : if (travel.id == entry.id) return; break;
            case "assistant" : if (travel.num == entry.num) return; break;
            case "guardian" : if (travel.num == entry.num) return; break;
          }
        }
      }
      travelEntries.push(entry);
    },
    get: () => {return travelEntries;},
    setParams : (params) => {travelParams = params;},
    getParams : () => {return travelParams;},
    clear: () => {
      travelParams = undefined;
      travelEntries = [];
    }
  };
}