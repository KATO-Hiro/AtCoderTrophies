export const SupportedLanguages = {
  ADA: 'Ada',
  AWK: 'Awk',
  BASH: 'Bash',
  BRAINFUCK: 'Brainfuck',
  C: 'C',
  C_SHARP: 'C#',
  C_PLUS_PLUS: 'C++',
  COBOL_FIXED: 'COBOL - Fixed',
  COBOL_FREE: 'COBOL - Free',
  CEYLON: 'Ceylon',
  CLOJURE: 'Clojure',
  COMMON_LISP: 'Common Lisp',
  CRYSTAL: 'Crystal',
  CYTHON: 'Cython',
  D: 'D',
  DART: 'Dart',
  DASH: 'Dash',
  ELIXIR: 'Elixir',
  ERLANG: 'Erlang',
  F_SHARP: 'F#',
  FORTH: 'Forth',
  FORTRAN: 'Fortran',
  GO: 'Go',
  HASKELL: 'Haskell',
  HAXE_JAVA: 'Haxe; Java',
  HAXE_JS: 'Haxe; js',
  IOI_STYLE_C_PLUS_PLUS: 'IOI-Style C++',
  JAVA: 'Java',
  JAVASCRIPT: 'JavaScript',
  JULIA: 'Julia',
  KOTLIN: 'Kotlin',
  LUA: 'Lua',
  LUAJIT: 'LuaJIT',
  MOONSCRIPT: 'MoonScript',
  NIM: 'Nim',
  OCAML: 'OCaml',
  OBJECTIVE_C: 'Objective-C',
  OCTAVE: 'Octave',
  PHP: 'PHP',
  PASCAL: 'Pascal',
  PERL: 'Perl',
  PROLOG: 'Prolog',
  PYPY: 'PyPy',
  PYTHON: 'Python',
  RACKET: 'Racket',
  RAKU: 'Raku',
  RUBY: 'Ruby',
  RUST: 'Rust',
  SCALA: 'Scala',
  SCHEME: 'Scheme',
  SED: 'Sed',
  STANDARD_ML: 'Standard ML',
  SWIFT: 'Swift',
  TEXT: 'Text',
  TYPESCRIPT: 'TypeScript',
  UNLAMBDA: 'Unlambda',
  VIM: 'Vim',
  VISUAL_BASIC: 'Visual Basic',
  ZSH: 'Zsh',
  BC: 'bc',
  DC: 'dc',
} as const;

export class AcceptedCountByLanguageList {
  languageList: Map<string, number> = new Map();

  constructor() {
    // HACK: The following settings might not be good.
    // eslint-disable-next-line no-restricted-syntax
    for (const language of Object.values(SupportedLanguages)) {
      this.languageList.set(language, 0);
    }
  }

  update(language: string, acceptedCount: number): void {
    this.languageList.set(language, acceptedCount);
  }

  getLanguageList(): Map<string, number> {
    return this.languageList;
  }
}
