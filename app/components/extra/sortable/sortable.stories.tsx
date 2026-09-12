import { Image, MusicNote, Film } from '@keyline-icons/react'
import { ChevronRight, FileText, GripVertical } from '@keyline-icons/react'
import type { Meta, StoryObj } from '@storybook/tanstack-react'
import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '#/components/base/collapsible'
import { Switch } from '#/components/base/switch'
import { toast } from '#/components/base/toast'
import { Badge } from '#/components/extra/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '#/components/extra/card'
import { Sortable, SortableItem, SortableItemHandle } from '#/components/extra/sortable'
import type { SortableCommitMeta } from '#/components/extra/sortable'
import { colors, shadow } from '#/styles/core/colors.stylex'
import { stroke, unit, duration, easing, radius, zIndex } from '#/styles/core/tokens.stylex'
import { fontFamily, fontSize, fontLineHeight, fontWeight } from '#/styles/core/tokens.stylex'

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
    gap: unit.x3,
    gridAutoFlow: 'dense',
    gridAutoRows: '1fr',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
  },
  row: {
    alignItems: 'center',
    backgroundColor: colors.backgroundElevationBase,
    borderColor: colors.borderNeutralFaded,
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    boxSizing: 'border-box',
    display: 'flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    gap: unit.x3,
    height: '100%',
    lineHeight: fontLineHeight.body2,
    paddingBlock: unit.x3,
    paddingInline: unit.x3,
    width: '100%',
    transitionDuration: duration.medium,
    transitionProperty: 'background-color, border-color, box-shadow, transform',
    transitionTimingFunction: easing.decelerate,
    transform: 'translateY(0)',
    ':hover': {
      backgroundColor: colors.backgroundNeutralHighlightedFaded,
      borderColor: colors.borderNeutral,
      boxShadow: shadow.outline,
      transform: 'translateY(-1px)'
    },
    ':active': {
      transform: 'translateY(0)',
      backgroundColor: colors.backgroundNeutralFaded
    }
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
    fontWeight: fontWeight.medium
  },
  rowMeta: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.caption1,
    lineHeight: fontLineHeight.caption1
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
    height: unit.x8,
    justifyContent: 'center',
    width: unit.x8
  },
  featuredCell: {
    gridColumn: {
      default: 'span 2',
      '@media (min-width: 660px)': 'span 2'
    },
    gridRow: 'span 2'
  },
  gridCell: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: unit.x2,
    justifyContent: 'space-between',
    minHeight: unit.x20,
    width: '100%'
  },
  gridHandle: {
    height: 'fit-content',
    opacity: {
      default: 0,
      ':hover': 1,
      ':focus-visible': 1,
      ':active': 1,
      [stylex.when.ancestor(':hover')]: 1,
      '@media (pointer: coarse)': 1
    },
    position: 'absolute',
    right: unit.x3,
    top: unit.x3,
    width: 'fit-content'
  },
  gridFooter: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x2,
    justifyContent: 'space-between',
    width: '100%'
  },
  // Media library: fixed 3×2 image grid.
  mediaGrid: {
    display: 'grid',
    gap: unit.x3,
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))'
  },
  orderNumber: {
    alignItems: 'center',
    backgroundColor: colors.backgroundNeutral,
    borderRadius: radius.full,
    color: colors.foregroundNeutral,
    display: 'flex',
    flexShrink: 0,
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.semibold,
    height: unit.x6,
    justifyContent: 'center',
    width: unit.x6
  },
  // Nested groups (collapsible)
  listCompact: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x2
  },
  groupContainer: {
    width: '100%'
  },
  groupHeader: {
    alignItems: 'center',
    backgroundColor: colors.backgroundElevationBase,
    borderColor: colors.borderNeutralFaded,
    borderRadius: radius.medium,
    borderStyle: 'solid',
    borderWidth: stroke.ring1,
    boxSizing: 'border-box',
    cursor: 'pointer',
    display: 'flex',
    fontFamily: fontFamily.body,
    fontSize: fontSize.body2,
    gap: unit.x2,
    justifyContent: 'space-between',
    lineHeight: fontLineHeight.body2,
    paddingBlock: unit.x2,
    paddingInline: unit.x2,
    userSelect: 'none',
    width: '100%',
    transitionDuration: duration.medium,
    transitionProperty: 'background-color, border-color, box-shadow, transform',
    transitionTimingFunction: easing.decelerate,
    transform: 'translateY(0)',
    ':hover': {
      backgroundColor: colors.backgroundNeutralHighlightedFaded,
      borderColor: colors.borderNeutral,
      boxShadow: shadow.outline,
      transform: 'translateY(-1px)'
    },
    ':active': {
      transform: 'translateY(0)',
      backgroundColor: colors.backgroundNeutralFaded
    }
  },
  groupHeaderOpen: {
    backgroundColor: colors.backgroundNeutralHighlightedFaded,
    borderColor: colors.borderNeutral,
    boxShadow: shadow.outline
  },
  groupTitle: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    lineHeight: fontLineHeight.body2
  },
  groupHeaderRight: {
    alignItems: 'center',
    display: 'flex',
    gap: unit.x1
  },
  groupBadge: {
    fontSize: fontSize.caption1,
    fontWeight: fontWeight.medium
  },
  groupChevron: {
    color: colors.foregroundNeutral,
    transitionDuration: duration.medium,
    transitionProperty: 'transform',
    transitionTimingFunction: easing.decelerate,
    transform: 'rotate(0deg)'
  },
  groupChevronOpen: {
    transform: 'rotate(90deg)'
  },
  groupPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x1,
    paddingBlockStart: unit.x2,
    paddingInline: unit.x1
  },
  rowCompact: {
    paddingBlock: unit.x2,
    paddingInline: unit.x2
  },
  textCaption: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.caption1,
    lineHeight: fontLineHeight.caption1
  }
})

function Handle({ style }: { style?: stylex.StyleXStyles }) {
  return (
    <SortableItemHandle aria-label='Drag to reorder' style={style}>
      <GripVertical size={16} />
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
    type === 'image' ? Image : type === 'document' ? FileText : type === 'audio' ? MusicNote : Film
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
                  styles.gridCell,
                  item.type === 'featured' && styles.rowMuted,
                  item.type === 'featured' && styles.featuredCell
                )}
              >
                <Handle style={styles.gridHandle} />
                <div {...stylex.props(styles.rowBody)}>
                  <span {...stylex.props(styles.rowTitle)}>{item.title}</span>
                  <span {...stylex.props(styles.rowMeta)}>{item.description}</span>
                </div>
                <div {...stylex.props(styles.gridFooter)}>
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
          style={styles.listCompact}
        >
          {optionGroups.map((group) => (
            <SortableItem key={group.id} value={group.id}>
              <div style={styles.groupContainer}>
                <Collapsible defaultOpen={group.id === '1'}>
                  <CollapsibleTrigger
                    render={(props, state) => (
                      <button
                        type='button'
                        {...props}
                        {...stylex.props(styles.groupHeader, state.open && styles.groupHeaderOpen)}
                      >
                        <div {...stylex.props(styles.metaRow)}>
                          <Handle />
                          <span {...stylex.props(styles.groupTitle)}>{group.name}</span>
                        </div>
                        <div {...stylex.props(styles.groupHeaderRight)}>
                          <Badge variant='outline' style={styles.groupBadge}>
                            {group.values.length}
                          </Badge>
                          <ChevronRight
                            size={14}
                            {...stylex.props(
                              styles.groupChevron,
                              state.open && styles.groupChevronOpen
                            )}
                          />
                        </div>
                      </button>
                    )}
                  />
                  <CollapsibleContent>
                    <div {...stylex.props(styles.groupPanel)}>
                      <Sortable
                        value={group.values}
                        onValueChange={(newValues) => handleChildReorder(group.id, newValues)}
                        getItemValue={(value) => value.id}
                        strategy='vertical'
                        style={styles.listTight}
                      >
                        {group.values.map((value) => (
                          <SortableItem key={value.id} value={value.id}>
                            <div {...stylex.props(styles.row, styles.rowMuted, styles.rowCompact)}>
                              <Handle />
                              <span {...stylex.props(styles.rowTitle, styles.textCaption)}>
                                {value.value}
                              </span>
                            </div>
                          </SortableItem>
                        ))}
                      </Sortable>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
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

// -- c-sortable-7: image gallery grid ---------------------------------------

interface GalleryImage {
  id: string
  name: string
  alt: string
  /** Unsplash photo id used to build the thumbnail URL. */
  photo: string
}

const defaultImages: GalleryImage[] = [
  {
    id: '1',
    name: 'hero-banner.jpg',
    alt: 'Mountain lake at dawn',
    photo: 'photo-1506905925346-21bda4d32df4'
  },
  {
    id: '2',
    name: 'product-shot.png',
    alt: 'Minimal workspace desk',
    photo: 'photo-1499951360447-b19be8fe80f5'
  },
  {
    id: '3',
    name: 'team-photo.jpg',
    alt: 'City skyline at night',
    photo: 'photo-1477959858617-67f85cf4f1df'
  },
  {
    id: '4',
    name: 'forest-walk.jpg',
    alt: 'Foggy forest path',
    photo: 'photo-1441974231531-c6227db76b6e'
  },
  {
    id: '5',
    name: 'og-image.png',
    alt: 'Desert dunes at sunset',
    photo: 'photo-1509316785289-025f5b846b35'
  },
  {
    id: '6',
    name: 'favicon.jpg',
    alt: 'Northern lights',
    photo: 'photo-1483347756197-71ef80e95f73'
  }
]

// Media cells: image fills the tile, overlay handle top-right, caption below.
const mediaStyles = stylex.create({
  cell: {
    backgroundColor: colors.backgroundNeutralFaded,
    borderRadius: radius.medium,
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x2,
    height: '100%',
    overflow: 'hidden',
    paddingBlock: unit.x2,
    paddingInline: unit.x3,
    width: '100%'
  },
  thumb: {
    aspectRatio: '4 / 3',
    backgroundColor: colors.backgroundNeutral,
    borderRadius: radius.small,
    display: 'block',
    objectFit: 'cover',
    position: 'relative',
    width: '100%',
    transitionDuration: duration.medium,
    transitionProperty: 'transform, filter',
    transitionTimingFunction: easing.decelerate,
    transform: {
      default: 'scale(1)',
      ':hover': 'scale(1.02)'
    },
    filter: {
      default: 'brightness(1)',
      ':hover': 'brightness(1.05)'
    }
  },
  handleWrapper: {
    margin: 0,
    position: 'relative',
    width: '100%'
  },
  imageHandleOverlay: {
    backgroundColor: 'transparent',
    borderRadius: 0,
    bottom: 0,
    boxShadow: 'none',
    cursor: 'grab',
    left: 0,
    padding: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    display: 'block',
    height: '100%',
    opacity: 1,
    width: '100%',
    touchAction: 'none',
    zIndex: zIndex.absolute
  },
  imageHandleIcon: {
    position: 'absolute',
    right: unit.x2,
    top: unit.x2,
    opacity: 0,
    transform: 'translateY(-4px)',
    transitionDuration: duration.medium,
    transitionProperty: 'opacity, transform',
    transitionTimingFunction: easing.decelerate,
    [stylex.when.ancestor(':hover')]: { opacity: 0 }
  },
  caption: {
    display: 'flex',
    flexDirection: 'column',
    gap: unit.x1,
    paddingBlock: unit.x2,
    paddingInline: unit.x3
  },
  captionTitle: {
    fontSize: fontSize.body2,
    fontWeight: fontWeight.medium,
    lineHeight: fontLineHeight.body2
  },
  captionMeta: {
    color: colors.foregroundNeutralFaded,
    fontSize: fontSize.caption1,
    lineHeight: fontLineHeight.caption1
  }
})

// Compact handle for media grid — icon-only, appears on cell hover.
function MediaHandle() {
  return (
    <SortableItemHandle style={mediaStyles.imageHandleOverlay}>
      <span {...stylex.props(mediaStyles.imageHandleIcon)}>
        <GripVertical size={14} />
      </span>
    </SortableItemHandle>
  )
}

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
              style={styles.mediaGrid}
            >
              {images.map((image) => (
                <SortableItem key={image.id} value={image.id}>
                  <figure {...stylex.props(mediaStyles.cell)}>
                    <div {...stylex.props(mediaStyles.handleWrapper)}>
                      <MediaHandle />
                      <img
                        src={`https://images.unsplash.com/${image.photo}?w=600&dpr=2&q=80`}
                        alt={image.alt}
                        loading='lazy'
                        {...stylex.props(mediaStyles.thumb)}
                      />
                    </div>
                    <figcaption {...stylex.props(mediaStyles.caption)}>
                      <span {...stylex.props(mediaStyles.captionTitle)}>{image.name}</span>
                      <span {...stylex.props(mediaStyles.captionMeta)}>{image.alt}</span>
                    </figcaption>
                  </figure>
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
