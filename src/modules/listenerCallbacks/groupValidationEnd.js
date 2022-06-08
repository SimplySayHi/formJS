
export const groupValidationEnd = function( event ){

    const detail = event.detail;

    if( detail.result ){
        event.target.formjs.currentGroup = detail.group.next;
    }
    
}
