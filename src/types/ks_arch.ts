export enum ks_arch {
  ARM = 1, // ARM architecture (including Thumb, Thumb-2)
  ARM64, // ARM-64, also called AArch64
  MIPS, // Mips architecture
  X86, // X86 architecture (including x86 & x86-64)
  PPC, // PowerPC architecture (currently unsupported)
  SPARC, // Sparc architecture
  SYSTEMZ, // SystemZ architecture (S390X)
  HEXAGON, // Hexagon architecture
  EVM, // Ethereum Virtual Machine architecture
  MAX,
}
