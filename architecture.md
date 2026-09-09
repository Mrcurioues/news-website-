# Architecture

## Frontend Stack
- **React 19** with functional components and hooks
- **TypeScript 5.8** strict mode
- **Vite 6** as build tool
- **Tailwind CSS v4** for styling
- **Zustand v5** for global state management (with persist middleware)
- **dnd-kit** for drag-and-drop in homepage editor
- **Recharts** for analytics charts
- **Lucide React** for icons
- **react-hot-toast** for notifications
- **date-fns** for date formatting

## State Architecture

### Zustand Stores (src/stores/)
| Store | Persisted | Purpose |
|-------|-----------|---------|
| `storiesStore` | ✅ `newsroom-stories` | Story CRUD, status workflow, dashboard counts |
| `mediaStore` | ✅ `newsroom-media` | Media library CRUD |
| `homepageStore` | ✅ `newsroom-homepage` | Homepage layout management |
| `uiStore` | ✅ `newsroom-ui` (partial) | Notifications, search, onboarding, breaking news |
| `authStore` | ✅ `newsroom-auth` | Current authenticated user |

### Data Types (src/types/admin.ts)
- `Story`, `StoryStatus`, `StoryType`, `StoryActivity`, `StorySource`
- `MediaItem`, `HomepageLayout`, `Notification`, `Comment`, `AdminUser`, `NewsSection`

## Key Conventions
- IDs: `${entityType}-${Date.now()}-${randomStr}` pattern
- Timestamps: ISO 8601 strings (e.g., `2026-09-04T06:15:00Z`)
- Status transitions: logged in `story.activity[]`
