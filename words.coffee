timeElement = document.querySelector("input[type=range]")
textElement = document.querySelector("pre[contenteditable]")

facts = Facts()

window.requestAnimationFrame ->
  textElement.focus()

textElement.addEventListener "input", ->
  facts.advance 1, "text": textElement.innerText
  window.requestAnimationFrame ->
    renderTimeControl
      disabled: false
      max: facts.history.count() - 1
      value: facts.history.count() - 1

timeElement.addEventListener "input", ->
  historyIndex = Number(timeElement.value)
  database = facts.history.get(historyIndex)
  window.requestAnimationFrame ->
    entities = facts.query in:database, where:((id) -> id is 1)
    entity = entities.pop()
    renderText(entity ? {})

renderText = (data) ->
  text = data.text ? ""
  textElement.innerText = text
  setPositionOfTextCursor text

renderTimeControl = (data) ->
  timeElement[key] = value for key, value of data

setPositionOfTextCursor = (text) ->
  selection = window.getSelection()
  selection.removeAllRanges()
  if text
    range = document.createRange()
    range.setStart(textElement.childNodes[0], text.length)
    range.setEnd(textElement.childNodes[0], text.length)
    selection.addRange(range)
