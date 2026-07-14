import { ReactNode } from "react";

interface BadgeProps{

    children:ReactNode;

    variant?:
        |"purple"
        |"green"
        |"gold"
        |"orange"
        |"red";

}

const variants={

purple:
"bg-[var(--accent-dim)] text-[var(--accent)]",

green:
"bg-[var(--green-dim)] text-[var(--green)]",

gold:
"bg-[var(--gold-dim)] text-[var(--gold)]",

orange:
"bg-[var(--orange-dim)] text-[var(--orange)]",

red:
"bg-red-500/20 text-red-400",

}

export function Badge({

children,

variant="purple"

}:BadgeProps){

return(

<span
className={`
inline-flex
rounded-full
px-3
py-1
text-xs
font-medium
${variants[variant]}
`}
>

{children}

</span>

)

}