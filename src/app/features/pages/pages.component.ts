import { AfterViewInit, Component, OnInit } from "@angular/core"
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

	constructor(private _productsService: ProductsService) {}

	ngOnInit(): void {
		this._productsService
			.getRestaurant()
			.pipe(tap((resp) => console.log("resp: ", resp)))
			.subscribe((res) => (this.deliveryFood$ = res))
	}

	ngAfterViewInit() {}
}
