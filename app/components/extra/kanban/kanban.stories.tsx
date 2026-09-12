import { GripVertical } from '@keyline-icons/react'
import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '#/components/base/avatar'
import { Button } from '#/components/base/button'
import { Meter } from '#/components/base/meter'
import { Progress } from '#/components/base/progress'
import { toast } from '#/components/base/toast'
import { Badge } from '#/components/extra/badge'
import { Kanban, KanbanBoard, KanbanItem, KanbanOverlay } from '#/components/extra/kanban'
import { KanbanColumn, KanbanColumnContent, KanbanColumnHandle } from '#/components/extra/kanban'
import { colors, shadow } from '#/styles/core/colors.stylex'
import { radius, stroke, unit } from '#/styles/core/tokens.stylex'
import { fontFamily, fontSize, fontLineHeight, fontWeight } from '#/styles/core/tokens.stylex'

const meta = {
  title: 'Extra Components/Kanban',
  parameters: { layout: 'padded' },
  tags: [] // ['autodocs']
} satisfies Meta<typeof Kanban>

export default meta
type Story = StoryObj<typeof meta>

// ---------------------------------------------------------------------------
// Shared styles
// ---------------------------------------------------------------------------

const styles = stylex.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x6,
    paddingBlock: unit.x6,
    paddingInline: unit.x5
  },
  fillWidth: {
    width: '100%'
  },
  toolbar: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x3,
    marginBlockEnd: unit.x3
  },
  toolbarEnd: {
    marginInlineStart: 'auto'
  },
  toolbarTitle: {
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.semibold,
    lineHeight: fontLineHeight.body2
  },
  toolbarStatus: {
    color: colors.foregroundNeutralFaded,
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    lineHeight: fontLineHeight.caption1
  },
  columnHeader: {
    alignItems: 'center',
    borderBottom: `${stroke.ring1} solid ${colors.borderNeutralFaded}`,
    display: 'flex',
    gap: unit.x2,
    marginBlockEnd: unit.x2,
    paddingBlockEnd: unit.x2
  },
  columnTitle: {
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.semibold,
    lineHeight: fontLineHeight.body2
  },
  columnCount: {
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.medium
  },
  handleEnd: {
    marginInlineStart: 'auto'
  },
  colorDot: (color: string) => ({
    backgroundColor: color,
    borderRadius: radius.small,
    flexShrink: 0,
    height: unit.x3,
    width: unit.x3
  }),
  frameColumn: {
    backgroundColor: colors.backgroundNeutralFaded,
    boxShadow: 'none',
    gap: unit.x1,
    padding: unit.x2
  },
  frameHeader: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x2,
    paddingBlock: unit.x1,
    paddingInline: unit.x2
  },
  framePanel: {
    backgroundColor: colors.backgroundPage,
    borderColor: colors.borderNeutralFaded,
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    display: 'flex',
    flexDirection: 'column',
    padding: unit.x1
  },
  framePanelEmpty: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    padding: 0
  },
  frameContent: {
    gap: unit.x1
  },
  frameItem: {
    backgroundColor: 'transparent',
    borderColor: 'transparent'
  },
  frameItemTitle: {
    flex: 1
  },
  frameDescription: {
    color: colors.foregroundNeutralFaded,
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    lineHeight: fontLineHeight.caption1,
    paddingInline: unit.x2
  },
  assigneeRow: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x1_5
  },
  assigneeName: {
    color: colors.foregroundNeutralFaded,
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    lineHeight: fontLineHeight.caption1
  },
  taskProgressRow: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x2,
    marginBlockStart: unit.x1
  },
  taskProgress: {
    flex: 1,
    minWidth: 0
  },
  taskProgressValue: {
    color: colors.foregroundNeutralFaded,
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    fontVariantNumeric: 'tabular-nums',
    lineHeight: fontLineHeight.caption1
  },
  statusDot: (color: string) => ({
    backgroundColor: color,
    borderRadius: radius.full,
    flexShrink: 0,
    height: unit.x2,
    width: unit.x2
  }),
  itemBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x1
  },
  itemTitleRow: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x2
  },
  itemTitle: {
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    lineHeight: fontLineHeight.body2
  },
  itemDescription: {
    color: colors.foregroundNeutralFaded,
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    lineHeight: fontLineHeight.caption1
  },
  badgePriority: {
    alignSelf: 'flex-start'
  },
  badgeWarning: {
    backgroundColor: colors.backgroundWarningFaded,
    color: colors.foregroundWarning
  },
  badgePositive: {
    backgroundColor: colors.backgroundPositiveFaded,
    color: colors.foregroundPositive
  },
  overlayCard: {
    backgroundColor: colors.backgroundElevationBase,
    borderColor: colors.borderNeutralFaded,
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    boxShadow: shadow.overlay,
    boxSizing: 'border-box',
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    height: '100%',
    lineHeight: fontLineHeight.body2,
    padding: unit.x3,
    width: '100%'
  },
  overlayColumnCard: {
    backgroundColor: colors.backgroundElevationBase,
    borderColor: colors.borderNeutralFaded,
    borderRadius: radius.large,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    boxShadow: shadow.overlay,
    boxSizing: 'border-box',
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    height: '100%',
    lineHeight: fontLineHeight.body2,
    padding: unit.x4,
    width: '100%'
  },
  overlayTitle: {
    color: colors.foregroundNeutral,
    display: 'block',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    lineHeight: fontLineHeight.body2
  },
  overlayColumnTitle: {
    color: colors.foregroundNeutral,
    display: 'block',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.semibold,
    lineHeight: fontLineHeight.body2
  },
  overlayDescription: {
    color: colors.foregroundNeutralFaded,
    display: 'block',
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    lineHeight: fontLineHeight.caption1,
    marginBlockStart: unit.x1
  },
  overlayCount: {
    color: colors.foregroundNeutralFaded,
    display: 'block',
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    lineHeight: fontLineHeight.caption1,
    marginBlockStart: unit.x1
  },
  overlayProgress: {
    marginBlockStart: unit.x2
  },
  overlayProgressMeta: {
    color: colors.foregroundNeutralFaded,
    display: 'flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    justifyContent: 'space-between',
    lineHeight: fontLineHeight.caption1,
    marginBlockEnd: unit.x1
  },
  overlayDashed: {
    borderStyle: 'dashed'
  },
  ghostOverlay: {
    opacity: 1
  },
  ghostBox: {
    backgroundColor: colors.backgroundNeutralHighlightedFaded,
    boxSizing: 'border-box',
    height: '100%',
    width: '100%'
  },
  ghostColumn: {
    borderColor: colors.borderNeutral,
    borderRadius: radius.large,
    borderStyle: 'solid',
    borderWidth: stroke.ring1
  },
  ghostItem: {
    borderColor: colors.borderNeutral,
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.ring1
  }
})

// ---------------------------------------------------------------------------
// Types & initial data
// ---------------------------------------------------------------------------

interface Task {
  id: string
  title: string
  description?: string
  priority?: 'high' | 'medium' | 'low'
  progress?: number
  assignee?: string
  assigneeAvatar?: string
}

interface Column {
  id: string
  title: string
  description?: string
  color?: string
  tasks: Task[]
}

interface BackendTask {
  id: string
  title: string
  status: string
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    color: colors.foregroundNeutralFaded,
    tasks: [
      { id: 'task-1', title: 'Research competitors', priority: 'high' },
      { id: 'task-2', title: 'Design system audit', priority: 'medium' },
      { id: 'task-3', title: 'User interviews', priority: 'low' }
    ]
  },
  {
    id: 'progress',
    title: 'In Progress',
    color: colors.foregroundPrimary,
    tasks: [
      { id: 'task-4', title: 'Implement drag and drop', priority: 'high', progress: 60 },
      { id: 'task-5', title: 'Write unit tests', priority: 'medium', progress: 30 }
    ]
  },
  {
    id: 'review',
    title: 'Review',
    color: colors.foregroundWarning,
    tasks: [
      { id: 'task-6', title: 'Code review PR #42', priority: 'high' },
      { id: 'task-7', title: 'Update documentation', priority: 'low' }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    color: colors.foregroundPositive,
    tasks: [
      { id: 'task-8', title: 'Setup project', priority: 'medium' },
      { id: 'task-9', title: 'Configure CI/CD', priority: 'low' }
    ]
  }
]

function getColumnsValue(columns: Column[]) {
  const value: Record<string, Task[]> = {}
  columns.forEach((col) => {
    value[col.id] = col.tasks
  })
  return value
}

function PriorityBadge({ priority }: { priority: NonNullable<Task['priority']> }) {
  // `alignSelf` keeps the badge at its intrinsic width inside the flex-column
  // item body, which would otherwise stretch it full width.
  if (priority === 'high') {
    return (
      <Badge variant='destructive' style={styles.badgePriority}>
        {priority}
      </Badge>
    )
  }
  if (priority === 'medium') {
    return (
      <Badge variant='ghost' style={[styles.badgePriority, styles.badgeWarning]}>
        {priority}
      </Badge>
    )
  }
  return (
    <Badge variant='ghost' style={[styles.badgePriority, styles.badgePositive]}>
      {priority}
    </Badge>
  )
}

/**
 * DragOverlay owns the movement while dragging (the source stops following
 * the pointer once the overlay mounts), so column drags must render visible
 * overlay content or the board appears frozen.
 */
function columnOverlayPlaceholder(column: Column) {
  return (
    <div {...stylex.props(styles.overlayColumnCard, styles.overlayDashed)}>
      <span {...stylex.props(styles.overlayColumnTitle)}>{column.title}</span>
      <span {...stylex.props(styles.overlayCount)}>{column.tasks.length} tasks</span>
    </div>
  )
}

function columnLabel(id: string) {
  return id === 'todo'
    ? 'To Do'
    : id === 'in-progress'
      ? 'In Progress'
      : id === 'done'
        ? 'Done'
        : id
}

/** Story 1 commit: no-op beyond the toast, so it lives at module scope. */
function commitTaskMoved() {
  toast.success('Task moved')
}

/** Story 6 fake persistence: latency + log + toast, no component state. */
function fakePersistToBackend(value: Record<string, BackendTask[]>) {
  return new Promise<void>((resolve) => setTimeout(resolve, 500)).then(() => {
    console.log('Persisted to backend:', value)
    toast.success('Changes saved')
  })
}

// ---------------------------------------------------------------------------
// Story 1: Kanban board with placeholder overlay
// ---------------------------------------------------------------------------

export const PlaceholderOverlay: Story = {
  render: () => {
    const [columns, setColumns] = useState<Column[]>(initialColumns)
    const value = getColumnsValue(columns)

    const handleValueChange = (newValue: Record<string, Task[]>) => {
      // The record's key order carries the column order — follow it.
      setColumns((prev) =>
        Object.keys(newValue).map((id) => {
          const existing = prev.find((col) => col.id === id)
          return existing
            ? { ...existing, tasks: newValue[id] ?? existing.tasks }
            : { id, title: id, tasks: newValue[id] ?? [] }
        })
      )
    }

    return (
      <div {...stylex.props(styles.page)}>
        <Kanban
          value={value}
          onValueChange={handleValueChange}
          getItemValue={(task) => task.id}
          onValueCommit={commitTaskMoved}
          style={styles.fillWidth}
        >
          <KanbanBoard>
            {columns.map((column) => (
              <KanbanColumn key={column.id} value={column.id}>
                <div {...stylex.props(styles.columnHeader)}>
                  <span {...stylex.props(styles.columnTitle)}>{column.title}</span>
                  <Badge variant='outline' style={styles.columnCount}>
                    {column.tasks.length}
                  </Badge>
                  <KanbanColumnHandle style={styles.handleEnd}>
                    <GripVertical size={16} />
                  </KanbanColumnHandle>
                </div>
                <KanbanColumnContent value={column.id}>
                  {column.tasks.map((task) => (
                    <KanbanItem key={task.id} value={task.id}>
                      <div {...stylex.props(styles.itemBody)}>
                        <span {...stylex.props(styles.itemTitle)}>{task.title}</span>
                        {task.description && (
                          <span {...stylex.props(styles.itemDescription)}>{task.description}</span>
                        )}
                      </div>
                    </KanbanItem>
                  ))}
                </KanbanColumnContent>
              </KanbanColumn>
            ))}
          </KanbanBoard>
          <KanbanOverlay style={styles.ghostOverlay}>
            {({ variant }) => (
              <div
                {...stylex.props(
                  styles.ghostBox,
                  variant === 'column' ? styles.ghostColumn : styles.ghostItem
                )}
              />
            )}
          </KanbanOverlay>
        </Kanban>
      </div>
    )
  }
}

// ---------------------------------------------------------------------------
// Story 2: Kanban board with dynamic overlay
// ---------------------------------------------------------------------------

export const DynamicOverlay: Story = {
  render: () => {
    const [columns, setColumns] = useState<Column[]>(initialColumns)
    const value = getColumnsValue(columns)

    const handleValueChange = (newValue: Record<string, Task[]>) => {
      // The record's key order carries the column order — follow it.
      setColumns((prev) =>
        Object.keys(newValue).map((id) => {
          const existing = prev.find((col) => col.id === id)
          return existing
            ? { ...existing, tasks: newValue[id] ?? existing.tasks }
            : { id, title: id, tasks: newValue[id] ?? [] }
        })
      )
    }

    return (
      <div {...stylex.props(styles.page)}>
        <Kanban
          value={value}
          onValueChange={handleValueChange}
          getItemValue={(task) => task.id}
          style={styles.fillWidth}
        >
          <KanbanBoard>
            {columns.map((column) => (
              <KanbanColumn key={column.id} value={column.id}>
                <div {...stylex.props(styles.columnHeader)}>
                  <span {...stylex.props(styles.columnTitle)}>{column.title}</span>
                  <Badge variant='outline' style={styles.columnCount}>
                    {column.tasks.length}
                  </Badge>
                  <KanbanColumnHandle style={styles.handleEnd}>
                    <GripVertical size={16} />
                  </KanbanColumnHandle>
                </div>
                <KanbanColumnContent value={column.id}>
                  {column.tasks.map((task) => (
                    <KanbanItem key={task.id} value={task.id}>
                      <div {...stylex.props(styles.itemBody)}>
                        <span {...stylex.props(styles.itemTitle)}>{task.title}</span>
                        {task.priority && <PriorityBadge priority={task.priority} />}
                      </div>
                    </KanbanItem>
                  ))}
                </KanbanColumnContent>
              </KanbanColumn>
            ))}
          </KanbanBoard>
          <KanbanOverlay>
            {({ value: activeId, variant }) => {
              if (variant === 'column') {
                const column = columns.find((col) => col.id === activeId)
                if (!column) return null
                return (
                  <div {...stylex.props(styles.overlayColumnCard)}>
                    <span {...stylex.props(styles.overlayColumnTitle)}>{column.title}</span>
                    <span {...stylex.props(styles.overlayCount)}>{column.tasks.length} tasks</span>
                  </div>
                )
              }
              const task = columns.flatMap((col) => col.tasks).find((t) => t.id === activeId)
              if (!task) return null
              return (
                <div {...stylex.props(styles.overlayCard)}>
                  <span {...stylex.props(styles.overlayTitle)}>{task.title}</span>
                  {task.priority && <PriorityBadge priority={task.priority} />}
                </div>
              )
            }}
          </KanbanOverlay>
        </Kanban>
      </div>
    )
  }
}

// ---------------------------------------------------------------------------
// Story 3: Kanban board with frame columns
// ---------------------------------------------------------------------------

export const FrameColumns: Story = {
  render: () => {
    const [columns, setColumns] = useState<Column[]>(initialColumns)
    const value = getColumnsValue(columns)

    const handleValueChange = (newValue: Record<string, Task[]>) => {
      // The record's key order carries the column order — follow it.
      setColumns((prev) =>
        Object.keys(newValue).map((id) => {
          const existing = prev.find((col) => col.id === id)
          return existing
            ? { ...existing, tasks: newValue[id] ?? existing.tasks }
            : { id, title: id, tasks: newValue[id] ?? [] }
        })
      )
    }

    return (
      <div {...stylex.props(styles.page)}>
        <Kanban
          value={value}
          onValueChange={handleValueChange}
          getItemValue={(task) => task.id}
          style={styles.fillWidth}
        >
          <KanbanBoard>
            {columns.map((column) => (
              <KanbanColumn key={column.id} value={column.id} style={styles.frameColumn}>
                <div {...stylex.props(styles.frameHeader)}>
                  <div
                    {...stylex.props(
                      styles.colorDot(column.color ?? colors.foregroundNeutralFaded)
                    )}
                  />
                  <span {...stylex.props(styles.columnTitle)}>{column.title}</span>
                  <Badge variant='outline' style={styles.columnCount}>
                    {column.tasks.length}
                  </Badge>
                  <KanbanColumnHandle style={styles.handleEnd}>
                    <GripVertical size={16} />
                  </KanbanColumnHandle>
                </div>
                <div
                  {...stylex.props(
                    styles.framePanel,
                    column.tasks.length === 0 && styles.framePanelEmpty
                  )}
                >
                  <KanbanColumnContent value={column.id} style={styles.frameContent}>
                    {column.tasks.map((task) => (
                      <KanbanItem key={task.id} value={task.id} style={styles.frameItem}>
                        <div {...stylex.props(styles.itemTitleRow)}>
                          <span {...stylex.props(styles.itemTitle, styles.frameItemTitle)}>
                            {task.title}
                          </span>
                          {task.priority && <PriorityBadge priority={task.priority} />}
                        </div>
                      </KanbanItem>
                    ))}
                  </KanbanColumnContent>
                </div>
              </KanbanColumn>
            ))}
          </KanbanBoard>
          <KanbanOverlay>
            {({ value: activeId, variant }) => {
              if (variant === 'column') {
                const column = columns.find((col) => col.id === activeId)
                return column ? columnOverlayPlaceholder(column) : null
              }
              const task = columns.flatMap((col) => col.tasks).find((t) => t.id === activeId)
              if (!task) return null
              return (
                <div {...stylex.props(styles.overlayCard)}>
                  <span {...stylex.props(styles.overlayTitle)}>{task.title}</span>
                </div>
              )
            }}
          </KanbanOverlay>
        </Kanban>
      </div>
    )
  }
}

// ---------------------------------------------------------------------------
// Story 4: Minimal kanban with stacked frame
// ---------------------------------------------------------------------------

export const StackedFrame: Story = {
  render: () => {
    const [columns, setColumns] = useState<Column[]>([
      {
        id: 'planning',
        title: 'Planning',
        description: 'Tasks being scoped',
        tasks: [
          {
            id: 'task-1',
            title: 'Research competitors',
            assignee: 'Alex J.',
            assigneeAvatar:
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80',
            progress: 20
          }
        ]
      },
      {
        id: 'active',
        title: 'Active',
        description: 'Currently in development',
        tasks: [
          {
            id: 'task-2',
            title: 'Build dashboard',
            assignee: 'Sarah C.',
            assigneeAvatar:
              'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=96&h=96&dpr=2&q=80',
            progress: 65
          },
          {
            id: 'task-3',
            title: 'API integration',
            assignee: 'David K.',
            assigneeAvatar:
              'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=96&h=96&dpr=2&q=80',
            progress: 40
          }
        ]
      },
      {
        id: 'completed',
        title: 'Completed',
        description: 'Finished and deployed',
        tasks: [
          {
            id: 'task-4',
            title: 'Setup repository',
            assignee: 'Emma W.',
            assigneeAvatar:
              'https://images.unsplash.com/photo-1485893086445-ed75865251e0?w=96&h=96&dpr=2&q=80',
            progress: 100
          }
        ]
      }
    ])
    const value = getColumnsValue(columns)

    const handleValueChange = (newValue: Record<string, Task[]>) => {
      // The record's key order carries the column order — follow it.
      setColumns((prev) =>
        Object.keys(newValue).map((id) => {
          const existing = prev.find((col) => col.id === id)
          return existing
            ? { ...existing, tasks: newValue[id] ?? existing.tasks }
            : { id, title: id, tasks: newValue[id] ?? [] }
        })
      )
    }

    return (
      <div {...stylex.props(styles.page)}>
        <Kanban
          value={value}
          onValueChange={handleValueChange}
          getItemValue={(task) => task.id}
          style={styles.fillWidth}
        >
          <KanbanBoard>
            {columns.map((column) => (
              <KanbanColumn key={column.id} value={column.id} style={styles.frameColumn}>
                <div {...stylex.props(styles.frameHeader)}>
                  <span {...stylex.props(styles.columnTitle)}>{column.title}</span>
                  <Badge variant='outline' style={styles.columnCount}>
                    {column.tasks.length}
                  </Badge>
                  <KanbanColumnHandle style={styles.handleEnd}>
                    <GripVertical size={16} />
                  </KanbanColumnHandle>
                </div>
                {column.description && (
                  <span {...stylex.props(styles.frameDescription)}>{column.description}</span>
                )}
                <div
                  {...stylex.props(
                    styles.framePanel,
                    column.tasks.length === 0 && styles.framePanelEmpty
                  )}
                >
                  <KanbanColumnContent value={column.id} style={styles.frameContent}>
                    {column.tasks.map((task) => (
                      <KanbanItem key={task.id} value={task.id} style={styles.frameItem}>
                        <div {...stylex.props(styles.itemBody)}>
                          <span {...stylex.props(styles.itemTitle)}>{task.title}</span>
                          <div {...stylex.props(styles.assigneeRow)}>
                            <Avatar size='sm'>
                              <AvatarImage src={task.assigneeAvatar} alt={task.assignee} />
                              <AvatarFallback>{task.assignee?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span {...stylex.props(styles.assigneeName)}>{task.assignee}</span>
                          </div>
                          <div {...stylex.props(styles.taskProgressRow)}>
                            <Progress value={task.progress ?? 0} style={styles.taskProgress} />
                            <span {...stylex.props(styles.taskProgressValue)}>
                              {task.progress}%
                            </span>
                          </div>
                        </div>
                      </KanbanItem>
                    ))}
                  </KanbanColumnContent>
                </div>
              </KanbanColumn>
            ))}
          </KanbanBoard>
        </Kanban>
      </div>
    )
  }
}

// ---------------------------------------------------------------------------
// Story 5: Feature roadmap kanban with progress
// ---------------------------------------------------------------------------

export const FeatureRoadmap: Story = {
  render: () => {
    const roadmapColumns: Column[] = [
      {
        id: 'planned',
        title: 'Planned',
        color: colors.foregroundNeutralFaded,
        tasks: [
          {
            id: 'r-1',
            title: 'Dark mode',
            description: 'Add dark mode support',
            priority: 'medium',
            progress: 0
          },
          {
            id: 'r-2',
            title: 'API v2',
            description: 'Migrate to API v2 endpoints',
            priority: 'high',
            progress: 0
          }
        ]
      },
      {
        id: 'in-progress',
        title: 'In Progress',
        color: colors.foregroundPrimary,
        tasks: [
          {
            id: 'r-3',
            title: 'Kanban board',
            description: 'Drag and drop kanban',
            priority: 'high',
            progress: 65
          },
          {
            id: 'r-4',
            title: 'Notifications',
            description: 'Real-time notifications',
            priority: 'medium',
            progress: 40
          }
        ]
      },
      {
        id: 'completed',
        title: 'Completed',
        color: colors.foregroundPositive,
        tasks: [
          {
            id: 'r-5',
            title: 'Auth system',
            description: 'OAuth2 login',
            priority: 'high',
            progress: 100
          },
          {
            id: 'r-6',
            title: 'Dashboard',
            description: 'Analytics dashboard',
            priority: 'medium',
            progress: 100
          }
        ]
      }
    ]

    const [columns, setColumns] = useState<Column[]>(roadmapColumns)
    const value = getColumnsValue(columns)

    const handleValueChange = (newValue: Record<string, Task[]>) => {
      // The record's key order carries the column order — follow it.
      setColumns((prev) =>
        Object.keys(newValue).map((id) => {
          const existing = prev.find((col) => col.id === id)
          return existing
            ? { ...existing, tasks: newValue[id] ?? existing.tasks }
            : { id, title: id, tasks: newValue[id] ?? [] }
        })
      )
    }

    return (
      <div {...stylex.props(styles.page)}>
        <Kanban
          value={value}
          onValueChange={handleValueChange}
          getItemValue={(task) => task.id}
          style={styles.fillWidth}
        >
          <KanbanBoard>
            {columns.map((column) => (
              <KanbanColumn key={column.id} value={column.id}>
                <div {...stylex.props(styles.columnHeader)}>
                  <span {...stylex.props(styles.columnTitle)}>{column.title}</span>
                  <Badge variant='outline' style={styles.columnCount}>
                    {column.tasks.length}
                  </Badge>
                  <KanbanColumnHandle style={styles.handleEnd}>
                    <GripVertical size={16} />
                  </KanbanColumnHandle>
                </div>
                <KanbanColumnContent value={column.id}>
                  {column.tasks.map((task) => (
                    <KanbanItem key={task.id} value={task.id}>
                      <div {...stylex.props(styles.itemBody)}>
                        <span {...stylex.props(styles.itemTitle)}>{task.title}</span>
                        {task.description && (
                          <span {...stylex.props(styles.itemDescription)}>{task.description}</span>
                        )}
                        {task.progress != null && task.progress > 0 && (
                          <div {...stylex.props(styles.taskProgressRow)}>
                            <Progress value={task.progress} style={styles.taskProgress} />
                            <span {...stylex.props(styles.taskProgressValue)}>
                              {task.progress}%
                            </span>
                          </div>
                        )}
                      </div>
                    </KanbanItem>
                  ))}
                </KanbanColumnContent>
              </KanbanColumn>
            ))}
          </KanbanBoard>
          <KanbanOverlay>
            {({ value: activeId, variant }) => {
              if (variant === 'column') {
                const column = columns.find((col) => col.id === activeId)
                return column ? columnOverlayPlaceholder(column) : null
              }
              const task = columns.flatMap((col) => col.tasks).find((t) => t.id === activeId)
              if (!task) return null
              return (
                <div {...stylex.props(styles.overlayCard)}>
                  <span {...stylex.props(styles.overlayColumnTitle)}>{task.title}</span>
                  {task.description && (
                    <span {...stylex.props(styles.overlayDescription)}>{task.description}</span>
                  )}
                  {task.progress != null && (
                    <div {...stylex.props(styles.overlayProgress)}>
                      <div {...stylex.props(styles.overlayProgressMeta)}>
                        <span>Progress</span>
                        <span>{task.progress}%</span>
                      </div>
                      <Meter value={task.progress} />
                    </div>
                  )}
                </div>
              )
            }}
          </KanbanOverlay>
        </Kanban>
      </div>
    )
  }
}

// ---------------------------------------------------------------------------
// Story 6: Kanban board persisted to a backend
// ---------------------------------------------------------------------------

export const PersistedToBackend: Story = {
  render: () => {
    const initialBackendColumns: Record<string, BackendTask[]> = {
      todo: [
        { id: 'b-1', title: 'Design mockups', status: 'todo' },
        { id: 'b-2', title: 'API design', status: 'todo' }
      ],
      'in-progress': [{ id: 'b-3', title: 'Frontend development', status: 'in-progress' }],
      done: [{ id: 'b-4', title: 'Project setup', status: 'done' }]
    }

    const [columns, setColumns] = useState<Record<string, BackendTask[]>>(initialBackendColumns)
    const [isSaving, setIsSaving] = useState(false)

    const handleValueChange = (newValue: Record<string, BackendTask[]>) => {
      setColumns(newValue)
    }

    const handleValueCommit = (value: Record<string, BackendTask[]>) => {
      setIsSaving(true)
      fakePersistToBackend(value).then(() => setIsSaving(false))
    }

    return (
      <div {...stylex.props(styles.page)}>
        <div {...stylex.props(styles.toolbar)}>
          <span {...stylex.props(styles.toolbarTitle)}>Kanban Board</span>
          {isSaving && <span {...stylex.props(styles.toolbarStatus)}>Saving...</span>}
          <Button
            variant='outline'
            size='sm'
            style={styles.toolbarEnd}
            onClick={() => {
              toast.success('Changes synced')
            }}
          >
            Sync Now
          </Button>
        </div>
        <Kanban
          value={columns}
          onValueChange={handleValueChange}
          getItemValue={(task) => task.id}
          onValueCommit={handleValueCommit}
          style={styles.fillWidth}
        >
          <KanbanBoard>
            {Object.keys(columns).map((columnId) => (
              <KanbanColumn key={columnId} value={columnId}>
                <div {...stylex.props(styles.columnHeader)}>
                  <span {...stylex.props(styles.columnTitle)}>{columnLabel(columnId)}</span>
                  <Badge variant='outline' style={styles.columnCount}>
                    {columns[columnId]?.length ?? 0}
                  </Badge>
                  <KanbanColumnHandle style={styles.handleEnd}>
                    <GripVertical size={16} />
                  </KanbanColumnHandle>
                </div>
                <KanbanColumnContent value={columnId}>
                  {columns[columnId]?.map((task) => (
                    <KanbanItem key={task.id} value={task.id}>
                      <span {...stylex.props(styles.itemTitle)}>{task.title}</span>
                    </KanbanItem>
                  ))}
                </KanbanColumnContent>
              </KanbanColumn>
            ))}
          </KanbanBoard>
          <KanbanOverlay>
            {({ value: activeId, variant }) => {
              if (variant === 'column') {
                return (
                  <div {...stylex.props(styles.overlayColumnCard, styles.overlayDashed)}>
                    <span {...stylex.props(styles.overlayColumnTitle)}>
                      {columnLabel(String(activeId))}
                    </span>
                    <span {...stylex.props(styles.overlayCount)}>
                      {columns[activeId as string]?.length ?? 0} tasks
                    </span>
                  </div>
                )
              }
              const task = Object.values(columns)
                .flat()
                .find((t) => t.id === activeId)
              if (!task) return null
              return (
                <div {...stylex.props(styles.overlayCard)}>
                  <span {...stylex.props(styles.overlayTitle)}>{task.title}</span>
                </div>
              )
            }}
          </KanbanOverlay>
        </Kanban>
      </div>
    )
  }
}
