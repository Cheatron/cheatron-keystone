import { describe, it, expect } from 'bun:test';
import { KeystoneX86, ks_err } from '../src';

describe('Keystone X86 Assembly', () => {
  it('should assemble basic 64-bit x86 instructions', () => {
    const assembler = new KeystoneX86();

    // Assemble MOV RAX, RBX
    const bytes = assembler.asm('MOV RAX, RBX');
    expect(bytes.length).toBe(3);

    // Machine code for MOV RAX, RBX is 48 89 D8
    expect(bytes[0]).toBe(0x48);
    expect(bytes[1]).toBe(0x89);
    expect(bytes[2]).toBe(0xd8);
  });

  it('should support multi-line sequences', () => {
    const assembler = new KeystoneX86();

    // Assemble NOP ; INT3
    const bytes = assembler.asm('NOP; INT3');
    expect(bytes.length).toBe(2);

    // 90 CC
    expect(bytes[0]).toBe(0x90);
    expect(bytes[1]).toBe(0xcc);
  });

  it('should throw Error on invalid syntax', () => {
    const assembler = new KeystoneX86();

    // Use a generic catch that guarantees throw
    expect(() => {
      assembler.asm('INVALID_INSTRUCTION RAX, RBX');
    }).toThrow();

    // Can also verify exact errno
    expect(assembler.errno).not.toBe(ks_err.OK);
  });

  it('should report proper version', () => {
    const ver = KeystoneX86.version();
    expect(ver.major).toBeGreaterThanOrEqual(0);
    expect(ver.minor).toBeGreaterThanOrEqual(0);
  });
});
