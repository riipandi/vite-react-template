import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import {
  CalendarIcon,
  ChartColumnIcon,
  FileTextIcon,
  FolderIcon,
  GripVerticalIcon,
  InboxIcon,
  ImageIcon,
  MusicIcon,
  SettingsIcon,
  VideoIcon
} from 'lucide-react'
import { useState } from 'react'
import type { ReactNode } from 'react'
import { Switch } from '#/components/base/switch'
import { toast } from '#/components/base/toast'
import { Badge } from '#/components/extra/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '#/components/extra/card'
import {
  Sortable,
  SortableItem,
  SortableItemHandle,
  type SortableCommitMeta
} from '#/components/extra/sortable'
import { colors } from '#/styles/core/colors.stylex'
import { radius, unit } from '#/styles/core/tokens.stylex'

const meta = {
  title: 'Extra Components/Sortable',
  parameters: { layout: 'padded' },
  tags: [] // ['autodocs']
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

// Shared layout helpers for the stories.
const styles = stylex.create({
  page: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x6,
    marginInline: 'auto',
    maxWidth: '48rem',
    paddingBlock: unit.x6,
    paddingInline: unit.x5,
    width: '100%'
  },
  card: {
    width: '100%'
  },
  cardBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x2,
    paddingInline: unit.x5,
    paddingBlockEnd: unit.x5
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x2
  },
  listTight: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x1
  },
  grid: {
    display: 'grid',
    gap: unit.x2,
    gridTemplateColumns: {
      default: 'repeat(2, minmax(0, 1fr))',
      '@media (min-width: 660px)': 'repeat(3, minmax(0, 1fr))'
    }
  },
  row: {
    alignItems: 'center',
    backgroundColor: colors.backgroundElevationBase,
    borderColor: colors.borderNeutralFaded,
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: 1,
    display: 'flex',
    gap: unit.x3,
    paddingBlock: unit.x3,
    paddingInline: unit.x3,
    width: '100%'
  },
  rowMuted: {
    backgroundColor: colors.backgroundNeutralFaded
  },
  rowBody: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: unit.x0_5,
    minWidth: 0
  },
  rowTitle: {
    fontWeight: 500
  },
  rowMeta: {
    color: colors.foregroundNeutralFaded,
    fontSize: '0.8125rem'
  },
  metaRow: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x2
  },
  iconTile: {
    alignItems: 'center',
    backgroundColor: colors.backgroundPrimaryFaded,
    borderRadius: radius.small,
    color: colors.foregroundPrimary,
    display: 'flex',
    flexShrink: 0,
    height: unit.x9,
    justifyContent: 'center',
    width: unit.x9
  },
  galleryCell: {
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  orderNumber: {
    alignItems: 'center',
    backgroundColor: colors.backgroundNeutral,
    borderRadius: radius.full,
    color: colors.foregroundNeutral,
    display: 'flex',
    flexShrink: 0,
    fontSize: '0.75rem',
    fontWeight: 600,
    height: unit.x6,
    justifyContent: 'center',
    width: unit.x6
  },
  spacer: {
    flex: 1
  }
})

function Handle() {
  return (
    <SortableItemHandle aria-label='Drag to reorder'>
      <GripVerticalIcon size={16} />
    </SortableItemHandle>
  )
}

// -- c-sortable-1: list of file items ---------------------------------------

interface FileEntry {
  id: string
  title: string
  description: string
  type: 'image' | 'document' | 'audio' | 'video'
  size: string
}

const defaultFiles: FileEntry[] = [
  {
    id: '1',
    title: 'Product Demo',
    description: 'Main product image',
    type: 'image',
    size: '2.4 MB'
  },
  {
    id: '2',
    title: 'Product Specification',
    description: 'Technical details document',
    type: 'document',
    size: '1.2 MB'
  },
  {
    id: '3',
    title: 'Product Demo Video',
    description: 'How to use the product',
    type: 'video',
    size: '15.7 MB'
  },
  {
    id: '4',
    title: 'Product Audio Guide',
    description: 'Audio instructions',
    type: 'audio',
    size: '8.3 MB'
  },
  {
    id: '5',
    title: 'Product Gallery',
    description: 'Additional product view',
    type: 'image',
    size: '3.1 MB'
  }
]

function FileTypeIcon({ type }: { type: FileEntry['type'] }) {
  const Icon =
    type === 'image'
      ? ImageIcon
      : type === 'document'
        ? FileTextIcon
        : type === 'audio'
          ? MusicIcon
          : VideoIcon
  return (
    <span {...stylex.props(styles.iconTile)}>
      <Icon size={16} />
    </span>
  )
}

export const BasicList: Story = {
  name: 'List of items',
  render: () => {
    const [items, setItems] = useState(defaultFiles)

    return (
      <div {...stylex.props(styles.page)}>
        <Sortable
          value={items}
          onValueChange={setItems}
          getItemValue={(item) => item.id}
          style={styles.list}
        >
          {items.map((item) => (
            <SortableItem key={item.id} value={item.id}>
              <div {...stylex.props(styles.row)}>
                <Handle />
                <FileTypeIcon type={item.type} />
                <div {...stylex.props(styles.rowBody)}>
                  <span {...stylex.props(styles.rowTitle)}>{item.title}</span>
                  <span {...stylex.props(styles.rowMeta)}>{item.description}</span>
                </div>
                <div {...stylex.props(styles.metaRow)}>
                  <Badge variant='secondary'>{item.type}</Badge>
                  <span {...stylex.props(styles.rowMeta)}>{item.size}</span>
                </div>
              </div>
            </SortableItem>
          ))}
        </Sortable>
      </div>
    )
  }
}

// -- c-sortable-2: grid layout ----------------------------------------------

interface GridEntry {
  id: string
  title: string
  description: string
  type: 'image' | 'document' | 'audio' | 'video' | 'featured'
  size: string
}

const defaultGridItems: GridEntry[] = [
  { id: '1', title: 'Hero Image', description: 'Main banner image', type: 'image', size: '2.4 MB' },
  {
    id: '2',
    title: 'Product Specs',
    description: 'Technical documentation',
    type: 'document',
    size: '1.2 MB'
  },
  {
    id: '3',
    title: 'Demo Video',
    description: 'Product demonstration',
    type: 'video',
    size: '15.7 MB'
  },
  {
    id: '4',
    title: 'Audio Guide',
    description: 'Voice instructions',
    type: 'audio',
    size: '8.3 MB'
  },
  {
    id: '5',
    title: 'Gallery Photo 1',
    description: 'Product view 1',
    type: 'image',
    size: '3.1 MB'
  },
  {
    id: '6',
    title: 'Gallery Photo 2',
    description: 'Product view 2',
    type: 'image',
    size: '2.8 MB'
  },
  {
    id: '7',
    title: 'User Manual',
    description: 'Installation guide',
    type: 'document',
    size: '4.2 MB'
  },
  {
    id: '8',
    title: 'Background Music',
    description: 'Ambient soundtrack',
    type: 'audio',
    size: '12.1 MB'
  },
  {
    id: '9',
    title: 'Feature Highlight',
    description: 'Key product features',
    type: 'featured',
    size: 'N/A'
  }
]

export const GridLayout: Story = {
  name: 'Grid layout',
  render: () => {
    const [items, setItems] = useState(defaultGridItems)

    return (
      <div {...stylex.props(styles.page)}>
        <Sortable
          value={items}
          onValueChange={setItems}
          getItemValue={(item) => item.id}
          strategy='grid'
          style={styles.grid}
        >
          {items.map((item) => (
            <SortableItem key={item.id} value={item.id}>
              <div
                {...stylex.props(
                  styles.row,
                  item.type === 'featured' && styles.rowMuted,
                  item.type === 'featured' &&
                    ({
                      gridColumn: 'span 2',
                      gridRow: 'span 2'
                    } as stylex.StyleXStyles)
                )}
              >
                <Handle />
                <div {...stylex.props(styles.rowBody)}>
                  <span {...stylex.props(styles.rowTitle)}>{item.title}</span>
                  <span {...stylex.props(styles.rowMeta)}>{item.description}</span>
                </div>
                <div {...stylex.props(styles.metaRow)}>
                  <Badge variant='secondary'>{item.type}</Badge>
                  {item.type !== 'featured' && (
                    <span {...stylex.props(styles.rowMeta)}>{item.size}</span>
                  )}
                </div>
              </div>
            </SortableItem>
          ))}
        </Sortable>
      </div>
    )
  }
}

// -- c-sortable-3: nested (groups + child lists) ----------------------------

interface OptionValue {
  id: string
  value: string
}

interface OptionGroup {
  id: string
  name: string
  values: OptionValue[]
}

const defaultOptionGroups: OptionGroup[] = [
  {
    id: '1',
    name: 'Colors',
    values: [
      { id: '1-1', value: 'White' },
      { id: '1-2', value: 'Black' },
      { id: '1-3', value: 'Grey' },
      { id: '1-4', value: 'Green' }
    ]
  },
  {
    id: '2',
    name: 'Sizes',
    values: [
      { id: '2-1', value: 'Small' },
      { id: '2-2', value: 'Medium' },
      { id: '2-3', value: 'Large' }
    ]
  },
  {
    id: '3',
    name: 'Materials',
    values: [
      { id: '3-1', value: 'Cotton' },
      { id: '3-2', value: 'Polyester' },
      { id: '3-3', value: 'Wool' }
    ]
  }
]

export const NestedGroups: Story = {
  name: 'Nested groups',
  render: () => {
    const [optionGroups, setOptionGroups] = useState(defaultOptionGroups)

    const handleChildReorder = (groupId: string, newValues: OptionValue[]) => {
      setOptionGroups((prev) =>
        prev.map((group) => (group.id === groupId ? { ...group, values: newValues } : group))
      )
    }

    return (
      <div {...stylex.props(styles.page)}>
        <Sortable
          value={optionGroups}
          onValueChange={setOptionGroups}
          getItemValue={(group) => group.id}
          strategy='vertical'
          style={styles.list}
        >
          {optionGroups.map((group) => (
            <SortableItem key={group.id} value={group.id}>
              <Card style={styles.card}>
                <CardHeader>
                  <div {...stylex.props(styles.metaRow)}>
                    <Handle />
                    <CardTitle>{group.name}</CardTitle>
                  </div>
                  <Badge variant='outline'>{group.values.length} options</Badge>
                </CardHeader>
                <div {...stylex.props(styles.cardBody)}>
                  <Sortable
                    value={group.values}
                    onValueChange={(newValues) => handleChildReorder(group.id, newValues)}
                    getItemValue={(value) => value.id}
                    strategy='vertical'
                    style={styles.listTight}
                  >
                    {group.values.map((value) => (
                      <SortableItem key={value.id} value={value.id}>
                        <div {...stylex.props(styles.row, styles.rowMuted)}>
                          <Handle />
                          <span>{value.value}</span>
                        </div>
                      </SortableItem>
                    ))}
                  </Sortable>
                </div>
              </Card>
            </SortableItem>
          ))}
        </Sortable>
      </div>
    )
  }
}

// -- c-sortable-4: playlist with frame --------------------------------------

interface Track {
  id: string
  title: string
  artist: string
  album: string
  duration: string
  plays: string
  active?: boolean
}

const defaultTracks: Track[] = [
  {
    id: '1',
    title: 'Midnight City',
    artist: 'M83',
    album: "Hurry Up, We're Dreaming",
    duration: '4:03',
    plays: '1.2B',
    active: true
  },
  {
    id: '2',
    title: 'Digital Love',
    artist: 'Daft Punk',
    album: 'Discovery',
    duration: '4:58',
    plays: '845M'
  },
  {
    id: '3',
    title: 'Starlight',
    artist: 'Muse',
    album: 'Black Holes',
    duration: '3:59',
    plays: '720M'
  },
  {
    id: '4',
    title: 'Take On Me',
    artist: 'a-ha',
    album: 'Hunting High and Low',
    duration: '3:48',
    plays: '1.8B'
  },
  {
    id: '5',
    title: 'Blue Monday',
    artist: 'New Order',
    album: 'Power, Corruption',
    duration: '7:29',
    plays: '530M'
  }
]

export const Playlist: Story = {
  name: 'Playlist',
  render: () => {
    const [tracks, setTracks] = useState(defaultTracks)

    return (
      <div {...stylex.props(styles.page)}>
        <Card style={styles.card}>
          <CardHeader>
            <div>
              <CardTitle>Queue</CardTitle>
              <CardDescription>{tracks.length} tracks</CardDescription>
            </div>
            <Badge variant='primary'>Playlist</Badge>
          </CardHeader>
          <div {...stylex.props(styles.cardBody)}>
            <Sortable
              value={tracks}
              onValueChange={setTracks}
              getItemValue={(item) => item.id}
              strategy='vertical'
              style={styles.listTight}
            >
              {tracks.map((track) => (
                <SortableItem key={track.id} value={track.id}>
                  <div {...stylex.props(styles.row, track.active && styles.rowMuted)}>
                    <Handle />
                    <div {...stylex.props(styles.rowBody)}>
                      <div {...stylex.props(styles.metaRow)}>
                        <span {...stylex.props(styles.rowTitle)}>{track.title}</span>
                        {track.active && <Badge variant='primary'>Playing</Badge>}
                      </div>
                      <span {...stylex.props(styles.rowMeta)}>
                        {track.artist} · {track.album}
                      </span>
                    </div>
                    <span {...stylex.props(styles.rowMeta)}>{track.plays}</span>
                    <span {...stylex.props(styles.rowMeta)}>{track.duration}</span>
                  </div>
                </SortableItem>
              ))}
            </Sortable>
          </div>
        </Card>
      </div>
    )
  }
}

// -- c-sortable-5: settings priority with switches --------------------------

interface NotificationChannel {
  id: string
  name: string
  description: string
  enabled: boolean
}

const defaultChannels: NotificationChannel[] = [
  { id: '1', name: 'Email', description: 'Send notifications via email', enabled: true },
  { id: '2', name: 'Push Notifications', description: 'Browser and mobile push', enabled: true },
  { id: '3', name: 'SMS', description: 'Text message alerts', enabled: false },
  { id: '4', name: 'Slack', description: 'Post to Slack channels', enabled: true },
  { id: '5', name: 'Webhook', description: 'Send to custom endpoint', enabled: false }
]

export const SettingsPriority: Story = {
  name: 'Settings priority',
  render: () => {
    const [channels, setChannels] = useState(defaultChannels)

    const toggleChannel = (id: string) => {
      setChannels((prev) => prev.map((ch) => (ch.id === id ? { ...ch, enabled: !ch.enabled } : ch)))
    }

    return (
      <div {...stylex.props(styles.page)}>
        <Card style={styles.card}>
          <CardHeader>
            <div>
              <CardTitle>Notification Priority</CardTitle>
              <CardDescription>
                Drag to reorder by priority. Top channels are tried first.
              </CardDescription>
            </div>
          </CardHeader>
          <div {...stylex.props(styles.cardBody)}>
            <Sortable
              value={channels}
              onValueChange={setChannels}
              getItemValue={(item) => item.id}
              strategy='vertical'
              style={styles.listTight}
            >
              {channels.map((channel) => (
                <SortableItem key={channel.id} value={channel.id}>
                  <div {...stylex.props(styles.row)}>
                    <Handle />
                    <div {...stylex.props(styles.rowBody)}>
                      <span {...stylex.props(styles.rowTitle)}>{channel.name}</span>
                      <span {...stylex.props(styles.rowMeta)}>{channel.description}</span>
                    </div>
                    <Switch
                      checked={channel.enabled}
                      onCheckedChange={() => toggleChannel(channel.id)}
                      aria-label={`Toggle ${channel.name}`}
                    />
                  </div>
                </SortableItem>
              ))}
            </Sortable>
          </div>
        </Card>
      </div>
    )
  }
}

// -- c-sortable-6: sidebar navigation ---------------------------------------

interface NavEntry {
  id: string
  label: string
  icon: ReactNode
  count?: number
}

export const SidebarNavigation: Story = {
  name: 'Sidebar navigation',
  render: () => {
    const [items, setItems] = useState<NavEntry[]>([
      { id: '1', label: 'Dashboard', icon: <FolderIcon size={16} /> },
      { id: '2', label: 'Inbox', icon: <InboxIcon size={16} />, count: 5 },
      { id: '3', label: 'Projects', icon: <FileTextIcon size={16} />, count: 12 },
      { id: '4', label: 'Calendar', icon: <CalendarIcon size={16} /> },
      { id: '5', label: 'Analytics', icon: <ChartColumnIcon size={16} /> },
      { id: '6', label: 'Settings', icon: <SettingsIcon size={16} /> }
    ])

    return (
      <div {...stylex.props(styles.page)}>
        <Card style={styles.card}>
          <CardHeader>
            <CardTitle>Navigation</CardTitle>
          </CardHeader>
          <div {...stylex.props(styles.cardBody)}>
            <Sortable
              value={items}
              onValueChange={setItems}
              getItemValue={(item) => item.id}
              strategy='vertical'
              style={styles.listTight}
            >
              {items.map((item) => (
                <SortableItem key={item.id} value={item.id}>
                  <div {...stylex.props(styles.row, styles.rowMuted)}>
                    <Handle />
                    <span {...stylex.props(styles.iconTile)}>{item.icon}</span>
                    <span {...stylex.props(styles.rowTitle)}>{item.label}</span>
                    <span {...stylex.props(styles.spacer)} />
                    {item.count !== undefined && <Badge variant='secondary'>{item.count}</Badge>}
                  </div>
                </SortableItem>
              ))}
            </Sortable>
          </div>
        </Card>
      </div>
    )
  }
}

// -- c-sortable-7: image gallery grid ---------------------------------------

interface GalleryImage {
  id: string
  name: string
  dimensions: string
  size: string
}

const defaultImages: GalleryImage[] = [
  { id: '1', name: 'hero-banner.jpg', dimensions: '1920×1080', size: '2.4 MB' },
  { id: '2', name: 'product-shot.png', dimensions: '800×600', size: '1.8 MB' },
  { id: '3', name: 'team-photo.jpg', dimensions: '1200×800', size: '3.2 MB' },
  { id: '4', name: 'logo-dark.svg', dimensions: '240×60', size: '12 KB' },
  { id: '5', name: 'og-image.png', dimensions: '1200×630', size: '890 KB' },
  { id: '6', name: 'favicon.ico', dimensions: '32×32', size: '4 KB' }
]

export const MediaLibrary: Story = {
  name: 'Media library',
  render: () => {
    const [images, setImages] = useState(defaultImages)

    return (
      <div {...stylex.props(styles.page)}>
        <Card style={styles.card}>
          <CardHeader>
            <div>
              <CardTitle>Media Library</CardTitle>
              <CardDescription>Drag to reorder display priority</CardDescription>
            </div>
          </CardHeader>
          <div {...stylex.props(styles.cardBody)}>
            <Sortable
              value={images}
              onValueChange={setImages}
              getItemValue={(image) => image.id}
              strategy='grid'
              style={styles.grid}
            >
              {images.map((image) => (
                <SortableItem key={image.id} value={image.id}>
                  <div {...stylex.props(styles.row, styles.rowMuted, styles.galleryCell)}>
                    <Handle />
                    <ImageIcon size={16} />
                    <div {...stylex.props(styles.rowBody)}>
                      <span {...stylex.props(styles.rowTitle)}>{image.name}</span>
                      <span {...stylex.props(styles.rowMeta)}>
                        {image.dimensions} · {image.size}
                      </span>
                    </div>
                  </div>
                </SortableItem>
              ))}
            </Sortable>
          </div>
        </Card>
      </div>
    )
  }
}

// -- c-sortable-8: persisted order with rollback ----------------------------

interface Task {
  id: string
  title: string
}

const defaultTasks: Task[] = [
  { id: '1', title: 'Draft the release notes' },
  { id: '2', title: 'Review open pull requests' },
  { id: '3', title: 'Update the changelog' },
  { id: '4', title: 'Cut the release tag' },
  { id: '5', title: 'Announce on the blog' }
]

// Simulated backend. Swap for a tRPC mutation or fetch in your app. Rejects
// roughly one in four calls so the optimistic rollback is easy to see.
function persistOrder(): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.25) {
        reject(new Error('Network error'))
      } else {
        resolve()
      }
    }, 700)
  })
}

export const PersistedOrder: Story = {
  name: 'Persisted order',
  render: () => {
    const [items, setItems] = useState(defaultTasks)

    // Sortable commits once, on drop. `onValueChange` has already applied the
    // new order optimistically; meta.previousValue is the order before the drag.
    const handleValueCommit = (next: Task[], commit: SortableCommitMeta<Task>) => {
      const previous = commit.previousValue
      const movedTitle = next[commit.overIndex]?.title ?? 'item'

      toast.promise(persistOrder(), {
        loading: { title: 'Saving order...' },
        success: { title: `Saved "${movedTitle}" at position ${commit.overIndex + 1}` },
        // Roll back to the pre-drag order. In production prefer a refetch
        // here so a newer drag is not clobbered by this snapshot.
        error: () => {
          setItems(previous)
          return { title: 'Could not save the new order. Restored.' }
        }
      })
    }

    return (
      <div {...stylex.props(styles.page)}>
        <Sortable
          value={items}
          onValueChange={setItems}
          onValueCommit={handleValueCommit}
          getItemValue={(item) => item.id}
          strategy='vertical'
          style={styles.list}
        >
          {items.map((item, index) => (
            <SortableItem key={item.id} value={item.id}>
              <div {...stylex.props(styles.row)}>
                <Handle />
                <span {...stylex.props(styles.orderNumber)}>{index + 1}</span>
                <span {...stylex.props(styles.rowTitle)}>{item.title}</span>
              </div>
            </SortableItem>
          ))}
        </Sortable>
      </div>
    )
  }
}
