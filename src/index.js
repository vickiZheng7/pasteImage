const emitter = require("events");

class PasteImage extends emitter {
    /**
     * @param eles
     */
    constructor(options = {}) {
        super();
        this.resolveOptions(options);
        this.listenPaste();
    }

    /**
     * resolve options
     * @param options
     */
    resolveOptions({preview}) {
        this.previewContainer = preview;
    }

    /**
     * listen paste event
     * @param eles
     */
    listenPaste() {
        this.pasteCallback = (event) => {
            let items = (event.clipboardData || window.clipboardData).items;

            //error
            if (!items || !items.length) {
                this.emit("error", {
                    index: 0,
                    text: "Nothing can be pasted."
                });
                return;
            }

            let image = null;
            for (let index = 0; index < items.length; index++) {
                if (items[index].type.indexOf("image") !== -1) {
                    image = items[index].getAsFile();
                    break;
                }
            }

            //error: not picture
            if (!image) {
                this.emit("error", {
                    index: 1,
                    text: "No picture can be pasted."
                });
                return;
            }
            this.emit("success", image);

            //preview picture
            if (this.previewContainer) {
                let reader = new FileReader();
                reader.onload = (event) => {
                    this.previewContainer.innerHTML = "<img src='" + event.target.result + "'/>";
                }
                reader.readAsDataURL(image);
            }
        };
        document.addEventListener("paste", this.pasteCallback);
    }

    /**
     * destory
     */
    destory() {
        if (this.pasteCallback) {
            document.removeEventListener("paste", this.pasteCallback);
            this.pasteCallback = null;
        }
    }
}

module.exports = PasteImage;