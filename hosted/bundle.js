"use strict";

var handleDomo = function handleDomo(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#domoName").val() == '' || $("#domoAge").val() == '' || $("#domoCute").val() == '') {
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function () {
    loadDomosFromServer();
  });
  return false;
};

var handleOmod = function handleOmod(e) {
  e.preventDefault();
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);

  if ($("#omodName").val() == '' || $("#omodAge").val() == '' || $("#omodEvil").val() == '') {
    console.log("This is the error!");
    handleError("RAWR! All fields are required");
    return false;
  }

  sendAjax('POST', $("#omodForm").attr("action"), $("#omodForm").serialize(), function () {
    loadOmodsFromServer();
  });
  return false;
};

var DomoForm = function DomoForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "domoForm",
    onSubmit: handleDomo,
    name: "domoForm",
    action: "/maker",
    method: "POST",
    className: "domoForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "domoName",
    type: "text",
    name: "name",
    placeholder: "Domo Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "age"
  }, "Age: "), /*#__PURE__*/React.createElement("input", {
    id: "domoAge",
    type: "text",
    name: "age",
    placeholder: "Domo Age"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "cute"
  }, "Cuteness: "), /*#__PURE__*/React.createElement("input", {
    id: "domoCute",
    type: "text",
    name: "cute",
    placeholder: "Domo Cuteness"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeDomoSubmit",
    type: "submit",
    value: "Make Domo"
  }));
};

var OmodForm = function OmodForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "omodForm",
    onSubmit: handleOmod,
    name: "omodForm",
    action: "/oMaker",
    method: "POST",
    className: "omodForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "omodName",
    type: "text",
    name: "name",
    placeholder: "Omod Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "age"
  }, "Age: "), /*#__PURE__*/React.createElement("input", {
    id: "domodAge",
    type: "text",
    name: "age",
    placeholder: "Omod Age"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "evil"
  }, "Evilness: "), /*#__PURE__*/React.createElement("input", {
    id: "omodEvil",
    type: "text",
    name: "evil",
    placeholder: "Omod Cuteness"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "makeOmodSubmit",
    type: "submit",
    value: "Make Omod"
  }));
};

var DomoList = function DomoList(props) {
  if (props.domos.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "domoList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyDomo"
    }, "No Domos yet"));
  }

  var domoNodes = props.domos.map(function (domo) {
    return /*#__PURE__*/React.createElement("div", {
      key: domo._id,
      className: "domo"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/domoface.jpeg",
      alt: "domo face",
      className: "domoFace"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "domoName"
    }, " Name: ", domo.name, " "), /*#__PURE__*/React.createElement("h3", {
      className: "domoAge"
    }, " Age: ", domo.age, " "), /*#__PURE__*/React.createElement("h3", {
      className: "domoCute"
    }, "Cuteness: ", domo.cute, " "));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "domoList"
  }, domoNodes);
};

var OmodList = function OmodList(props) {
  if (props.omods.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "omodList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyDomo"
    }, "No Omods yet"));
  }

  var omodNodes = props.omods.map(function (omod) {
    return /*#__PURE__*/React.createElement("div", {
      key: omod._id,
      className: "omod"
    }, /*#__PURE__*/React.createElement("img", {
      src: "/assets/img/domoface.jpeg",
      alt: "omod face",
      className: "omodFace"
    }), /*#__PURE__*/React.createElement("h3", {
      className: "omodName"
    }, " Name: ", omod.name, " "), /*#__PURE__*/React.createElement("h3", {
      className: "omodAge"
    }, " Age: ", omod.age, " "), /*#__PURE__*/React.createElement("h3", {
      className: "omodEvil"
    }, "Evilness: ", omod.evil, " "));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "omodList"
  }, omodNodes);
};

var loadDomosFromServer = function loadDomosFromServer() {
  sendAjax('GET', '/getDomos', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
      domos: data.domos
    }), document.querySelector("#domos"));
  });
};

var loadOmodsFromServer = function loadOmodsFromServer() {
  sendAjax('GET', '/getOmods', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(OmodList, {
      omods: data.omods
    }), document.querySelector("#omods"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoForm, {
    csrf: csrf
  }), document.querySelector("#makeDomo"));
  ReactDOM.render( /*#__PURE__*/React.createElement(OmodForm, {
    csrf: csrf
  }), document.querySelector("#makeOmod"));
  ReactDOM.render( /*#__PURE__*/React.createElement(DomoList, {
    domos: []
  }), document.querySelector("#domos"));
  ReactDOM.render( /*#__PURE__*/React.createElement(OmodList, {
    omods: []
  }), document.querySelector("#omods"));
  loadDomosFromServer();
  loadOmodsFromServer();
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
  $("#domoMessage").animate({
    width: 'toggle'
  }, 350);
};

var redirect = function redirect(response) {
  $("#domoMessage").animate({
    width: 'hide'
  }, 350);
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cashe: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
