import Layout from '#components/common/Layout'
import Link from '#components/common/Link'

const ErrorPage = ({ is404, errorInfo }: { is404: boolean; errorInfo?: string }) => (
  <Layout className="mt-20">
    {is404 ? (
      <>
        <h2 className="text-xl mb-4">404 Page Not Found</h2>
        <p>This page could not be found.</p>
        <p>{errorInfo}</p>
      </>
    ) : (
      <>
        <h2 className="text-xl mb-4">500 Internal Server Error</h2>
        <p>Something went wrong.</p>
      </>
    )}
    <Link href="">Go back to home page</Link>
  </Layout>
)

export default ErrorPage
