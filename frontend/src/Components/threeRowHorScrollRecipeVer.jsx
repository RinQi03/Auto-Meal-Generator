import ChooseTag from "./chooseTagsRecipeVer.jsx";

function ThreeRows(props){

    // if (props["data-type"] === "location"){
    //     console.log("hi locaiton")
    // }else{

    // }
    // console.log(props["data-type"])

    return (
        <>
            {
                props.array.map((insideArr,rowIndex)=>{
                    return (<div key = {rowIndex} className="flex overflow-x-scroll hide-scrollbar">
                        {
                            insideArr.map((ele,index) => (
                                <ChooseTag key = {index} data-type= {props["data-type"] === "ingredients"? "ingredients" : "preference"} emoji={ele[0]} name={ele[1]} />
                            ))
                        }
                    </div>);
                })
            }
        </>
    );
}

export default ThreeRows;