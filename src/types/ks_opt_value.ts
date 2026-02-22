export enum ks_opt_value {
  SYNTAX_INTEL = 1 << 0, // X86 Intel syntax - default on X86 (KS_OPT_SYNTAX).
  SYNTAX_ATT = 1 << 1, // X86 ATT asm syntax (KS_OPT_SYNTAX).
  SYNTAX_NASM = 1 << 2, // X86 Nasm syntax (KS_OPT_SYNTAX).
  SYNTAX_MASM = 1 << 3, // X86 Masm syntax (KS_OPT_SYNTAX) - unsupported yet.
  SYNTAX_GAS = 1 << 4, // X86 GNU GAS syntax (KS_OPT_SYNTAX).
  SYNTAX_RADIX16 = 1 << 5, // All immediates are in hex format (i.e 12 is 0x12)
}
