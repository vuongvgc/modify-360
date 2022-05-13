import { Viewer } from "./viewer.js";
import queryString from "query-string";

class App {
  constructor(el, location) {
    const hash = location.hash ? queryString.parse(location.hash) : {};
    this.options = {
      kiosk: Boolean(hash.kiosk),
      model: hash.model || "",
      preset: hash.preset || "",
      cameraPosition: hash.cameraPosition
        ? hash.cameraPosition.split(",").map(Number)
        : null,
    };

    this.el = el;
    this.viewer = null;
    this.viewerEl = null;
    this.viewBoxEl = el.querySelector(".view__box");

    this.view(
      "https://alta-s3.dev-altamedia.com/nutifood/productImage/1778762879_bo-khoai-tay.glb",
      ""
    );

    const options = this.options;

    if (options.kiosk) {
      const headerEl = document.querySelector("header");
      headerEl.style.display = "none";
    }

    if (options.model) {
      this.view(options.model, "", new Map());
    }
  }

  createViewer() {
    this.viewerEl = document.createElement("div");
    this.viewerEl.classList.add("viewer");
    this.viewBoxEl.innerHTML = "";
    this.viewBoxEl.appendChild(this.viewerEl);
    this.viewer = new Viewer(this.viewerEl, this.options);
    return this.viewer;
  }

  view(rootFile) {
    if (this.viewer) this.viewer.clear();
    const viewer = this.viewer || this.createViewer();
    viewer.load(rootFile).catch((e) => console.log(e));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const app = new App(document.body, location);
});
