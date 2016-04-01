// Generated by CoffeeScript 1.10.0
(function() {
  var facts, renderText, renderTimeControl, setPositionOfTextCursor, textElement, timeElement;

  timeElement = document.querySelector("input[type=range]");

  textElement = document.querySelector("pre[contenteditable]");

  facts = Facts();

  window.requestAnimationFrame(function() {
    return textElement.focus();
  });

  textElement.addEventListener("input", function() {
    facts.advance(1, {
      "text": textElement.innerText
    });
    return window.requestAnimationFrame(function() {
      return renderTimeControl({
        disabled: false,
        max: facts.history.count() - 1,
        value: facts.history.count() - 1
      });
    });
  });

  timeElement.addEventListener("input", function() {
    var database, historyIndex;
    historyIndex = Number(timeElement.value);
    database = facts.history.get(historyIndex);
    return window.requestAnimationFrame(function() {
      var entities, entity;
      entities = facts.query({
        "in": database,
        where: (function(id) {
          return id === 1;
        })
      });
      entity = entities.pop();
      return renderText(entity != null ? entity : {});
    });
  });

  renderText = function(data) {
    var ref, text;
    text = (ref = data.text) != null ? ref : "";
    textElement.innerText = text;
    return setPositionOfTextCursor(text);
  };

  renderTimeControl = function(data) {
    var key, results, value;
    results = [];
    for (key in data) {
      value = data[key];
      results.push(timeElement[key] = value);
    }
    return results;
  };

  setPositionOfTextCursor = function(text) {
    var range, selection;
    selection = window.getSelection();
    selection.removeAllRanges();
    if (text) {
      range = document.createRange();
      range.setStart(textElement.childNodes[0], text.length);
      range.setEnd(textElement.childNodes[0], text.length);
      return selection.addRange(range);
    }
  };

}).call(this);