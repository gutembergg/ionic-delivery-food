import { Directive, HostListener, Input, Renderer2 } from "@angular/core"
import { DomController } from "@ionic/angular"

@Directive({
	selector: "[appParallax]"
})
export class ParallaxDirective {
	@Input("appParallax") elementImg: any
	moveImage: number
	scaleImage: number

	constructor(private _renderer: Renderer2, private _domCtrl: DomController) {}

	@HostListener("ionScroll", ["$event"]) onScrollChange($event: any) {
		const scrollTop = $event.detail.scrollTop

		if (scrollTop > 0) {
			this.moveImage = scrollTop / 1.6
			this.scaleImage = 1
		} else {
			this.scaleImage = -scrollTop / 200 + 1
			this.moveImage = scrollTop / 1.6
		}

		this._domCtrl.write(() => {
			this._renderer.setStyle(
				this.elementImg,
				"webkitTransform",
				`translate3d(0, ${this.moveImage}px, 0)
				scale(${(this.scaleImage, this.scaleImage)})
				`
			)
		})
	}
}
