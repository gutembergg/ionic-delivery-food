import {
	AfterViewInit,
	Directive,
	HostListener,
	Input,
	Renderer2
} from "@angular/core"
import { DomController } from "@ionic/angular"

@Directive({
	selector: "[appHeaderBold]"
})
export class HeaderBoldDirective implements AfterViewInit {
	@Input("appHeaderBold") toolBar: any

	constructor(private _renderer: Renderer2, private _domCtrl: DomController) {}

	ngAfterViewInit() {
		this.toolBar = this.toolBar.el
	}

	@HostListener("ionScroll", ["$event"]) onScrollChange($event: any) {
		const scrollTop = $event.detail.scrollTop

		if (scrollTop > 250) {
			this._renderer.setStyle(this.toolBar, "background", "white")
		} else {
			this._renderer.setStyle(this.toolBar, "background", "transparent")
		}
	}
}
