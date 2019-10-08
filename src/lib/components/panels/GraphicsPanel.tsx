
import { CheckboxInput, NumberSlider } from '../../../common/components/FieldEditors';
import { PlanetEditorState } from '../../hooks/use-planet-editor-state';


export default ({ planetState }: { planetState: PlanetEditorState }) => {
		return (
			<>
				<NumberSlider label='Resolution' min={2} max={128} step={1} value={planetState.resolution.current} onChange={planetState.resolution.set} />
				<CheckboxInput label='Rotate' value={planetState.rotate.current} onChange={planetState.rotate.set} />
				<CheckboxInput label='Wireframes' value={planetState.wireframes.current} onChange={planetState.wireframes.set} />
			</>
		);
}
