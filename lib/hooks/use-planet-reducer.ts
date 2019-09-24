import { PlanetMesh } from '../models/planet';
import { randomSeed, guid } from '../../common/services/helpers';
import { PlanetSettings, MaskTypes, createContinentNoise, PlanetLayer } from '../models/planet-settings';
import { EditorSettings } from '../models/editor-settings';
import { usePlanetEditorState } from './custom-state-persisted';
import { StateDispatcher } from '../../common/hooks/use-state-persisted';
import { useStateArray, StateArray } from '../../common/hooks/use-state-array';
import { useEffect } from 'react';

export type PlanetEditorState = PlanetSettings & EditorSettings;

export interface PlanetEditorDispatcher {
	planet: PlanetMesh,

	autoUpdate: StateDispatcher<boolean>;
	name: StateDispatcher<string>;
	colors: StateDispatcher<string>;
	radius: StateDispatcher<number>;
	seed: StateDispatcher<string>;

	layers: StateArray<PlanetLayer>,

	wireframes: StateDispatcher<boolean>;
	resolution: StateDispatcher<number>;
	rotate: StateDispatcher<boolean>;
}

export function usePlanetState(): PlanetEditorDispatcher {
	const planet = new PlanetMesh();

	const autoUpdate = usePlanetEditorState('autoUpdate', true);
	const name = usePlanetEditorState('name', '', value => {
		if (autoUpdate) planet.name = value;
		return value;
	});
	const radius = usePlanetEditorState('radius', 1, value => {
		value = Math.max(0.5, value);
		if (autoUpdate) planet.radius = value;
		return value;
	});
	const seed = usePlanetEditorState('seed', randomSeed(), value => {
		if (autoUpdate) {
			planet.seed = value;
			planet.regenerateTerrain();
			planet.regenerateShading();
		}
		return value;
	});
	const colors = usePlanetEditorState('colors', '#2D6086', value => {
		if (autoUpdate) {
			planet.planetColor = value;
			planet.regenerateShading();
		}
		return value;
	});

	const layers = useStateArray<PlanetLayer>([{
		id: guid(),
		enabled: true,
		maskType: MaskTypes.None,
		noiseSettings: createContinentNoise()
	}]);

	const wireframes = usePlanetEditorState('wireframes', true, value => {
		if (autoUpdate) planet.wireframes = value;
		return value;
	});
	const resolution = usePlanetEditorState('resolution', 32, value => {
		value = Math.max(2, value);
		if (autoUpdate) {
			planet.resolution = value;
			planet.regenerateMesh();
			planet.regenerateTerrain();
			planet.regenerateShading();
		}
		return value;
	});
	const rotate = usePlanetEditorState('wireframes', true, value => {
		if (autoUpdate) planet.rotate = value;
		return value;
	});

	planet.name = name.current;
	planet.radius = radius.current;
	planet.seed = seed.current;
	planet.terrainLayers = layers.current;
	planet.wireframes = wireframes.current;
	planet.resolution = resolution.current;
	planet.rotate = rotate.current;

	return {
		planet,

		autoUpdate,
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