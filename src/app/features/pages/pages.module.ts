import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { PagesRoutingModule } from "./pages-routing.module"
import { PagesComponent } from "./pages.component"
import { IonicModule } from "@ionic/angular"
import { SharedModule } from "src/app/shared/shared.module"

@NgModule({
	declarations: [PagesComponent],
	imports: [CommonModule, PagesRoutingModule, IonicModule, SharedModule]
})
export class PagesModule {}
