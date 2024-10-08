import * as React from 'react'
import InternalMotionNumber, { type MotionNumberProps } from './MotionNumber'
import { motion } from 'framer-motion'
export * from './MotionNumber'

const MotionNumber = React.forwardRef<HTMLSpanElement, MotionNumberProps>(
	function MotionNumber(props, ref) {
		return <InternalMotionNumber ref={ref} motion={motion} {...props} />
	}
)

export default MotionNumber
