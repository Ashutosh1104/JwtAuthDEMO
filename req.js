module.exports=function apiRequest(type, url) {
    return $.ajax({
      url: url,
      type: type,
      headers: {
        token: localStorage.getItem("token"),
      }
    });
  }
