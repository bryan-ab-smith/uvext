/*
    This function gets the data and manipulates the DOM with the received data.
*/
function onGot(item) {
    // If the city stored in memory doesn't exist (ie. the user hasn't set it)...
    if (item.city == undefined) {
        // Hide the loading spinner.
        $('#loadingSpinner').hide();
        // Tell the user that they should set the city.
        $('#noCity').html('It seems like you haven\'t set a city yet.<br \\>To do so, head over to the preferences to set one.');
        // Hide the UV table (as it has no data yet).
        $('#uvTable').hide();
        // Otherwise, a city has been set.
    } else {
        // Hide the no city dialog.
        $('#noCity').hide();
        $('#loadingSpinner').show();
        // Set up and execute the AJAX request.
        // Thanks to http://www.jquerybyexample.net/2012/04/read-and-process-xml-using-jquery-ajax.html
        $.ajax({
            type: 'GET',
            url: 'https://uvdata.arpansa.gov.au/xml/uvvalues.xml',
            dataType: 'xml',
            error: function (xhr) {
                // Hide the loading spinner and set the UV to nothing.
                $('#loadingSpinner').hide();
                $('#uvLarge').html('--');
            },
            success: function (xml) {
                // Hide the loding spinner.
                $('#loadingSpinner').hide();

                // Loop over the locations.
                $(xml).find('location').each(function () {
                    // If the id is the city set by the user
                    if ($(this).attr('id') == item.city) {
                        // Parse the index as a float.
                        floatUV = parseFloat($(this).find('index').text());
                        // If the status of the UV station is ok (ie. there's a reading available)...
                        if ($(this).find('status').text() == 'ok') {
                            // According to WHO and other international guidelines, these are standard colours for the various UV index ranges.
                            // Here, we set a variable to the respective colour.
                            var hexColour = '';
                            if (floatUV < 2) {
                                hexColour = "4eb400";
                            } else if (floatUV >= 2 && floatUV < 3) {
                                hexColour = "a0ce00";
                            } else if (floatUV >= 3 && floatUV < 4) {
                                hexColour = "f7e400";
                            } else if (floatUV >= 4 && floatUV < 5) {
                                hexColour = "f8b600";
                            } else if (floatUV >= 5 && floatUV < 6) {
                                hexColour = "f88700";
                            } else if (floatUV >= 6 && floatUV < 7) {
                                hexColour = "f85900";
                            } else if (floatUV >= 7 && floatUV < 8) {
                                hexColour = "e82c0e";
                            } else if (floatUV >= 8 && floatUV < 9) {
                                hexColour = "d8001d";
                            } else if (floatUV >= 9 && floatUV < 10) {
                                hexColour = "ff0099";
                            } else if (floatUV >= 10 && floatUV < 11) {
                                hexColour = "b54cff";
                            } else if (floatUV >= 11) {
                                hexColour = "998cff";
                            }
                            // Set the UV index to the appropriate colour.
                            $('#uvLarge').css('color', hexColour);
                            // Set the UV index to the appropriate value.
                            $('#uvLarge').html($(this).find('index').text());
                        } else {
                            // Set the UV index to white.
                            $('#uvLarge').css('color', 'white');
                            // Set the UV index to N/A; as the status of the station isn't ok, let the user know that a value isn't available.
                            $('#uvLarge').html('N/A');
                        }
                        // Set the date and time of the UV reading.
                        $('#uvDate').html('As of ' + $(this).find('date').text() + ', ' + $(this).find('time').text());
                        // Set the name of the city on the UV index card.
                        $('#uvTitleCard').html('UV Index for ' + $(this).attr('id'));
                    }
                });
            }
        });
    }
}

function onError(error) {
    // Tell the user that there was an error.
    $('#noCity').html('Error loading the city.');
}

// Get the city
var getting = browser.storage.sync.get("city");
getting.then(onGot, onError);