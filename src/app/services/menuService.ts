import { Injectable } from "@angular/core";
import { MenuItemNode } from "../core/modules/config-components/menu/menuItemNode";

@Injectable({providedIn: 'root'})
export class MenuService{
    getMenuConfig():MenuItemNode[]{
        return  [
            {
              name: 'Welcome',
              children: [],
              icon: 'home'
            },
            {
              name: 'Item',
              children: [],
              icon: 'folder'
            },
            {
              name: 'Fruit',
              children: [{name: 'Apple',icon:'subdirectory_arrow_right'}, {name: 'Banana',icon:'subdirectory_arrow_right'}, {name: 'Fruit loops',icon:'subdirectory_arrow_right'}],
              icon: ''
            },
            {
              name: 'Vegetables',
              children: [
                {
                  name: 'Green',
                  children: [{name: 'Broccoli',icon:'subdirectory_arrow_right'}, {name: 'Brussels sprouts',icon:'subdirectory_arrow_right'}],
                  icon:'',
                },
                {
                  name: 'Orange',
                  children: [{name: 'Pumpkins',icon:'subdirectory_arrow_right'}, {name: 'Carrots',icon:'subdirectory_arrow_right'}],
                  icon:'',
                },
              ],
              icon: ''
            },
            {
              name: 'Salir',
              children: [],
              icon: 'exit_to_app'
            },
        ];
    }
}