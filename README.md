
![](https://github.com/avego/star-rating-svg/raw/master/demo/img/star-rating-svg-logo.png)

###### A basic, yet flexible star rating plugin using SVG (native JavaScript, no dependencies).

**Copyright (c) Alexander Tishov** — [https://avego.org](https://avego.org) | info@avego.org  
*Original developer: Ignacio Chavez — [nashio/star-rating-svg](https://github.com/nashio/star-rating-svg)*

### Features:
* Doesn't use external images
* Customize size
* Customize colors
* Use half or full stars
* Choose the number of stars to be displayed
* Define gradient color of selected stars
* Specify a border/stroke thickness and color
* Specify initial rating via options or markup data attribute
* Execute callback after rating (ex. to notify a server)
* onHover and onLeave events
* Locked / Read-only mode
* Unload option
  Change star shape (rounded or straight)
* Resize stars
* **Change rated star colors by level**
* **Scale rating range** (e.g. 5 stars → 0..10 via valueMultiplier)
* **Data attributes** — initialize via data-* attributes (works with JS options)

## demo

For a working **demo**, open `demo/index.html` from the repository or see:
[https://github.com/avego/star-rating-svg](https://github.com/avego/star-rating-svg)

## Usage

1. Include plugin's code:

	```html
	<script src="star-rating-svg.js"></script>
	```

2. Include plugin's css:

	```html
    <link rel="stylesheet" type="text/css" href="star-rating-svg.css">
	```

3. Add the markup

    ```html
    <div class="my-rating"></div>
    ```

4. Initialize the plugin:

    ```javascript
    var rating = StarRating(".my-rating", {
        starSize: 25,
        callback: function(currentRating, el){
            // make a server call here
        }
    });
    // Use methods on the instance:
    rating.setRating(3);
    rating.getRating();
    ```

## Options

| option  | default  | description  |
|---|---|---|
| totalStars  | 5  | Amount of stars to show  |
| initialRating | 0 | Initial rating applied on load |
| minRating | 0 | Specify the lowest rating |
| starSize | 40 | width in pixels of each star |
| useFullStars | false | rate using whole stars, if enabled, it doesn't use half-steps |
| emptyColor | lightgray | Color assigned to an empty star |
| hoverColor | orange | Color assigned to hovered star |
| activeColor | gold | Color assigned to active rated star |
| ratedColor | crimson | Color assigned to manually rated star |
| ratedColors | ['#333333', '#555555', '#888888', '#AAAAAA', '#CCCCCC'] | colors assigned to each level of rated stars |
| useGradient | true | Active stars will use gradient coloring |
| | | To use this option you need to populate the object [starGradient] |
| starGradient | {start: '#FEF7CD', end: '#FF9511'} | Define the star and end colors for the gradient |
| readOnly | false | If false any interaction is disabled |
| disableAfterRate | true | Removes further events once a rate is selected |
| strokeWidth | 0 | Defines the thickness of the border, 0 is disabled |
| strokeColor | black | Defines the color for the border |
| starShape | 'straight' or 'rounded' | Change the star shape type |
| baseUrl | false | when enabled (true), enables compatibility with the base tag in your head section |
| forceRoundUp | false | if true, forces rounding the initial rating to the nearest upper half even if the value is closer to the lower (1.1 -> 1.5 rather than 1.1 -> 1.0) |
| valueMultiplier | 1 | Scale the rating range: public value = internal value × valueMultiplier. Use 2 for 5 stars → 0..10 (half-star = step 1) |

## Rating scale: 5 stars → 0..10

To show 5 stars but work with a rating range 0..10 (half-star = step 1):

```javascript
StarRating(".my-rating", {
  totalStars: 5,
  valueMultiplier: 2,
  initialRating: 7,
  callback: function(currentRating, el){
    // currentRating is 0..10
    console.log('Rated:', currentRating);
  }
});
// getRating() returns 0..10
// setRating(7) sets rating to 7 (out of 10)
```

Note: With `useFullStars: true`, half-stars are disabled; with `valueMultiplier: 2` you get only even values (2, 4, 6, 8, 10).

## Initialization via data attributes

Options can be set via data attributes. Merge order: `defaults ← data attributes ← JS options` (JS always overrides).

| data-attribute | option | type |
|----------------|--------|------|
| data-total-stars | totalStars | number |
| data-value-multiplier | valueMultiplier | number |
| data-initial-rating, data-rating | initialRating | number |
| data-disable-after-rate | disableAfterRate | boolean |
| data-read-only | readOnly | boolean |
| data-use-full-stars | useFullStars | boolean |
| data-star-size | starSize | number |
| data-min-rating | minRating | number |
| data-star-shape | starShape | string |
| data-stroke-width | strokeWidth | number |
| data-stroke-color | strokeColor | string |
| data-empty-color | emptyColor | string |
| data-hover-color | hoverColor | string |
| data-active-color | activeColor | string |
| data-rated-color | ratedColor | string |
| data-use-gradient | useGradient | boolean |
| data-force-round-up | forceRoundUp | boolean |

Boolean: `"true"`, `"1"` → true; otherwise false.

```html
<span class="star-rating" 
  data-total-stars="5" 
  data-value-multiplier="2" 
  data-initial-rating="7" 
  data-disable-after-rate="false">
</span>
```

```javascript
// Only data attributes
StarRating(".star-rating");

// Mixed: data for config, JS for callbacks
StarRating(".star-rating", {
  callback: function(rating, el) { console.log(rating); }
});
```

`callback`, `onHover`, `onLeave` and complex options (`starGradient`, `ratedColors`) must be set in JS.

## Methods

| method | arguments | description  |
|---|---|---|
| unload    |  &nbsp; | Destroys the instance and removes events attached to it |
| setRating | value (0 to max), round (Boolean) | Manually sets the rating (public value when valueMultiplier is used) |
| getRating | &nbsp; | Gets the current rating (public value when valueMultiplier is used) |
| resize | 1 to 200 | Resize the stars on the fly |
| setReadOnly | Boolean | Disable or enable stars manually |

```javascript
var rating = StarRating('.your-selector', options);

// unload/destroy example
rating.unload();

// set rating example
rating.setRating(2.5);

// set rating and round
rating.setRating(2.8, true); // 3.0

// get rating example
rating.getRating();

// resize
rating.resize(50);

// disable/enable stars manually
rating.setReadOnly(true);

```

## Callbacks

| name | arguments | description |
|---|---|---|
| callback | rating, DOM element | Executes when selecting a rate |
```javascript
StarRating('your-selector', {
    callback: function(currentRating, el){
    	// do something after rating
    }
});
```

## Events

| method | description  |
|---|---|
| onHover | executes a callback on mouseover |
| onLeave | executes a callback on mouseout |
```javascript
StarRating('your-selector', {
    onHover: function(currentIndex, currentRating, el){
			// do something on mouseover
    },
    onLeave: function(currentIndex, currentRating, el){
			// do something after mouseout
    }
});
```


### Files

Code example

#### [demo/index.html/](https://github.com/avego/star-rating-svg/blob/master/demo/index.html "code examples")

Source file

#### [src/](https://github.com/avego/star-rating-svg/tree/master/src "source file")

Minified version

#### [dist/](https://github.com/avego/star-rating-svg/tree/master/dist "build files")

### Changelog

#### 2.2.0
- Add data attributes initialization: totalStars, valueMultiplier, initialRating, disableAfterRate, readOnly, and more
- Merge order: defaults ← data attributes ← JS options (backward compatible)
- Multiple ratings on one page, each with its own data config

#### 2.1.0
- Add `valueMultiplier` option: scale rating range (e.g. 5 stars → 0..10, half-star = step 1)
- `initialRating`, `data-rating`, `getRating`, `setRating`, `callback`, `onHover`, `onLeave` use public values when valueMultiplier is set

#### 2.0.0
- Rewritten in native JavaScript (no jQuery dependency)
- New API: `StarRating(selector, options)` returns instance with methods
- Methods: `setRating`, `getRating`, `resize`, `setReadOnly`, `unload`

#### 1.3.0
- Define rated star colors per level by using an array of colors

#### 1.2.2
- Specify the lowest rating with 'minRating'

#### 1.2.1
- Adds color for manually rated stars 'ratedColor'

#### 1.2.0
- Adds public method to disable & enable stars manually

#### 1.1.1
- Fixes issue when using SVG + base tag

#### 1.1.0
- Change the star type
- Adds method to resize star on the fly

#### 1.0.1
- Fixes Firefox hover issues

#### 1.0.0
- Adds set rating, and get rating
- Adds onHover event
- Adds onLeave event

#### 0.9.4
- Fixes support for enabling full stars

#### 0.9.3
- Returns element on callback
- Fixed typos

#### 0.8.2
- Fixed bugs related to rendering in retina

#### 0.8.0
- Added readonly mode



License
------------
The MIT License (MIT)
