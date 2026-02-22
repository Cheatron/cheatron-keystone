export enum ks_mode {
  LITTLE_ENDIAN = 0, // little-endian mode (default mode)
  BIG_ENDIAN = 1 << 30, // big-endian mode
  ARM = 1 << 0, // ARM mode
  THUMB = 1 << 4, // THUMB mode (including Thumb-2)
  V8 = 1 << 6, // ARMv8 A32 encodings for ARM
  MICRO = 1 << 4, // MicroMips mode
  MIPS3 = 1 << 5, // Mips III ISA
  MIPS32R6 = 1 << 6, // Mips32r6 ISA
  MIPS32 = 1 << 2, // Mips32 ISA
  MIPS64 = 1 << 3, // Mips64 ISA
  MODE16 = 1 << 1, // 16-bit mode
  MODE32 = 1 << 2, // 32-bit mode
  MODE64 = 1 << 3, // 64-bit mode
  PPC32 = 1 << 2, // 32-bit mode
  PPC64 = 1 << 3, // 64-bit mode
  QPX = 1 << 4, // Quad Processing eXtensions mode
  SPARC32 = 1 << 2, // 32-bit mode
  SPARC64 = 1 << 3, // 64-bit mode
  V9 = 1 << 4, // SparcV9 mode
}
