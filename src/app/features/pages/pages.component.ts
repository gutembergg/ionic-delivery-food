import { DOCUMENT } from "@angular/common"
import {
	AfterViewInit,
	Component,
	ElementRef,
	Inject,
	OnInit,
	QueryList,
	ViewChildren
} from "@angular/core"
import { IonList, isPlatform } from "@ionic/angular"
import { tap } from "rxjs/operators"
import { ProductsService } from "src/app/services/products/products.service"

@Component({
	selector: "app-pages",
	templateUrl: "./pages.component.html",
	styleUrls: ["./pages.component.scss"]
})
export class PagesComponent implements OnInit, AfterViewInit {
	deliveryFood$: any
	showTitle = false

	categoryOptions = {
		freeMode: true,
		slidesPerView: 2.6,
		slidesOffsetBefore: 30,
		slidesOffsetAfter: 100
	}

	categorySlidesVisible = false

	@ViewChildren(IonList, { read: ElementRef }) lists: QueryList<ElementRef>

	constructor(
		private _productsService: ProductsService,
		@Inject(DOCUMENT) private document: Document
	) {}

	ngOnInit(): void {
		this._productsService
			.getRestaurant()
			.pipe(tap((resp) => console.log("resp: ", resp)))
			.subscribe((res) => (this.deliveryFood$ = res))

		const headerheight = isPlatform("ios") ? 44 : 56

		this.document.documentElement.style.setProperty(
			"--header-position",
			`calc(env(safe-area-inset-top) + ${headerheight}px)`
		)
	}

	ngAfterViewInit() {}

	onClick(index) {
		console.log("ok", index)
	}

	onScroll($event) {
		const offSet = $event.detail.scrollTop

		this.categorySlidesVisible = offSet > 500
	}
}
