import {
  ks_arch,
  ks_mode,
  ks_err,
  ks_opt_type,
} from './types';
import type { ksh, LPVOID } from './types';
import { KeystoneImpl } from './def';
import { ffi } from '@cheatron/win32-ext';

export * from './types';
export * from './def';

function closeHandle(handle: ksh): void {
  KeystoneImpl.ks_close(handle);
}

const registry = new FinalizationRegistry((handle: ksh) => {
  closeHandle(handle);
});

export class Keystone {
  protected handle: ksh = 0n;

  constructor(arch: ks_arch, mode: ks_mode) {
    const handlePtr = Buffer.alloc(8);
    const err = KeystoneImpl.ks_open(arch, mode, handlePtr as unknown as LPVOID);
    if (err !== ks_err.OK) {
      throw new Error(`Failed to open Keystone handle: ${ks_err[err] || err}`);
    }
    this.handle = handlePtr.readBigUint64LE();
    registry.register(this, this.handle, this);
  }

  static version(): { major: number; minor: number } {
    const majorPtr = Buffer.alloc(4);
    const minorPtr = Buffer.alloc(4);
    KeystoneImpl.ks_version(
      majorPtr as unknown as LPVOID,
      minorPtr as unknown as LPVOID,
    );
    return {
      major: majorPtr.readInt32LE(),
      minor: minorPtr.readInt32LE(),
    };
  }

  static archSupported(arch: ks_arch): boolean {
    return KeystoneImpl.ks_arch_supported(arch);
  }

  get errno(): ks_err {
    return KeystoneImpl.ks_errno(this.handle);
  }

  strerror(code: ks_err): string {
    const ptr = KeystoneImpl.ks_strerror(code);
    if (!ptr || ptr === 0n) return 'Unknown error';
    return ffi.decode(ptr, 'char*');
  }

  option(type: ks_opt_type, value: number): void {
    const err = KeystoneImpl.ks_option(this.handle, type, value);
    if (err !== ks_err.OK) {
      throw new Error(`Failed to set option: ${this.strerror(err)}`);
    }
  }

  /**
   * Assemble a string containing assembly instructions into machine code.
   * @param source Assembly instructions separated by ';' or newline
   * @param address Starting address of the code
   * @returns Array of bytes representing the assembled machine code
   */
  asm(source: string, address: bigint | number = 0n): number[] {
    const sourceBuf = Buffer.from(source + '\0', 'utf8');
    const addrBig = typeof address === 'number' ? BigInt(address) : address;
    
    const encodingPtrPtr = Buffer.alloc(8);
    const sizePtr = Buffer.alloc(8);
    const statCountPtr = Buffer.alloc(8);

    const err = KeystoneImpl.ks_asm(
      this.handle,
      sourceBuf as unknown as LPVOID,
      addrBig,
      encodingPtrPtr as unknown as LPVOID,
      sizePtr as unknown as LPVOID,
      statCountPtr as unknown as LPVOID
    );

    if (err !== 0) {
      const errCode = this.errno;
      throw new Error(`Failed to assemble: ${this.strerror(errCode)}`);
    }

    const size = Number(sizePtr.readBigUint64LE());
    if (size === 0) {
      return [];
    }

    const encodingPtr = ffi.decode(encodingPtrPtr, 'void*');
    const encodedBytesBuf = ffi.decode(encodingPtr, ffi.array(ffi.types.uint8, size)) as number[];
    const result = Array.from(encodedBytesBuf);
    
    // ks_asm allocates encoding, so we must free it using ks_free
    KeystoneImpl.ks_free(encodingPtr as unknown as LPVOID);

    return result;
  }

  /**
   * Explicitly close the Keystone handle and release resources.
   */
  close(): void {
    if (this.handle !== 0n) {
      closeHandle(this.handle);
      this.handle = 0n;
      registry.unregister(this);
    }
  }
}
