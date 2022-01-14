# react-global-state

## Table of contents

### Interfaces

- [GlobalState](interfaces/GlobalState.md)
- [GlobalStateOptions](interfaces/GlobalStateOptions.md)
- [PersistenceOptions](interfaces/PersistenceOptions.md)
- [SetStateOptions](interfaces/SetStateOptions.md)

### Type aliases

- [PartialState](modules.md#partialstate)

### Functions

- [createGlobalState](modules.md#createglobalstate)

## Type aliases

### PartialState

Ƭ **PartialState**<`T`\>: `Partial`<`T`\> \| keyof `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[types.ts:16](https://github.com/foobaragency/react-global-state/blob/150f5895/src/types.ts#L16)

## Functions

### createGlobalState

▸ `Const` **createGlobalState**<`S`\>(`initialState`, `options?`): [`GlobalState`](interfaces/GlobalState.md)<`S`\>

#### Type parameters

| Name |
| :------ |
| `S` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `initialState` | `S` |
| `options?` | [`GlobalStateOptions`](interfaces/GlobalStateOptions.md) |

#### Returns

[`GlobalState`](interfaces/GlobalState.md)<`S`\>

#### Defined in

[createGlobalState.ts:16](https://github.com/foobaragency/react-global-state/blob/150f5895/src/createGlobalState.ts#L16)
