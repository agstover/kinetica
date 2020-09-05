import SideNav from '.'

const primaryData = [
    {
        title: 'Main',
        id: 'main',
        location: '#'
    },
    {
        title: 'Resources',
        id: 'resources',
        location: '#'
    },
    {
        title: 'Learn',
        collapsible: true,
        items: [
            {
                title: 'Chemistry',
                id: 'learn.chemistry',
                location: '#'
            },
            {
                title: 'Physics',
                id: 'learn.physics',
                location: '#'
            }
        ]
    }
]

const secondaryData = [
    {
        title: 'Chemistry',
        id: 'learn.chemistry',
        location: '#'
    },
    {
        title: 'Physics',
        id: 'learn.physics',
        items: [
            {
                title: 'Quantum Physics',
                id: 'learn.physics.quantum-physics',

            },
            {
                title: 'Thermodynamics',
                id: 'learn.physics.thermodynamics',
                items: [
                    {
                        'title': 'Your friend heat',
                        'id': 'learn.physics.thermodynamics.your-frend-heat',
                        'location': '#'
                    }
                ]
            }
        ]
    }
]

const primaryActiveItem = 'main'
const secondaryActiveItem = 'learn.physics.quantum-physics'

export default {
    component: SideNav,
    subcomponents: [SideNav.Item, SideNav.Group],
    title: 'Components/SideNav'
}

export const PrimarySideNav = () => {
    return (
        <SideNav variant='primary'>
            {
                primaryData.map(item => {
                    if(item.location) return <SideNav.Item key={item.id} active={item.id === primaryActiveItem} text={item.title} location={item.location} />
                    if(item.items) return (
                        <SideNav.Group key={item.id} collapsible managed={false} active={false} onClick={()=>{}}>
                            <SideNav.Group.Title text={item.title} />
                            <SideNav.Group.Content>
                                {
                                    item.items.map(item => <SideNav.Group.Item key={item.id} location={item.location}>{item.title}</SideNav.Group.Item>)
                                }
                            </SideNav.Group.Content>
                        </SideNav.Group>
                    )
                })                
            }
        </SideNav>
    )
}

export const SecondarySideNav = () => {
    const Cascade = item => {
        return (
            <>
                <SideNav.Item key={item.id} text={item.title} active={secondaryActiveItem === item.id} location={item.location} />
                {
                    !Array.isArray(item.items)
                    ? null
                    : item.items.map(item => Cascade(item))
                }
            </>
        )
    }
    return (
        <SideNav variant='secondary'>
            {
                secondaryData.map(item => {
                    if(item.location) return Cascade(item)
                    if(Array.isArray(item.items)) return (
                        <SideNav.Group key={item.id} onClick={()=>{}}>
                            <SideNav.Group.Title text={item.title} />
                            <SideNav.Group.Content>
                                {
                                    item.items.map(item => Cascade(item))
                                }
                            </SideNav.Group.Content>
                        </SideNav.Group>
                    )
                })                
            }
        </SideNav>
    )
}

