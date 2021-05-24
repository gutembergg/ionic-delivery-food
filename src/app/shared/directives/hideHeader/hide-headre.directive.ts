import { AfterViewInit, Directive, Input, Renderer2 } from "@angular/core"
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
		console.log("element: ", this.header)
	}
}
