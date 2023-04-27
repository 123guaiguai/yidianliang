export function sliceStr(str){
    if(str.length>54){
        return str.slice(0,52)+"...";
    }
    else{
        return str;
    }
}