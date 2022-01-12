# Interface: GlobalState<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Methods

- [getGlobalState](GlobalState.md#getglobalstate)
- [setGlobalState](GlobalState.md#setglobalstate)
- [useGlobalState](GlobalState.md#useglobalstate)
- [usePartialState](GlobalState.md#usepartialstate)
- [useReadOnlyState](GlobalState.md#usereadonlystate)

## Methods

### getGlobalState

▸ **getGlobalState**(): `T`

#### Returns

`T`

#### Defined in

types.ts:25

___

### setGlobalState

▸ **setGlobalState**(`state`, `options?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `state` | `SetStateAction`<`T`\> |
| `options?` | [`SetStateOptions`](SetStateOptions.md) |

#### Returns

`void`

#### Defined in

types.ts:26

___

### useGlobalState

▸ **useGlobalState**(): readonly [`T`, (`state`: `SetStateAction`<`T`\>) => `void`]

#### Returns

readonly [`T`, (`state`: `SetStateAction`<`T`\>) => `void`]

#### Defined in

types.ts:20

___

### usePartialState

▸ **usePartialState**(`project`): () => [`PartialState`](../modules.md#partialstate)<`T`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `project` | (`state`: `T`) => [`PartialState`](../modules.md#partialstate)<`T`\> |

#### Returns

`fn`

▸ (): [`PartialState`](../modules.md#partialstate)<`T`\>

##### Returns

[`PartialState`](../modules.md#partialstate)<`T`\>

#### Defined in

types.ts:22

___

### useReadOnlyState

▸ **useReadOnlyState**(): [`PartialState`](../modules.md#partialstate)<`T`\>

#### Returns

[`PartialState`](../modules.md#partialstate)<`T`\>

#### Defined in

types.ts:21
