// ******************************************************************
                            // PROTOTYPES
// ******************************************************************


String.prototype.yell = function() {
    return `${this.toUpperCase()}!!!`
};

Array.prototype.pop = function () {
    return "I will not pop it off that element.";
};

function hex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
function rgb(r,g,b){
    return `rgb(${r}, ${g}, ${b})`;
}

hex(214, 96, 15);
"#d66096"
"#d66032"

function makeColor(r,g,b){
    const color = {};
    color.r = r;
    color.g = g;
    color.b = b;
    color.rgb = function() {
        const {r, g, b} = this;
        return `rgb(${r}, ${g}, ${b})`;
    };
    color.hex = function() {
        const {r, g, b} = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    return color;
}

const firstColor = makeColor(45,155,200);
firstColor.hex();
firstColor.rgb();

const black = makeColor(0,0,0);
black.hex();
black.rgb();

// This is a Constructor Function...WE CAPITALIZE first latter of function

function Color(r,g,b) {
    this.r = r;
    this.g = g;
    this.b = b;
    console.log(this);
}
// If you call it on its own like a regular function ...
// Color(25, 68, 39); //undefined
// It returns undefined. Seems useless!

// *****************************************************************
                        // THE NEW OPERATOR!!
// *****************************************************************

// 1. Creates a blank, plain JavaScript Object;
// 2. Links (sets the constructor of) this object to another object;
// 3. Passes the newly created object from Step 1 as the this Context;
// 4. Returns this if the function doesn't return its own object.

Color.prototype.rgb = function() {
    const {r, g, b} = this;
    return`rgb(${r}, ${g}, ${b})`;
};
Color.prototype.hex = function() {
    const {r, g, b} = this;
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
};
Color.prototype.rgba = function(a=1.0) {
    const {r, g, b} = this;
    return`rgba(${r}, ${g}, ${b}, ${a})`;
};

const color1 = new Color (20, 80, 210);
color1.hex();
const color2 = new Color (220, 180, 110);
color2.hex();

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//                             CLASSES
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

class Rung {
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
        this.calcHSL();
    }
    innerRGB() {
        const {r, g, b} = this;
        return `${r}, ${g}, ${b}`;
    };
    rgb() {
        return `rgb(${this.innerRGB()})`;
    };
    rgba(a=1.0) {
        return `rgba(${this.innerRGB()}, ${a})`;
    };
    hex() {
        const {r, g, b} = this;
        return (
            '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
    };
    hsl() {
        const {h,s,l} = this;
        return `hsl(${h}, ${s}%, ${l}%)`;
    } 
    fullySaturated() {
        const {h, l} = this;
        return `hsl(${h}, 100%, ${l}%)`;
    }
    opposite () {
        const {h,s,l} = this;
        const newHue = (h + 180) % 360;
        return `hsl(${newHue}, ${s}%, ${l}%)`;
    }
    calcHSL() {
    let {r, g, b} = this;
    // MAKE r, g, and b FRACTIONS OF 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0, 
        s = 0,
        l = 0;
    if (delta === 0) h = 0;
    else if (cmax === r)
    // Red is max
        h = ((g - b) / delta) % 6;
    else if (cmax === g)
    // Green is max
        h = (b - r) / delta + 2;
    else
    // Blue is max
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360 degree
    if (h < 0) h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;

    //Calculate saturation
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    l = +(l * 100).toFixed(1);
    s = +(s * 100).toFixed(1);
    this.h = h;
    this.l = l;
    this.s = s;
    }
}
const r1 = new Rung(220, 150, 90, 'tomato');
const safed = new Rung(150, 51, 110, 'jadu');

// ===================================================================
//                     EXTENDS AND SUPER
// ===================================================================                    

class Pet {
    constructor (name, age) {
        this.name = name;
        this.age = age;
    }
    eat() {
        return `${this.name} is eating.`;
    }
}

class Cat extends Pet {
    constructor(name, age, livesLeft = 8) {
        super(name, age);
        this.livesLeft = livesLeft;
    }
    meow() {
        return 'Meowww';
    }
}

class Dog extends Pet {
    bark() {
        return 'woofff';
    }
}