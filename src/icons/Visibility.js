import * as React from 'react'

function SvgVisibility(props) {
  return (
    <svg viewBox='0 0 24 24' width='1em' height='1em' {...props}>
      <path d='M12 5C7.455 5 3.573 7.827 2 11.818c1.573 3.991 5.455 6.818 10 6.818 4.546 0 8.427-2.827 10-6.818C20.427 7.828 16.546 5 12 5zm0 11.364a4.547 4.547 0 01-4.545-4.546A4.547 4.547 0 0112 7.273a4.547 4.547 0 014.546 4.545A4.547 4.547 0 0112 16.364zm0-7.273a2.724 2.724 0 00-2.727 2.727A2.724 2.724 0 0012 14.546a2.724 2.724 0 002.727-2.728A2.724 2.724 0 0012 9.091z' />
    </svg>
  )
}

export default SvgVisibility
