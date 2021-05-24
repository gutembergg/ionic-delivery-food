import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { tap } from "rxjs/operators"
import { environment } from "src/environments/environment"

const localListProducts = environment.localUrl
//const apiUrl = "https://devdactic.fra1.digitaloceanspaces.com/foodui/home.json"

@Injectable({
	providedIn: "root"
})
export class ProductsService {
	constructor(private _http: HttpClient) {}

	getProducts() {
		return this._http
			.get(localListProducts)
			.pipe(tap((product) => console.log("products: ", product)))
	}
}
