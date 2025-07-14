# Star Rating Component

A simple example component that provides a star rating form.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.0.

# Usage

Example usage:

```ts
  <app-star-rating
    (starsChanged)="handleStarsChanged($event)"
    [enableNarrate]="true"
    [maxRating]="10"
    [initialRating]="1"
    />
```

**Options:**

* `maxRating` (default: `5`)
The maximum number of stars this rating input can give.

* `enableNarrate` (default: `false`)
Whether to send TTS calls to a `NarrationService` (see [stub example](src/app/narration-service.ts)).

* `activeIcon` (default: `"★"`)
The character to use to represent a filled star.

* `inactiveIcon` (default: `"☆"`)
The character to use to represent an empty star.

* `showRatingText` (default: `true`)
Whether to show the rating label below for accessibility ("Rating: X stars out of Y").

# Running the Example

## Development server

To start a local development server, run:

```bash
ng serve
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.


