/** Custom typings for angular-cookie.js
 * @author: MAC
 */
interface IIpCookieOptions {
	domain?: string;
	path?: string;
	expires?: number;
	expirationUnit?: string;
	secure?: boolean;
	encode?: (value: string) => string;
	decode?: (value: string) => string;
}

interface IIpCookie {
	(key: string, value?: string | {}, options?: IIpCookieOptions): IIpCookie;
	remove(key: string, options?: IIpCookieOptions): IIpCookie;
}