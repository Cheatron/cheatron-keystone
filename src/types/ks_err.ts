export enum ks_err {
  OK = 0, // No error: everything was fine
  NOMEM, // Out-Of-Memory error: ks_open(), ks_emulate()
  ARCH, // Unsupported architecture: ks_open()
  HANDLE, // Invalid handle
  MODE, // Invalid/unsupported mode: ks_open()
  VERSION, // Unsupported version (bindings)
  OPT_INVALID, // Unsupported option
  ASM_EXPR_TOKEN = 128, // unknown token in expression
  ASM_DIRECTIVE_VALUE_RANGE, // literal value out of range for directive
  ASM_DIRECTIVE_ID, // expected identifier in directive
  ASM_DIRECTIVE_TOKEN, // unexpected token in directive
  ASM_DIRECTIVE_STR, // expected string in directive
  ASM_DIRECTIVE_COMMA, // expected comma in directive
  ASM_DIRECTIVE_RELOC_NAME, // expected relocation name in directive
  ASM_DIRECTIVE_RELOC_TOKEN, // unexpected token in .reloc directive
  ASM_DIRECTIVE_FPOINT, // invalid floating point in directive
  ASM_DIRECTIVE_UNKNOWN, // unknown directive
  ASM_DIRECTIVE_EQU, // invalid equal directive
  ASM_DIRECTIVE_INVALID, // (generic) invalid directive
  ASM_VARIANT_INVALID, // invalid variant
  ASM_EXPR_BRACKET, // brackets expression not supported on this target
  ASM_SYMBOL_MODIFIER, // unexpected symbol modifier following '@'
  ASM_SYMBOL_REDEFINED, // invalid symbol redefinition
  ASM_SYMBOL_MISSING, // cannot find a symbol
  ASM_RPAREN, // expected ')' in parentheses expression
  ASM_STAT_TOKEN, // unexpected token at start of statement
  ASM_UNSUPPORTED, // unsupported token yet
  ASM_MACRO_TOKEN, // unexpected token in macro instantiation
  ASM_MACRO_PAREN, // unbalanced parentheses in macro argument
  ASM_MACRO_EQU, // expected '=' after formal parameter identifier
  ASM_MACRO_ARGS, // too many positional arguments
  ASM_MACRO_LEVELS_EXCEED, // macros cannot be nested more than 20 levels deep
  ASM_MACRO_STR, // invalid macro string
  ASM_MACRO_INVALID, // invalid macro (generic error)
  ASM_ESC_BACKSLASH, // unexpected backslash at end of escaped string
  ASM_ESC_OCTAL, // invalid octal escape sequence  (out of range)
  ASM_ESC_SEQUENCE, // invalid escape sequence (unrecognized character)
  ASM_ESC_STR, // broken escape string
  ASM_TOKEN_INVALID, // invalid token
  ASM_INSN_UNSUPPORTED, // this instruction is unsupported in this mode
  ASM_FIXUP_INVALID, // invalid fixup
  ASM_LABEL_INVALID, // invalid label
  ASM_FRAGMENT_INVALID, // invalid fragment
  ASM_INVALIDOPERAND = 512,
  ASM_MISSINGFEATURE,
  ASM_MNEMONICFAIL,
}
