const { MainLayout } = require("../components/layouts")

export default function Resources() {
    return (
        <h1>RESOURCES</h1>
    )
}

Resources.getLayout = page => <MainLayout primarySideNav>{page}</MainLayout>