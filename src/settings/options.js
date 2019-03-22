/* https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Implement_a_settings_page */
function saveOptions(e) {
	e.preventDefault();
	// Get the value of the city from the dropdown dialog.
	var citySelect = document.getElementById('citySelect');
	// If the city is "nocity" (ie. they chose the "select a city" option)
	if (citySelect.value == "nocity") {
		// Alert the user that the "select a city" option is invalid.
		alert("Invalid option. Please select a city.")
	} else {
		// Set the storage value to the dropdown.
		browser.storage.sync.set({
			city: citySelect.value
		});
		// If the "select a city" option is present, remove it (it's no longer needed).
		// https://stackoverflow.com/a/12933067
		if (firstVal.options[0].value == "nocity") {
			firstVal.remove(0);
		}
	}
}

function restoreOptions() {

	function setCurrentChoice(result) {
		// Set the drop down to the current set value.
		document.getElementById('citySelect').value = result.city || "nocity";
		// If a city has already been set (ie. it's not undefined), remove the "select a city" option.
		if (result.city != undefined) {
			document.getElementById('citySelect').remove(0);
		}
	}

	function onError(error) {
		console.log(`Error: ${error}`);
	}

	// Get the city.
	var getting = browser.storage.sync.get("city");
	getting.then(setCurrentChoice, onError);
}

// When the DOM is loaded, restore the options.
document.addEventListener("DOMContentLoaded", restoreOptions);
// Add an event handler to the submit form.
document.querySelector("form").addEventListener("submit", saveOptions);