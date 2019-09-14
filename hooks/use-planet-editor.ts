import { useReducer } from 'react';

export interface PlanetEditorState {
	name: string;
	seed: string;
	radius: number;
	color: string;
	resolution: number;
	wireframes: boolean;
}

export const planetEditorFields: { [P in keyof PlanetEditorState]: P; } = {
	name: 'name',
	seed: 'seed',
	radius: 'radius',
	color: 'color',
	resolution: 'resolution',
	wireframes: 'wireframes'
}

export interface PlanetEditorAction {
	field: keyof PlanetEditorState;
	value: any;
}

function reducer(state: PlanetEditorState, action: PlanetEditorAction): Partial<PlanetEditorState> {
	switch (action.field) {
		case planetEditorFields.resolution:
			// TODO: Rebuild mesh
			break;
		case planetEditorFields.color:
			// TODO: Recalculate the colors
			break;
		case planetEditorFields.radius:
			// TODO: Modify mesh scale
			break;
		case planetEditorFields.wireframes:
			// TODO: Toggle wireframe setting
			break;
		case planetEditorFields.seed:
			// TODO: Recalculate geometry 
	}

	return { ...state, [planetEditorFields.name]: action.value };
  }

export default function usePlanetEditor() {
	
	const [current, dispatch] = useReducer(reducer, {});

	return {
		current,
		dispatch
	};
}