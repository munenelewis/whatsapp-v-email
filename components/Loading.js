// export const loader = () => {
//     return (
//         <div>
            
//         </div>
//     )
// }

import {Circle} from 'better-react-spinkit'

function Loading() {
    return (
        <center style={{display:'flex', placeItems: 'center', height:100}}>
            <div>
                <img  src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c543.png" height={200} style={{marginBottom:10}} />
            </div>
            <Circle color="#3cb28" size={69} />
        </center>
    )
}

export default Loading