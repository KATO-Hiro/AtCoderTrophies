import { SupportedLanguages as Languages } from '../constants/languages';

export type SupportedLanguages = (typeof Languages)[keyof typeof Languages];
