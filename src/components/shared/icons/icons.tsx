import React from "react"

// Fluent UI System Icons from Microsoft
// https://github.com/microsoft/fluentui-system-icons

interface IconProps {
  fill?: string
  size?: string
}

export type Icon = (props: IconProps) => JSX.Element

const defaultColor = "var(--color-black)"
const defectSize = "24"

export const PlayIcon: Icon = ({ fill = defaultColor, size = defectSize }: IconProps) => (
  <svg width={size} height={size} fill="none" viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 5.274c0-1.707 1.826-2.792 3.325-1.977l12.362 6.726c1.566.853 1.566 3.101 0 3.953L8.325 20.702C6.826 21.518 5 20.432 5 18.726V5.274Z"
      fill={fill}
    />
  </svg>
)

export const PauseIcon: Icon = ({ fill = defaultColor, size = defectSize }: IconProps) => (
  <svg width={size} height={size} fill="none" viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.746 3a1.75 1.75 0 0 0-1.75 1.75v14.5c0 .966.784 1.75 1.75 1.75h3.5a1.75 1.75 0 0 0 1.75-1.75V4.75A1.75 1.75 0 0 0 9.246 3h-3.5ZM14.746 3a1.75 1.75 0 0 0-1.75 1.75v14.5c0 .966.784 1.75 1.75 1.75h3.5a1.75 1.75 0 0 0 1.75-1.75V4.75A1.75 1.75 0 0 0 18.246 3h-3.5Z"
      fill={fill}
    />
  </svg>
)

export const RecordIcon: Icon = ({ fill = defaultColor, size = defectSize }: IconProps) => (
  <svg width={size} height={size} fill="none" viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.25 11a.75.75 0 0 1 .743.648l.007.102v.5a6.75 6.75 0 0 1-6.249 6.732l-.001 2.268a.75.75 0 0 1-1.493.102l-.007-.102v-2.268a6.75 6.75 0 0 1-6.246-6.496L5 12.25v-.5a.75.75 0 0 1 1.493-.102l.007.102v.5a5.25 5.25 0 0 0 5.034 5.246l.216.004h.5a5.25 5.25 0 0 0 5.246-5.034l.004-.216v-.5a.75.75 0 0 1 .75-.75ZM12 2a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z"
      fill={fill}
    />
  </svg>
)

export const RecordStopIcon: Icon = ({ fill = defaultColor, size = defectSize }: IconProps) => (
  <svg width={size} height={size} fill="none" viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.28 2.22a.75.75 0 1 0-1.06 1.06L8 9.06V12a4 4 0 0 0 6.248 3.309l1.146 1.146A5.227 5.227 0 0 1 12.25 17.5h-.5l-.216-.004A5.25 5.25 0 0 1 6.5 12.25v-.5l-.007-.102A.75.75 0 0 0 5 11.75v.5l.004.236a6.75 6.75 0 0 0 6.246 6.496v2.268l.007.102a.75.75 0 0 0 1.493-.102l.001-2.268a6.718 6.718 0 0 0 3.712-1.458l4.256 4.256a.75.75 0 0 0 1.061-1.06L3.28 2.22ZM17.196 14.014l1.146 1.146A6.725 6.725 0 0 0 19 12.25v-.5l-.007-.102a.75.75 0 0 0-1.493.102v.5l-.004.216a5.233 5.233 0 0 1-.3 1.548ZM8.138 4.956l7.792 7.792c.046-.242.07-.492.07-.748V6a4 4 0 0 0-7.862-1.044Z"
      fill={fill}
    />
  </svg>
)

export const LanguageIcon: Icon = ({ fill = defaultColor, size = defectSize }: IconProps) => (
  <svg width={size} height={size} fill="none" viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18 2a1 1 0 1 0-2 0v1h-4a1 1 0 0 0-1 1v1.25a1 1 0 1 0 2 0V5h8v.25a1 1 0 1 0 2 0V4a1 1 0 0 0-1-1h-4V2ZM8.563 7.505l.056.117 5.307 13.005a1 1 0 0 1-1.801.86l-.05-.105L10.692 18H4.407l-1.49 3.407a1 1 0 0 1-1.208.555l-.11-.04a1 1 0 0 1-.555-1.208l.04-.11L6.777 7.6c.337-.77 1.395-.795 1.786-.094Zm-.902 3.062L5.282 16h4.595l-2.216-5.432ZM13.499 7a1 1 0 0 1 1-1h5a1 1 0 0 1 .708 1.707L18.414 9.5H22a1 1 0 1 1 0 2h-4v2.984a2.5 2.5 0 0 1-3.219 2.394l-.569-.17a1 1 0 1 1 .575-1.916l.569.17a.5.5 0 0 0 .643-.478V11.5H12a1 1 0 1 1 0-2h4a1 1 0 0 1 .292-.707L17.085 8H14.5a1 1 0 0 1-1-1Z"
      fill={fill}
    />
  </svg>
)

export const SearchIcon: Icon = ({ fill = defaultColor, size = defectSize }: IconProps) => (
  <svg width={size} height={size} fill="none" viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 2.5a7.5 7.5 0 0 1 5.964 12.048l4.743 4.745a1 1 0 0 1-1.32 1.497l-.094-.083-4.745-4.743A7.5 7.5 0 1 1 10 2.5Zm0 2a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z"
      fill={fill}
    />
  </svg>
)

export const RefreshIcon: Icon = ({ fill = defaultColor, size = defectSize }: IconProps) => (
  <svg width={size} height={size} fill="none" viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 4.75a7.25 7.25 0 1 0 7.201 6.406c-.068-.588.358-1.156.95-1.156.515 0 .968.358 1.03.87a9.25 9.25 0 1 1-3.432-6.116V4.25a1 1 0 1 1 2.001 0v2.698l.034.052h-.034v.25a1 1 0 0 1-1 1h-3a1 1 0 1 1 0-2h.666A7.219 7.219 0 0 0 12 4.75Z"
      fill={fill}
    />
  </svg>
)
