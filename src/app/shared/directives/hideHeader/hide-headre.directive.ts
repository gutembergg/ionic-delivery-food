import {
	AfterViewInit,
	Directive,
	HostListener,
	Input,
	Renderer2
} from "@angular/core"
import { DomController, isPlatform } from "@ionic/angular"

@Directive({
	selector: "[appHideHeadre]"
})
export class HideHeadreDirective implements AfterViewInit {
	@Input("appHideHeadre") header: any
	headerHeight = isPlatform("ios") ? 44 : 56
	children: any

	constructor(private renderer: Renderer2, private dommCtrl: DomController) {}

	ngAfterViewInit(): void {
		this.header = this.header.el
		this.children = this.header.children
	}

	@HostListener("ionScroll", ["$event"]) onScrollChange($event: any) {
		const scrollTop: number = $event.detail.scrollTop
		let newPosition = -scrollTop

		if (newPosition < -this.headerHeight) {
			newPosition = -this.headerHeight
		}
		const newOpacity = 1 - newPosition / -this.headerHeight

		this.dommCtrl.write(() => {
			this.renderer.setStyle(this.header, "top", `${newPosition}px`)

			for (const element of this.children) {
				this.renderer.setStyle(element, "opacity", newOpacity)
			}
		})
	}
}
