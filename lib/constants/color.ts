import type { Color, ColorMode } from '$lib/types';

export const WHITE: Color = '#000';
export const BLACK: Color = '#fcfcfc';
export const PRIMARY: Color = '#BE9EC7';
export const SECONDARY: Color = '#182A26';
export const ACCENT: Color = '#A89467';

export const DM_TEXT: Color = '#EFE9E1';
export const DM_BG: Color = '#0D0B07';
export const DM_PRIMARY: Color = '#D2C4AC';
export const DM_SECONDARY: Color = '#385666';
export const DM_ACCENT: Color = '#7D6EAF';

export const LM_TEXT: Color = '#1E1810';
export const LM_BG: Color = '#F8F6F2';
export const LM_PRIMARY: Color = '#53452D';
export const LM_SECONDARY: Color = '#53452D';
export const LM_ACCENT: Color = '#5F5091';

export const colorSystem: Record<
	ColorMode,
	Record<'text' | 'bg' | 'primary' | 'secondary' | 'accent', Color>
> = {
	light: {
		text: LM_TEXT,
		bg: LM_BG,
		primary: LM_PRIMARY,
		secondary: LM_SECONDARY,
		accent: LM_ACCENT
	},
	dark: {
		accent: DM_ACCENT,
		bg: DM_BG,
		primary: DM_PRIMARY,
		secondary: DM_SECONDARY,
		text: DM_TEXT
	}
};

export const GITHUB_COLOR = '#181717';
export const LINKEDIN_COLOR = '#0A66C2';

export const colors = colorSystem['light'];
