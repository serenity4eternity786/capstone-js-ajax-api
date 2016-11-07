function doIt() {
    var datainfo = $.ajax({
        url: 'https://omgvamp-hearthstone-v1.p.mashape.com/info/', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {}, // Additional parameters here
        dataType: 'json',
        success: function (datainfo) {
            //
            //Change data.source to data.something , where something is whichever part of the object you want returned.
            //To see the whole object you can output it to your browser console using:
            console.log(datainfo);            
        },
        error: function (err) {
            alert(err);
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "WSWRlNjNUEmshRZyglgBobs9R6Uop1a9fC8jsnUZaFZwRpGFgX"); // Enter here your Mashape key
        }
        
    });

    var datacards = $.ajax({
        url: 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/', // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
        type: 'GET', // The HTTP Method, can be GET POST PUT DELETE etc
        data: {}, // Additional parameters here
        dataType: 'json',
        success: function (datacards) {
            //
            //Change data.source to data.something , where something is whichever part of the object you want returned.
            //To see the whole object you can output it to your browser console using:
            console.log(datacards);
            
        },
        error: function (err) {
            alert(err);
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader("X-Mashape-Authorization", "WSWRlNjNUEmshRZyglgBobs9R6Uop1a9fC8jsnUZaFZwRpGFgX"); // Enter here your Mashape key
        }
        
    });
}
