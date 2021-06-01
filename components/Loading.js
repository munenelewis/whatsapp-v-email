// export const loader = () => {
//     return (
//         <div>
            
//         </div>
//     )
// }

import {Circle} from 'better-react-spinkit'

function Loading() {
    return (
        <center style={{display:'flex', placeItems: 'center', height:"100px"}}>
            <Circle color="#3cb28" size={69} />
        </center>
    )
}

export default Loading
