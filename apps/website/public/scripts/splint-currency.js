/**
 * Show GBP or USD amounts based on location (UK = £, US = $).
 * Elements with data-currency="gbp" or data-currency="usd" are shown/hidden.
 */
(function () {
  function isUS() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
      var lang = navigator.language || "";
      return lang.startsWith("en-US") || tz.startsWith("America/");
    } catch (e) {
      return false;
    }
  }

  function applyCurrency() {
    var showUSD = isUS();
    document.querySelectorAll('[data-currency="gbp"]').forEach(function (el) {
      el.classList.toggle("hidden", showUSD);
    });
    document.querySelectorAll('[data-currency="usd"]').forEach(function (el) {
      el.classList.toggle("hidden", !showUSD);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyCurrency);
  } else {
    applyCurrency();
  }
})();
