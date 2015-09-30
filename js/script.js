/**
 * Created by À on 30.09.2015.
 */
var readerWidget = {
    config: {
        messagesAmount: 3, //Default.
        url: 'http://api.massrelevance.com/reccosxof/matchtrax_hashclash_featured_tweets.json',
        updateInterval: 1000 //Default.
    },
    messages: { //Array of arrays. The length of each item will be equal to readerWidget.config.messagesAmount.
        text: [],
        date: [],
        author: [],
        country: []
    },
    getData: function() {
        $.ajax({
            type: 'GET',
            url: readerWidget.config.url,
            dataType: 'jsonp',
            jsonpCallback: "localJsonpCallback",
            success: function(json) {

                for (var i = 0; i < readerWidget.config.messagesAmount; i++) { //Display all data in loop.
                    readerWidget.messages.date[i] = json[i].created_at.slice(3, 19);
                    readerWidget.messages.text[i] = json[i].text.slice(0, json[i].text.indexOf('http'));
                    readerWidget.messages.country[i] = json[i].user.location;
                    readerWidget.messages.author[i] = json[i].user.name.slice(0, json[i].text.indexOf('\\'));;
                }

            }
        });
    },

    displayData: function() {
        $('#widget').html(''); //Clear previous text.
        for (var i = 0; i < readerWidget.config.messagesAmount; i++) {
            $('#widget').append("<div class='zebra'><p class='widget-text'>" + readerWidget.messages.text[i] + "</p>" + readerWidget.messages.date[i] + " wrote " + readerWidget.messages.author[i] + " from " + readerWidget.messages.country[i] + "</div>");
        }
    },

    update: function() {
        setInterval(function() {
            readerWidget.getData();
            readerWidget.displayData();
        }, readerWidget.config.updateInterval);
    }

}



readerWidget.update();

$("input:text#messagesAmount").on('keyup', function() {
    readerWidget.config.messagesAmount = $(this).val(); //Set config variable messagesAmount to user input onchange.
    readerWidget.update();
});

$("input:text#updateInterval").on('keyup', function() {
    readerWidget.config.updateInterval = $(this).val(); //Set config variable updateInterval to user input onchange.
    readerWidget.update();
});