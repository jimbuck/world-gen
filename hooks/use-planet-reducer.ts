import { useReducer, Dispatch } from 'react';
import { PlanetMesh } from '../models/planet';
import { randomSeed, guid } from '../services/helpers';
import { PlanetSettings, MaskTypes, createContinentNoise, PlanetLayer } from '../models/planet-settings';
import { EditorSettings } from '../models/editor-settings';

const WORLDGEN_PLANET_EDITOR_SETTINGS = 'world-gen:planet-editor-settings';

export type PlanetEditorState = PlanetSettings & EditorSettings;

export const PlanetEditorFields: { [P in keyof PlanetEditorState]: P; } = {
	name: 'name',
	seed: 'seed',
	radius: 'radius',
	color: 'color',
	terrainLayers: 'terrainLayers',

	saveToStorage: 'saveToStorage',
	resolution: 'resolution',
	wireframes: 'wireframes',
	rotate: 'rotate'
};

export interface PlanetEditorAction {
	field: keyof PlanetEditorState;
	action?: 'push' | 'removeAt' | 'update';
	value: any;
}

export interface PlanetReducer {
	planet: PlanetMesh;
	settings: PlanetSettings;
	dispatch: Dispatch<PlanetEditorAction>;
}

export default function usePlanetReducer(): PlanetReducer {
	const initialSettings = getFromLocalStorage(WORLDGEN_PLANET_EDITOR_SETTINGS, {
		name: '',
		seed: randomSeed(),
		radius: 1,
		color: '#2D6086',
		terrainLayers: [
			{
					id: guid(),
					enabled: true,
					maskType: MaskTypes.None,
					noiseSettings: createContinentNoise()
			},
			// {
			//     id: guid(),
			//     label: `Mountain Layer`,
			//     enabled: true,
			//     maskType: MaskTypes.None,
			//     noiseSettings: createMoutainNoise()
			// }
		],

		saveToStorage: true,
		resolution: 32,
		wireframes: true,
		rotate: true
	});

	const planet = new PlanetMesh();
	const [settings, dispatch] = useReducer(planetEditorReducer, initialSettings);

	return {
		planet,
		settings,
		dispatch
	};

	function planetEditorReducer(state: PlanetEditorState, action: PlanetEditorAction): PlanetEditorState {
		switch (action.field) {
			case PlanetEditorFields.name:
				planet.name = action.value;
			case PlanetEditorFields.color:
				// TODO: Calculate colors.
				planet.regenerateShading();
				break;
			case PlanetEditorFields.radius:
				planet.radius = action.value;
				break;
			case PlanetEditorFields.seed:
				planet.seed = action.value;
				planet.regenerateTerrain();
				planet.regenerateShading();

			case PlanetEditorFields.terrainLayers:
				planet.terrainLayers = updateTerrainLayers(planet.terrainLayers, action);
				planet.regenerateTerrain();
				planet.regenerateShading();
				break;

			case PlanetEditorFields.resolution:
				planet.resolution = action.value;
				planet.regenerateMesh();
				planet.regenerateTerrain();
				planet.regenerateShading();
				break;
			case PlanetEditorFields.wireframes:
				planet.wireframes = action.value;
				break;
			case PlanetEditorFields.rotate:
				// TODO: Update rotation...
				break;
		}

		state = { ...state, [action.field]: action.value };
		if (state.saveToStorage) setLocalStorageState(WORLDGEN_PLANET_EDITOR_SETTINGS, state);
		return state;
	}
}

function setLocalStorageState<T>(key: string, value: T) {
	window.localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage<T>(key: string, defaultValue?: T): T {
	try {
		const item = window.localStorage.getItem(key);
		return item ? JSON.parse(item) : defaultValue;
	} catch (error) {
		console.log(error);
		return defaultValue;
	}
}

function updateTerrainLayers(layers: PlanetLayer[], action: PlanetEditorAction): PlanetLayer[] {
	switch (action.action) {
		case 'push':
			return [...layers, action.value];
		case 'removeAt':
			return [...layers.slice(0, action.value), ...layers.slice(action.value + 1)];
		case 'update':
			const { index, fields } = action.value;
			return [...layers.slice(0, index), { ...layers[index], ...fields }, ...layers.slice(index + 1)];
	}
}