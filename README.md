# @cheatron/keystone

TypeScript/FFI bindings for the [Keystone](http://www.keystone-engine.org/) assembler engine with full OOP support.

## Features

- **Full Keystone API** — `ks_open`, `ks_asm`, `ks_close`, `ks_option` and more
- **OOP Wrapper** — `Keystone` base class and `KeystoneX86` for x86/x64
- **Type-safe Enums** — Auto-generated from `keystone.h` (`ks_arch`, `ks_mode`, `ks_err`, `ks_opt_type`, etc.)
- **Auto Cleanup** — `FinalizationRegistry` + explicit `close()` for deterministic resource management
- **Dynamic DLL Resolution** — `keystone.dll` bundled in `deps/`, resolved via `import.meta.url`

## Install

```bash
bun add @cheatron/keystone
```

## Usage

```typescript
import { KeystoneX86 } from '@cheatron/keystone';

const ks = new KeystoneX86(); // defaults to 64-bit mode

const bytes = ks.asm('MOV RAX, RBX');
console.log(bytes); // [0x48, 0x89, 0xD8]

// Multi-line assembly
const prologue = ks.asm('push rbp; mov rbp, rsp; sub rsp, 0x20');
console.log(prologue);

// With base address
const code = ks.asm('jmp 0x1000', 0xff0n);

ks.close();
```

## License

MIT
