function equalId(cookie_id, session_id) {
  var equalId = false;
  if (typeof cookie_id !== "undefined" && typeof session_id !== "undefined") {
    if (cookie_id === session_id) {
      equalId = true;
    }
  }
  return equalId;
}

function isLogined(is_logined) {
  if (typeof is_logined === "undefined") {
    is_logined = false;
  }
  return is_logined;
}

module.exports.equalId = equalId;
module.exports.isLogined = isLogined;
