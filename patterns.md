# Code Patterns

## Zustand Store Pattern
```ts
export const useXStore = create<XState>()(
  persist(
    (set, get) => ({
      // state
      // actions
    }),
    { name: 'newsroom-x' }
  )
);
```

## ID Generation
```ts
const generateId = () => `entity-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
```

## Status Transition with Activity Log
Calling `transitionStatus(id, status, userId, userName, note?)` appends a `StoryActivity` entry and updates `story.status`.

## partialize for Selective Persistence
In `uiStore`, `isSearchOpen` is NOT persisted (ephemeral UI state). Use `partialize` to pick only the keys that should survive page refreshes.

## Type-safe filtering
```ts
getByType: (type) => {
  if (type === 'all') return get().items;
  return get().items.filter((item) => item.type === type);
}
```
