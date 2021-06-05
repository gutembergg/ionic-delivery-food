import {
	AfterViewInit,
	Directive,
	ElementRef,
	HostListener,
	Input,
	Renderer2
} from "@angular/core"
import { DomController } from "@ionic/angular"

@Directive({
	selector: "[appShowTitle]"
})
export class ShowTitleDirective implements AfterViewInit {
	@Input("appShowTitle") title: any

	constructor(
		private renderer: Renderer2,
		private domCtrl: DomController,
		private elementRef: ElementRef
	) {}

	ngAfterViewInit() {
		this.title = this.title.el
	}

	@HostListener("ionScroll", ["$event"]) onScroll($event) {
		const scroll = $event.detail.scrollTop

		if (scroll > 120) {
			/* this.renderer.setStyle(this.title, "opacity", 1) */

			this.domCtrl.write(() => {
				this.renderer.setStyle(this.title, "opacity", 1)
			})
		} else {
			this.domCtrl.write(() => {
				this.renderer.setStyle(this.title, "opacity", 0)
			})
		}
	}
}
