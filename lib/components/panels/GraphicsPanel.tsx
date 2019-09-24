
import { CheckboxInput, NumberSlider } from '../../../common/components/FieldEditors';
import { PlanetEditorDispatcher } from '../../hooks/use-planet-reducer';


export default ({ planetState }: { planetState: PlanetEditorDispatcher }) => {

		return (
			<>
				<CheckboxInput label='AutoUpdate' value={planetState.autoUpdate.current} onChange={planetState.autoUpdate.set} />
				<NumberSlider label='Resolution' min={2} max={64} step={1} value={planetState.resolution.current} onChange={planetState.resolution.set} />
				<CheckboxInput label='Rotate' value={planetState.rotate.current} onChange={planetState.rotate.set} />
			</>
		);
}
