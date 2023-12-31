import {forwardRef} from "react";
import {Html} from "@react-three/drei";

export const Annotation = forwardRef(({ children, anchor, icon, id, comboClass, distanceFactor, ...props }, ref) => {
    return (
        <Html{...props} ref={ref} position={anchor} className={'trigger_popover'} style={{'pointerEvents': 'none'}}>
            <div className={`trigger_text-wrapper ${comboClass}`} id={id}>
                {children}
                {icon && <div className="trigger_icon">{icon}</div>}
            </div>
        </Html>
    )
})