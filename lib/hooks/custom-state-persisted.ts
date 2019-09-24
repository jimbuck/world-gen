import useStatePersisted from '../../common/hooks//use-state-persisted';

const WORLD_GEN = 'world-gen';
const PLANET_EDITOR = 'planet-editor';

export function usePlanetEditorState<T>(key: string, initialValue: T) {
	return useStatePersisted<T>([WORLD_GEN, PLANET_EDITOR, key].join(':'), initialValue);
}