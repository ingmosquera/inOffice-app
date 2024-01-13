import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { MenuItemFlatNode } from '../core/modules/config-components/menu/menuItemFlatNode';
import { MenuItemNode } from '../core/modules/config-components/menu/menuItemNode';
import { MenuService } from '../services/menuService';
import { Router } from '@angular/router';
@Component({
    selector:'app-public',
    templateUrl:'./public.component.html',
    styleUrl:'./public.component.scss'
})

export class PublicComponent implements OnInit {

  public title!: string;
  public userName!:string;
  public isMenuOpen = true;
  public contentMargin = 240;
  constructor(private breakpointObserver: BreakpointObserver,
              private menuservice:MenuService,
              private readonly router:Router){ 
                this.dataSource.data = this.menuservice.getMenuConfig();
              }

  ngOnInit() {
    
    this.isMenuOpen = true;
    this.title = 'InOffice';
    this.userName = "Luis Alberto Mosquera";
  }
  
  private _transformer = (node: MenuItemNode, level: number):MenuItemFlatNode => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      icon : node.icon,
      level: level,
      url : node.url
    };
  };  
  
  treeControl = new FlatTreeControl<MenuItemFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children
  );
  
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  hasChild = (_: number, node: MenuItemFlatNode) => node.expandable;
  
  get isHandset(): boolean {
    return this.breakpointObserver.isMatched(Breakpoints.Handset);
  }

  public onItemClick(node:MenuItemNode):void{
    console.log(node.url);
    this.router.navigate([node.url],{queryParams:{activity:"1"}});
  }
}