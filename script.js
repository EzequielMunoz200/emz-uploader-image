class UploaderImage {
  #input;
  #preview;
  #wrapperImg;
  #message;
  #DISABLED;
  #ENABLED;
  #SHOW;
  #HIDE;
  constructor() {
    this.#input = document.querySelector("#upload_image_btn");
    this.#preview = document.querySelector(".preview");
    this.#wrapperImg = document.querySelector(".preview .wrapper__images");
    this.#message = document.querySelector(".preview .message_is_empty");
    this.#DISABLED = 0;
    this.#ENABLED = 1;
    this.#SHOW = true;
    this.#HIDE = false;
  }

  init() {
    this.#input.addEventListener("change", uploader.handleChange);
  }

  get input() {
    return this.#input;
  }

  get preview() {
    return this.#preview;
  }

  get wrapperImg() {
    return this.#wrapperImg;
  }

  get message() {
    return this.#message;
  }

  get disabled() {
    return this.#DISABLED;
  }

  get enabled() {
    return this.#ENABLED;
  }

  get show() {
    return this.#SHOW;
  }

  get hide() {
    return this.#HIDE;
  }

  clearInput() {
    uploader.input.value = "";
  }

  displayMessageNoFilesSelected(displayMessage) {
    uploader.message.style.opacity = displayMessage
      ? uploader.enabled
      : uploader.disabled;
  }

  createElementHTML(tag, className = "") {
    let el = document.createElement(tag);
    el.className = className;
    return el;
  }

  loadPreview(imageSelected) {
    let imgEl = uploader.createElementHTML("img");
    let url = URL.createObjectURL(imageSelected);
    imgEl.src = url;
    let containerImg = uploader.createElementHTML("div", "container__img");
    let wrapperImgTrash = uploader.createElementHTML(
      "span",
      "wrapper__img__trash"
    );
    containerImg.appendChild(imgEl);
    containerImg.appendChild(wrapperImgTrash);

    return containerImg;
  }

  handleRemove(e) {
    let img = e.target.closest("div");
    img.addEventListener("animationend", async () => {
      await img.remove();
      if (!document.querySelector(".wrapper__img__trash")) {
        uploader.displayMessageNoFilesSelected(uploader.show);
      }
    });
    img.classList.add("rotate");
    uploader.clearInput();
  }

  handleChange(event) {
    console.log(uploader);
    uploader.input.style.opacity = uploader.disabled;
    [...uploader.input.files].map(function (x) {
      if (uploader.input.files.length === 0) {
        uploader.displayMessageNoFilesSelected(uploader.show);
        return;
      }

      let imageSelected = x;
      uploader.displayMessageNoFilesSelected(uploader.hide);
      let imgEl = uploader.loadPreview(imageSelected);
      uploader.wrapperImg.appendChild(imgEl);
      document.querySelectorAll(".wrapper__img__trash").forEach((element) => {
        element.addEventListener("click", uploader.handleRemove);
      });
    });
  }
}

let uploader = new UploaderImage();
uploader.init();
