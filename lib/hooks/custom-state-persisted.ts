import useStatePersisted, { StateDispatcher } from '../../common/hooks/use-state-persisted';

const WORLD_GEN = 'world-gen';
const PLANET_EDITOR = 'planet-editor';



export function usePlanetEditorFieldState<T>(key: string, initialValue: T, customSetter?: (value: T) => T): StateDispatcher<T> {
	const { current, set } = useStatePersisted<T>([WORLD_GEN, PLANET_EDITOR, key].join(':'), initialValue);

	if (customSetter) {
		return {
			current,
			set(value: T) {
				set(customSetter(value));
			}
		}
	}

	return { current, set };
}