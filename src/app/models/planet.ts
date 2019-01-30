export class Planet {
    name: string;
    description: string;

    constructor(name: string, data: PlanetData) {
        this.name = name;
        this.description = data.description;
    }

    toData(): PlanetData {
        return {
            description: this.description
        } as PlanetData;
    }
}

export class PlanetData {
    description: string;
}
