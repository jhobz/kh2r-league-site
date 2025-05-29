const ABBR_MAP: Record<string, string> = {
    'Garden of Assemblage': 'goa',
    'World of Darkness': 'wod',
    '100 Acre Wood': '1aw',
    Agrabah: 'ag',
    Atlantica: 'at',
    "Beast's Castle": 'bc',
    'Disney Castle': 'dc',
    'Halloween Town': 'ht',
    'Hollow Bastion': 'hb',
    'The Land of Dragons': 'tlod',
    'Olympus Coliseum': 'oc',
    'Port Royal': 'pr',
    'Pride Lands': 'pl',
    'Simulated Twilight Town': 'stt',
    'Space Paranoids': 'sp',
    'Twilight Town': 'tt',
    'The World That Never Was': 'twtnw',
}

interface Route extends Record<string, unknown> {
    id: number
    world: {
        name: string
        abbr: string
    }
    rooms: {
        name: string
        boss?: boolean
    }[]
}

export const parse = (contents: string): Route[] => {
    const lines = contents.split('\r\n')
    const route: Route[] = []

    lines.forEach((line, i) => {
        let [world, room] = line.split(' - ')

        if (!world || !room) {
            return
        }

        if (world === 'Timeless River') {
            world = 'Disney Castle'
        }
        if (world === 'Destiny Islands') {
            world = 'World of Darkness'
        }
        if (world === 'Hollow Bastion' && room === 'Garden of Assemblage') {
            world = 'Garden of Assemblage'
            room = ''
        }

        if (route.at(-1)?.world?.name !== world) {
            route.push({
                id: i,
                world: {
                    name: world,
                    abbr: ABBR_MAP[world],
                },
                rooms: [],
            })
        }

        if (room) {
            route.at(-1)!.rooms.push({ name: room })
        }
    })

    return route
}
