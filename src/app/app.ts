import { Component, type ElementRef, viewChild } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { StarRatingComponent } from "./star-rating/star-rating";

@Component({
	selector: "app-root",
	imports: [RouterOutlet, StarRatingComponent],
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App {
	log = viewChild<ElementRef<HTMLDivElement>>("log");

	logStarsChanged(numStars: number) {
		const log = this.log();
		if (log == null) return;

		const message = document.createElement("div");
		message.classList.add("log-message");
		message.innerText = `Star rating changed to ${numStars}`;

		log.nativeElement.appendChild(message);
	}

	handleStarsChanged(event: unknown) {
		if (typeof event === "number") {
			this.logStarsChanged(event);
		}
	}
}
