# Interface: GlobalState<T\>

## Type parameters

| Name |
| :------ |
| `T` |

## Table of contents

### Methods

- [createPartialState](GlobalState.md#createpartialstate)
- [getGlobalState](GlobalState.md#getglobalstate)
- [setGlobalState](GlobalState.md#setglobalstate)
- [useGlobalState](GlobalState.md#useglobalstate)
- [useReadOnlyState](GlobalState.md#usereadonlystate)

## Methods

### createPartialState

▸ **createPartialState**(`project`): () => [`PartialState`](../modules.md#partialstate)<`T`\>

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

[types.ts:24](https://github.com/foobaragency/react-global-state/blob/6f4ee1a9/src/types.ts#L24)

___

### getGlobalState

▸ **getGlobalState**(): `T`

#### Returns

`T`

#### Defined in

[types.ts:27](https://github.com/foobaragency/react-global-state/blob/6f4ee1a9/src/types.ts#L27)

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

[types.ts:28](https://github.com/foobaragency/react-global-state/blob/6f4ee1a9/src/types.ts#L28)

___

### useGlobalState

▸ **useGlobalState**(): readonly [`T`, (`state`: `SetStateAction`<`T`\>, `options?`: [`SetStateOptions`](SetStateOptions.md)) => `void`]

#### Returns

readonly [`T`, (`state`: `SetStateAction`<`T`\>, `options?`: [`SetStateOptions`](SetStateOptions.md)) => `void`]

#### Defined in

[types.ts:19](https://github.com/foobaragency/react-global-state/blob/6f4ee1a9/src/types.ts#L19)

___

### useReadOnlyState

▸ **useReadOnlyState**(): [`PartialState`](../modules.md#partialstate)<`T`\>

#### Returns

[`PartialState`](../modules.md#partialstate)<`T`\>

#### Defined in

[types.ts:23](https://github.com/foobaragency/react-global-state/blob/6f4ee1a9/src/types.ts#L23)
