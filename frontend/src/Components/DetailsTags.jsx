function DetailsTag(props){
    return (
        <div key = {props.name} className={`w-min h-min mx-1 whitespace-nowrap px-2 rounded-md backdrop-blur bg-white/30 text-[12pt] ${props.newAdjust}`}>
            {props.name}
        </div>
    );
}

export default DetailsTag