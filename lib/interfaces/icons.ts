import type { WebDevelopmentType } from '.';

interface WebSvg {
	title: string;
	color: `#${string}`;
	scaling: number;
}

interface TechWebSvg extends WebSvg {
	percentage: number;
	type: WebDevelopmentType;
	/**
	 * Define if the svg should be used as an element or as a string
	 */
	show: boolean;
	svgElement: string;
}

interface SvgInformation {
	role: string;
	viewBox: `${string} ${string} ${string} ${string}`;
	xmlns: `http://www.${string}` | string;
	title: string;
	path: string;
	children: `<${string}>`;
}

type TechIconData = typeof import('../constants/tech-icons.json');
type SvgNames = keyof TechIconData;
type TechIcons = Record<Partial<WebDevelopmentType>, TechWebSvg[]>;

export type { TechWebSvg, SvgInformation, SvgNames, WebSvg, TechIconData, TechIcons };
