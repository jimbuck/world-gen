
import { PlanetEditorState } from '../../hooks/use-planet-editor-state';
import { NumberSlider, TextBox, SeedInput, ColorPicker } from '../../../common/components/FieldEditors';

export default ({ planetState }: { planetState: PlanetEditorState }) => {

    return (
        <>
            <TextBox label='Name' value={planetState.name.current} onChange={planetState.name.set} />
            <SeedInput label='Seed' value={planetState.seed.current} onChange={planetState.seed.set} />
            <NumberSlider label='Radius' min={0.25} max={16} step={0.05} value={planetState.radius.current} onChange={planetState.radius.set} />
            {/* <ColorPicker label='Color' value={planetState.colors.current} onChange={planetState.colors.set} /> */}
        </>
    );
}
