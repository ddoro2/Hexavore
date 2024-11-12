class Hex {
    static docBody = document.body;

    constructor(type, offsetX, offsetY) {
        this.type = type;
        this.offset = offsetX;
        this.offsetY = offsetY;
        
        this.imgNames = [];
        this.edges = [];

        // Images for each hex construction type are designated here
        if (type == "bottomFirst") {
            imgNames = ["tl.png", "l.png", "bl.png", "br.png", "r.png", "tr.png"];
        }
        else if (type == "bottomElse") {
            imgNames = ["tl.png", "tr.png", "r.png", "br.png", "bl.png"];
        }
        else if (type == "middleFirst") {
            imgNames = ["bl.png", "l.png", "tl.png", "tr.png", "r.png"];
        }
        else if (type == "middleMid") {
            imgNames = ["tl.png", "tr.png", "r.png"];
        }
        else if (type == "middleLast") {
            imgNames = ["tl.png", "tr.png", "r.png", "bl.png"];
        }
        else if (type == "upperFirst") {
            imgNames = ["l.png", "tl.png", "tr.png", "r.png"];
        }
        else if (type == "upperElse") {
            imgNames = ["tl.png", "tr.png", "r.png"];
        }

        for (var i = 0; i < imgNames.length; i++) {
            var edgeImg = new Image(148, 172);
            edgeImg.src = imgNames[i];
            docBody.appendChild(edgeImg);

            this.edges.push(edgeImg);
        }
    }
}