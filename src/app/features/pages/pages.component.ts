import { AfterViewInit, Component, OnInit } from "@angular/core"
import { Observable } from "rxjs"
import { ProductsService } from "src/app/services/products/products.service"

@Component({
	selector: "app-pages",
	templateUrl: "./pages.component.html",
	styleUrls: ["./pages.component.scss"]
})
export class PagesComponent implements OnInit, AfterViewInit {
	deliveryFood$: any

	constructor(private _productsService: ProductsService) {}

	ngOnInit(): void {
		this._productsService
			.getRestaurant()
			.subscribe((res) => (this.deliveryFood$ = res))
	}

	ngAfterViewInit() {}
}
