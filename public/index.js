var header = document.getElementsByTagName("header");
var headerTags = document.getElementsByTagName("section");

for (const e of headerTags) {
  const node = document.createTextNode(e.querySelector("header").innerText);
  const newLi = document.createElement("a");
  newLi.appendChild(node);
  document.getElementById("test").appendChild(newLi);
  newLi.href = "#"+e.id;
  /*it must have been the ID of a section needs to be in. aseperate loop cause like this the navbar is ugly*/
  newLi.classList.add("list-group-item");
}

