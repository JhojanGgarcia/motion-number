import * as React from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { atom, useAtom } from 'jotai'
import { clsx } from 'clsx'
import { motion, MotionConfig } from 'framer-motion'
import { useId } from 'react'

type TabValue = 'preview' | 'code'

export type DemoProps = {
	children: React.ReactNode
	defaultValue: TabValue
	code: React.ReactNode
}

const knowsToClickAtom = atom(false)

export default function Demo({
	children,
	defaultValue = 'preview',
	code,
	onClick
}: DemoProps & { onClick?: () => void }) {
	const [knowsToClick, setKnowsToClick] = useAtom(knowsToClickAtom)
	const [active, setActive] = React.useState(defaultValue)

	const id = useId()

	function onPointerDown() {
		setKnowsToClick(true)
		onClick?.()
	}
	function onMouseDown(event: React.MouseEvent<HTMLElement>) {
		// Prevent selection of text:
		// https://stackoverflow.com/a/43321596
		if (event.detail > 1) {
			event.preventDefault()
		}
	}

	return (
		<Tabs.Root
			className="not-prose relative isolate"
			value={active}
			onValueChange={(val) => setActive(val as TabValue)}
		>
			<MotionConfig transition={{ layout: { type: 'spring', duration: 0.25, bounce: 0 } }}>
				<Tabs.List className="absolute right-4 top-4 z-10 flex gap-1 rounded-full bg-black/25 p-1 backdrop-blur-sm">
					<Tabs.Trigger
						value="preview"
						className="relative px-2 py-1 text-xs/4 font-medium text-zinc-200 transition-[color] hover:text-white aria-selected:text-white"
					>
						{active === 'preview' && (
							<motion.div
								className="absolute inset-0 size-full bg-white/10"
								style={{ borderRadius: 999 }}
								layout
								layoutId={`${id}active`}
							></motion.div>
						)}
						Preview
					</Tabs.Trigger>
					<Tabs.Trigger
						value="code"
						className="relative px-2 py-1 text-xs/4 font-medium text-zinc-200 transition-[color] hover:text-white aria-selected:text-white"
					>
						{active === 'code' && (
							<motion.div
								className="absolute inset-0 size-full bg-white/10"
								style={{ borderRadius: 999 }}
								layout
								layoutId={`${id}active`}
							></motion.div>
						)}
						Code
					</Tabs.Trigger>
				</Tabs.List>
			</MotionConfig>
			<Tabs.Content
				forceMount
				value="preview"
				className="relative flex min-h-[20rem] items-center justify-center rounded-lg bg-zinc-950 p-4 text-zinc-50 data-[state=inactive]:hidden dark:border dark:border-zinc-800"
				onPointerDown={onPointerDown}
				onMouseDown={onMouseDown}
			>
				{children}
				<span
					className={clsx(
						'absolute bottom-5 left-0 w-full text-center text-sm text-zinc-400 transition-opacity duration-200 ease-out dark:text-zinc-500',
						knowsToClick && 'opacity-0'
					)}
				>
					Click anywhere to change numbers
				</span>
			</Tabs.Content>
			<Tabs.Content value="code">{code}</Tabs.Content>
		</Tabs.Root>
	)
}
