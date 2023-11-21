import { Base } from "../base/base";

export interface DetailItem extends Base{
    Item:string,
    NameField:string,
    FieldValue:string,
    UrlImageItem?:string
}