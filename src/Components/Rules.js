const Rules = [
    {action: "doNothing"},
    {action: "doNothing"},
    {action: "money", amount:1},
    {action: "money", amount:2},
    {action: "move", amount:7},
    {action: "poison", amount: 1},
    {action: "doNothing"},
    {action: "money", amount:1},
    {action: "money", amount:2},
    {action: "doNothing"},
    {action: "move", amount:-5},
    {action: "doNothing"},
    {action: "move", amount:-7},
    {action: "double"},
    {action: "doNothing"},
    {action: "choice", type: "downDrink"}, // needs changing
    {action: "money", amount:1},
    {action: "money", amount:2},
    {action: "doNothing"}, // needs changing
    {action: "doNothing"},
    {action: "doNothing"}, // needs changing
    {action: "doNothing"}, // needs changing
    {action: "doNothing"}, // needs changing
    {action: "doNothing"}, // 24 Checkpoint square
    {action: "game", game: 'busStop'}, // ------------------------------------------------------------------------------------
    {action: "money", amount:1},
    {action: "money", amount:3},
    {action: "doNothing"}, 
    {action: "doNothing"}, 
    {action: "move", amount:7},
    {action: "doNothing"},
    {action: "poison", amount: 2},
    {action: "doNothing"}, 
    {action: "money", amount:2},
    {action: "money", amount:3},
    {action: "doNothing"},
    {action: "doNothing"}, 
    {action: "move", amount:-9}, 
    {action: "doNothing"}, 
    {action: "doNothing"}, 
    {action: "doNothing"},
    {action: "money", amount:2},
    {action: "money", amount:4},
    {action: "doNothing"}, 
    {action: "move", amount:2}, 
    {action: "doNothing"},
    {action: "doNothing"}, 
    {action: "move", amount:-4}, 
    {action: "doNothing"}, 
    {action: "money", amount:3},
    {action: "money", amount:4},
    {action: "poison"},
    {action: "doNothing"}, 
    {action: "doNothing"}, 
    {action: "doNothing"}, 
    {action: "doNothing"},
    // {action: "doNothing", color: 'cyan'}, 
    // {action: "money", amount: -1, color: 'red'}, 
    // {action: "money", amount: -2, color: 'red'},
    // {action: "money", amount: -3, color: 'red'},
    // {action: "money", amount: -1, color: 'red'},
    // {action: "money", amount: -2, color: 'red'},
    // {action: "money", amount: -1, color: 'red'},
    
];

export default Rules;