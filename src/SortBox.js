import './SortBox.css'
import { Button, TextField } from '@material-ui/core'

function SortElement (props) {
    return(
        <div className="SortElement" style={{height: (props.height + 5 + 'px')}}/>
    )
}

export default function SortBox(props) {
    return (
        <div className="SortBox">
            <div className="SortBoxElements">
                {props.array.map((x,i) => {
                    return(
                        <SortElement key={i} height={x} />
                    )
                })}
            </div>
            <div className="SortBoxControls">
                <div className="comparisons">Runtime: <span>{props.runtime}s</span></div>
                <div className="comparisons">Comparisons: <span>{props.comparisons}</span></div>
                <div style={{flexBasis: "100%", height: "1em"}} />
                <TextField label="# of Elements" onChange={e => props.setNumElements(e.target.value)}>{props.numElements}</TextField>
                <Button variant="contained" onClick={props.reset}>Reset</Button>
                <Button variant="contained" color="primary" onClick={() => {
                    props.sort(props.algSelected)
                }}>Run Algorithm</Button>
            </div>
        </div>
    )
}