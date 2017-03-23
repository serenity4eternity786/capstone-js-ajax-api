 $('.scroll').jscroll();

$("#submitButton").on('click', function (event) {
    //if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
    event.preventDefault();
    //get the value from the input box
    //    var inputPlayerClass = $(".inputPlayerClass").val();
    var inputQuality = $(".inputQuality").val();
    //    var inputCost = $(".inputCost").val();
    //    var inputHealth = $(".inputHealth").val();
    //    var inputAttack = $(".inputAttack").val();
    //use that value to call the getResults function defined bellow
    var imageOutput = "<li class='spin-image'><img  src='../images-cap/loading_spinner.gif'></li>";
    $("#output").html(imageOutput);
    doit(inputQuality);
});


function doit(inputQuality) {

    //    var datainfo = $.ajax({
    //        url: 'https://omgvamp-hearthstone-v1.p.mashape.com/info/',
    //        type: 'GET',
    //        data: "",
    //        dataType: 'json',
    //        success: function (datainfo) {
    //            //alert("api success");
    //            console.log(datainfo);
    //            displaySearchResults(datainfo, inputPlayerClass, inputQuality, inputCost, inputHealth, inputAttack);
    //
    //        },
    //
    //        error: function (err) {
    //            //alert("api error");
    //            console.log(err);
    //        },
    //        beforeSend: function (xhr) {
    //            xhr.setRequestHeader("X-Mashape-Authorization", "WSWRlNjNUEmshRZyglgBobs9R6Uop1a9fC8jsnUZaFZwRpGFgX");
    //        }
    //
    //    });

    var datacards = $.ajax({
        url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards',
        type: 'GET',
        data: "",
        dataType: 'json',
        success: function (datacards) {
            //console.log(datacards);
            displaySearchResults(datacards, inputQuality);
        },

        error: function (err) {
            console.log(err);
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "WSWRlNjNUEmshRZyglgBobs9R6Uop1a9fC8jsnUZaFZwRpGFgX");
        }

    });
}


function checkImages(imageURL) {
    if (typeof imageURL === 'undefined' || imageURL == null) {
        return "images-cap/hearthstone-default-card.png";
    } else {
        return imageURL;
    }
}

function checkTexts(textValue) {
    if (typeof textValue === 'undefined' || textValue == null) {
        return "-";
    } else {
        return textValue;
    }
}

function displaySearchResults(allCardsArray, inputQuality) {
    //    console.log(inputQuality);
    //    console.log(allCardsArray);
    var imageOutput = ""

    //step 1 showing data
    $.each(allCardsArray, function (cardSetName, cardSetAllCardsDetails) {
        imageOutput += "<li>";
        imageOutput += "<h4>" + cardSetName + "</h4>";

        //if rarity is not set, show all the cards
        if (inputQuality == null) {
            $.each(cardSetAllCardsDetails, function (cardSetOneCardKey, cardSetOneCardDetails) {
                imageOutput += "<ul>";
                imageOutput += "<li class='card-specs'><p>Name: " + checkTexts(cardSetOneCardDetails.name) + "</p>";
                imageOutput += "<p>Rarity: " + checkTexts(cardSetOneCardDetails.rarity) + "</p>";
                imageOutput += "<p>Type: " + checkTexts(cardSetOneCardDetails.type) + "</p>";
                imageOutput += "<p>Text: " + checkTexts(cardSetOneCardDetails.text) + "</p></li>";
                imageOutput += "<li><img class='image-card' src=" + checkImages(cardSetOneCardDetails.img) + "></li>";
                imageOutput += "</ul>";
            });
        }
        //if rarity is set, show only the cards with that rarity
        else {
            $.each(cardSetAllCardsDetails, function (cardSetOneCardKey, cardSetOneCardDetails) {
                if (inputQuality == checkTexts(cardSetOneCardDetails.rarity)) {
                    imageOutput += "<ul>";
                    imageOutput += "<li class='card-specs'><p>Name: " + checkTexts(cardSetOneCardDetails.name) + "</p>";
                    imageOutput += "<p>Rarity: " + checkTexts(cardSetOneCardDetails.rarity) + "</p>";
                    imageOutput += "<p>Type: " + checkTexts(cardSetOneCardDetails.type) + "</p>";
                    imageOutput += "<p>Text: " + checkTexts(cardSetOneCardDetails.text) + "</p></li>";
                    imageOutput += "<li><img class='image-card' src=" + checkImages(cardSetOneCardDetails.img) + "></li>";
                    imageOutput += "</ul>";
                }
            });
        }

        imageOutput += "<li>";

    });
    
  
    //filtering data
    //    $.each(allCardsArray, function (inputPlayerClass) {
    //
    //    if (inputPlayerClass = "Druid") {
    //        imageOutput += "<li>";
    //        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/{Druid}'>";
    //        imageOutput += "<li>";
    //    } else if (inputPlayerClass = "Hunter") {
    //        imageOutput += "<li>";
    //        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/{Hunter}'>";
    //        imageOutput += "<li>";
    //    } else if (inputPlayerClass = "Mage") {
    //        imageOutput += "<li>";
    //        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/{Mage}'>";
    //        imageOutput += "<li>";
    //    } else if (inputPlayerClass = "Paladin") {
    //        imageOutput += "<li>";
    //        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/{Paladin}'>";
    //        imageOutput += "<li>";
    //    } else if (inputPlayerClass = "Priest") {
    //        imageOutput += "<li>";
    //        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/{Priest}'>";
    //        imageOutput += "<li>";
    //    } else if (inputPlayerClass = "Rogue") {
    //        imageOutput += "<li>";
    //        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/{Rogue}'>";
    //        imageOutput += "<li>";
    //    } else if (inputPlayerClass = "Shaman") {
    //        imageOutput += "<li>";
    //        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/{Shaman}'>";
    //        imageOutput += "<li>";
    //    } else if (inputPlayerClass = "Warlock") {
    //        imageOutput += "<li>";
    //        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/{Warlock}'>";
    //        imageOutput += "<li>";
    //    } else if (inputPlayerClass = "Warrior") {
    //        imageOutput += "<li>";
    //        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/classes/{Warrior}'>";
    //        imageOutput += "<li>";
    //    };
    //    $.each(imageArray, function (inputQuality) {
    //
    //        if (inputQuality = "Free") {
    //            imageOutput += "<li>";
    //            imageOutput += "<img url='/images/hearthstone-default-card.png'>";
    //            imageOutput += "<li>";
    //        } else if (inputQuality = "Common") {
    //            imageOutput += "<li>";
    //            imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/info/'>";
    //            imageOutput += "<li>";
    //        } else if (inputQuality = "Rare") {
    //            imageOutput += "<li>";
    //            imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/info/'>";
    //            imageOutput += "<li>";
    //        } else if (inputQuality = "Epic") {
    //            imageOutput += "<li>";
    //            imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/info/'>";
    //            imageOutput += "<li>";
    //        } else if (inputQuality = "Legendary") {
    //            imageOutput += "<li>";
    //            imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/info/'>";
    //            imageOutput += "<li>";
    //        };
    //        $.each(imageArray, function (inputCost) {
    //
    //            if (inputCost = "0") {
    //                imageOutput += "<li>";
    //                imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                imageOutput += "<li>";
    //            } else if (inputCost = "1") {
    //                imageOutput += "<li>";
    //                imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                imageOutput += "<li>";
    //            } else if (inputCost = "2") {
    //                imageOutput += "<li>";
    //                imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                imageOutput += "<li>";
    //            } else if (inputCost = "3") {
    //                imageOutput += "<li>";
    //                imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                imageOutput += "<li>";
    //            } else if (inputCost = "4") {
    //                imageOutput += "<li>";
    //                imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                imageOutput += "<li>";
    //            } else if (inputCost = "5") {
    //                imageOutput += "<li>";
    //                imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                imageOutput += "<li>";
    //            } else if (inputCost = "6") {
    //                imageOutput += "<li>";
    //                imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                imageOutput += "<li>";
    //            } else if (inputCost = "7") {
    //                imageOutput += "<li>";
    //                imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                imageOutput += "<li>";
    //            } else if (inputCost = "8") {
    //                imageOutput += "<li>";
    //                imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                imageOutput += "<li>";
    //            } else if (inputCost = "9") {
    //                imageOutput += "<li>";
    //                imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                imageOutput += "<li>";
    //            } else if (inputCost = "10") {
    //                imageOutput += "<li>";
    //                imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                imageOutput += "<li>";
    //            } else if (inputCost = "11") {
    //                imageOutput += "<li>";
    //                imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                imageOutput += "<li>";
    //            } else if (inputCost = "12") {
    //                imageOutput += "<li>";
    //                imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                imageOutput += "<li>";
    //            } else if (inputCost = "25") {
    //                imageOutput += "<li>";
    //                imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                imageOutput += "<li>";
    //            } else if (inputCost = "50") {
    //                imageOutput += "<li>";
    //                imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                imageOutput += "<li>";
    //            };
    //            $.each(imageArray, function (inputHealth) {
    //
    //                if (inputHealth = "0-10") {
    //                    imageOutput += "<li>";
    //                    imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                    imageOutput += "<li>";
    //                } else if (inputHealth = "11-25") {
    //                    imageOutput += "<li>";
    //                    imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                    imageOutput += "<li>";
    //                } else if (inputHealth = "26-50") {
    //                    imageOutput += "<li>";
    //                    imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                    imageOutput += "<li>";
    //                } else if (inputHealth = "51-75") {
    //                    imageOutput += "<li>";
    //                    imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                    imageOutput += "<li>";
    //                } else if (inputHealth = "76-100") {
    //                    imageOutput += "<li>";
    //                    imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                    imageOutput += "<li>";
    //                } else if (inputHealth = "101-200") {
    //                    imageOutput += "<li>";
    //                    imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                    imageOutput += "<li>";
    //                };
    //                $.each(imageArray, function (inputAttack) {
    //
    //                    if (inputAttack = "0") {
    //                        imageOutput += "<li>";
    //                        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                        imageOutput += "<li>";
    //                    } else if (inputAttack = "1") {
    //                        imageOutput += "<li>";
    //                        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                        imageOutput += "<li>";
    //                    } else if (inputAttack = "2") {
    //                        imageOutput += "<li>";
    //                        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                        imageOutput += "<li>";
    //                    } else if (inputAttack = "3") {
    //                        imageOutput += "<li>";
    //                        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                        imageOutput += "<li>";
    //                    } else if (inputAttack = "4") {
    //                        imageOutput += "<li>";
    //                        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                        imageOutput += "<li>";
    //                    } else if (inputAttack = "5") {
    //                        imageOutput += "<li>";
    //                        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                        imageOutput += "<li>";
    //                    } else if (inputAttack = "6") {
    //                        imageOutput += "<li>";
    //                        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                        imageOutput += "<li>";
    //                    } else if (inputAttack = "7") {
    //                        imageOutput += "<li>";
    //                        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                        imageOutput += "<li>";
    //                    } else if (inputAttack = "8") {
    //                        imageOutput += "<li>";
    //                        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                        imageOutput += "<li>";
    //                    } else if (inputAttack = "9") {
    //                        imageOutput += "<li>";
    //                        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                        imageOutput += "<li>";
    //                    } else if (inputAttack = "10") {
    //                        imageOutput += "<li>";
    //                        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                        imageOutput += "<li>";
    //                    } else if (inputAttack = "11") {
    //                        imageOutput += "<li>";
    //                        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                        imageOutput += "<li>";
    //                    } else if (inputAttack = "12") {
    //                        imageOutput += "<li>";
    //                        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                        imageOutput += "<li>";
    //                    } else if (inputAttack = "20") {
    //                        imageOutput += "<li>";
    //                        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                        imageOutput += "<li>";
    //                    } else if (inputAttack = "30") {
    //                        imageOutput += "<li>";
    //                        imageOutput += "<img url='https://omgvamp-hearthstone-v1.p.mashape.com/cards/'>";
    //                        imageOutput += "<li>";
    //                    }
    //                });
    //            });
    //        });
    //    });

    //});

    $("#output").html(imageOutput);
}
