import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"

import { DIRECTIVES } from "./directives"

@NgModule({
	declarations: [...DIRECTIVES],
	imports: [CommonModule],
	exports: [...DIRECTIVES]
})
export class SharedModule {}
