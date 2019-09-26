import { useEffect } from 'react';

import { PlanetMesh } from '../models/planet-mesh';
import { randomSeed, guid } from '../../common/services/helpers';
import { MaskTypes, createContinentNoise, PlanetLayer } from '../models/planet-settings';
import { useStatePersisted } from '../../common/hooks/use-state-persisted';
import { useStateArray, StateArray } from '../../common/hooks/use-state-array';

export type StateInstance<T> = { current: T, set(value: T): void };

function usePlanetEditorFieldState<T>(key: string, initialValue: T, map?: (value: T) => T) {
	const [current, set] = useStatePersisted<T>(`world-gen:planet-editor:${key}`, initialValue);

	function mappedSet(value: T) {
		if (map) value = map(value);
		set(value);
	}

	return { current, set: mappedSet };
}

export function usePlanetEditorState(planet: PlanetMesh): PlanetEditorState {

	const name = usePlanetEditorFieldState('name', '', value => {
		planet.name = value;
		return planet.name;
	});

	const seed = usePlanetEditorFieldState('seed', randomSeed(), value => {
		planet.seed = value;
		planet.regenerateTerrain();
		planet.regenerateShading();
		return planet.seed;
	});

	const radius = usePlanetEditorFieldState('radius', 1, value => {
		planet.radius = value;
		planet.regenerateTerrain();
		planet.regenerateShading();
		return planet.radius;
	});

	const colors = usePlanetEditorFieldState('colors', '#2D6086', value => {
		planet.regenerateShading();
		return value;
	});

	const layers = useStateArray<PlanetLayer>([{
		id: guid(),
		enabled: true,
		maskType: MaskTypes.None,
		noiseSettings: createContinentNoise()
	}], value => {
		planet.terrainLayers = value;
		//planet.regenerateMesh();
		planet.regenerateTerrain();
		planet.regenerateShading();
		return planet.terrainLayers;
	});

	const wireframes = usePlanetEditorFieldState('wireframes', true, value => {
		planet.wireframes = value;
		return planet.wireframes;
	});

	const resolution = usePlanetEditorFieldState('resolution', 32, value => {
		planet.resolution = Math.max(2, value);
		planet.regenerateMesh();
		planet.regenerateTerrain();
		planet.regenerateShading();
		return planet.resolution;
	});

	const rotate = usePlanetEditorFieldState('rotate', true, value => {
		planet.rotate = value;
		return planet.rotate;
	});

	useEffect(() => {
		console.log(`Setting initial planet settings...`);
		planet.name = name.current;
		planet.seed = seed.current;
		planet.radius = radius.current;

		planet.terrainLayers = layers.current;

		planet.rotate = rotate.current;
		planet.resolution = resolution.current;
		planet.wireframes = wireframes.current;

		planet.regenerateMesh();
		planet.regenerateTerrain();
		planet.regenerateShading();
	}, []);

	return {
		planet,

		name,
		colors,
		radius,
		seed,

		layers,

		wireframes,
		resolution,
		rotate
	};
}

export interface PlanetEditorState {
	planet: PlanetMesh,

	name: StateInstance<string>;
	colors: StateInstance<string>;
	radius: StateInstance<number>;
	seed: StateInstance<string>;

	layers: StateArray<PlanetLayer>,

	wireframes: StateInstance<boolean>;
	resolution: StateInstance<number>;
	rotate: StateInstance<boolean>;
}