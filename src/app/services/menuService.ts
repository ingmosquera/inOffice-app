import { Injectable } from "@angular/core";
import { MenuItemNode } from "../core/modules/config-components/menu/menuItemNode";

@Injectable({providedIn: 'root'})
export class MenuService{
    getMenuConfig():MenuItemNode[]{
        return  [
            {
              name: 'Welcome',
              children: [],
              icon: 'home',
              url:'home'
            },
            {
              name: 'Item',
              children: [],
              icon: 'folder',
              url:'item'
            },
            {
              name: 'Cliente',
              children: [{name: 'Listar Cliente',icon:'subdirectory_arrow_right',url:'client'}, {name: 'Detalle Cliente',icon:'subdirectory_arrow_right',url:'client-detail'}],
              icon: '',
              url:''
            },
            {
              name: 'Configuración',
              children: [
                {
                  name: 'Capturador',
                  children: [{name: 'Listar capturadores',icon:'subdirectory_arrow_right',url:'capture-list'}, {name: 'Detalle Capurador',icon:'subdirectory_arrow_right',url:'capture-detail'}],
                  icon:'',
                  url:''
                },
                {
                  name: 'Cargue archivo',
                  children: [{name: 'Listar archivos',icon:'subdirectory_arrow_right',url:'load-file'}, {name: 'Detalle archivos',icon:'subdirectory_arrow_right',url:'load-file-detail'}],
                  icon:'',
                  url:''
                },
              ],
              icon: '',
              url:''
            },
            {
              name: 'Salir',
              children: [],
              icon: 'exit_to_app',
              url:'login'
            },
        ];
    }
}