const VERSION = "0.0.1"
var bitcoins = 0
var bitcoinRate = 0

var items = [
  {
    "name": "item_oldCalculator"
  },
  {
    "name": "item_oldCpu"
  },
  {
    "name": "item_oldComputerFromGrandpa"
  },
  {
    "name": "item_rapsberrypy"
  },
  {
    "name": "item_smartphone"
  },
  {
    "name": "item_middleClassPC"
  },
  {
    "name": "item_cheapServer"
  },
  {
    "name": "item_gamingPC"
  },
  {
    "name": "item_cheapMiner"
  },
  {
    "name": "item_highEndUltraPC"
  },
  {
    "name": "item_newGoodMiner"
  },
  {
    "name": "item_bigMiner"
  },
  {
    "name": "item_miningFarm"
  },
  {
    "name": "item_nasaPC"
  },
  {
    "name": "item_quantumRig"
  },
  {
    "name": "item_miningFarmSpace"
  },
  {
    "name": "item_miningFarmMoon"
  },
  {
    "name": "item_bitcoinTimeMachine"
  },
  {
    "name": "item_blackHolePoweredMiner"
  }
]

var bSec = null;

localStorage.setItem("bitcoins", "0");

if(localStorage.getItem("bitcoins") === null){
  // Bitcoins are 0
  bitcoins = 0

  // Set the localStorage Item for the first time
  localStorage.setItem("bitcoins", "0");

  // Write the current amount of Bitcoins on the page
  $(".bitcoinAmount").text(bitcoins.toFixed(8))

}else{

  // Get the amount of Bitcoins and parse them to a float number
  bitcoins = parseFloat(localStorage.getItem("bitcoins"))

  // Set the text on the page
  $(".bitcoinAmount").text(bitcoins.toFixed(8))
  $(".satoshiAmount").text(Math.round(bitcoins * 100000000))

}

setBitcoinPerSecondRateAtBeginning()

bSec = setInterval(function () {
  bSecFunction(bitcoinRate);
}, 1000)

$(document).ready(function () {

  // If clicked on the big Bitcoin
  $(".bitcoin").click(function () {

    // Add 1^-8 Bitcoins (equal to 1 satoshi)
    bitcoins = bitcoins + 0.00000001

    // Show the new number on the page
    $(".bitcoinAmount").text(bitcoins.toFixed(8))
    $(".satoshiAmount").text(Math.round(bitcoins * 100000000))

    // Save the new amount of Bitcoins in the localStorage storage
    localStorage.setItem("bitcoins", "" + bitcoins + "")

  });


  // If any item from the list was clicked...
  $(".purchaseItem").click(function () {

    // Get following attributes and children elements
    var id = $(this).attr("id")
    var price = parseFloat($(this).attr("data-price"))
    var bitcoinsPerSecond = parseFloat($(this).attr("data-bits-per-sec"))
    var amountDisplay = $(this).children()[0]
    var amountDisplayAmount = parseInt(amountDisplay.textContent)

    // If you have enough Bitcoins, it´ll buy one item
    if(price <= bitcoins){

      //
      bitcoins = bitcoins - price

      // Save the new amount of Bitcoins in the localStorage storage
      localStorage.setItem("bitcoins", "" + bitcoins + "")

      // Changing amount number on the right of the item
      amountDisplayAmount = amountDisplayAmount + 1
      amountDisplay.textContent = amountDisplayAmount.toString()

      // Changing the Bitcoins amount
      $(".bitcoinAmount").text(bitcoins.toFixed(8))
      $(".satoshiAmount").text(Math.round(bitcoins * 100000000))

      // Saving everything which has to do with the bought item
      itemAction(id)

      // "Restart" the function with the new bitcoin rate values
      stopBsec()
      var newRate = setNewBitcoinRate(bitcoinsPerSecond)

      bSec = setInterval(function () {
        bSecFunction(newRate);
      }, 1000)

    }

  })

});



function itemAction(id) {

  var item = id
  var itemAmount = 0;

  if(localStorage.getItem(item) === null){
    localStorage.setItem(item, "1");
  }else{
    itemAmount = parseInt(localStorage.getItem(item))

    localStorage.setItem(item, "" + (itemAmount + 1) + "");

  }

}

function setBitcoinPerSecondRateAtBeginning () {

  for(var i = 0; i < items.length; i++){
    if(localStorage.getItem(items[i].name) === null){
      localStorage.setItem(items[i].name, "0")
    }else{
      $("#" + items[i].name).children()[0].textContent = localStorage.getItem(items[i].name)

      var bits_per_sec = $("#" + items[i].name).attr("data-bits-per-sec")
      var amountOfItem = parseInt(localStorage.getItem(items[i].name))

      var before = bitcoinRate

      bitcoinRate = bitcoinRate + (amountOfItem * bits_per_sec)
      console.log("i = " + i + " | B/sec before: " + before.toFixed(8) +
        " - Calculation made: " + before.toFixed(8) + " + (" + amountOfItem + " * " + bits_per_sec + ") = " +  bitcoinRate.toFixed(8) +
        " | New B/sec at " + bitcoinRate.toFixed(8))
    }
  }

}

function setNewBitcoinRate (rate) {

  console.log("setNewBitcoinRate -> New rate: " + (bitcoinRate + rate).toFixed(8) )
  return bitcoinRate = bitcoinRate + rate;

}

function bSecFunction (rate) {

  bitcoins = bitcoins + rate

  // Show both values on the page
  $(".bitcoinAmount").text(bitcoins.toFixed(8))
  $(".satoshiAmount").text(Math.round(bitcoins * 100000000))

  // Save bitcoin amount in the storage
  localStorage.setItem("bitcoins", "" + bitcoins + "")

  console.log("bSec -> B/sec at " + rate.toFixed(8))

}

function stopBsec () {
  clearInterval(bSec)
}



