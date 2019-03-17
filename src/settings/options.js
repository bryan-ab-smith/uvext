/* https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Implement_a_settings_page */
function saveOptions(e) {
    e.preventDefault();
    var citySelect = document.getElementById('citySelect');
    if (citySelect.value == "nocity") {
      alert("Invalid option. Please select a city.")
    } else {
      browser.storage.sync.set({
        city: citySelect.value
      });
      // https://stackoverflow.com/a/12933067
      if (firstVal.options[0].value == "nocity") {
        firstVal.remove(0);
      }
    }
  }
  
  function restoreOptions() {
  
    function setCurrentChoice(result) {
      document.getElementById('citySelect').value = result.city || "nocity";
      if (result.city != undefined) {
        document.getElementById('citySelect').remove(0);
      }
    }
  
    function onError(error) {
      console.log(`Error: ${error}`);
    }
  
    var getting = browser.storage.sync.get("city");
    getting.then(setCurrentChoice, onError);
  }
  
  document.addEventListener("DOMContentLoaded", restoreOptions);
  document.querySelector("form").addEventListener("submit", saveOptions);