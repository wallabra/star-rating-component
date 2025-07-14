import {
  Component,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { NarrationService } from '../narration-service';

function range(from: number, to: number) {
  return [...new Array(to).keys()].slice(from);
}

type StarInfo = {
  which: number;
  filled: boolean;
};

@Component({
  selector: 'app-star-rating',
  standalone: true,
  host: {
    role: 'slider',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'maxRating()',
    '[attr.aria-valuenow]': 'currentRating()',
    class: 'stars-row',
    'aria-label': 'Rating',
    '(keydown)': 'handleKey($event)',
    tabindex: '0',
  },
  templateUrl: 'star-rating.html',
  styleUrl: 'star-rating.css',
})
export class StarRatingComponent {
  readonly initialRating = input(1, {
    transform: (val: unknown) => this.normalizeStars(Number(val)),
  });
  readonly maxRating = input(5);
  currentRating = signal(this.initialRating());

  readonly enableNarrate = input(false);
  starsChanged = output<number>();

  readonly activeIcon = input('★');
  readonly inactiveIcon = input('☆');

  readonly showRatingText = input(true);

  readonly narrateSvc = inject(NarrationService);

  protected normalizeStars(numStars: number) {
    return Math.max(1, Math.min(this.maxRating(), numStars));
  }

  starInfo = computed<Array<StarInfo>>(() => {
    const cur = this.currentRating();
    const max = this.maxRating();
    const info = range(0, max).map((idx) => ({
      which: idx + 1, // map (0..max - 1) to (1..max)
      filled: idx < cur,
    }));
    return info;
  });

  protected setStars(numStars: number) {
    const numStarsBounded = this.normalizeStars(numStars);
    if (numStarsBounded === this.currentRating()) {
      return; // unchanged
    }

    this.currentRating.set(numStarsBounded);
    this.speakStars((cur, max) => `SET TO ${cur} STARS OUT OF ${max}`);
    this.starsChanged.emit(numStarsBounded);
  }

  protected speakStars(
    formatter: (current: number, max: number) => string = (cur, max) =>
      `${cur} STARS OUT OF ${max}`,
  ) {
    if (this.enableNarrate()) {
      if (this.narrateSvc == null) {
        return;
      }
      this.narrateSvc.speak(formatter(this.currentRating(), this.maxRating()));
    }
  }

  // UPDATE: handle keyboard events when focused
  handleKey(event: KeyboardEvent) {
    if (['ArrowRight', 'ArrowUp'].includes(event.key)) {
      this.setStars(this.currentRating() + 1);
    } else if (['ArrowLeft', 'ArrowDown'].includes(event.key)) {
      this.setStars(this.currentRating() - 1);
    } else if (['Enter'].includes(event.key)) {
      this.speakStars();
    }
  }
}
