/// <reference path="../../../references/references.ts" />

namespace Global {
	export class DirectiveHelperService {
		public static factory<T extends ng.IDirective>(classType: Function): ng.IDirectiveFactory {
			const factory = (...args): T => {
				const directive = classType as any;
				//return new directive(...args); //Typescript 1.6
				//MAC: (...) is not an error. It's an ellipsis operator (allows open-ended number of arguments): http://www.typescriptlang.org/Handbook#functions-optional-and-default-parameters
				return new (directive.bind(directive, ...args));
			};

			//MAC: Add regex to get function arguments (dependency injections) without having to manually $inject them.
			if (!classType.$inject) {
				factory.$inject = this.annotate(classType);
			} else {
				factory.$inject = classType.$inject;
			}

			return factory;
		}


		private static functionArguments = /^[^\(]*\(\s*([^\)]*)\)/m;
		private static fnArgSplit = /,/;
		private static fnArg = /^\s*(_?)(\S+?)\1\s*$/;
		private static stripComments = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;

		/** Add regex and function to get arguments (dependency injections) without having to manually $inject them (for dev mode).
		 * Mostly borrowed from angular source code (annotate function)
		 * @param fn
		 * @returns {}
		 */
		private static annotate(fn: Function): string[] {
			const inject: string[] = [];
			if (fn.length) {
				const fnText = fn.toString().replace(this.stripComments, "");
				const argDecl = fnText.match(this.functionArguments);
				const argArray = argDecl[1].split(this.fnArgSplit);
				for (let i = 0, len = argArray.length; i < len; i++) {
					const arg = argArray[i].replace(this.fnArg, (all, underscore, name) => name);
					if (arg) {
						inject.push(arg);
					}
				}
			}
			return inject;
		}
	}
} 