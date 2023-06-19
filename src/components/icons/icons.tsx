import React from 'react'

// Fluent UI System Icons from Microsoft
// https://github.com/microsoft/fluentui-system-icons


interface IconProps {
  fill?: string
}

export type Icon = (props: IconProps) => JSX.Element

const defaultColor = 'var(--color-black)'

export const PlayIcon: Icon = ({ fill = defaultColor }: IconProps) =>
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5 5.274c0-1.707 1.826-2.792 3.325-1.977l12.362 6.726c1.566.853 1.566 3.101 0 3.953L8.325 20.702C6.826 21.518 5 20.432 5 18.726V5.274Z"
      fill={fill}/>
  </svg>

export const PauseIcon: Icon = ({ fill = defaultColor }: IconProps) =>
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.746 3a1.75 1.75 0 0 0-1.75 1.75v14.5c0 .966.784 1.75 1.75 1.75h3.5a1.75 1.75 0 0 0 1.75-1.75V4.75A1.75 1.75 0 0 0 9.246 3h-3.5ZM14.746 3a1.75 1.75 0 0 0-1.75 1.75v14.5c0 .966.784 1.75 1.75 1.75h3.5a1.75 1.75 0 0 0 1.75-1.75V4.75A1.75 1.75 0 0 0 18.246 3h-3.5Z"
      fill={fill}/>
  </svg>

export const StopIcon: Icon = ({ fill = defaultColor }: IconProps) =>
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.75 3A1.75 1.75 0 0 0 3 4.75v14.5c0 .966.784 1.75 1.75 1.75h14.5A1.75 1.75 0 0 0 21 19.25V4.75A1.75 1.75 0 0 0 19.25 3H4.75Z"
      fill={fill}/>
  </svg>

export const RecordIcon: Icon = ({ fill = defaultColor }: IconProps) =>
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.25 11a.75.75 0 0 1 .743.648l.007.102v.5a6.75 6.75 0 0 1-6.249 6.732l-.001 2.268a.75.75 0 0 1-1.493.102l-.007-.102v-2.268a6.75 6.75 0 0 1-6.246-6.496L5 12.25v-.5a.75.75 0 0 1 1.493-.102l.007.102v.5a5.25 5.25 0 0 0 5.034 5.246l.216.004h.5a5.25 5.25 0 0 0 5.246-5.034l.004-.216v-.5a.75.75 0 0 1 .75-.75ZM12 2a4 4 0 0 1 4 4v6a4 4 0 0 1-8 0V6a4 4 0 0 1 4-4Z"
      fill={fill}/>
  </svg>

export const RecordStopIcon: Icon = ({ fill = defaultColor }: IconProps) =>
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.28 2.22a.75.75 0 1 0-1.06 1.06L8 9.06V12a4 4 0 0 0 6.248 3.309l1.146 1.146A5.227 5.227 0 0 1 12.25 17.5h-.5l-.216-.004A5.25 5.25 0 0 1 6.5 12.25v-.5l-.007-.102A.75.75 0 0 0 5 11.75v.5l.004.236a6.75 6.75 0 0 0 6.246 6.496v2.268l.007.102a.75.75 0 0 0 1.493-.102l.001-2.268a6.718 6.718 0 0 0 3.712-1.458l4.256 4.256a.75.75 0 0 0 1.061-1.06L3.28 2.22ZM17.196 14.014l1.146 1.146A6.725 6.725 0 0 0 19 12.25v-.5l-.007-.102a.75.75 0 0 0-1.493.102v.5l-.004.216a5.233 5.233 0 0 1-.3 1.548ZM8.138 4.956l7.792 7.792c.046-.242.07-.492.07-.748V6a4 4 0 0 0-7.862-1.044Z"
      fill={fill}/>
  </svg>

export const ResetIcon: Icon = ({ fill = defaultColor }: IconProps) =>
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.207 2.543a1 1 0 0 1 0 1.414L5.414 5.75h7.836a8 8 0 1 1-8 8 1 1 0 1 1 2 0 6 6 0 1 0 6-6H5.414l1.793 1.793a1 1 0 0 1-1.414 1.414l-3.5-3.5a1 1 0 0 1 0-1.414l3.5-3.5a1 1 0 0 1 1.414 0Z"
      fill={fill}/>
  </svg>

export const UploadIcon: Icon = ({ fill = defaultColor }: IconProps) =>
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24"
       xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.25 3.495h13.498a.75.75 0 0 0 .101-1.493l-.101-.007H5.25a.75.75 0 0 0-.102 1.493l.102.007Zm6.633 18.498L12 22a1 1 0 0 0 .993-.884L13 21V8.41l3.294 3.292a1 1 0 0 0 1.32.083l.094-.083a1 1 0 0 0 .083-1.32l-.083-.094-4.997-4.997a1 1 0 0 0-1.32-.083l-.094.083-5.004 4.996a1 1 0 0 0 1.32 1.499l.094-.083L11 8.415V21a1 1 0 0 0 .883.993Z"
      fill={fill}/>
  </svg>

export const Comment: Icon = ({ fill = defaultColor }: IconProps) =>
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.25 18A3.25 3.25 0 0 1 2 14.75v-8.5A3.25 3.25 0 0 1 5.25 3h13.5A3.25 3.25 0 0 1 22 6.25v8.5A3.25 3.25 0 0 1 18.75 18h-5.785l-5.387 3.817A1 1 0 0 1 6 21.002V18h-.75Z"
      fill={fill}/>
  </svg>

export const CommentLeft: Icon = ({ fill = defaultColor }: IconProps) =>
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.023 2.999A6.5 6.5 0 0 0 22 11.189L22 14.75A3.25 3.25 0 0 1 18.75 18h-5.785l-5.387 3.817A1 1 0 0 1 6 21.002V18h-.75A3.25 3.25 0 0 1 2 14.75v-8.5A3.25 3.25 0 0 1 5.25 3l6.773-.001ZM17.5 1a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm-1.284 2.589-.07.057-2.528 2.532-.03.037-.041.074-.03.083-.015.082-.002.067.008.068.015.062.024.06.03.056.04.055 2.53 2.532a.5.5 0 0 0 .764-.638l-.057-.07L15.208 7H20.5a.5.5 0 0 0 .492-.41L21 6.5a.5.5 0 0 0-.41-.492L20.5 6h-5.292l1.646-1.646a.5.5 0 0 0 .057-.638l-.057-.07a.5.5 0 0 0-.638-.057Z"
      fill={fill}/>
  </svg>
export const CommentRight: Icon = ({ fill = defaultColor }: IconProps) =>
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.023 2.999A6.5 6.5 0 0 0 22 11.189L22 14.75A3.25 3.25 0 0 1 18.75 18h-5.785l-5.387 3.817A1 1 0 0 1 6 21.002V18h-.75A3.25 3.25 0 0 1 2 14.75v-8.5A3.25 3.25 0 0 1 5.25 3l6.773-.001ZM17.5 1a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm.216 2.589-.07.057-.057.07a.5.5 0 0 0 0 .568l.057.07L19.292 6H14l-.09.008a.5.5 0 0 0-.402.402l-.008.09.008.09a.5.5 0 0 0 .402.402L14 7h5.292l-1.646 1.646-.057.07a.5.5 0 0 0 .695.695l.07-.057 2.541-2.548.033-.048.034-.067.021-.063.015-.082L21 6.5l-.003-.053-.014-.075-.03-.083-.042-.074-.045-.056-2.512-2.513-.07-.057a.5.5 0 0 0-.568 0Z"
      fill={fill}/>
  </svg>
export const CommentMultiple: Icon = ({ fill = defaultColor }: IconProps) =>
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.25 2a3.25 3.25 0 0 0-3.241 3.007c.08-.005.16-.007.241-.007h9.5A4.25 4.25 0 0 1 19 9.25v6.5c0 .08-.002.161-.007.241A3.25 3.25 0 0 0 22 12.75v-6A4.75 4.75 0 0 0 17.25 2h-9Z"
      fill={fill}/>
    <path
      d="M17.99 16a3.25 3.25 0 0 1-3.24 3h-4.083L7 21.75c-.824.618-2 .03-2-1v-1.76a3.25 3.25 0 0 1-3-3.24v-6.5A3.25 3.25 0 0 1 5.25 6h9.5A3.25 3.25 0 0 1 18 9.25v6.5c0 .084-.003.168-.01.25Z"
      fill={fill}/>
  </svg>

export const CommentOff: Icon = ({ fill = defaultColor }: IconProps) =>
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.28 2.22a.75.75 0 1 0-1.06 1.06l.702.702A3.24 3.24 0 0 0 2 6.25v8.5A3.25 3.25 0 0 0 5.25 18H6v3.002a1 1 0 0 0 1.578.815L12.965 18h3.974l3.78 3.78a.75.75 0 0 0 1.061-1.06L3.28 2.22ZM22 14.75a3.246 3.246 0 0 1-1.398 2.67L6.182 3H18.75A3.25 3.25 0 0 1 22 6.25v8.5Z"
      fill={fill}/>
  </svg>
