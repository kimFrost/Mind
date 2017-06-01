/** Custom typing for jquery.appear-custom.js
 * @author: MAC
 */
interface IAppear extends JQuery {
	appear(selector: string, options?: {
		interval?: number;
		force_process?: boolean;
		macsOffset?: number;
	}): JQuery;
	force_appear(): boolean;
	set_appear_throttle_interval(interval: number): void;
	appear_privor_visibles(): Array<JQuery>;
}

declare module "appear" {
	const jQueryWithAppear: IAppear;
	export = jQueryWithAppear;
}