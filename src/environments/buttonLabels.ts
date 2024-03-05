 ////////////////////////////////////////////////////
/////////button information////////////////////////////
//if your adding or removing buttons make sure to go to
//home.component.css.headerButtonCell --width-var:
// and adjust it to be ((100/BUTTONLABLESTOTAL)-0.8)%
// and I don't know know to pass that info
// so TODO make that info pass
export const BUTTON_LABELS : string[] = new Array(
    "Main",
    "Tickets",
    "Invoices",
    "Customers",
    "Employees"
    );
export const CUSTOMER_BUTTON_LABELS : string[] = new Array(
    "Add a Customer", 
    "Delete Selected", 
    "Edit Customer"
);

export const BUTTONLABLESTOTAL : number = BUTTON_LABELS.length;
export const HEADER_BUTTON_CELL_WIDTH_VAR : string = ((100/BUTTONLABLESTOTAL)-0.8).toString() + "%";
  //////////end button information////////////////////
  ////////////////////////////////////////////////////