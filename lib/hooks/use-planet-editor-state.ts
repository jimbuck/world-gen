import { useEffect } from 'react';

import { PlanetMesh } from '../models/planet';
import { randomSeed, guid } from '../../common/services/helpers';
import { MaskTypes, createContinentNoise, PlanetLayer } from '../models/planet-settings';
import { usePlanetEditorFieldState } from './custom-state-persisted';
import { StateDispatcher } from '../../common/hooks/use-state-persisted';
import { useStateArray, StateArray } from '../../common/hooks/use-state-array';

export function usePlanetEditorState(planet: PlanetMesh): PlanetEditorState {

	const name = usePlanetEditorFieldState('name', '');
	useEffect(() => {
		console.log('Updating name...');
		planet.name = name.current;
	}, [name.current]);

	const radius = usePlanetEditorFieldState('radius', 1, value => Math.max(0.5, value));
	useEffect(() => {
		if(planet.radius === radius.current) return;
		console.log('Updating radius...');
		planet.radius = radius.current;
	}, [radius.current]);

	const seed = usePlanetEditorFieldState('seed', randomSeed());
	useEffect(() => {
		if(planet.seed === seed.current) return;
		console.log('Updating seed...');
		planet.seed = seed.current;
		planet.shouldRegenerateTerrain = true;
		planet.shouldRegenerateShading = true;
	}, [seed.current]);

	const colors = usePlanetEditorFieldState('colors', '#2D6086');
	useEffect(() => {
		//if(planet.colors === colors.current) return;
		console.log('Updating colors...');
		//planet.color = colors.current;
	}, [colors.current]);

	const layers = useStateArray<PlanetLayer>([{
		id: guid(),
		enabled: true,
		maskType: MaskTypes.None,
		noiseSettings: createContinentNoise()
	}]);

	useEffect(() => {
		console.log('Updating layers...');
		planet.terrainLayers = layers.current;
		planet.shouldRegenerateTerrain = true;
		planet.shouldRegenerateShading = true;
	}, [layers.current]);

	const wireframes = usePlanetEditorFieldState('wireframes', true);
	useEffect(() => {
		if(planet.wireframes === wireframes.current) return;
		console.log('Updating wireframes...');
		planet.wireframes = wireframes.current;
	}, [wireframes.current]);

	const resolution = usePlanetEditorFieldState('resolution', 32, value => Math.max(2, value));
	useEffect(() => {
		if(planet.resolution === resolution.current) return;
		console.log('Updating resolution...');
		planet.resolution = resolution.current;
		planet.shouldRegenerateMesh = true;
		planet.shouldRegenerateTerrain = true;
		planet.shouldRegenerateShading = true;
	}, [resolution.current]);

	const rotate = usePlanetEditorFieldState('rotate', true);
	useEffect(() => {
		if(planet.rotate === rotate.current) return;
		console.log('Updating rotate...');
		planet.rotate = rotate.current;
	}, [rotate.current]);

	useEffect(() => {
		if(planet.shouldRegenerateTerrain) {
				console.log('Regenerating terrain...');
				planet.shouldRegenerateTerrain = false;
				planet.regenerateTerrain();
		}

		if(planet.shouldRegenerateShading) {
				console.log('Regenerating shading...');
				planet.shouldRegenerateShading = false;
				planet.regenerateShading();
		}
	});

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

	name: StateDispatcher<string>;
	colors: StateDispatcher<string>;
	radius: StateDispatcher<number>;
	seed: StateDispatcher<string>;

	layers: StateArray<PlanetLayer>,

	wireframes: StateDispatcher<boolean>;
	resolution: StateDispatcher<number>;
	rotate: StateDispatcher<boolean>;
}