/**
 * UI-only mock data for the dashboard. Values are duplicated on purpose so
 * screens can render without resolving relations.
 */

export type MockUser = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  planLabel: string;
};

/** Sidebar row: built-in types with display counts (not derived). */
export type MockItemType = {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
};

/** Collection card / sidebar entry. */
export type MockCollection = {
  id: string;
  name: string;
  description: string;
  itemCount: number;
  isFavorite: boolean;
  /** Accent for cards (e.g. left border). */
  accentColor: string;
  /** Which type icons to show on the card — duplicated labels. */
  typeLabelsShown: string[];
};

/** Grid/list row for an item. */
export type MockItem = {
  id: string;
  title: string;
  description: string;
  typeName: string;
  typeIcon: string;
  tags: string[];
  /** Short label as shown in the UI (e.g. "Jan 15"). */
  updatedLabel: string;
  isPinned: boolean;
  isFavorite: boolean;
  /** Collection name duplicated for display; not a foreign key. */
  collectionName: string | null;
  language: string | null;
};

export const mockCurrentUser: MockUser = {
  id: "user_mock_1",
  name: "John Doe",
  email: "john@example.com",
  avatarUrl: null,
  planLabel: "Free",
};

export const mockItemTypes: MockItemType[] = [
  { id: "itype_snippet", name: "Snippet", icon: "</>", itemCount: 24 },
  { id: "itype_prompt", name: "Prompt", icon: "🤖", itemCount: 18 },
  { id: "itype_command", name: "Command", icon: "$_", itemCount: 15 },
  { id: "itype_note", name: "Note", icon: "📝", itemCount: 12 },
  { id: "itype_file", name: "File", icon: "📎", itemCount: 5 },
  { id: "itype_image", name: "Image", icon: "🖼️", itemCount: 3 },
  { id: "itype_url", name: "Link", icon: "🔗", itemCount: 8 },
];

export const mockCollections: MockCollection[] = [
  {
    id: "col_react_patterns",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    itemCount: 12,
    isFavorite: true,
    accentColor: "#3b82f6",
    typeLabelsShown: ["Snippet", "Note", "Link"],
  },
  {
    id: "col_python_snippets",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    itemCount: 8,
    isFavorite: false,
    accentColor: "#eab308",
    typeLabelsShown: ["Snippet", "Note"],
  },
  {
    id: "col_context_files",
    name: "Context Files",
    description: "AI context files for projects",
    itemCount: 5,
    isFavorite: true,
    accentColor: "#f97316",
    typeLabelsShown: ["File", "Note"],
  },
  {
    id: "col_interview_prep",
    name: "Interview Prep",
    description: "Technical interview preparation",
    itemCount: 24,
    isFavorite: false,
    accentColor: "#a855f7",
    typeLabelsShown: ["Note", "Snippet", "Link", "Prompt"],
  },
  {
    id: "col_git_commands",
    name: "Git Commands",
    description: "Frequently used git commands",
    itemCount: 15,
    isFavorite: true,
    accentColor: "#22c55e",
    typeLabelsShown: ["Command", "Note"],
  },
  {
    id: "col_ai_prompts",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    itemCount: 18,
    isFavorite: false,
    accentColor: "#ec4899",
    typeLabelsShown: ["Prompt", "Snippet", "Note"],
  },
];

export const mockItems: MockItem[] = [
  {
    id: "item_useauth_hook",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    typeName: "Snippet",
    typeIcon: "</>",
    tags: ["react", "auth", "hooks"],
    updatedLabel: "Jan 15",
    isPinned: true,
    isFavorite: true,
    collectionName: "React Patterns",
    language: "typescript",
  },
  {
    id: "item_api_error_handling",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    typeName: "Snippet",
    typeIcon: "</>",
    tags: ["fetch", "retry", "api"],
    updatedLabel: "Jan 12",
    isPinned: true,
    isFavorite: false,
    collectionName: "React Patterns",
    language: "typescript",
  },
  {
    id: "item_openai_system_prompt",
    title: "OpenAI System Prompt — Code Review",
    description: "System prompt for structured PR-style code review output",
    typeName: "Prompt",
    typeIcon: "🤖",
    tags: ["openai", "review", "prompt"],
    updatedLabel: "Jan 10",
    isPinned: false,
    isFavorite: true,
    collectionName: "AI Prompts",
    language: null,
  },
  {
    id: "item_neon_migrate",
    title: "Neon branch + migrate",
    description: "Create a Neon branch and run Prisma migrate against it",
    typeName: "Command",
    typeIcon: "$_",
    tags: ["neon", "prisma", "postgres"],
    updatedLabel: "Jan 8",
    isPinned: false,
    isFavorite: false,
    collectionName: "Interview Prep",
    language: "bash",
  },
  {
    id: "item_nextauth_notes",
    title: "NextAuth v5 checklist",
    description: "Email + GitHub provider setup notes for App Router",
    typeName: "Note",
    typeIcon: "📝",
    tags: ["nextauth", "auth", "nextjs"],
    updatedLabel: "Jan 6",
    isPinned: false,
    isFavorite: false,
    collectionName: "Context Files",
    language: null,
  },
  {
    id: "item_r2_env_template",
    title: "R2 env template",
    description: "Copy-paste .env keys for Cloudflare R2 S3-compatible client",
    typeName: "File",
    typeIcon: "📎",
    tags: ["r2", "env", "storage"],
    updatedLabel: "Jan 4",
    isPinned: false,
    isFavorite: false,
    collectionName: "Context Files",
    language: null,
  },
  {
    id: "item_arch_diagram_png",
    title: "DevStash architecture diagram",
    description: "High-level diagram: client, API, Neon, R2, OpenAI",
    typeName: "Image",
    typeIcon: "🖼️",
    tags: ["architecture", "diagram"],
    updatedLabel: "Jan 3",
    isPinned: false,
    isFavorite: false,
    collectionName: "Interview Prep",
    language: null,
  },
  {
    id: "item_stripe_docs",
    title: "Stripe subscriptions — webhooks",
    description: "Official guide for subscription lifecycle and webhook events",
    typeName: "Link",
    typeIcon: "🔗",
    tags: ["stripe", "billing", "docs"],
    updatedLabel: "Jan 2",
    isPinned: false,
    isFavorite: true,
    collectionName: "Interview Prep",
    language: null,
  },
  {
    id: "item_python_dataclass",
    title: "Dataclass + JSON defaults",
    description: "Pattern for parsing JSON into dataclasses with defaults",
    typeName: "Snippet",
    typeIcon: "</>",
    tags: ["python", "dataclass", "json"],
    updatedLabel: "Dec 28",
    isPinned: false,
    isFavorite: false,
    collectionName: "Python Snippets",
    language: "python",
  },
  {
    id: "item_git_undo_commit",
    title: "Undo last commit (keep changes)",
    description: "Soft reset to uncommit while keeping the working tree",
    typeName: "Command",
    typeIcon: "$_",
    tags: ["git", "reset"],
    updatedLabel: "Dec 20",
    isPinned: false,
    isFavorite: false,
    collectionName: "Git Commands",
    language: "bash",
  },
];
