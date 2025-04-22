const mountins = [
  {
    cordA : 2,
    cordB : 2,
  },
  {
    cordA : 4,
    cordB : 9,
  },
  {
    cordA : 6,
    cordB : 4,
  },
  {
    cordA : 9,
    cordB : 10,
  },
  {
    cordA : 10,
    cordB : 6,
  }
];

const missions = 
[
  {  
    "title": "Az erdő széle",
    "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.",
    "img" : "images/kuldik/alap/erdo_szele.png",
    "points" : 0
  },
  {
    "title": "Álmos-völgy",
    "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.",
    "img" : "images/kuldik/alap/almosvolgy.png",
    "points" : 0
  },
  {
    "title": "Krumpliöntözés",
    "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.",
    "img" : "images/kuldik/alap/krumpliont.png",
    "points" : 0
  },
  {
    "title": "Határvidék",
    "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz.",
    "img" : "images/kuldik/alap/hatarvidek.png",
    "points" : 0
  },
  {
    "title": "Fasor",
    "description": "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért.",
    "img" : "images/kuldik/extra/fasor.png",
    "points" : 0
  },
  {
    "title": "Gazdag város",
    "description": "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz.",
    "img" : "images/kuldik/extra/gazdagVaros.png",
    "points" : 0
  },
  {
    "title": "Öntözőcsatorna",
    "description": "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte.",
    "img" : "images/kuldik/extra/ontozoCsatorna.png",
    "points" : 0
  },
  {
    "title": "Mágusok völgye",
    "description": "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.",
    "img" : "images/kuldik/extra/magusVolgy.png",
    "points" : 0
  },
  {
    "title": "Üres telek",
    "description": "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.",
    "img" : "images/kuldik/extra/uresTelek.png",
    "points" : 0
  },
  {
    "title": "Sorház",
    "description": "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz.",
    "img" : "images/kuldik/extra/sorhaz.png",
    "points" : 0
  },
  {
    "title": "Páratlan silók",
    "description": "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.",
    "img" : "images/kuldik/extra/paratlanSilok.png",
    "points" : 0
  },
  {
    "title": "Gazdag vidék",
    "description": "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz.",
    "img" : "images/kuldik/extra/gazdagVidek.png",
    "points" : 0
  }
]


const elements = [
    {
        time: 2,
        type: 'water',
        shape: [[0,0,0],
                [1,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[0,0,0],
                [1,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false        
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[0,0,0],
                [1,1,1],
                [0,0,1]],
            rotation: 0,
            mirrored: false  
        },
    {
        time: 2,
        type: 'forest',
        shape: [[0,0,0],
                [1,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'town',
        shape: [[0,0,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'farm',
        shape: [[0,0,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[0,0,0],
                [0,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'town',
        shape: [[0,0,0],
                [1,1,1],
                [1,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0,1,0],
                [1,1,1],
                [0,1,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,1],
                [1,0,0],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,0,0],
                [1,1,1],
                [1,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,1]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1,1,0],
                [0,1,1],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
    {
        time: 2,
        type: 'water',
        shape: [[1,1,0],
                [1,1,0],
                [0,0,0]],
        rotation: 0,
        mirrored: false  
    },
]

const field = {
    basic: "images/base_tile.png",
    mountain: "images/mountain_tile.png",
    water: "images/water_tile.png",
    forest: "images/forest_tile.png",
    farm: "images/plains_tile.png",
    town: "images/village_tile.png",
    nothing: "images/empty.png"
}

const season = {

  spring: {
    short : "Tavasz",
    long : "Tavaszból hátralévő idő:"
  },
  summer: {
    short : "Nyár",
    long : "Nyárból hátralévő idő:"
  },
  autumn: {
    short : "Ősz",
    long : "Őszből hátralévő idő:"
  },
  winter: {
    short : "Tél",
    long : "Télből hátralévő idő:"
  }  
}

const endGameText = {
  disaster: "Tessék komolyan venni",
  bad : "Megy ez jobban is,",
  medium : "Nem volt rossz,",
  good : "Ügyes voltál",
  excellent: "Te egy született zseni vagy",
  rekorder:"Megdöntötted krisztán rekordját!! Ezzel kimaxoltad a játékot"   
}