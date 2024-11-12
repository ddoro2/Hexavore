class Hex { // Hex class
    constructor(type, offsetX, offsetY) {
        this.type = type; // Type of hex construction to follow when building this hex
        this.offsetX = offsetX; // X offset of hex on HTML page
        this.offsetY = offsetY; // Y offset of hex on HTML page

        this.edges = []; // Array of edge images for this hex
        
        var imgNames = []; // This will change based on the hex construction specified by the type parameter

        // Images for each hex construction type are designated here
        // Reading the content of the arrays and referring to the images can help visualize each construction
        if (this.type == "bottomFirst") {
            imgNames = ["tl.png", "l.png", "bl.png", "br.png", "r.png", "tr.png"];
        }
        else if (this.type == "bottomElse") {
            imgNames = ["tl.png", "tr.png", "r.png", "br.png", "bl.png"];
        }
        else if (this.type == "middleFirst") {
            imgNames = ["bl.png", "l.png", "tl.png", "tr.png", "r.png"];
        }
        else if (this.type == "middleMid") {
            imgNames = ["tl.png", "tr.png", "r.png"];
        }
        else if (this.type == "middleLast") {
            imgNames = ["tl.png", "tr.png", "r.png", "br.png"];
        }
        else if (this.type == "upperFirst") {
            imgNames = ["l.png", "tl.png", "tr.png", "r.png"];
        }
        else if (this.type == "upperElse") {
            imgNames = ["tl.png", "tr.png", "r.png"];
        }
        
        this.makeGrid(imgNames);
    }

    async makeGrid(imgNames) { // Async function used to animate edge creation

        // Loop reads image names and turns them into actual image elements to be added to the edges array
        // Then the newly created image is styled for display and added to the HTML page
        for (var i = 0; i < imgNames.length; i++) {
            await this.sleep(100);
            var edgeImg = new Image(148, 172);
            edgeImg.src = imgNames[i];
            edgeImg.style.left = this.offsetX + "px";
            edgeImg.style.top = this.offsetY + "px";
            this.edges.push(edgeImg);

            document.body.appendChild(edgeImg);
        }
    }

    sleep(ms) { // Basic sleep function used to animate the edge creation
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// THE WIDTH OF THE HEX IMAGES IS 148 pixels
// THE HEIGHT OF THE HEX IMAGES IS 172 pixels

// PLEASE NOTE: A lot of numerical values are used for alignment without explanations for all of them.
// I did a lot of work making sure everything would line up based on the initial resolutions of the
// hex images (148x172). I use CSS to scale the body which scales the images down appropriately,
// as it is best not to mess with any of these numbers.

var src = document.body; // All images will go into the body

// Offset for grid placement on HTML page IN PIXELS!
var gridOffsetX = 500;
var gridOffsetY = 1500;

var width = 6; // Width of bottom/top rows, controls overall size of procedurally generated hex grid
var height = (width * 2) - 1; // Total height of hex grid
var midRow = (width * 2) / 2; // Row number of middle row

var rows = []; // 2D array that stores rows (arrays) of hexes

var rowWidth = width; // Keeps track of width of current row in loop

async function buildGrid() { // Async function used to animate grid creation
    for (var i = 1; i <= height; i++) { // Loops build hex grid from BOTTOM -> UP (rows[0] is bottom row)
        var newHexTypePrefix = ""; // This is changed for bottom, middle, and upper rows
        var rowOffset = 0; // 0 for bottom row, changed for further rows in conditionals below

        if (i == 1) {
            newHexTypePrefix = "bottom";
        }
        else if (i <= midRow) {
            newHexTypePrefix = "middle";
            rowWidth++; // As we get towards middle, the width increases
            rowOffset = (rowWidth - width) * -70; // ^With the above line, moves row backwards on x-axis
        }
        else if (i > midRow) {
            newHexTypePrefix = "upper";
            rowWidth--; // Once past middle, the row width decreases
            rowOffset = (rowWidth - width) * -70; // ^With the above line, moves row forwards again on x-axis
        }

        var newRow = []; // New row array created, new hexes will be pushed into this

        for (var j = 0; j < rowWidth; j++) { // Individual rows are created in this loop
            var newHexType = newHexTypePrefix; // Set to either bottom, middle, or upper based on the above conditionals
            
            if (i != 1 && i <= midRow) { // Middle rows have 3 different types of hex constructions, so we need to accomodate that here
                if (j == 0) {
                    newHexType += "First"; // First hex of a middle row
                }
                else if (j == (rowWidth - 1)) {
                    newHexType += "Last"; // Last hex of a middle row
                }
                else {
                    newHexType += "Mid"; // Any hex between the first and last of a middle row
                }
            }
            else { // Bottom and upper rows only have 2 different types of hex constructions
                if (j == 0) {
                    newHexType += "First"; // First hex of either bottom or upper row
                }
                else {
                    newHexType += "Else"; // Any hex after the first hex of the upper or bottom row
                }
            }

            var newHex = new Hex(newHexType, gridOffsetX + rowOffset + (j * 140), gridOffsetY + ((i - 1) * -122)); // Create new hex
            await sleep(600);
            newRow.push(newHex); // Push new hex into current row
        }
        
        rows.push(newRow); // Push new row into rows array
    }
}

function sleep(ms) { // Basic sleep function used to animate grid creation
    return new Promise(resolve => setTimeout(resolve, ms));
}

buildGrid(); // Build the grid (animated)