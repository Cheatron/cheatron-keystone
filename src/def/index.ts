import { load, Def } from '@cheatron/win32-ext';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import type { LPVOID, SIZE_T, UINT32, INT32, UINT64, ksh } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface KeystoneFunctions {
  ks_version: (_major: LPVOID, _minor: LPVOID) => UINT32;
  ks_arch_supported: (_arch: INT32) => boolean;
  ks_open: (_arch: INT32, _mode: INT32, _handle: LPVOID) => INT32;
  ks_close: (_handle: ksh) => INT32;
  ks_errno: (_handle: ksh) => INT32;
  ks_strerror: (_code: INT32) => LPVOID;
  ks_option: (_handle: ksh, _type: INT32, _value: SIZE_T) => INT32;
  ks_asm: (
    _handle: ksh,
    _string: LPVOID,
    _address: UINT64,
    _encoding: LPVOID,
    _encoding_size: LPVOID,
    _stat_count: LPVOID,
  ) => INT32;
  ks_free: (_encoding: LPVOID) => void;
}

export const KeystoneDef = {
  ks_version: [Def.uint32, [Def.int32Ptr, Def.int32Ptr]],
  ks_arch_supported: [Def.bool, [Def.int32]],
  ks_open: [Def.int32, [Def.int32, Def.int32, Def.uint64Ptr]],
  ks_close: [Def.int32, [Def.uint64]],
  ks_errno: [Def.int32, [Def.uint64]],
  ks_strerror: [Def.charPtr, [Def.int32]],
  ks_option: [Def.int32, [Def.uint64, Def.int32, Def.uint64]],
  ks_asm: [
    Def.int32,
    [
      Def.uint64, // handle
      Def.charPtr, // string
      Def.uint64, // address
      Def.voidPtrPtr, // encoding return
      Def.uint64Ptr, // size return
      Def.uint64Ptr, // stat count return
    ],
  ],
  ks_free: [Def.void, [Def.voidPtr]],
};

export const KeystoneImpl = load<KeystoneFunctions>({
  dll: join(__dirname, '../../deps/keystone.dll'),
  dllFuncs: KeystoneDef,
});
