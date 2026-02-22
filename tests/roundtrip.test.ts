import { describe, it, expect } from 'bun:test';
import { CapstoneX86 } from '@cheatron/capstone';
import { KeystoneX86 } from '../src';

describe('Round-Trip: Capstone Disassembly -> Keystone Assembly', () => {
  const cs = new CapstoneX86();
  const ks = new KeystoneX86();

  const verify = (bytesHex: string, address: bigint = 0x1000n) => {
    // Parse hex string to bytes array
    const originalBytes = bytesHex
      .trim()
      .split(/\s+/)
      .map((x) => parseInt(x, 16));
    const byteBuffer = Buffer.from(originalBytes);

    // 1. Disassemble with Capstone
    const insns = cs.disasm(byteBuffer, address);
    expect(insns.length).toBeGreaterThan(0);

    // 2. Form assembly string from instructions
    const asmString = insns
      .map((insn) => `${insn.mnemonic} ${insn.op_str}`.trim())
      .join('; ');

    // 3. Assemble with Keystone
    const assembledBytes = ks.asm(asmString, address);

    // 4. Compare bytes
    expect(Array.from(assembledBytes)).toEqual(originalBytes);

    return { asmString, assembledBytes };
  };

  it('should round-trip basic stack/control instructions', () => {
    verify('55'); // push rbp
    verify('5d'); // pop rbp
    verify('90'); // nop
    verify('c3'); // ret
  });

  it('should round-trip data movement', () => {
    verify('48 89 d8'); // mov rax, rbx
    verify('b8 42 00 00 00'); // mov eax, 0x42
    verify('48 b9 88 77 66 55 44 33 22 11'); // mov rcx, 0x1122334455667788
  });

  it('should round-trip arithmetic', () => {
    verify('48 01 d8'); // add rax, rbx
    verify('48 83 ec 28'); // sub rsp, 0x28
    verify('31 c0'); // xor eax, eax
    verify('48 ff c1'); // inc rcx
    verify('48 ff ca'); // dec rdx
  });

  it('should round-trip memory operands', () => {
    // mov qword ptr [rsp + 8], rax
    // Capstone disassembly might include "qword ptr", which Keystone understands natively
    // We can also just test basic memory accesses.
    verify('48 89 44 24 08');
  });

  it('should round-trip sequences', () => {
    // push rbp; mov rbp, rsp; sub rsp, 0x20
    verify('55 48 89 e5 48 83 ec 20');
  });

  // Clean up handles if necessary
  it('cleanup', () => {
    ks.close();
    cs.close();
  });
});
