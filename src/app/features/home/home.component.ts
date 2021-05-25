import { Component, OnInit } from "@angular/core"
import { Observable } from "rxjs"
import { tap } from "rxjs/operators"
import { ProductsService } from "src/app/services/products/products.service"

@Component({
	selector: "app-home",
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
	products$: Observable<any>
	categories$: Observable<any>
	featured$: Observable<any>
	highlights$: Observable<any>

	categoryOptions = {
		freeMode: true,
		slidesPerView: 4,
		slidesOffsetBefore: 11,
		spaceBetween: 10
	}

	highlightSlideOpts = {
		slidesPerView: 1.05,
		spaceBetween: 10,
		centeredSlides: true,
		loop: true
	}

	featuredSlideOpts = {
		slidesPerView: 1.1,
		spaceBetween: 10,
		freeMode: true
	}

	showLocationDetail = false

	constructor(private _productsService: ProductsService) {}

	ngOnInit(): void {
		this._productsService
			.getProducts()
			.pipe(
				tap((product: any) => {
					this.categories$ = product.categories
					this.featured$ = product.featured
					this.highlights$ = product.highlights
				})
			)
			.subscribe((res) => res)
	}

	doRefresh($event) {
		setTimeout(() => {
			$event.target.complete()
		}, 2000)
		console.log("event: ", $event)
	}

	onScroll($event) {
		const offset = $event.detail.scrollTop
		this.showLocationDetail = offset > 50
	}
}
