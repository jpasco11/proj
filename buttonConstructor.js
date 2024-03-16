import { bindToNode } from "./areaOverlay.js";

function buttonConstructor(sysName) {
  const navLinkContainer = document.createElement("li");

  const btnCenter = document.createElement("button");
  btnCenter.classList.add("btn-nav-center");

  const btnOverlay = document.createElement("span");
  btnOverlay.classList.add("material-symbols-outlined");
  btnOverlay.classList.add("btn-nav-overlay");
  btnOverlay.textContent = "explore_nearby";

  // TODO make marker button
  // const btnMarker = document.createElement("button");

  btnCenter.textContent = sysName;
  navLinkContainer.append(btnCenter, btnOverlay);
  // Insert new button to classname
  document.querySelector(".navbar").appendChild(navLinkContainer);

  return navLinkContainer;
}

// TODO redundant function
function bindButtonEvents(button, center, map, data) {
  bindToNode(map, button, data, center);
}

export { buttonConstructor, bindButtonEvents };
