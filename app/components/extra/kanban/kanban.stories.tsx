import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import { GripVerticalIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from '#/components/base/button'
import { toast } from '#/components/base/toast'
import {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnContent,
  KanbanColumnHandle,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay
} from '#/components/extra/kanban'
import { colors, shadow } from '#/styles/core/colors.stylex'
import { container, radius, stroke, unit } from '#/styles/core/tokens.stylex'
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
  boardNarrow: {
    maxWidth: container.xlarge,
    width: '100%'
  },
  boardTwoColumns: {
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))'
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
    flex: 1,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    fontWeight: fontWeight.semibold,
    lineHeight: fontLineHeight.body2
  },
  columnCount: {
    color: colors.foregroundNeutralFaded,
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    lineHeight: fontLineHeight.caption1
  },
  colorDot: (color: string) => ({
    backgroundColor: color,
    borderRadius: radius.small,
    flexShrink: 0,
    height: unit.x3,
    width: unit.x3
  }),
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
  priority: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: radius.small,
    display: 'inline-flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.medium,
    lineHeight: fontLineHeight.caption1,
    paddingBlock: unit.x0_5,
    paddingInline: unit.x1
  },
  priorityHigh: {
    backgroundColor: colors.backgroundCriticalFaded,
    color: colors.foregroundCritical
  },
  priorityMedium: {
    backgroundColor: colors.backgroundWarningFaded,
    color: colors.foregroundWarning
  },
  priorityLow: {
    backgroundColor: colors.backgroundPositiveFaded,
    color: colors.foregroundPositive
  },
  progressBar: {
    backgroundColor: colors.backgroundNeutralFaded,
    borderRadius: radius.full,
    height: unit.x1,
    marginBlockStart: unit.x2,
    overflow: 'hidden',
    width: '100%'
  },
  progressFill: (progress: number) => ({
    backgroundColor: colors.backgroundPrimary,
    borderRadius: radius.full,
    height: '100%',
    width: `${progress}%`
  }),
  overlayCard: {
    backgroundColor: colors.backgroundElevationBase,
    borderColor: colors.borderNeutralFaded,
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    boxShadow: shadow.raised,
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    padding: unit.x3
  },
  overlayColumnCard: {
    backgroundColor: colors.backgroundElevationBase,
    borderColor: colors.borderNeutralFaded,
    borderRadius: radius.large,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    boxShadow: shadow.raised,
    color: colors.foregroundNeutral,
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    lineHeight: fontLineHeight.body2,
    maxWidth: container.xxlarge,
    minWidth: container.small,
    padding: unit.x4
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
  overlayProgressBar: {
    backgroundColor: colors.backgroundNeutralFaded,
    borderRadius: radius.full,
    height: unit.x1,
    overflow: 'hidden',
    width: '100%'
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
}

interface Column {
  id: string
  title: string
  color?: string
  tasks: Task[]
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

function priorityChip(priority: NonNullable<Task['priority']>) {
  return stylex.props(
    styles.priority,
    priority === 'high' && styles.priorityHigh,
    priority === 'medium' && styles.priorityMedium,
    priority === 'low' && styles.priorityLow
  )
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

    // oxlint-disable-next-line no-unused-vars consistent-function-scoping
    const handleValueCommit = (_value: Record<string, Task[]>, _meta: unknown) => {
      toast.success('Task moved')
    }

    return (
      <div {...stylex.props(styles.page)}>
        <Kanban
          value={value}
          onValueChange={handleValueChange}
          getItemValue={(task) => task.id}
          onValueCommit={handleValueCommit}
          style={styles.fillWidth}
        >
          <KanbanBoard>
            {columns.map((column) => (
              <KanbanColumn key={column.id} value={column.id}>
                <div {...stylex.props(styles.columnHeader)}>
                  <KanbanColumnHandle>
                    <GripVerticalIcon size={16} />
                  </KanbanColumnHandle>
                  <span {...stylex.props(styles.columnTitle)}>{column.title}</span>
                  <span {...stylex.props(styles.columnCount)}>{column.tasks.length}</span>
                </div>
                <KanbanColumnContent value={column.id}>
                  {column.tasks.map((task) => (
                    <KanbanItem key={task.id} value={task.id}>
                      <div {...stylex.props(styles.itemBody)}>
                        <div {...stylex.props(styles.itemTitleRow)}>
                          <KanbanItemHandle>
                            <GripVerticalIcon size={14} />
                          </KanbanItemHandle>
                          <span {...stylex.props(styles.itemTitle)}>{task.title}</span>
                        </div>
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
          <KanbanOverlay>
            {({ value: activeId, variant }) => {
              const task = columns.flatMap((col) => col.tasks).find((t) => t.id === activeId)
              if (!task || variant !== 'item') return null
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
                  <KanbanColumnHandle>
                    <GripVerticalIcon size={16} />
                  </KanbanColumnHandle>
                  <span {...stylex.props(styles.columnTitle)}>{column.title}</span>
                  <span {...stylex.props(styles.columnCount)}>{column.tasks.length}</span>
                </div>
                <KanbanColumnContent value={column.id}>
                  {column.tasks.map((task) => (
                    <KanbanItem key={task.id} value={task.id}>
                      <div {...stylex.props(styles.itemBody)}>
                        <div {...stylex.props(styles.itemTitleRow)}>
                          <KanbanItemHandle>
                            <GripVerticalIcon size={14} />
                          </KanbanItemHandle>
                          <span {...stylex.props(styles.itemTitle)}>{task.title}</span>
                        </div>
                        {task.priority && (
                          <span {...priorityChip(task.priority)}>{task.priority}</span>
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
                  {task.priority && <span {...priorityChip(task.priority)}>{task.priority}</span>}
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
              <KanbanColumn key={column.id} value={column.id}>
                <div {...stylex.props(styles.columnHeader)}>
                  <div
                    {...stylex.props(
                      styles.colorDot(column.color ?? colors.foregroundNeutralFaded)
                    )}
                  />
                  <span {...stylex.props(styles.columnTitle)}>{column.title}</span>
                  <span {...stylex.props(styles.columnCount)}>{column.tasks.length}</span>
                </div>
                <KanbanColumnContent value={column.id}>
                  {column.tasks.map((task) => (
                    <KanbanItem key={task.id} value={task.id}>
                      <div {...stylex.props(styles.itemTitleRow)}>
                        <div
                          {...stylex.props(
                            styles.statusDot(
                              task.priority === 'high'
                                ? colors.backgroundCritical
                                : task.priority === 'medium'
                                  ? colors.backgroundWarning
                                  : colors.backgroundPositive
                            )
                          )}
                        />
                        <span {...stylex.props(styles.itemTitle)}>{task.title}</span>
                      </div>
                    </KanbanItem>
                  ))}
                </KanbanColumnContent>
              </KanbanColumn>
            ))}
          </KanbanBoard>
          <KanbanOverlay>
            {({ value: activeId, variant }) => {
              const task = columns.flatMap((col) => col.tasks).find((t) => t.id === activeId)
              if (!task || variant !== 'item') return null
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
        id: 'backlog',
        title: 'Backlog',
        tasks: [
          { id: 'task-1', title: 'Setup repository', priority: 'low' },
          { id: 'task-2', title: 'Define requirements', priority: 'medium' }
        ]
      },
      {
        id: 'sprint',
        title: 'Sprint',
        tasks: [
          { id: 'task-3', title: 'Build kanban board', priority: 'high' },
          { id: 'task-4', title: 'Add drag and drop', priority: 'high' },
          { id: 'task-5', title: 'Write tests', priority: 'medium' }
        ]
      }
    ])
    const value = getColumnsValue(columns)

    const handleValueChange = (newValue: Record<string, Task[]>) => {
      setColumns((prev) =>
        prev.map((col) => ({
          ...col,
          tasks: newValue[col.id] ?? col.tasks
        }))
      )
    }

    return (
      <div {...stylex.props(styles.page)}>
        <Kanban
          value={value}
          onValueChange={handleValueChange}
          getItemValue={(task) => task.id}
          style={styles.boardNarrow}
        >
          <KanbanBoard style={styles.boardTwoColumns}>
            {columns.map((column) => (
              <KanbanColumn key={column.id} value={column.id}>
                <div {...stylex.props(styles.columnHeader)}>
                  <span {...stylex.props(styles.columnTitle)}>{column.title}</span>
                  <span {...stylex.props(styles.columnCount)}>{column.tasks.length}</span>
                </div>
                <KanbanColumnContent value={column.id}>
                  {column.tasks.map((task) => (
                    <KanbanItem key={task.id} value={task.id}>
                      <div {...stylex.props(styles.itemTitleRow)}>
                        <div
                          {...stylex.props(
                            styles.statusDot(
                              task.priority === 'high'
                                ? colors.backgroundCritical
                                : task.priority === 'medium'
                                  ? colors.backgroundWarning
                                  : colors.backgroundPositive
                            )
                          )}
                        />
                        <span {...stylex.props(styles.itemTitle)}>{task.title}</span>
                      </div>
                    </KanbanItem>
                  ))}
                </KanbanColumnContent>
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
                  <KanbanColumnHandle>
                    <GripVerticalIcon size={16} />
                  </KanbanColumnHandle>
                  <span {...stylex.props(styles.columnTitle)}>{column.title}</span>
                  <span {...stylex.props(styles.columnCount)}>{column.tasks.length}</span>
                </div>
                <KanbanColumnContent value={column.id}>
                  {column.tasks.map((task) => (
                    <KanbanItem key={task.id} value={task.id}>
                      <div {...stylex.props(styles.itemBody)}>
                        <div {...stylex.props(styles.itemTitleRow)}>
                          <KanbanItemHandle>
                            <GripVerticalIcon size={14} />
                          </KanbanItemHandle>
                          <span {...stylex.props(styles.itemTitle)}>{task.title}</span>
                        </div>
                        {task.description && (
                          <span {...stylex.props(styles.itemDescription)}>{task.description}</span>
                        )}
                        {task.progress != null && task.progress > 0 && (
                          <div {...stylex.props(styles.progressBar)}>
                            <div {...stylex.props(styles.progressFill(task.progress))} />
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
              const task = columns.flatMap((col) => col.tasks).find((t) => t.id === activeId)
              if (!task || variant !== 'item') return null
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
                      <div {...stylex.props(styles.overlayProgressBar)}>
                        <div {...stylex.props(styles.progressFill(task.progress))} />
                      </div>
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
    interface BackendTask {
      id: string
      title: string
      status: string
    }

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

    // oxlint-disable-next-line no-unused-vars consistent-function-scoping
    const handleValueCommit = async (_value: Record<string, BackendTask[]>, _meta: unknown) => {
      setIsSaving(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.log('Persisted to backend:', _value)
      setIsSaving(false)
      toast.success('Changes saved')
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
                  <span {...stylex.props(styles.columnTitle)}>
                    {columnId === 'todo'
                      ? 'To Do'
                      : columnId === 'in-progress'
                        ? 'In Progress'
                        : columnId === 'done'
                          ? 'Done'
                          : columnId}
                  </span>
                  <span {...stylex.props(styles.columnCount)}>
                    {columns[columnId]?.length ?? 0}
                  </span>
                </div>
                <KanbanColumnContent value={columnId}>
                  {columns[columnId]?.map((task) => (
                    <KanbanItem key={task.id} value={task.id}>
                      <div {...stylex.props(styles.itemTitleRow)}>
                        <KanbanItemHandle>
                          <GripVerticalIcon size={14} />
                        </KanbanItemHandle>
                        <span {...stylex.props(styles.itemTitle)}>{task.title}</span>
                      </div>
                    </KanbanItem>
                  ))}
                </KanbanColumnContent>
              </KanbanColumn>
            ))}
          </KanbanBoard>
          <KanbanOverlay>
            {({ value: activeId }) => {
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
