import { type MutableRefObject, useMemo } from "react"

interface ButtonProps extends React.HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
  children?: React.ReactNode
  label?: string
  icon?: React.ReactNode
  link?: string
  noGutter?: boolean
  disabled?: boolean
  ref?: MutableRefObject<HTMLAnchorElement | HTMLButtonElement>
  className?: string
}

const Button = ({
  children,
  label = "Button",
  icon,
  link,
  noGutter,
  disabled,
  onClick,
  ref,
  className,
}: ButtonProps) => {
  const buttonStyle = useMemo(
    () => `flex items-center ${noGutter ? "p-0" : "px-4 py-2"} rounded-sm gap-2 ${className}`,
    [className, noGutter],
  )

  if (link) {
    return (
      <a
        href={link}
        onClick={onClick}
        className={`${buttonStyle}`}
        ref={ref as MutableRefObject<HTMLAnchorElement>}
        aria-label={label}
      >
        {icon}
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`${buttonStyle}`}
      ref={ref as MutableRefObject<HTMLButtonElement>}
      aria-label={label}
    >
      {icon}
      {children}
    </button>
  )
}

export default Button
