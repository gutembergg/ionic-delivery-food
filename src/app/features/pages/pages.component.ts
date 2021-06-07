import { DOCUMENT } from "@angular/common"
import {
	AfterViewInit,
	Component,
	ElementRef,
	Inject,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren
} from "@angular/core"
import { IonContent, IonList, IonSlides, isPlatform } from "@ionic/angular"
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
	activeCategory = 0

	@ViewChildren(IonList, { read: ElementRef }) lists: QueryList<ElementRef>
	listElements = []
	@ViewChild(IonContent) content: IonContent
	@ViewChild(IonSlides) slides: IonSlides

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

	ngAfterViewInit() {
		this.lists.changes.subscribe((_) => {
			this.listElements = this.lists.toArray()
		})
	}

	onClick(index: number) {
		const child = this.listElements[index].nativeElement
		this.content.scrollToPoint(0, child.offsetTop - 120, 1000)
	}

	onScroll($event: CustomEvent) {
		const offSet = $event.detail.scrollTop
		this.categorySlidesVisible = offSet > 500

		for (let i = 0; i < this.listElements.length; i++) {
			const item = this.listElements[i].nativeElement
			if (this.isElementInViewport(item)) {
				this.activeCategory = i
				this.slides.slideTo(i, 1000)
				break
			}
		}
	}

	isElementInViewport(el: any) {
		const rect = el.getBoundingClientRect()

		return (
			rect.top >= 0 &&
			rect.bottom <=
				(window.innerHeight || document.documentElement.clientHeight)
		)
	}
}
