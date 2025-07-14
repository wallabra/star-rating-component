import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class NarrationService {
	// stub
	speak(text: string) {
		console.log(`TTS: ${text}`);
	}
}
