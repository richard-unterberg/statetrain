import { useMemo } from "react"
import { usePageContext } from "vike-react/usePageContext"

interface LinkProps {
  href: string
  label?: string
  children?: React.ReactNode | React.ReactNode[]
  className?: string
  button?: boolean
}

const Link = ({ href, children, label, className = "", button }: LinkProps) => {
  const pageContext = usePageContext()
  const { urlPathname } = pageContext

  // clean up href and pathname
  const hrefWithoutSlashes = href.replace(/^\/|\/$/g, "")
  const pathnameWithoutSlashes = urlPathname.replace(/^\/|\/$/g, "")

  const isAnchorLink = hrefWithoutSlashes.startsWith("#")

  const isExternal = useMemo(() => {
    if (hrefWithoutSlashes.startsWith("http") || hrefWithoutSlashes.startsWith("mailto")) {
      return true
    }

    return false
  }, [hrefWithoutSlashes])

  const isActive = useMemo(
    () =>
      hrefWithoutSlashes === ""
        ? pathnameWithoutSlashes === hrefWithoutSlashes
        : pathnameWithoutSlashes.startsWith(hrefWithoutSlashes),
    [hrefWithoutSlashes, pathnameWithoutSlashes],
  )

  const generatedClassName = useMemo(() => {
    const staticClassName =
      "transition-colors text-primary duration-200 ease-in-out inline-block hover:underline underline"

    if (button) {
      return `${
        isActive ? "bg-primary pointer-events-none" : "bg-warningLight bg-opacity-50 hover:bg-opacity-75"
      } p-3 ${className} ${staticClassName} `
    }

    return `${isActive ? "text-warningLight " : ""} ${className} ${staticClassName}`
  }, [button, className, isActive])

  const linkCheckedExternal = useMemo(
    () => `${!isExternal ? `${import.meta.env.BASE_URL}` : ""}${href}`,
    [href, isExternal],
  )

  return (
    <a
      href={isAnchorLink ? href : linkCheckedExternal}
      className={generatedClassName}
      target={isExternal ? "_blank" : "_self"}
      rel={isExternal ? "noreferrer" : ""}
      aria-label={label || ""}
    >
      {children}
    </a>
  )
}

export default Link
